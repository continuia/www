import { Box } from "@mui/material";
import HeroSection from "../components/campaign/heroSection";
import PlatformPromo from "../components/campaign/platformPromo";
import AdaptiveTech2025 from "../components/campaign/adaptiveTech";
import GuidingPrinciples from "../components/campaign/guidingPrinciples";
import ContinuaLaunch from "../components/campaign/continuaLaunch";
const Campaign = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      position={"relative"}
      width={"100%"}
    >
      <HeroSection />
      <PlatformPromo />
      <AdaptiveTech2025 />
      <GuidingPrinciples />
      <ContinuaLaunch />
    </Box>
  );
};

export default Campaign;
