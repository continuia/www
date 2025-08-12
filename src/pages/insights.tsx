import { Box } from "@mui/material";
import HeroSection from "../components/insights/heroSection";
import HowItWorks from "../components/insights/howItWorks";
import WhenYouNeedSecondOpinion from "../components/insights/whenYouNeedSecondOpinion";
import OurSecondOpinionsDifferent from "../components/insights/ourSecondOpinionsDifferent";
import WhyPatientsTrustContinua from "../components/insights/whyPatientsTrustContinua";
import CTASection from "../components/insights/ctaSection";
import SEOHead from "../components/common/SEOHead";
import { getPageSEO } from "../utils/seoConfig";

const ForPatientsPage = () => {
  const seoData = getPageSEO('insights');
  
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        structuredData={seoData.structuredData}
      />
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
