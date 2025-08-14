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
        height: "100%",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          padding: "var(--space-6)",
          backgroundColor: "var(--bg-primary)",
          borderRadius: 0,
          boxShadow: "none",
          borderBottom: "1px solid var(--primary-100)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
            fontWeight: 800,
            background: "linear-gradient(135deg, var(--primary-700), var(--primary-900))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textAlign: "center",
          }}
        >
          💬 Healthcare Consultation
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
            textAlign: "center",
            mt: "var(--space-1)",
            fontWeight: 500,
          }}
        >
          Share your health concerns with our AI assistant
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
          left: { xs: 0, lg: "38%" }, // Full width on mobile, start from sidebar on desktop
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "var(--space-6)",
          backgroundColor: "var(--bg-primary)",
          borderTop: "1px solid var(--primary-100)",
          boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.08)",
          zIndex: 20,
        }}
      >
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ChatContainer;
