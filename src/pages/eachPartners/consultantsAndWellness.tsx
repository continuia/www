import { Box } from "@mui/material";
import HeroSection from "../../components/partners/consultantsAndWellness/heroSection";
import { WhyThisPartnerMatters } from "../../components/partners/consultantsAndWellness/whyThisPartnerMatters";
import { HowContinuiaSupports } from "../../components/partners/consultantsAndWellness/howContinuiaSupports";
import { ExampleUseCases } from "../../components/partners/consultantsAndWellness/exampleUseCases";
import { HowWeEngage } from "../../components/partners/consultantsAndWellness/howWeEngage";
import CTASection from "../../components/partners/consultantsAndWellness/ctaSection";
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
