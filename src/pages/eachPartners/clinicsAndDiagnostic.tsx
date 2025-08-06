import { Box } from "@mui/material";
import HeroSection from "../../components/partners/clinicsAndDiagnostic/heroSection";
import { WhyThisPartnerMatters } from "../../components/partners/clinicsAndDiagnostic/whyThisPartnerMatters";
import { HowContinuiaSupports } from "../../components/partners/clinicsAndDiagnostic/howContinuiaSupports";
import { ExampleUseCases } from "../../components/partners/clinicsAndDiagnostic/exampleUseCases";
import { HowWeEngage } from "../../components/partners/clinicsAndDiagnostic/howWeEngage";
import CTASection from "../../components/partners/clinicsAndDiagnostic/ctaSection";
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
