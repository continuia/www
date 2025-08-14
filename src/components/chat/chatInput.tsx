import { useState } from "react";
import { TextField, IconButton, Paper } from "@mui/material";
import { Send } from "@mui/icons-material";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "flex-end",
        padding: "var(--space-3)",
        backgroundColor: "var(--bg-primary)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-lg)",
        gap: 1,
        width: "100%",
        maxWidth: { xs: "100%", sm: "600px", md: "800px" },
        border: "1px solid var(--border-light)",
      }}
    >
      <TextField
        multiline
        maxRows={4}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={isLoading}
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "var(--text-sm)",
            padding: "var(--space-2)",
          },
        }}
      />

      <IconButton
        type="submit"
        disabled={!message.trim() || isLoading}
        sx={{
          backgroundColor: "var(--primary-600)",
          color: "var(--text-inverse)",
          width: 40,
          height: 40,
          "&:hover": {
            backgroundColor: "var(--primary-700)",
          },
          "&:disabled": {
            backgroundColor: "var(--neutral-300)",
            color: "var(--neutral-500)",
          },
        }}
      >
        <Send fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
