// chat/hooks/useChat.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatConversation } from '../chat.types';
import { storeSession, getStoredSession, updateLastActivity, isSessionValid, clearStoredSession, storeMessages } from '../utils/sessionStorage';

interface SessionResponse {
  sessionId: string;
  agentId: string;
  agentName: string;
  status: string;
  websocketUrl: string;
  autoCreated: boolean;
  autoConnected: boolean;
  arikaWelcome: string;
  message: string;
}

// Utility function to ensure timestamp is a proper Date object
const ensureDate = (timestamp: any): Date => {
  if (timestamp instanceof Date) {
    return timestamp;
  }

  if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? new Date() : date;
  }

  return new Date(); // Fallback to current date
};

export const useChat = () => {
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const sessionCreationRef = useRef<boolean>(false);
  const isCreatingNewSession = useRef<boolean>(false);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 3;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSessionIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef<boolean>(false); // Prevent double initialization

  // Check for existing session on component mount - FIXED
  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const checkExistingSession = async () => {
      console.log('🔍 Checking for existing session...');

      const storedSession = getStoredSession();

      if (storedSession && isSessionValid(storedSession)) {
        console.log('✅ Found valid stored session, restoring...');
        await restoreSession(storedSession);
      } else {
        if (storedSession) {
          console.log('🧹 Stored session expired, clearing...');
          clearStoredSession();
        }
      }

      setIsRestoringSession(false);
    };

    checkExistingSession();
  }, []);

  // Restore session from storage and connect directly to WebSocket
  const restoreSession = async (sessionData: any) => {
    try {
      console.log('🔄 Restoring session:', sessionData.sessionId);
      setIsConnecting(true);
      setConnectionError(null);
      setIsWebSocketConnected(false);
      reconnectAttempts.current = 0;

      // Ensure all message timestamps are proper Date objects
      const messagesWithDates = (sessionData.messages || []).map((message: any) => ({
        ...message,
        timestamp: ensureDate(message.timestamp)
      }));

      const conversation: ChatConversation = {
        id: sessionData.sessionId,
        title: `Chat with ${sessionData.agentName}`,
        messages: messagesWithDates, // Use messages with proper Date objects
        updatedAt: new Date(),
        sessionId: sessionData.sessionId,
        agentId: sessionData.agentId,
        agentName: sessionData.agentName,
      };

      setCurrentConversation(conversation);
      currentSessionIdRef.current = sessionData.sessionId;

      // Directly connect to WebSocket using stored session ID
      initializeWebSocket(sessionData.sessionId);
      updateLastActivity();

    } catch (error) {
      console.error('❌ Failed to restore session:', error);
      clearStoredSession();
      setConnectionError('Unable to restore your previous session. Please start a new session.');
      setIsWebSocketConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  // Create session with backend API
  const createSession = useCallback(async (): Promise<SessionResponse | null> => {
    if (sessionCreationRef.current) {
      console.log('⏳ Session creation already in progress, skipping...');
      return null;
    }

    try {
      sessionCreationRef.current = true;
      setIsConnecting(true);
      setConnectionError(null);
      setIsWebSocketConnected(false);
      reconnectAttempts.current = 0;

      console.log('🚀 Making API call to create session...');
      const response = await fetch('http://64.227.190.197:3000/api/auto-session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('Auto-session service is currently unavailable. Please try again later.');
        } else if (response.status === 500) {
          throw new Error('Server error occurred while creating session. Please try again.');
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error('Unable to connect to auto-session service. Please check your connection.');
        } else {
          throw new Error(`Connection failed with status: ${response.status}`);
        }
      }

      const sessionData: SessionResponse = await response.json();
      console.log('✅ Session created successfully:', sessionData.sessionId);
      return sessionData;
    } catch (error) {
      console.error('❌ Failed to create session:', error);
      setIsWebSocketConnected(false);

      if (error instanceof Error) {
        setConnectionError(error.message);
      } else {
        setConnectionError('Auto-session connection failed. Please check your internet connection and try again.');
      }
      return null;
    } finally {
      setIsConnecting(false);
      sessionCreationRef.current = false;
    }
  }, []);

  // Initialize WebSocket connection - IMPROVED
  const initializeWebSocket = useCallback((sessionId: string) => {
    // ADD THIS CHECK at the very beginning
    if (wsRef.current && wsRef.current.readyState === WebSocket.CONNECTING) {
      console.log('⏸️ WebSocket already connecting, skipping...');
      return;
    }

    console.log('🔌 Initializing WebSocket connection...');

    // Clear any existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      console.log('🔌 Closing existing WebSocket connection');
      wsRef.current.close();
      setIsWebSocketConnected(false);
    }

    const wsUrl = `ws://64.227.190.197:3000/agents/ws/${sessionId}`;
    console.log(`🔗 Connecting to WebSocket (attempt ${reconnectAttempts.current + 1}):`, wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('✅ WebSocket connected successfully');
      setConnectionError(null);
      setIsWebSocketConnected(true);
      reconnectAttempts.current = 0;
      updateLastActivity();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📨 Received WebSocket message:', data);

        if (data.type === "agent_response") {
          const cleanContent = data.content.replace(/\u001b\[[0-9;]*m/g, '');

          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content: cleanContent,
            role: 'assistant',
            timestamp: ensureDate(data.timestamp || Date.now()), // Ensure proper Date object
          };

          setCurrentConversation(prev => {
            if (!prev) return prev;
            const updatedConversation = {
              ...prev,
              messages: [...prev.messages, assistantMessage],
              updatedAt: new Date(),
            };

            storeMessages(updatedConversation.messages);
            updateLastActivity();

            return updatedConversation;
          });

          setIsAgentTyping(false);
          setIsLoading(false);
        }
        else if (data.type === "connection_established") {
          console.log('🎉 WebSocket connection established:', data.message);
        }
        else {
          console.log('❓ Received unknown message type:', data.type, data);
        }

      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
        setIsAgentTyping(false);
        setIsLoading(false);
      }
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      setIsWebSocketConnected(false);
      setIsAgentTyping(false);
      setIsLoading(false);

      if (reconnectAttempts.current >= maxReconnectAttempts) {
        setConnectionError('Unable to establish connection to Arika. Please check your internet connection or try retrying the connection.');
      } else {
        setConnectionError(`Connection failed. Retrying... (${reconnectAttempts.current + 1}/${maxReconnectAttempts})`);
      }
    };

    ws.onclose = (event) => {
      console.log(`🔌 WebSocket disconnected: Code ${event.code}, Reason: ${event.reason}`);
      setIsWebSocketConnected(false);
      setIsAgentTyping(false);
      setIsLoading(false);

      // Only attempt reconnection if it's not a normal closure and we haven't exceeded max attempts
      if (event.code !== 1000 && event.code !== 1001 && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        const delay = Math.min(1000 * reconnectAttempts.current, 3000); // Faster reconnection: 1s, 2s, 3s

        console.log(`🔄 Scheduling reconnection ${reconnectAttempts.current}/${maxReconnectAttempts} in ${delay}ms...`);
        setConnectionError(`Connection lost. Reconnecting... (${reconnectAttempts.current}/${maxReconnectAttempts})`);

        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('🔄 Executing reconnection attempt...');
          initializeWebSocket(sessionId);
        }, delay);
      } else {
        if (reconnectAttempts.current >= maxReconnectAttempts) {
          console.log('⚠️ Max reconnection attempts reached. Stopping reconnection.');
          setConnectionError('Unable to maintain connection to Arika. Please refresh the page or start a new session.');
        }
        reconnectAttempts.current = 0;
      }
    };

    wsRef.current = ws;
  }, []);

  // Retry WebSocket connection with existing session
  const retryWebSocketConnection = useCallback(() => {
    console.log('🔄 Manual retry WebSocket connection requested');
    const sessionIdToUse = currentSessionIdRef.current;

    if (!sessionIdToUse) {
      console.error('❌ No session ID available for retry');
      setConnectionError('No active session found. Please start a new session.');
      return;
    }

    console.log('🔄 Retrying WebSocket connection with session ID:', sessionIdToUse);

    reconnectAttempts.current = 0;
    setConnectionError(null);
    setIsConnecting(true);

    initializeWebSocket(sessionIdToUse);

    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  }, [initializeWebSocket]);

  // Create new conversation - IMPROVED
  const createNewConversation = useCallback(async () => {
    if (sessionCreationRef.current || isCreatingNewSession.current) {
      console.log('⏳ Conversation creation already in progress');
      return;
    }

    console.log('🆕 Creating new conversation...');

    // Clear any existing reconnection timeouts
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    reconnectAttempts.current = 0;

    const storedSession = getStoredSession();

    if (storedSession && isSessionValid(storedSession)) {
      console.log('✅ Valid session exists, connecting directly...');
      await restoreSession(storedSession);
      return;
    }

    console.log('🆕 No valid session found, creating new session...');
    const sessionData = await createSession();

    if (!sessionData) {
      console.error('❌ Failed to create session data');
      return;
    }

    const newConversation: ChatConversation = {
      id: sessionData.sessionId,
      title: `Chat with ${sessionData.agentName}`,
      messages: [],
      updatedAt: new Date(),
      sessionId: sessionData.sessionId,
      agentId: sessionData.agentId,
      agentName: sessionData.agentName,
    };

    console.log('💾 Setting new conversation:', newConversation);
    setCurrentConversation(newConversation);
    currentSessionIdRef.current = sessionData.sessionId;
    storeSession(sessionData, []);
    initializeWebSocket(sessionData.sessionId);
  }, [createSession, initializeWebSocket]);

  // Force create new session (for "Start New Session" button)
  const forceCreateNewConversation = useCallback(async () => {
    if (isCreatingNewSession.current || sessionCreationRef.current) {
      console.log('⏳ New session creation already in progress, please wait...');
      setConnectionError('Session creation in progress. Please wait...');
      return;
    }

    try {
      isCreatingNewSession.current = true;
      console.log('🆕 Force creating new session...');

      // Clear reconnection attempts and timeouts
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      reconnectAttempts.current = 0;
      currentSessionIdRef.current = null;

      clearStoredSession();
      setCurrentConversation(undefined);
      setConnectionError(null);
      setIsWebSocketConnected(false);
      if (wsRef.current) {
        wsRef.current.close();
      }

      const sessionData = await createSession();

      if (!sessionData) {
        console.error('❌ Failed to create new session data');
        return;
      }

      const newConversation: ChatConversation = {
        id: sessionData.sessionId,
        title: `Chat with ${sessionData.agentName}`,
        messages: [],
        updatedAt: new Date(),
        sessionId: sessionData.sessionId,
        agentId: sessionData.agentId,
        agentName: sessionData.agentName,
      };

      console.log('💾 Setting force-created conversation:', newConversation);
      setCurrentConversation(newConversation);
      currentSessionIdRef.current = sessionData.sessionId;
      storeSession(sessionData, []);
      initializeWebSocket(sessionData.sessionId);
    } finally {
      setTimeout(() => {
        isCreatingNewSession.current = false;
      }, 1000);
    }
  }, [createSession, initializeWebSocket]);

  // Send message via WebSocket
  const sendMessage = useCallback((messageContent: string) => {
    console.log('📤 Attempting to send message:', messageContent);

    if (!currentConversation || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('❌ No active connection');
      setConnectionError('No active connection available. Please refresh the page or start a new session.');
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: messageContent,
      role: 'user',
      timestamp: new Date(), // Always create with proper Date object
    };

    setCurrentConversation(prev => {
      if (!prev) return prev;
      const updatedConversation = {
        ...prev,
        messages: [...prev.messages, userMessage],
        updatedAt: new Date(),
      };

      storeMessages(updatedConversation.messages);
      updateLastActivity();

      return updatedConversation;
    });

    setIsAgentTyping(true);
    setIsLoading(false);

    try {
      const messageToSend = {
        type: "user_message",
        content: messageContent
      };

      console.log('📤 Sending message:', messageToSend);
      wsRef.current.send(JSON.stringify(messageToSend));
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      setConnectionError('Failed to send message. Please check your connection and try again.');
      setIsAgentTyping(false);
    }
  }, [currentConversation]);

  // Clear session manually
  const clearSession = useCallback(() => {
    console.log('🧹 Clearing session manually...');

    // Clear reconnection timeouts
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    reconnectAttempts.current = 0;
    currentSessionIdRef.current = null;

    clearStoredSession();
    setCurrentConversation(undefined);
    setIsAgentTyping(false);
    setIsWebSocketConnected(false);
    sessionCreationRef.current = false;
    isCreatingNewSession.current = false;
    setConnectionError(null);
    if (wsRef.current) {
      wsRef.current.close();
    }

    console.log('✅ Session cleared successfully');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 useChat cleanup on unmount');
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      setIsWebSocketConnected(false);
      sessionCreationRef.current = false;
      isCreatingNewSession.current = false;
    };
  }, []);

  return {
    currentConversation,
    isLoading,
    isConnecting,
    isRestoringSession,
    isAgentTyping,
    connectionError,
    isWebSocketConnected,
    createNewConversation,
    forceCreateNewConversation,
    retryWebSocketConnection,
    sendMessage,
    clearSession,
  };
};
