import QuoteElevator from "../components/about/quoteElevator";
import OurVision from "../components/about/ourVision";
import { Box } from "@mui/material";
import WhatMakesContinuaUnique from "../components/about/whatMakesContinuaUnique";
import EthicalAIApproach from "../components/about/ethicalAIApproach";
import SEOHead from "../components/common/SEOHead";
import { getPageSEO } from "../utils/seoConfig";

const AboutPage = () => {
  const seoData = getPageSEO('about');
  
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        structuredData={seoData.structuredData}
      />
      {/* <HeroSection /> */}
      <OurVision />
      <QuoteElevator />
      <WhatMakesContinuaUnique />
      <EthicalAIApproach />
    </Box>
  );
};

export default AboutPage;
