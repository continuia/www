import { Box } from "@mui/material";
import HeroSection from "../components/landingPage/heroSection";
import JourneySteps from "../components/landingPage/journeySteps";
import StatsHighlight from "./StatsHighlight";
const LandingPage = () => {
  return (
    <Box position={"relative"}  width={"100%"}>
      {/* Add your header if needed */}
      <HeroSection />
      <JourneySteps />
      <StatsHighlight />
      {/* Other sections/components */}
    </Box>
  );
};

export default LandingPage;
