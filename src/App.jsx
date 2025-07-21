import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ViewPets from "./pages/ViewPets";
import PetProfileForm from "./pages/PetProfileForm";
import Dashboard from "./pages/Dashboard";
import PetDetails from "./pages/PetDetails";
import ActivityForm from "./pages/ActivityForm";
import AppointmentForm from "./pages/AppointmentForm";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectionRoutes from "./hooks/ProtectionRoutes";
import About from "./pages/About";
import AdminAllUser from "./pages/admin/AdminAllUser";
import AdminPets from "./pages/admin/AdminPets";
import AdminAppointment from "./pages/admin/AdminAppointment";
import Layout from "./pages/admin/Layout";

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className="min-h-screen bg-light dark:bg-zinc-800 text-gray-900 dark:text-white
     transition-colors duration-300"
    >
      <div className="fixed w-full z-50 shadow-md">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view-pets" element={<ViewPets />} />
          <Route path="/pets/pets-details/:id" element={<PetDetails />} />
          <Route path="/pets/activities/from" element={<ActivityForm />} />

          <Route path="/pets/appointments/form" element={<AppointmentForm />} />
          <Route path="/add-pets" element={<PetProfileForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin */}
          <Route path="/admin/*" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminAllUser />} />
            <Route path="pets" element={<AdminPets />} />
            <Route path="appointments" element={<AdminAppointment />} />
          </Route>
        </Routes>
      </div>

      {!(location.pathname === "/signup" || location.pathname === "/login") && (
        <Footer />
      )}
    </div>
  );
}

export default App;
