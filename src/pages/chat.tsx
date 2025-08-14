import { useEffect, useState, useRef } from "react";
import { Alert, Box, CircularProgress, Typography, Snackbar } from "@mui/material";
import { useChat } from "../components/chat/hooks/useChat";
import ChatContainer from "../components/chat/chatContainer";

const ChatPage: React.FC = () => {
  const {
    currentConversation,
    isLoading,
    isConnecting,
    isRestoringSession,
    isAgentTyping,
    connectionError,
    isWebSocketConnected,
    createNewConversation,
    forceCreateNewConversation,
    sendMessage,
    clearSession,
  } = useChat();
  const [showError, setShowError] = useState(false);
  const hasTriedConnection = useRef(false);

  useEffect(() => {
    if (!currentConversation && !isConnecting && !isRestoringSession && !hasTriedConnection.current) {
      hasTriedConnection.current = true;
      console.log("Creating new conversation - one time only");
      createNewConversation();
    }
  }, [currentConversation, isConnecting, isRestoringSession, createNewConversation]);

  useEffect(() => {
    if (currentConversation) {
      hasTriedConnection.current = false;
    }
  }, [currentConversation]);

  useEffect(() => {
    if (connectionError) {
      setShowError(true);
      hasTriedConnection.current = false;
    }
  }, [connectionError]);

  const handleCloseError = () => {
    setShowError(false);
  };

  if (isRestoringSession) {
    return (
      <Box
        sx={{
          flex: 1,
          backgroundColor: "var(--bg-primary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "var(--primary-600)", mb: 2 }} />
        <Typography sx={{ color: "var(--text-muted)" }}>
          Restoring your session with Arika...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <Snackbar
        open={showError && !!connectionError}
        autoHideDuration={8000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          top: "24px !important",
          zIndex: "888",
          maxWidth: "500px",
        }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{
            backgroundColor: "var(--error)",
            color: "var(--text-inverse)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            minWidth: "350px",
            maxWidth: "500px",
            fontSize: "var(--text-sm)",
          }}
        >
          {connectionError}
        </Alert>
      </Snackbar>

      <ChatContainer
        conversation={currentConversation}
        isLoading={isLoading || isConnecting}
        isAgentTyping={isAgentTyping}
        onSendMessage={sendMessage}
        onClearSession={clearSession}
        onCreateNewConversation={forceCreateNewConversation}
        connectionError={connectionError}
        isWebSocketConnected={isWebSocketConnected}
      />
    </Box>
  );
};

export default ChatPage;
