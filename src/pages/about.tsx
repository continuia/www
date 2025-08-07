import QuoteElevator from "../components/about/quoteElevator";
import OurVision from "../components/about/ourVision";
import { Box } from "@mui/material";
import WhatMakesContinuaUnique from "../components/about/whatMakesContinuaUnique";
import EthicalAIApproach from "../components/about/ethicalAIApproach";
const AboutPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      {/* <HeroSection /> */}
      <OurVision />
      <QuoteElevator />
      <WhatMakesContinuaUnique />
      <EthicalAIApproach />
    </Box>
  );
};

export default AboutPage;
