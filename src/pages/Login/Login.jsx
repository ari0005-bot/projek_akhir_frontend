import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user = null;

      try {
        const { data } = await getUsers();
        user = data.find((u) => u.email === email && u.password === password);
      } catch (apiError) {
        console.error("API Error, using localStorage:", apiError);
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        user = users.find((u) => u.email === email && u.password === password);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        const pendingEvent = localStorage.getItem("pendingEvent");
        if (pendingEvent) {
          localStorage.setItem("selectedEvent", pendingEvent);
          localStorage.removeItem("pendingEvent");
        }

        navigate("/dashboard");
      } else {
        alert("Email atau password salah!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>ActivistHub</h2>
          <p>Masuk Untuk Mulai Beraksi</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="zoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-login"
              disabled={loading}
              onTouchStart={(e) => {
                e.preventDefault();
              }}
            >
              {loading ? "Mengecek..." : "Masuk"}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Belum punya akun?{" "}
            <a href="/register" className="register-link">
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
