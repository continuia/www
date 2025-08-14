import { Box } from "@mui/material";
import Header from "../components/home/header";
import ChatPage from "../pages/chat";
const ChatLayout = () => (
  <Box display="flex" flexDirection="column" width="100%" height="100vh" bgcolor="var(--bg-secondary)" justifyContent={"space-between"}>
    <Header />
    <Box sx={{ containerType: "inline-size" }} display={"flex"} flexGrow={1} overflow={"auto"}>
      <ChatPage/>
    </Box>
  </Box>
);

export default ChatLayout;
