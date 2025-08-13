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
    <Box display="flex" justifyContent={"center"} flexDirection="column" height="100vh" sx={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Header */}
      <Paper
        sx={{
          padding: "var(--space-4)",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: 0,
          boxShadow: "var(--shadow-sm)",
          borderBottom: "1px solid var(--border-light)",
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
        flex={1}
        overflow="auto"
        padding="var(--space-4)"
        sx={{
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

      {/* Input Area */}
      <Box display={"flex"} justifyContent={"center"} padding="var(--space-4)" sx={{ backgroundColor: "var(--bg-secondary)" }}>
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ChatContainer;
