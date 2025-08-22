import { Box, Typography, Avatar } from "@mui/material";
import { Person, SmartToy } from "@mui/icons-material";
import type { ChatMessage as ChatMessageType } from "./chat.types";

interface ChatMessageProps {
  message: ChatMessageType;
}

const formatTimestamp = (timestamp: any): string => {
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid Date";
  }
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <Box display="flex" justifyContent={isUser ? "flex-end" : "flex-start"} sx={{ mb: "var(--space-3)" }}>
      <Box display="flex" alignItems="flex-start" gap="var(--space-3)" maxWidth="85%" flexDirection={isUser ? "row-reverse" : "row"}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: isUser ? "var(--primary-600)" : "var(--neutral-200)",
            color: isUser ? "var(--text-inverse)" : "var(--text-primary)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
        </Avatar>

        <Box
          sx={{
            backgroundColor: isUser ? "var(--primary-600)" : "var(--bg-secondary)",
            color: isUser ? "var(--text-inverse)" : "var(--text-primary)",
            borderRadius: isUser ? "var(--radius-xl) var(--radius-xl) var(--radius-md) var(--radius-xl)" : "var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-md)",
            padding: "var(--space-2) var(--space-4)",
            boxShadow: "var(--shadow-sm)",
            border: isUser ? "none" : "1px solid var(--border-light)",
            position: "relative",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "var(--text-base)",
              lineHeight: "var(--leading-relaxed)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {message.content}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              fontSize: "var(--text-xxs)",
              opacity: 0.7,
              display: "block",
              textAlign: isUser ? "right" : "left",
            }}
          >
            {formatTimestamp(message.timestamp)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
