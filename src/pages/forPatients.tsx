import { Box } from "@mui/material";
import HeroSection from "../components/insights/heroSection";
import HowItWorks from "../components/insights/howItWorks";
import WhenYouNeedSecondOpinion from "../components/insights/whenYouNeedSecondOpinion";
import OurSecondOpinionsDifferent from "../components/insights/ourSecondOpinionsDifferent";
import WhyPatientsTrustContinua from "../components/insights/whyPatientsTrustContinua";
import CTASection from "../components/home/ctaSection";
const ForPatientsPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <HeroSection />
      <HowItWorks />
      <WhenYouNeedSecondOpinion />
      <OurSecondOpinionsDifferent />
      <WhyPatientsTrustContinua />
      <CTASection />
    </Box>
  );
};

export default ForPatientsPage;
