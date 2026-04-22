import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { getUsers, createUser } from "../../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "volunteer"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      const { data: users } = await getUsers();
      const existingUser = users.find((u) => u.email === formData.email);

      if (existingUser) {
        alert("Email sudah terdaftar!");
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        createdAt: new Date().toISOString(),
      };

      console.log("Mendaftarkan user:", newUser);

      try {
        const response = await createUser(newUser);
        console.log("Response dari API:", response.data);

        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } catch (error) {
        console.error("Register Error:", error);
        
        try {
          const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
          const existingUser = existingUsers.find((u) => u.email === formData.email);
          
          if (existingUser) {
            alert("Email sudah terdaftar!");
            setLoading(false);
            return;
          }
          
          existingUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(existingUsers));
          
          alert("Registrasi berhasil! Silakan login.");
          navigate("/login");
        } catch (localStorageError) {
          console.error("LocalStorage Error:", localStorageError);
          alert("Terjadi kesalahan saat menyimpan data.");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Fatal Error:", error);
      alert("Terjadi kesalahan yang tidak terduga.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>ActivistHub</h2>
            <p>Buat Akun Baru</p>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Konfirmasi Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="6"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Daftar Sebagai</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="role-select"
              >
                <option value="volunteer">Volunteer</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-register" 
                disabled={loading}
                onTouchStart={(e) => {
                  e.preventDefault();
                }}
              >
                {loading ? "Mendaftar..." : "Daftar Sekarang"}
              </button>
            </div>
          </form>

          <div className="register-footer">
            <p>
              Sudah punya akun?{" "}
              <a href="/login" className="login-link">
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
