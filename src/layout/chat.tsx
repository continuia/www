import { Box } from "@mui/material";
import Header from "../components/home/header";
import { Outlet } from "react-router-dom";

const ChatLayout = () => (
  <Box display="flex" flexDirection="column" width="100%" height="100vh" bgcolor="var(--bg-secondary)" justifyContent={"space-between"} alignItems={"center"}>
    <Header />
    <Box width={"100%"} maxWidth={"1920px"} sx={{ containerType: "inline-size" }} display={"flex"} flexGrow={1} overflow={"auto"}>
      <Outlet />
    </Box>
  </Box>
);

export default ChatLayout;
