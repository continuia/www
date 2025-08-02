import { Box } from "@mui/material";
import HeroSection from "../components/patients/heroSection";
const ForPatientsPage = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      position={"relative"}
      width={"100%"}
    >
      <HeroSection />
    </Box>
  );
};

export default ForPatientsPage;
