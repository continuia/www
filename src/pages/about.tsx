// import HeroSection from "../components/about/heroSection";
import OurVision from "../components/about/ourVision";
import { Box } from "@mui/material";
const AboutPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      {/* <HeroSection /> */}
      <OurVision />
    </Box>
  );
};

export default AboutPage;
