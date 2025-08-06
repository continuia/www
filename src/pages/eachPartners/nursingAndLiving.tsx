import { Box } from "@mui/material";
import HeroSection from "../../components/partners/nursingAndLiving/heroSection";
import { WhyThisPartnerMatters } from "../../components/partners/nursingAndLiving/whyThisPartnerMatters";
import { HowContinuiaSupports } from "../../components/partners/nursingAndLiving/howContinuiaSupports";
import { ExampleUseCases } from "../../components/partners/nursingAndLiving/exampleUseCases";
import { HowWeEngage } from "../../components/partners/nursingAndLiving/howWeEngage";
import CTASection from "../../components/partners/nursingAndLiving/ctaSection";
const Partner = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <HeroSection />
      <WhyThisPartnerMatters />
      <HowContinuiaSupports />
      <HowWeEngage />
      <ExampleUseCases />
      <CTASection />
    </Box>
  );
};

export default Partner;
