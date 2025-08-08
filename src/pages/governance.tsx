import { Box } from "@mui/material";
import HeroSection from "../components/governance/heroSection";
import TrustedByHealthcare from "../components/governance/trustedByHealthcare";
import ClinicalGovernancePlatform from "../components/governance/clinicalGovernancePlatform";
import OnDemandExpertConsultations from "../components/governance/onDemandExpertConsultations";
import ComplianceQualityAnalytics from "../components/governance/complianceQualityAnalytics";
import SeamlessImplementation from "../components/governance/seamlessImplementation";
import CTASection from "../components/governance/ctaSection";
import MeasurableImpact from "../components/governance/measurableImpact";
import SEOHead from "../components/common/SEOHead";
import { getPageSEO } from "../utils/seoConfig";

const DoctorsPage = () => {
  const seoData = getPageSEO('governance');
  
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        structuredData={seoData.structuredData}
      />
      <HeroSection />
      <TrustedByHealthcare />
      <ClinicalGovernancePlatform />
      <OnDemandExpertConsultations />
      <ComplianceQualityAnalytics />
      <SeamlessImplementation />
      <MeasurableImpact />
      <CTASection />
    </Box>
  );
};

export default DoctorsPage;
