import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/landingPage/header";
import Footer from "../components/landingPage/footer";

const HomeLayout = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"100vh"}
    >
      <Header />
      <Box position={"relative"}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomeLayout;
