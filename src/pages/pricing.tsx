import { Box } from "@mui/material";
import CTASection from "../components/pricing/ctaSection";
import TrustedSecondOpinions from "../components/pricing/heroSection";
import HowItWorks from "../components/pricing/howItWorks";
import ServiceSelector from "../components/pricing/chooseYourService";
import MembershipOptions from "../components/pricing/membershipPlans";
import AddOnServices from "../components/pricing/addOnServices";
import WhyTrustContinuia from "../components/pricing/whyTrustContinuia";
import ConciergeSection from "../components/pricing/conciergeSection";
import FrequentlyAskedQuestions from "../components/pricing/frequentlyAskedQuestions";
const Pricing = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <TrustedSecondOpinions />
      <HowItWorks />
      <ServiceSelector />
      <MembershipOptions />
      <AddOnServices />
      <WhyTrustContinuia />
      <ConciergeSection />
      <FrequentlyAskedQuestions />
      <CTASection />
    </Box>
  );
};

export default Pricing;
