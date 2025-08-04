import { Box } from "@mui/material";
import HeroSection from "../components/patients/heroSection";
import HowItWorks from "../components/patients/howItWorks";
import WhenYouNeedSecondOpinion from "../components/patients/whenYouNeedSecondOpinion";
import OurSecondOpinionsDifferent from "../components/patients/ourSecondOpinionsDifferent";
import WhyPatientsTrustContinua from "../components/patients/whyPatientsTrustContinua";
import CTASection from "../components/landingPage/ctaSection";
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
