import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/landingPage";
import NotFound from "./pages/notFound";
import ScrollToTop from "./components/scrollToTop";
import Homepage from "./pages/home";
import ForPatients from "./pages/insights";
import ForDoctors from "./pages/governance";
import Partners from "./pages/partners";
import AboutPage from "./pages/about";
import Campaign from "./pages/campaign";
import HospitalPartner from "./pages/eachPartners/hospitals";
import NursingAndLivingPartner from "./pages/eachPartners/nursingAndLiving";
import DoctorsAndSpecialists from "./pages/eachPartners/doctorsAndSpecialists";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Homepage />} />
          <Route path="patients" element={<ForPatients />} />
          <Route path="doctors" element={<ForDoctors />} />
          <Route path="/partners">
            <Route index element={<Partners />} />
            <Route path="hospitals" element={<HospitalPartner />} />
            <Route path="nursing-and-living" element={<NursingAndLivingPartner />} />
            <Route path="doctors-and-specialists" element={<DoctorsAndSpecialists />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="cxa-globallaunch-c1a7e3d" element={<Campaign />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Unknown routes nagivated to not-found */}
      </Routes>
    </Router>
  );
}

export default App;
