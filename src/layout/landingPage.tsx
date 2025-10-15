import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/home/header";
import Footer from "../components/home/footer";

const HomeLayout = () => (
  <Box
    display="flex"
    flexDirection="column"
    width="100%"
    minHeight="100vh"
    bgcolor="var(--bg-secondary)" // optional for base styling
  >
    <Header />
    {/* Main routed page content */}
    <Box display={"flex"} justifyContent={"center"}>
      <Box maxWidth={"1920px"} sx={{ containerType: "inline-size" }} display="flex" flexDirection="column" flex={1}>
        <Outlet />
      </Box>
    </Box>
    <Footer />
  </Box>
);

export default HomeLayout;
