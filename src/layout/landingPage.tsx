import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "../components/landingPage/header";
import Footer from "../components/landingPage/footer";

const HomeLayout = () => {
  return (
    <Flex direction={"column"} height={"100vh"}>
      <Header />
      <Flex flexGrow={1}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default HomeLayout;
