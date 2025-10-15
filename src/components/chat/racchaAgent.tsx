import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";
import TypingIndicator from "./typingIndicator";
import ChatHeader from "./chatHeader";
import { storeSession, getStoredSession, updateLastActivity, isSessionValid, clearStoredSession } from "./utils/sessionStorage";
import { useAuthStore } from "../../store/useAuthStore";

export interface ChatMessageType {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatConversation {
  id: string;
  messages: ChatMessageType[];
  updatedAt: Date;
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

const RacchaAgent: React.FC<ChatContainerProps> = ({ agent = "defaultAgent", heading }) => {
  console.log("[RacchaAgent] Component rendered with agent:", agent);

  const [currentConversation, setCurrentConversation] = useState<ChatConversation | undefined>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const { setAuthenticated, setUser } = useAuthStore();

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  const reconnectTimeoutRef = useRef<any>(null);
  const currentSessionIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);
  const connectionStateRef = useRef<"idle" | "connecting" | "connected" | "failed">("idle");

  const isRealWebSocketActive = () => {
    const active = wsRef.current && (wsRef.current.readyState === WebSocket.CONNECTING || wsRef.current.readyState === WebSocket.OPEN);
    console.log(`[isRealWebSocketActive] WebSocket active: ${active}`);
    return active;
  };

  const initializeWebSocket = useCallback(() => {
    console.log("[initializeWebSocket] Initializing WebSocket");

    // Prevent multiple connections
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
      console.log("[initializeWebSocket] WebSocket already exists, skipping creation");
      return;
    }

    if (connectionStateRef.current === "connecting" || connectionStateRef.current === "connected") {
      if (isRealWebSocketActive()) {
        console.log("[initializeWebSocket] WebSocket already active, skipping init.");
        return;
      } else {
        connectionStateRef.current = "idle";
      }
    }

    connectionStateRef.current = "connecting";
    setIsConnecting(true);

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
      console.log("[initializeWebSocket] Cleared reconnect timeout.");
    }

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const wsBaseUrl = apiBaseUrl.replace("https://", "wss://").replace("http://", "ws://");
    const wsUrl = `${wsBaseUrl}/agents/ws`;
    console.log("[initializeWebSocket] Connecting to URL:", wsUrl);

    try {
      // Prepare protocols array with valid naming - no duplicates
      const protocols = [`racchaAgent-${agent}`];

      // Add session protocol if we have a stored session ID
      if (currentSessionIdRef.current) {
        const sessionId = currentSessionIdRef.current.replace(/[^a-zA-Z0-9.-]/g, "-");
        const sessionProtocol = `session-${sessionId}`;

        // Only add if not already present
        if (!protocols.includes(sessionProtocol)) {
          protocols.push(sessionProtocol);
        }

        console.log("[initializeWebSocket] Using protocols with session:", protocols);
      } else {
        console.log("[initializeWebSocket] Using protocols without session:", protocols);
      }

      const ws = new WebSocket(wsUrl, protocols);

      const connectionTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          ws.close();
          connectionStateRef.current = "failed";
          setIsConnecting(false);
          console.warn("[initializeWebSocket] Connection timeout, WebSocket closed.");
        }
      }, 10000);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log("[WebSocket] Connection opened with protocols:", ws.protocol);
        reconnectAttempts.current = 0;
        connectionStateRef.current = "connected";
        setIsConnecting(false);
        updateLastActivity(agent);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle UX_Command - now it's a string
          if (data.UX_Command) {
            if (data.UX_Command === "SESSION") {
              console.log("[WebSocket] Session command received");

              // Update session ID if provided
              if (data.session_id && data.session_id !== currentSessionIdRef.current) {
                console.log(`[WebSocket] Session ID received from server: ${data.session_id}`);
                currentSessionIdRef.current = data.session_id;

                // Update stored session with the actual session ID from server
                const sessionData = {
                  session_id: data.session_id,
                  agentId: data.agent_id || agent,
                  agentName: data.agent_name || agent,
                };
                storeSession(agent, sessionData);
              }
            } else if (data.UX_Command === "LOGIN") {
              console.log("[WebSocket] Login command received, setting isAuthenticated to true");
              setAuthenticated(true);

              if (data.login) {
                console.log("[WebSocket] User details received:", data.login);
                setUser(data.login);
              }
            }
          }

          // Handle connection_established and agent_response messages
          if (data.type === "connection_established") {
            console.log("[WebSocket] Connection established:", data);

            // Initialize conversation if not exists
            if (!currentConversation && data.session_id) {
              const newConversation: ChatConversation = {
                id: data.session_id,
                messages: [],
                updatedAt: new Date(),
              };
              setCurrentConversation(newConversation);
              currentSessionIdRef.current = data.session_id;
            }

            // Show welcome message if available
            if (data.content || data.message) {
              const welcomeContent = data.content || data.message;
              const cleanContent = welcomeContent.replace(/\u001b\[[0-9;]*m/g, "");

              const welcomeMessage: ChatMessageType = {
                id: crypto.randomUUID(),
                content: cleanContent,
                role: "assistant",
                timestamp: ensureDate(data.timestamp || Date.now()),
              };

              setCurrentConversation((prev) => {
                if (!prev) return prev;
                const updatedConversation = {
                  ...prev,
                  messages: [...prev.messages, welcomeMessage],
                  updatedAt: new Date(),
                };
                console.log("[WebSocket] Welcome message added:", welcomeMessage);
                updateLastActivity(agent);
                return updatedConversation;
              });
            }
          } else if (data.type === "agent_response") {
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
        setIsConnecting(false);
      };

      ws.onclose = (event) => {
        console.log(`[WebSocket] Connection closed with code: ${event.code}`);
        setIsAgentTyping(false);
        connectionStateRef.current = "failed";
        setIsConnecting(false);

        const shouldRetry = event.code !== 1000 && event.code !== 1001 && reconnectAttempts.current < maxReconnectAttempts;
        if (shouldRetry) {
          reconnectAttempts.current += 1;
          const delay = Math.min(1000 * reconnectAttempts.current, 3000);
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("[WebSocket] Retrying connection...");
            connectionStateRef.current = "idle";
            initializeWebSocket();
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
      setIsConnecting(false);
      setTimeout(() => {
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current += 1;
          initializeWebSocket();
        }
      }, 2000);
    }
  }, [agent]); // Only depend on agent

  const createNewConversation = useCallback(async () => {
    console.log("[createNewConversation] Starting new conversation");

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
    setAuthenticated(false);
    setUser(null);

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
      console.log("[createNewConversation] Cleared reconnect timeout.");
    }
    reconnectAttempts.current = 0;
    connectionStateRef.current = "idle";

    console.log("[createNewConversation] Clearing stored session metadata.");
    clearStoredSession(agent);

    console.log("[createNewConversation] Starting new WebSocket connection.");
    initializeWebSocket();
  }, [agent, initializeWebSocket]);

  // Initialize once on mount
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    console.log("[useEffect] Initializing component");

    const checkExistingSession = async () => {
      console.log("[checkExistingSession] Starting initialization");

      // Close any existing connection first
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      connectionStateRef.current = "idle";
      reconnectAttempts.current = 0;

      // Check for stored session
      const storedSession = getStoredSession(agent);
      if (storedSession && isSessionValid(storedSession)) {
        console.log("[checkExistingSession] Valid session found");
        currentSessionIdRef.current = storedSession.sessionId;
      } else {
        if (storedSession) {
          console.log("[checkExistingSession] Stored session invalid, clearing");
          clearStoredSession(agent);
        }
        console.log("[checkExistingSession] No valid session");
      }

      // Initialize WebSocket
      initializeWebSocket();
    };

    checkExistingSession();

    // Cleanup on unmount
    return () => {
      console.log("[useEffect cleanup] Cleaning up WebSocket");
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []); // Empty dependencies - only run once

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
          paddingBottom: "calc(var(--space-4) + 80px)",
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
      <ChatInput agent={agent} onSendMessage={sendMessage} isLoading={false} />
    </Box>
  );
};

export default React.memo(RacchaAgent);
