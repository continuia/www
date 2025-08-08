import { Box } from "@mui/material";
import HeroSection from "../components/home/heroSection";
import JourneySteps from "../components/home/journeySteps";
import StatsHighlight from "../components/home/statsHighlight";
import HeroSplitSection from "../components/home/heroSplitSection";
import WhyTrustSection from "../components/home/whyTrustSection";
import CTASection from "../components/home/ctaSection";
import PartnerLogosMarquee from "../components/home/partnerLogos";
import SEOHead from "../components/common/SEOHead";
import { getPageSEO } from "../utils/seoConfig";

const LandingPage = () => {
  const seoData = getPageSEO('home');
  
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        structuredData={seoData.structuredData}
      />
      {/* Add your header if needed */}
      <HeroSection />
      <PartnerLogosMarquee/>
      <JourneySteps />
      <StatsHighlight />
      <HeroSplitSection />
      <WhyTrustSection />
      <CTASection />
      {/* Other sections/components */}
    </Box>
  );
};

export default LandingPage;
