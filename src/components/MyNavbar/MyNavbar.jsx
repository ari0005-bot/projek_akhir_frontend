import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./MyNavbar.css";

const MyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        ActivistHub
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Beranda
        </Link>
        <Link to="/about" className="nav-link">
          Tentang Kami
        </Link>
        <Link to="/impact" className="nav-link">
          Dampak
        </Link>
        <Link to="/faq" className="nav-link">
          FAQ
        </Link>
        <Link to="/contact" className="nav-link">
          Kontak
        </Link>
        
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
            {user.email && (
              <img
                src={`https://i.pravatar.cc/40?u=${user.email}`}
                alt="profil"
                className="nav-avatar"
                title={user.name || user.email}
              />
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Masuk
            </Link>
            <Link to="/register" className="btn-login">
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default MyNavbar;
