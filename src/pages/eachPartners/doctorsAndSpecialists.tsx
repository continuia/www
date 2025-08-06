import { Box } from "@mui/material";
import HeroSection from "../../components/partners/doctorsAndSpecialists/heroSection";
import { WhyThisPartnerMatters } from "../../components/partners/doctorsAndSpecialists/whyThisPartnerMatters";
import { HowContinuiaSupports } from "../../components/partners/doctorsAndSpecialists/howContinuiaSupports";
import { ExampleUseCases } from "../../components/partners/doctorsAndSpecialists/exampleUseCases";
import { HowWeEngage } from "../../components/partners/doctorsAndSpecialists/howWeEngage";
import CTASection from "../../components/partners/doctorsAndSpecialists/ctaSection";
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
