import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, Zoom } from "@mui/material";
import PasswordProtection from "./components/PasswordProtection";
import HomeLayout from "./layout/landingPage";
import TermsOfServiceLayout from "./layout/termsOfService";
import NotFound from "./pages/notFound";
import ScrollToTop from "./components/scrollToTop";
import Homepage from "./pages/home";
import Insights from "./pages/insights";
import Governance from "./pages/governance";
import Partners from "./pages/partners";
import AboutPage from "./pages/about";
import Campaign from "./pages/campaign";
import HospitalPartner from "./pages/eachPartners/hospitals";
import NursingAndLivingPartner from "./pages/eachPartners/nursingAndLiving";
import DoctorsAndSpecialists from "./pages/eachPartners/doctorsAndSpecialists";
import ClinicsAndDiagnostic from "./pages/eachPartners/clinicsAndDiagnostic";
import HealthPlansAndTPA from "./pages/eachPartners/healthPlansAndTPA";
import ConsultantsAndWellness from "./pages/eachPartners/consultantsAndWellness";
import AdvocacyAndNGOs from "./pages/eachPartners/advocacyAndNGOs";
import MedicalTourism from "./pages/eachPartners/tourismAndConcierge";
import DoctorsPage from "./pages/doctors";
import DoctorProfile from "./components/doctors/doctorProfile";
import { TermsOfService } from "./pages/privacy";
function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PasswordProtection password="Continuia123">
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Homepage />} />
            <Route path="insights" element={<Insights />} />
            <Route path="governance" element={<Governance />} />
            <Route path="/partners">
              <Route index element={<Partners />} />
              <Route path="hospitals" element={<HospitalPartner />} />
              <Route path="nursing-and-living" element={<NursingAndLivingPartner />} />
              <Route path="doctors-and-specialists" element={<DoctorsAndSpecialists />} />
              <Route path="clinics-diagnostics" element={<ClinicsAndDiagnostic />} />
              <Route path="health-plans-tpas" element={<HealthPlansAndTPA />} />
              <Route path="benefit-consultants" element={<ConsultantsAndWellness />} />
              <Route path="advocacy-ngos" element={<AdvocacyAndNGOs />} />
              <Route path="medical-tourism" element={<MedicalTourism />} />
            </Route>
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="doctorProfile/:id" element={<DoctorProfile />} />

            <Route path="about" element={<AboutPage />} />
            <Route path="cxa-globallaunch-c1a7e3d" element={<Campaign />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/privacy" element={<TermsOfServiceLayout />}>
            <Route index element={<TermsOfService />} />
          </Route>

          {/* Unknown routes nagivated to not-found */}
        </Routes>

        {/* Floating Scroll-to-Top Button */}
        <Zoom in={showButton}>
          <Fab
            color="primary"
            size="medium"
            onClick={scrollToTop}
            aria-label="scroll back to top"
            sx={{
              position: "fixed",
              bottom: { xs: 28, sm: 100 },
              right: { xs: 20, sm: 30 },
              zIndex: 1700,
              boxShadow: "var(--shadow-lg)",
              bgcolor: "var(--primary-600)",
              color: "var(--text-inverse)",
              "&:hover": { bgcolor: "var(--primary-700)" },
              transition: "background 0.2s",
            }}
          >
            <KeyboardArrowUpIcon fontSize="large" />
          </Fab>
        </Zoom>
      </Router>
    </PasswordProtection>
  );
}

export default App;
