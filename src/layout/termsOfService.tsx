import { Box } from "@mui/material";
import Header from "../components/home/header";
import Footer from "../components/home/footer";
import SidebarNav from "../components/termsOfService/sidebarNav";
import TermsOfService from "../pages/termsOfService";
const TermsOfServiceLayout = () => (
  <Box display="flex" flexDirection="column" width="100%" height="100vh" bgcolor="var(--bg-secondary)" justifyContent={"space-between"}>
    <Header />
    <Box sx={{ containerType: "inline-size" }} display={"flex"} flexGrow={1} overflow={"auto"}>
      <SidebarNav />
      <TermsOfService />
    </Box>
    <Footer />
  </Box>
);

export default TermsOfServiceLayout;
