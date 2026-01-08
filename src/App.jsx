import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorsManagement from "./pages/DoctorsManagement";
import ClinicsManagement from "./pages/ClinicsManagement";
import HospitalsManagement from "./pages/HospitalsManagement";
import DiagnosticsManagement from "./pages/DiagnosticsManagement";
import SuccessStoriesManagement from "./pages/SuccessStoriesManagement";
import BlogsManagement from "./pages/BlogsManagement";


function App() {
  return (
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/doctors" element={<DoctorsManagement />} />
      <Route path="/clinics" element={<ClinicsManagement />} />
      <Route path="/hospitals" element={<HospitalsManagement />} />
      <Route path="/diagnostics" element={<DiagnosticsManagement />} />
      <Route path="/success-stories" element={<SuccessStoriesManagement />} />
      <Route path="/blogs" element={<BlogsManagement />} />
 
    </Routes>
  );
}

export default App;
