import { Box } from "@mui/material";
import Header from "../components/home/header";
import SidebarNav from "../components/privacy/sidebarNav";
import { Outlet } from "react-router-dom";

export default function PrivacyLayout() {
  return (
    <Box display="flex" flexDirection="column" alignItems={"center"} height="100vh" bgcolor="var(--bg-secondary)">
      <Header />
      <Box maxWidth={"1920px"} display="flex" flexGrow={1} overflow="hidden" height="100%">
        <SidebarNav />
        <Box flex={1} bgcolor="var(--bg-primary)" overflow={"auto"}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
