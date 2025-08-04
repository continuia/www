import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/landingPage/header";
import Footer from "../components/landingPage/footer";

// If your header is fixed or sticky and:
// - xs: 56px
// - sm+: 72px
const HEADER_HEIGHT = { xs: 30 };

const HomeLayout = () => (
  <Box
    display="flex"
    flexDirection="column"
    width="100%"
    minHeight="100vh"
    bgcolor="var(--bg-secondary)" // optional for base styling
  >
    <Header />

    {/* Spacer to avoid content under the fixed/sticky header */}
    <Box sx={{ height: HEADER_HEIGHT, width: "100%" }} />

    {/* Main routed page content */}
    <Box position="relative" flex={1}>
      <Outlet />
    </Box>

    <Footer />
  </Box>
);

export default HomeLayout;
