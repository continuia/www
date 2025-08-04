import HeroSection from "../components/about/heroSection";
import OurVision from "../components/about/ourVision";
import { Box } from "@mui/material";
import WhatMakesContinuaUnique from "../components/about/whatMakesContinuaUnique";
import EthicalAIApproach from "../components/about/EthicalAIApproach";
const AboutPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <HeroSection />
      <OurVision />
      <WhatMakesContinuaUnique />
      <EthicalAIApproach />
    </Box>
  );
};

export default AboutPage;
