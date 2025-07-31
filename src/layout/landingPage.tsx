import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/landingPage/header";
import Footer from "../components/landingPage/footer";

const HomeLayout = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      <Header />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomeLayout;
