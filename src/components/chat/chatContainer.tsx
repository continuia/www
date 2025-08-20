import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";
import TypingIndicator from "./typingIndicator";
import type { ChatConversation } from "./chat.types";

interface ChatContainerProps {
  agent: string;
  conversation: ChatConversation | undefined;
  isLoading: boolean;
  isAgentTyping?: boolean;
  onSendMessage: (message: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ agent, conversation, isLoading, isAgentTyping = false, onSendMessage }) => {
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
      {/* Messages Area */}
      <Box
        ref={scrollableRef}
        sx={{
          flex: 1,
          overflow: "auto",
          padding: "var(--space-4)",
          paddingBottom: "calc(var(--space-4) + 80px)", // Add space for fixed input
          /* Local scrollbar style overrides */
          "&::-webkit-scrollbar": {
            width: 6,
            backgroundColor: "var(--bg-primary)", // white background track
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            transition: "background-color 0.3s ease",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "var(--bg-primary)", // white track
          },

          /* Firefox scrollbar styles */
          scrollbarWidth: "thin",
          scrollbarColor: "#ffffff var(--bg-primary)",
          "&:hover": {
            scrollbarColor: "var(--primary-400)",
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
            /* Local scrollbar style overrides */
            "&::-webkit-scrollbar": {
              width: 6,
              backgroundColor: "var(--bg-primary)", // white background track
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              transition: "background-color 0.3s ease",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "var(--bg-primary)", // white track
            },

            /* Firefox scrollbar styles */
            scrollbarWidth: "thin",
            scrollbarColor: "#ffffff var(--bg-primary)",
            "&:hover": {
              scrollbarColor: "var(--primary-400)",
            },
          }}
        >
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

            {isAgentTyping && <TypingIndicator agentName={conversation?.agentName || agent} />}
          </Box>
        </Box>
      </Box>
      {/* Input Area */}
      <ChatInput agent={agent} onSendMessage={onSendMessage} isLoading={isLoading} />
    </Box>
  );
};

export default ChatContainer;
