import { Box } from "@mui/material";
import HeroSection from "../components/partners/heroSection";
import CTASection from "../components/partners/ctaSection";
import { PartnersSection } from "../components/partners/allpartnersSection";
const Partners = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} position={"relative"} width={"100%"}>
      <HeroSection />
      <PartnersSection />
      <CTASection />
    </Box>
  );
};

export default Partners;
