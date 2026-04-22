import "./App.css";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import MyFooter from "./components/MyFooter/MyFooter";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import OrganizDashboard from "./pages/OrganizDashboard/OrganizDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import About from "./pages/About/About";
import Impact from "./pages/Impact/Impact";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import Guide from "./pages/Guide/Guide";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import Videos from "./pages/Videos/Videos";
import Messages from "./pages/Messages/Messages";
import UserMessages from "./pages/UserMessages/UserMessages";

function App() {
  return (
    <>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<OrganizDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/about" element={<About />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/user-messages" element={<UserMessages />} />
      </Routes>

      <MyFooter />
    </>
  );
}

export default App;
