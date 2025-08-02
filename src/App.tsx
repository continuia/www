import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeLayout from "./layout/landingPage";
import NotFound from "./pages/notFound";
import LandingPage from "./pages/landingPage";
import ForPatients from "./layout/forPatients";
import ForDoctors from "./layout/forDoctors";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="patients" element={<ForPatients />} />
          <Route path="doctors" element={<ForDoctors />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>

        {/* Unknown routes nagivated to not-found */}
        <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
    </Router>
  );
}

export default App;
