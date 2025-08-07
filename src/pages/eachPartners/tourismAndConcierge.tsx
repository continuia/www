import { Box } from "@mui/material";
import HeroSection from "../../components/partners/tourismAndConcierge/heroSection";
import { WhyThisPartnerMatters } from "../../components/partners/tourismAndConcierge/whyThisPartnerMatters";
import { HowContinuiaSupports } from "../../components/partners/tourismAndConcierge/howContinuiaSupports";
import { ExampleUseCases } from "../../components/partners/tourismAndConcierge/exampleUseCases";
import { HowWeEngage } from "../../components/partners/tourismAndConcierge/howWeEngage";
import CTASection from "../../components/partners/tourismAndConcierge/ctaSection";
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
