import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "./layout/landingPage";
import NotFound from "./pages/notFound";
import LandingPage from "./pages/home";
import ForPatients from "./pages/insights";
import ForDoctors from "./pages/governance";
import Partners from "./pages/partners";
import AboutPage from "./pages/about";
import Campaign from "./pages/campaign";
import ScrollToTop from "./components/scrollToTop";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="patients" element={<ForPatients />} />
          <Route path="doctors" element={<ForDoctors />} />
          <Route path="partners" element={<Partners />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cxa-globallaunch-c1a7e3d" element={<Campaign />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>

        {/* Unknown routes nagivated to not-found */}
        <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
    </Router>
  );
}

export default App;
