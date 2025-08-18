import { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import { Send } from "@mui/icons-material";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        maxWidth: "800px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-2xl)",
          border: "1px solid var(--border-light)",
          padding: "var(--space-1)",
          display: "flex",
          alignItems: "flex-end",
          transition: "border-color var(--transition-fast)",
          "&:focus-within": {
            borderColor: "var(--primary-500)",
            boxShadow: "0 0 0 3px var(--primary-100)",
          },
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
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: "var(--text-base)",
              lineHeight: "var(--leading-normal)",
              padding: "var(--space-3) var(--space-4)",
              "& .MuiInputBase-input": {
                padding: 0,
                "&::placeholder": {
                  color: "var(--text-muted)",
                  opacity: 1,
                },
              },
            },
          }}
        />
      </Box>

      <IconButton
        type="submit"
        disabled={!message.trim() || isLoading}
        sx={{
          backgroundColor: "var(--primary-600)",
          color: "var(--text-inverse)",
          width: 48,
          height: 48,
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-md)",
          transition: "all var(--transition-fast)",
          "&:hover": {
            backgroundColor: "var(--primary-700)",
            boxShadow: "var(--shadow-lg)",
            transform: "translateY(-1px)",
          },
          "&:disabled": {
            backgroundColor: "var(--neutral-300)",
            color: "var(--neutral-500)",
            boxShadow: "none",
            transform: "none",
          },
        }}
      >
        <Send fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
