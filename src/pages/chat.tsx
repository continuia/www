import { useEffect } from "react";
import { Container } from "@mui/material";
import { useChat } from "../components/chat/hooks/useChat";
import ChatContainer from "../components/chat/chatContainer";

const ChatPage: React.FC = () => {
  const { currentConversation, isLoading, createNewConversation, sendMessage } = useChat();

  useEffect(() => {
    // Create initial conversation if none exists
    if (!currentConversation) {
      createNewConversation();
    }
  }, [currentConversation, createNewConversation]);

  return (
    <Container   maxWidth={false}  disableGutters sx={{  height: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <ChatContainer conversation={currentConversation} isLoading={isLoading} onSendMessage={sendMessage} />
    </Container>
  );
};

export default ChatPage;
