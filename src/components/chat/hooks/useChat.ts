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
  return new Date();
};

// Helper function to wait for session to be ready - just a simple delay
const waitForSessionReady = async (sessionId: string): Promise<void> => {
  console.log(`⏳ Waiting for session ${sessionId} to be ready on server...`);
  // Simple delay to allow server to fully initialize the session
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log(`✅ Session wait period complete, proceeding with WebSocket connection`);
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
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentSessionIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  // Track connection state more precisely
  const connectionStateRef = useRef<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const initialConnectionAttemptRef = useRef<boolean>(false);

  // FIX: Check actual WebSocket state
  const isRealWebSocketActive = () => {
    return (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.CONNECTING ||
        wsRef.current.readyState === WebSocket.OPEN)
    );
  };

  // Improved session restoration with better timing
  const restoreSession = useCallback(async (sessionData: any) => {
    try {
      console.log('🔄 Restoring session:', sessionData.sessionId);

      // FIX: Always reset connection state on restore
      connectionStateRef.current = 'idle';
      setIsWebSocketConnected(false);

      if (currentSessionIdRef.current === sessionData.sessionId && currentConversation) {
        console.log('⏸️ Session already restored, skipping...');
        return;
      }

      setIsConnecting(true);
      setConnectionError(null);
      setIsWebSocketConnected(false);
      reconnectAttempts.current = 0;
      connectionStateRef.current = 'connecting';

      const messagesWithDates = (sessionData.messages || []).map((message: any) => ({
        ...message,
        timestamp: ensureDate(message.timestamp)
      }));

      const conversation: ChatConversation = {
        id: sessionData.sessionId,
        title: `Chat with ${sessionData.agentName}`,
        messages: messagesWithDates,
        updatedAt: new Date(),
        sessionId: sessionData.sessionId,
        agentId: sessionData.agentId,
        agentName: sessionData.agentName,
      };

      setCurrentConversation(conversation);
      currentSessionIdRef.current = sessionData.sessionId;

      // Wait for session to be ready, then connect
      console.log('⏳ Waiting for session to be ready before WebSocket connection...');
      await waitForSessionReady(sessionData.sessionId);

      initializeWebSocket(sessionData.sessionId);
      updateLastActivity();

    } catch (error) {
      console.error('❌ Failed to restore session:', error);
      clearStoredSession();
      setConnectionError('Unable to restore your previous session. Please start a new session.');
      setIsWebSocketConnected(false);
      connectionStateRef.current = 'failed';
    } finally {
      setIsConnecting(false);
    }
  }, [currentConversation]);

  // Improved WebSocket initialization with better error handling
  const initializeWebSocket = useCallback((sessionId: string) => {
    // FIX: Check actual WebSocket state before skipping
    if (connectionStateRef.current === 'connecting' || connectionStateRef.current === 'connected') {
      if (isRealWebSocketActive()) {
        console.log('⏸️ WebSocket already connecting/connected, skipping...');
        return;
      } else {
        // If state says connected but socket isn't active - reset state
        console.log('🔄 State says connected but WebSocket not active, resetting...');
        connectionStateRef.current = 'idle';
      }
    }

    if (isRealWebSocketActive()) {
      console.log('⏸️ WebSocket already active, skipping...');
      return;
    }

    console.log('🔌 Initializing WebSocket connection for session:', sessionId);
    connectionStateRef.current = 'connecting';

    // Clear any existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Close existing connection if needed
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
      console.log('🔌 Closing existing WebSocket connection');
      wsRef.current.close();
      setIsWebSocketConnected(false);
    }

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.continuia.health';
    const wsBaseUrl = apiBaseUrl.replace('https://', 'wss://').replace('http://', 'ws://');
    const wsUrl = `${wsBaseUrl}/agents/ws/${sessionId}`;

    console.log(`🔗 Connecting to WebSocket (attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts + 1}):`, wsUrl);

    try {
      const ws = new WebSocket(wsUrl);

      // Set a connection timeout
      const connectionTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          console.log('⏰ WebSocket connection timeout, closing...');
          ws.close();
          connectionStateRef.current = 'failed';
          setConnectionError('Connection timeout. Retrying...');
        }
      }, 10000); // 10 second timeout

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log('✅ WebSocket connected successfully');
        setConnectionError(null);
        setIsWebSocketConnected(true);
        reconnectAttempts.current = 0;
        connectionStateRef.current = 'connected';
        initialConnectionAttemptRef.current = true;
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
              timestamp: ensureDate(data.timestamp || Date.now()),
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
        clearTimeout(connectionTimeout);
        console.error('❌ WebSocket error:', error);
        setIsWebSocketConnected(false);
        setIsAgentTyping(false);
        setIsLoading(false);
        connectionStateRef.current = 'failed';

        if (reconnectAttempts.current === 0 && !initialConnectionAttemptRef.current) {
          setConnectionError('Initial connection failed. This is common on first load - retrying...');
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setConnectionError('Unable to establish connection to Arika. Please check your internet connection or try refreshing the page.');
        } else {
          setConnectionError(`Connection failed. Retrying... (${reconnectAttempts.current + 1}/${maxReconnectAttempts})`);
        }
      };

      ws.onclose = (event) => {
        clearTimeout(connectionTimeout);
        console.log(`🔌 WebSocket disconnected: Code ${event.code}, Reason: ${event.reason || 'Unknown'}`);
        setIsWebSocketConnected(false);
        setIsAgentTyping(false);
        setIsLoading(false);
        connectionStateRef.current = 'failed';

        const shouldRetry = event.code !== 1000 && event.code !== 1001 && reconnectAttempts.current < maxReconnectAttempts;

        if (shouldRetry) {
          reconnectAttempts.current += 1;

          let delay;
          if (!initialConnectionAttemptRef.current && reconnectAttempts.current <= 2) {
            delay = 1000;
          } else {
            delay = Math.min(1000 * reconnectAttempts.current, 3000);
          }

          console.log(`🔄 Scheduling reconnection ${reconnectAttempts.current}/${maxReconnectAttempts} in ${delay}ms...`);

          if (reconnectAttempts.current === 1 && !initialConnectionAttemptRef.current) {
            setConnectionError('Initial connection failed - this is normal. Retrying...');
          } else {
            setConnectionError(`Connection lost. Reconnecting... (${reconnectAttempts.current}/${maxReconnectAttempts})`);
          }

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('🔄 Executing reconnection attempt...');
            connectionStateRef.current = 'idle';
            initializeWebSocket(sessionId);
          }, delay);
        } else {
          if (reconnectAttempts.current >= maxReconnectAttempts) {
            console.log('⚠️ Max reconnection attempts reached.');
            setConnectionError('Unable to maintain connection to Arika. Please refresh the page or start a new session.');
          }
          reconnectAttempts.current = 0;
          connectionStateRef.current = 'failed';
        }
      };

      wsRef.current = ws;

    } catch (error) {
      console.error('❌ Failed to create WebSocket:', error);
      connectionStateRef.current = 'failed';
      setConnectionError('Failed to initialize connection. Retrying...');

      setTimeout(() => {
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current += 1;
          initializeWebSocket(sessionId);
        }
      }, 2000);
    }
  }, []);

  // Create session
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
      connectionStateRef.current = 'idle';

      console.log('🚀 Making API call to create session...');
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.continuia.health';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${apiBaseUrl}/api/auto-session`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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

      console.log('⏳ Allowing server time to initialize session...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      return sessionData;
    } catch (error) {
      console.error('❌ Failed to create session:', error);
      setIsWebSocketConnected(false);
      connectionStateRef.current = 'failed';

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setConnectionError('Session creation timeout. Please try again.');
        } else {
          setConnectionError(error.message);
        }
      } else {
        setConnectionError('Auto-session connection failed. Please check your internet connection and try again.');
      }
      return null;
    } finally {
      setIsConnecting(false);
      sessionCreationRef.current = false;
    }
  }, []);

  // Check for existing session on component mount - IMPROVED
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const checkExistingSession = async () => {
      console.log('🔍 Checking for existing session...');

      // FIX: Always reset all connection states on page load
      connectionStateRef.current = 'idle';
      setIsWebSocketConnected(false);
      setConnectionError(null);
      reconnectAttempts.current = 0;

      // Close any existing WebSocket
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      const storedSession = getStoredSession();

      if (storedSession && isSessionValid(storedSession)) {
        console.log('✅ Found valid stored session, restoring...');
        await restoreSession(storedSession);
      } else {
        if (storedSession) {
          console.log('🧹 Stored session expired, clearing...');
          clearStoredSession();
        }
        console.log('ℹ️ No valid session found, waiting for user to start new conversation');
      }

      setIsRestoringSession(false);
    };

    checkExistingSession();
  }, [restoreSession]);

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
    connectionStateRef.current = 'idle';
    setConnectionError(null);
    setIsConnecting(true);

    initializeWebSocket(sessionIdToUse);

    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  }, [initializeWebSocket]);

  // Create new conversation
  const createNewConversation = useCallback(async () => {
    if (sessionCreationRef.current || isCreatingNewSession.current) {
      console.log('⏳ Conversation creation already in progress');
      return;
    }

    if (currentConversation && currentSessionIdRef.current) {
      console.log('⏸️ Valid conversation already exists, skipping creation');
      return;
    }

    console.log('🆕 Creating new conversation...');

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
  }, [createSession, initializeWebSocket, currentConversation, restoreSession]);

  // Force create new session
  const forceCreateNewConversation = useCallback(async () => {
    if (isCreatingNewSession.current || sessionCreationRef.current) {
      console.log('⏳ New session creation already in progress, please wait...');
      setConnectionError('Session creation in progress. Please wait...');
      return;
    }

    try {
      isCreatingNewSession.current = true;
      console.log('🆕 Force creating new session...');

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      reconnectAttempts.current = 0;
      currentSessionIdRef.current = null;
      connectionStateRef.current = 'idle';

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
      timestamp: new Date(),
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

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    reconnectAttempts.current = 0;
    currentSessionIdRef.current = null;
    connectionStateRef.current = 'idle';

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
      connectionStateRef.current = 'idle';
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
