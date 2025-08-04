import { Box } from "@mui/material";
import HeroSection from "../components/landingPage/heroSection";
import JourneySteps from "../components/landingPage/journeySteps";
import StatsHighlight from "../components/landingPage/statsHighlight";
import HeroSplitSection from "../components/landingPage/heroSplitSection";
import WhyTrustSection from "../components/landingPage/whyTrustSection";
import CTASection from "../components/landingPage/ctaSection";
const LandingPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      {/* Add your header if needed */}
      <HeroSection />
      <JourneySteps />
      <StatsHighlight />
      <HeroSplitSection />
      <WhyTrustSection />
      <CTASection />
      {/* Other sections/components */}
    </Box>
  );
};

export default LandingPage;
