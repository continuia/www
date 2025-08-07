import { Box } from "@mui/material";
import HeroSection from "../../components/partners/advocacyAndNGOs/heroSection";
import { WhyThisPartnerMatters } from "../../components/partners/advocacyAndNGOs/whyThisPartnerMatters";
import { HowContinuiaSupports } from "../../components/partners/advocacyAndNGOs/howContinuiaSupports";
import { ExampleUseCases } from "../../components/partners/advocacyAndNGOs/exampleUseCases";
import { HowWeEngage } from "../../components/partners/advocacyAndNGOs/howWeEngage";
import CTASection from "../../components/partners/advocacyAndNGOs/ctaSection";
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
