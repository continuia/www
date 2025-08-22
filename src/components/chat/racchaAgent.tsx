import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";
import TypingIndicator from "./typingIndicator";
import ChatHeader from "./chatHeader";
import { storeSession, getStoredSession, updateLastActivity, isSessionValid, clearStoredSession } from "./utils/sessionStorage";
import { fetchMessagesFromAPI } from "../../api/chat";

export interface ChatMessageType {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

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

interface ChatConversation {
  id: string;
  messages: ChatMessageType[];
  updatedAt: Date;
  sessionId: string;
  agentId: string;
}

interface ChatContainerProps {
  agent?: string;
  heading?: string;
}

const ensureDate = (timestamp: any): Date => {
  if (timestamp instanceof Date) return timestamp;
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? new Date() : date;
};

const waitForSessionReady = async (): Promise<void> => {
  console.log("[waitForSessionReady] Waiting 3 seconds before continuing...");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("[waitForSessionReady] Wait complete.");
};

const RacchaAgent: React.FC<ChatContainerProps> = ({ agent = "defaultAgent", heading }) => {
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | undefined>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const sessionCreationRef = useRef(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSessionIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);
  const connectionStateRef = useRef<"idle" | "connecting" | "connected" | "failed">("idle");
  const initialConnectionAttemptRef = useRef(false);

  const isRealWebSocketActive = () => {
    const active = wsRef.current && (wsRef.current.readyState === WebSocket.CONNECTING || wsRef.current.readyState === WebSocket.OPEN);
    console.log(`[isRealWebSocketActive] WebSocket active: ${active}`);
    return active;
  };

  const restoreSession = useCallback(
    async (sessionData: any) => {
      try {
        console.log("[restoreSession] Starting to restore session", sessionData);
        connectionStateRef.current = "idle";

        if (currentSessionIdRef.current === sessionData.sessionId && currentConversation) {
          console.log("[restoreSession] Session already active, skipping restore.");
          return;
        }

        setIsConnecting(true);
        reconnectAttempts.current = 0;
        connectionStateRef.current = "connecting";

        // Fetch messages from API (no localStorage messages)
        console.log("[restoreSession] Fetching messages from API...");
        const messagesWithDates = await fetchMessagesFromAPI(agent, sessionData.sessionId);
        console.log("[restoreSession] Messages fetched:", messagesWithDates.length);

        const conversation: ChatConversation = {
          id: sessionData.sessionId,
          messages: messagesWithDates,
          updatedAt: new Date(),
          sessionId: sessionData.sessionId,
          agentId: sessionData.agentId,
        };

        setCurrentConversation(conversation);
        currentSessionIdRef.current = sessionData.sessionId;

        await waitForSessionReady();

        initializeWebSocket(sessionData.sessionId);
        updateLastActivity(agent);
        console.log("[restoreSession] Session restoration complete.");
      } catch (error) {
        console.error("[restoreSession] Error restoring session:", error);
        clearStoredSession(agent);
        connectionStateRef.current = "failed";
      } finally {
        setIsConnecting(false);
      }
    },
    [currentConversation, agent]
  );

  const initializeWebSocket = useCallback(
    (sessionId: string) => {
      console.log("[initializeWebSocket] Initializing WebSocket for session:", sessionId);

      if (connectionStateRef.current === "connecting" || connectionStateRef.current === "connected") {
        if (isRealWebSocketActive()) {
          console.log("[initializeWebSocket] WebSocket already active, skipping init.");
          return;
        } else {
          connectionStateRef.current = "idle";
        }
      }

      if (isRealWebSocketActive()) {
        console.log("[initializeWebSocket] WebSocket is active, skipping init.");
        return;
      }

      connectionStateRef.current = "connecting";

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
        console.log("[initializeWebSocket] Cleared reconnect timeout.");
      }

      if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
        console.log("[initializeWebSocket] Closing existing WebSocket connection.");
        wsRef.current.close();
      }

      const apiBaseUrl =  import.meta.env.VITE_API_BASE_URL;
      const wsBaseUrl = apiBaseUrl.replace("https://", "wss://").replace("http://", "ws://");
      const wsUrl = `${wsBaseUrl}/agents/ws?session_id=${sessionId}&agent_name=${agent}`;
      console.log("[initializeWebSocket] Connecting to URL:", wsUrl);

      try {
        const ws = new WebSocket(wsUrl);

        const connectionTimeout = setTimeout(() => {
          if (ws.readyState === WebSocket.CONNECTING) {
            ws.close();
            connectionStateRef.current = "failed";
            console.warn("[initializeWebSocket] Connection timeout, WebSocket closed.");
          }
        }, 10000);

        ws.onopen = () => {
          clearTimeout(connectionTimeout);
          console.log("[WebSocket] Connection opened.");
          reconnectAttempts.current = 0;
          connectionStateRef.current = "connected";
          initialConnectionAttemptRef.current = true;
          updateLastActivity(agent);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "agent_response" || data.type === "connection_established") {
              const cleanContent = data.content.replace(/\u001b\[[0-9;]*m/g, "");
              const assistantMessage: ChatMessageType = {
                id: crypto.randomUUID(),
                content: cleanContent,
                role: "assistant",
                timestamp: ensureDate(data.timestamp || Date.now()),
              };

              setCurrentConversation((prev) => {
                if (!prev) return prev;
                const updatedConversation = {
                  ...prev,
                  messages: [...prev.messages, assistantMessage],
                  updatedAt: new Date(),
                };
                console.log("[WebSocket] New assistant message received:", assistantMessage);
                updateLastActivity(agent);
                return updatedConversation;
              });

              setIsAgentTyping(false);
            }
          } catch (err) {
            console.error("[WebSocket] Error parsing message:", err);
            setIsAgentTyping(false);
          }
        };

        ws.onerror = (event) => {
          console.error("[WebSocket] Error occurred:", event);
          setIsAgentTyping(false);
          connectionStateRef.current = "failed";
        };

        ws.onclose = (event) => {
          console.log(`[WebSocket] Connection closed with code: ${event.code}`);
          setIsAgentTyping(false);
          connectionStateRef.current = "failed";

          const shouldRetry = event.code !== 1000 && event.code !== 1001 && reconnectAttempts.current < maxReconnectAttempts;
          if (shouldRetry) {
            reconnectAttempts.current += 1;
            const delay = Math.min(1000 * reconnectAttempts.current, 3000);
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log("[WebSocket] Retrying connection...");
              connectionStateRef.current = "idle";
              initializeWebSocket(sessionId);
            }, delay);
          } else {
            console.warn("[WebSocket] Max reconnection attempts reached, will not retry.");
            reconnectAttempts.current = 0;
            connectionStateRef.current = "failed";
          }
        };

        wsRef.current = ws;
      } catch (err) {
        console.error("[initializeWebSocket] Exception initializing WebSocket:", err);
        setTimeout(() => {
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current += 1;
            initializeWebSocket(sessionId);
          }
        }, 2000);
      }
    },
    [agent]
  );

  const createSession = useCallback(async (): Promise<SessionResponse | null> => {
    if (sessionCreationRef.current) {
      console.warn("[createSession] Session creation already in progress.");
      return null;
    }

    try {
      sessionCreationRef.current = true;
      console.log("[createSession] Creating new session...");
      setIsConnecting(true);
      reconnectAttempts.current = 0;
      connectionStateRef.current = "idle";

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${apiBaseUrl}/api/auto-session`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const sessionData: SessionResponse = await response.json();
      console.log("[createSession] Session created:", sessionData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return sessionData;
    } catch (error) {
      console.error("[createSession] Error creating session:", error);
      connectionStateRef.current = "failed";
      return null;
    } finally {
      setIsConnecting(false);
      sessionCreationRef.current = false;
    }
  }, []);

  const restoreSessionWrapper = useCallback(async () => {
    console.log("[restoreSessionWrapper] Checking stored session...");
    const storedSession = getStoredSession(agent);
    if (storedSession && isSessionValid(storedSession)) {
      console.log("[restoreSessionWrapper] Valid session found, restoring...");
      await restoreSession(storedSession);
      return true;
    } else {
      if (storedSession) {
        console.log("[restoreSessionWrapper] Stored session invalid or expired. Clearing.");
        clearStoredSession(agent);
      }
      return false;
    }
  }, [restoreSession, agent]);

  const createNewConversation = useCallback(async () => {
    if (sessionCreationRef.current) {
      console.warn("[createNewConversation] Session creation already in progress. Aborting.");
      return;
    }

    if (wsRef.current) {
      console.log("[createNewConversation] Closing old WebSocket and waiting for close...");
      await new Promise<void>((resolve) => {
        wsRef.current!.onclose = () => {
          console.log("[createNewConversation] Old WebSocket closed.");
          resolve();
        };
        wsRef.current!.close();
      });
      wsRef.current = null;
    }

    console.log("[createNewConversation] Clearing conversation state and reconnect info.");
    setCurrentConversation(undefined);
    currentSessionIdRef.current = null;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
      console.log("[createNewConversation] Cleared reconnect timeout.");
    }
    reconnectAttempts.current = 0;
    connectionStateRef.current = "idle";

    console.log("[createNewConversation] Clearing stored session metadata.");
    clearStoredSession(agent);

    console.log("[createNewConversation] Creating new session...");
    const sessionData = await createSession();
    if (!sessionData) {
      console.warn("[createNewConversation] Session creation failed, aborting.");
      return;
    }

    const newConversation: ChatConversation = {
      id: sessionData.sessionId,
      messages: [],
      updatedAt: new Date(),
      sessionId: sessionData.sessionId,
      agentId: sessionData.agentId,
    };

    console.log("[createNewConversation] New conversation created:", newConversation);
    setCurrentConversation(newConversation);
    currentSessionIdRef.current = sessionData.sessionId;

    storeSession(agent, sessionData);

    console.log("[createNewConversation] Initializing WebSocket with new session ID.");
    initializeWebSocket(sessionData.sessionId);
  }, [agent, createSession, initializeWebSocket]);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const checkExistingSession = async () => {
      connectionStateRef.current = "idle";
      reconnectAttempts.current = 0;

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const hasSession = await restoreSessionWrapper();
      if (!hasSession) {
        createNewConversation();
      }
    };
    checkExistingSession();
  }, [restoreSessionWrapper, createNewConversation]);

  const sendMessage = useCallback(
    (messageContent: string) => {
      if (!currentConversation || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.warn("[sendMessage] No active connection available.");
        return;
      }

      const userMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        content: messageContent,
        role: "user",
        timestamp: new Date(),
      };

      setCurrentConversation((prev) => {
        if (!prev) return prev;
        const updatedConversation = {
          ...prev,
          messages: [...prev.messages, userMessage],
          updatedAt: new Date(),
        };
        console.log("[sendMessage] Adding user message:", userMessage);
        updateLastActivity(agent);
        return updatedConversation;
      });

      setIsAgentTyping(true);

      try {
        const messageToSend = {
          type: "user_message",
          content: messageContent,
        };
        wsRef.current.send(JSON.stringify(messageToSend));
        console.log("[sendMessage] Message sent over WebSocket:", messageContent);
      } catch (err) {
        console.error("[sendMessage] Failed to send message:", err);
        setIsAgentTyping(false);
      }
    },
    [agent, currentConversation]
  );

  const scrollableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollableRef.current) {
      const element = scrollableRef.current;
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollHeight;
      });
    }
  }, [currentConversation?.messages, isAgentTyping]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      sx={{
        backgroundColor: "var(--bg-primary)",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <ChatHeader heading={heading} isConnecting={isConnecting} newConversation={createNewConversation} />
      {/* Messages Area */}
      <Box
        ref={scrollableRef}
        sx={{
          flex: 1,
          overflow: "auto",
          padding: "var(--space-4)",
          paddingBottom: "calc(var(--space-4) + 80px)", // Add space for fixed input
          "&::-webkit-scrollbar": {
            width: 6,
            backgroundColor: "var(--bg-primary)",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            transition: "background-color 0.3s ease",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "var(--bg-primary)",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#ffffff var(--bg-primary)",
          "&:hover": {
            scrollbarColor: "var(--primary-400)",
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: "var(--space-4) var(--space-6)",
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: 6,
              backgroundColor: "var(--bg-primary)",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              transition: "background-color 0.3s ease",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "var(--bg-primary)",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "#ffffff var(--bg-primary)",
            "&:hover": {
              scrollbarColor: "var(--primary-400)",
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {currentConversation?.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isAgentTyping && <TypingIndicator agentName={agent} />}
          </Box>
        </Box>
      </Box>
      {/* Input Area */}
      <ChatInput agent={agent} onSendMessage={sendMessage} isLoading={isConnecting} />
    </Box>
  );
};

export default React.memo(RacchaAgent);
