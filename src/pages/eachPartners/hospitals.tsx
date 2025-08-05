import { Box } from "@mui/material";
import HeroSection from "../../components/partners/hospitals/heroSection";
import { WhyThisPartnerMatters } from "../../components/partners/hospitals/whyThisPartnerMatters";
import { HowContinuiaSupports } from "../../components/partners/hospitals/howContinuiaSupports";
import { ExampleUseCases } from "../../components/partners/hospitals/exampleUseCases";
import { HowWeEngage } from "../../components/partners/hospitals/howWeEngage";
import CTASection from "../../components/partners/hospitals/ctaSection";
const Partner = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <HeroSection />
      <WhyThisPartnerMatters />
      <HowContinuiaSupports />
      <ExampleUseCases />
      <HowWeEngage />
      <CTASection />
    </Box>
  );
};

export default Partner;
