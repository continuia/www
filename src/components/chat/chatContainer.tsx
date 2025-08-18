import { Box, Typography, CircularProgress, Button, Chip } from "@mui/material";
import { Refresh, Wifi, Person, Login } from "@mui/icons-material";
import { useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";
import TypingIndicator from "./typingIndicator";
import type { ChatConversation } from "./chat.types";

interface ChatContainerProps {
  conversation: ChatConversation | undefined;
  isLoading: boolean;
  isAgentTyping?: boolean;
  onSendMessage: (message: string) => void;
  onClearSession: () => void;
  onCreateNewConversation: () => void;
  connectionError?: string | null;
  isWebSocketConnected?: boolean;
  onShowAuthModal?: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ conversation, isLoading, isAgentTyping = false, onSendMessage, onClearSession, onCreateNewConversation, connectionError, isWebSocketConnected = false, onShowAuthModal }) => {
  const { user, isAuthenticated } = useAuth();
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Custom scroll effect for messages
  useEffect(() => {
    if (scrollableRef.current) {
      const element = scrollableRef.current;
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollHeight;
      });
    }
  }, [conversation?.messages, isAgentTyping]);

  const handleStartNewSession = () => {
    setTimeout(() => {
      onCreateNewConversation();
    }, 100);
  };

  const handleRetryConnection = () => {
    onClearSession();
    onCreateNewConversation();
  };

  // Determine connection status
  const hasConnectionError = connectionError && (connectionError.includes("WebSocket") || connectionError.includes("connection") || connectionError.includes("Connection") || connectionError.includes("real-time") || connectionError.includes("establish"));

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
      {/* Header */}
      <Box
        sx={{
          padding: "10px 20px",
          backgroundColor: "var(--bg-primary)",
          borderBottom: "1px solid var(--border-light)",
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "var(--text-md)", md: "var(--text-2xl)" },
              fontWeight: 800,
              background: "linear-gradient(135deg, var(--primary-700), var(--primary-900))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Healthcare Consultation
          </Typography>

          {/* Authentication Status */}
          {isAuthenticated ? (
            <Chip
              icon={<Person />}
              label={`Authenticated as: ${user?.email}`}
              size="small"
              sx={{
                mt: 1,
                bgcolor: "var(--success-100)",
                color: "var(--success-800)",
                fontSize: "var(--text-xs)",
                "& .MuiChip-icon": {
                  color: "var(--success-600)",
                },
              }}
            />
          ) : (
            <Chip
              icon={<Login />}
              label="Anonymous Session"
              size="small"
              clickable
              onClick={onShowAuthModal}
              sx={{
                mt: 1,
                bgcolor: "var(--warning-100)",
                color: "var(--warning-800)",
                fontSize: "var(--text-xs)",
                cursor: "pointer",
                "& .MuiChip-icon": {
                  color: "var(--warning-600)",
                },
                "&:hover": {
                  bgcolor: "var(--warning-200)",
                },
              }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
          {!isAuthenticated && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Login />}
              onClick={onShowAuthModal}
              sx={{
                minWidth: "auto",
                backgroundColor: "var(--primary-600)",
                color: "white",
                fontSize: "var(--text-sm)",
                padding: { xs: "var(--space-2)", md: "var(--space-2) var(--space-4)" },
                borderRadius: "var(--radius-lg)",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "var(--shadow-sm)",
                "&:hover": {
                  backgroundColor: "var(--primary-700)",
                  boxShadow: "var(--shadow-md)",
                },
                // Hide text on small screens
                "& .signin-text": {
                  display: { xs: "none", md: "inline" },
                },
                "& .MuiButton-startIcon": {
                  marginRight: { xs: 0, md: 1 },
                  marginLeft: 0,
                },
              }}
            >
              <span className="signin-text">Sign In</span>
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            startIcon={<Refresh />}
            onClick={handleStartNewSession}
            disabled={isLoading}
            sx={{
              borderColor: "var(--primary-500)",
              color: "var(--primary-600)",
              fontSize: "var(--text-sm)",
              minWidth: "auto",
              padding: { xs: "var(--space-2)", md: "var(--space-2) var(--space-4)" },
              borderRadius: "var(--radius-lg)",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                borderColor: "var(--primary-600)",
                backgroundColor: "var(--primary-50)",
              },
              "&:disabled": {
                borderColor: "var(--neutral-300)",
                color: "var(--neutral-400)",
              },
              // Hide text on small screens
              "& .newchat-text": {
                display: { xs: "none", md: "inline" },
              },
              "& .MuiButton-startIcon": {
                marginRight: { xs: 0, md: 1 },
                marginLeft: 0,
              },
            }}
          >
            <span className="newchat-text">New Chat</span>
          </Button>
        </Box>
      </Box>

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
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--primary-400)",
            borderRadius: "var(--radius-full)",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "var(--neutral-200)",
          },
        }}
      >
        <Box
          ref={scrollableRef}
          sx={{
            flex: 1,
            padding: "var(--space-4) var(--space-6)",
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--primary-400)",
              borderRadius: "var(--radius-full)",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          {!conversation?.messages.length && !isAgentTyping ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%" flexDirection="column" sx={{ minHeight: "300px" }}>
              {isLoading ? (
                <>
                  <CircularProgress sx={{ color: "var(--primary-600)", mb: 3 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--text-lg)",
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    Connecting to Arika...
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-muted)",
                      fontSize: "var(--text-sm)",
                      textAlign: "center",
                    }}
                  >
                    Setting up your consultation
                  </Typography>
                </>
              ) : hasConnectionError || !isWebSocketConnected ? (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-xl)",
                      mb: 2,
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    Connection Failed
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-muted)",
                      fontSize: "var(--text-sm)",
                      textAlign: "center",
                      mb: 4,
                      maxWidth: "400px",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    Unable to connect to Arika. Please check your internet connection and try again.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={handleRetryConnection}
                    sx={{
                      backgroundColor: "var(--primary-600)",
                      color: "var(--text-inverse)",
                      padding: "var(--space-3) var(--space-6)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      borderRadius: "var(--radius-lg)",
                      textTransform: "none",
                      boxShadow: "var(--shadow-md)",
                      "&:hover": {
                        backgroundColor: "var(--primary-700)",
                        boxShadow: "var(--shadow-lg)",
                      },
                    }}
                  >
                    Retry Connection
                  </Button>
                </>
              ) : (
                <>
                  <Wifi
                    sx={{
                      fontSize: "3rem",
                      color: "var(--success)",
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-xl)",
                      mb: 2,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    Connected to Arika
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-muted)",
                      fontSize: "var(--text-sm)",
                      textAlign: "center",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    Hello! I'm ready to help with your consultation. How can I assist you today?
                  </Typography>
                </>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              {conversation?.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isAgentTyping && <TypingIndicator agentName={conversation?.agentName || "Arika"} />}

              {isLoading && !isAgentTyping && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress size={20} sx={{ color: "var(--primary-600)" }} />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          padding: "var(--space-4) var(--space-6)",
          backgroundColor: "var(--bg-primary)",
          borderTop: "1px solid var(--border-light)",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />

        {/* Floating Sign In Button for unauthenticated users */}
        {!isAuthenticated && (
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              right: "20px",
              zIndex: 1000,
            }}
          >
            <Button
              variant="contained"
              size="small"
              startIcon={<Login />}
              onClick={onShowAuthModal}
              sx={{
                backgroundColor: "var(--primary-600)",
                color: "white",
                fontSize: "var(--text-sm)",
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-full)",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "var(--shadow-lg)",
                "&:hover": {
                  backgroundColor: "var(--primary-700)",
                  boxShadow: "var(--shadow-xl)",
                },
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(99, 102, 241, 0.7)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 10px rgba(99, 102, 241, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)",
                  },
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatContainer;
