import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import { useChatScroll } from "./hooks/useChatScroll";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";
import type { ChatConversation } from "./chat.types";

interface ChatContainerProps {
  conversation: ChatConversation | undefined;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ conversation, isLoading, onSendMessage }) => {
  const scrollRef = useChatScroll(conversation?.messages);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          padding: "var(--space-4)",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: 0,
          boxShadow: "var(--shadow-sm)",
          borderBottom: "1px solid var(--border-light)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "var(--text-lg)",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {conversation?.title || "New Chat"}
        </Typography>
      </Paper>

      {/* Messages Area */}
      <Box
        ref={scrollRef}
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
        {!conversation?.messages.length ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%" flexDirection="column">
            <Typography
              variant="h5"
              sx={{
                color: "var(--text-tertiary)",
                fontSize: "var(--text-xl)",
                mb: 1,
              }}
            >
              Start a conversation
            </Typography>
            <Typography sx={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Type a message to get started</Typography>
          </Box>
        ) : (
          <>
            {conversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress size={20} sx={{ color: "var(--primary-600)" }} />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Fixed Input Area */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "var(--space-4)",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-light)",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 20,
        }}
      >
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ChatContainer;
