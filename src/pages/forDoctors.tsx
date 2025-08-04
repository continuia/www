import { Box } from "@mui/material";
import HeroSection from "../components/doctors/heroSection";
import TrustedByHealthcare from "../components/doctors/trustedByHealthcare";
import ClinicalGovernancePlatform from "../components/doctors/clinicalGovernancePlatform";
import OnDemandExpertConsultations from "../components/doctors/onDemandExpertConsultations";
import ComplianceQualityAnalytics from "../components/doctors/complianceQualityAnalytics";
import SeamlessImplementation from "../components/doctors/seamlessImplementation";
import CTASection from "../components/doctors/ctaSection";
import MeasurableImpact from "../components/doctors/measurableImpact";
const ForDoctorsPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
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

export default ForDoctorsPage;
