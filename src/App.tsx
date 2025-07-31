import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import HomeLayout from "./layout/landingPage";
import NotFound from "./pages/notFound";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>

        {/* Unknown routes nagivated to not-found */}
        <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
    </Router>
  );
}

export default App;
