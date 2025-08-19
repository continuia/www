import { Box } from "@mui/material";
import Header from "../components/home/header";
import Footer from "../components/home/footer";
import SidebarNav from "../components/privacy/sidebarNav";
import { Outlet } from "react-router-dom";

export default function PrivacyLayout() {
  return (
    <Box display="flex" flexDirection="column" height="100vh" bgcolor="var(--bg-secondary)">
      <Header />
      <Box display="flex" flexGrow={1} overflow="hidden" height="100%">
        <SidebarNav />
        <Box flex={1} bgcolor="var(--bg-primary)" overflow={"auto"}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
