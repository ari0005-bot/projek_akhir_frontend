import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { FcIdea } from "react-icons/fc";

const About = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const handleMulaiBeraksi = () => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Tentang ActivistHub</h1>
            <p>
              Platform revolusioner yang menghubungkan volunteer dengan kegiatan
              sosial berdampak positif di seluruh Indonesia
            </p>
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          <div className="section-header">
            <h2>Sejarah Kami</h2>
            <p>Perjalanan ActivistHub dari ide hingga gerakan nyata</p>
          </div>
          <div className="history-content">
            <div className="history-timeline">
              <div className="timeline-item">
                <div className="timeline-year">2026</div>
                <div className="timeline-content">
                  <h3>Awal Mula</h3>
                  <p>
                    Bermula dari tugas akhir mahasiswa PeTIK Depok yang melihat
                    kesenjangan antara antusiasme volunteer dengan informasi
                    kegiatan sosial yang terfragmentasi.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2026</div>
                <div className="timeline-content">
                  <h3>Pengembangan</h3>
                  <p>
                    Platform dikembangkan dengan fitur-fitur modern untuk
                    memudahkan pencarian dan partisipasi dalam kegiatan sosial.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2026</div>
                <div className="timeline-content">
                  <h3>Ekspansi</h3>
                  <p>
                    Menjangkau lebih dari 50 kota di Indonesia dengan ribuan
                    volunteer yang terdaftar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-mission-section">
        <div className="container">
          <div className="vm-grid">
            <div className="vm-card">
              <div className="vm-icon">
                <FcIdea />
              </div>
              <h3>Visi Kami</h3>
              <p>
                Menghubungkan 1 juta relawan di Indonesia untuk menciptakan
                dampak sosial yang positif dan berkelanjutan.
              </p>
            </div>
            <div className="vm-card">
              <div className="vm-icon">
                <FcIdea />
              </div>
              <h3>Misi Kami</h3>
              <ul>
                <li>Memudahkan akses informasi kegiatan sosial</li>
                <li>Meningkatkan partisipasi masyarakat dalam aksi sosial</li>
                <li>Memfasilitasi kolaborasi antar organisasi</li>
                <li>Membangun komunitas volunteer yang solid</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Tim Di Balik ActivistHub</h2>
            <p>Mahasiswa berdedikasi dari PeTIK Depok</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSlXwA68eSDiKYVjgETm-_09ceJv9CdvrNBg&s"
                  alt="Lead Developer"
                  className="team-member-photo"
                />
              </div>
              <h4>Lead Developer</h4>
              <p>Architect utama platform ActivistHub</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2fElaKiAOMToAUGeKYlXDg9_ubm2zpsazQ&s"
                  alt="UI/UX Designer"
                  className="team-member-photo"
                />
              </div>
              <h4>UI/UX Designer</h4>
              <p>Desain interface yang user-friendly</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4qx1XWjZGn0HJwnD8S9NIB0s-jOZ1JhxbLw&s"
                  alt="Backend Developer"
                  className="team-member-photo"
                />
              </div>
              <h4>Backend Developer</h4>
              <p>API dan database management</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinbe9vqQcs5FUW8OYLhxQLQRE57prU3otbg&s"
                  alt="Frontend"
                  className="team-member-photo"
                />
              </div>
              <h4>Community Manager</h4>
              <p>Hubungan dengan komunitas dan partner</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <img
                  src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png"
                  alt="Community Manager"
                  className="team-member-photo"
                />
              </div>
              <h4>Frontend Developer</h4>
              <p>UI implementation dan user interactions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="campus-section">
        <div className="container">
          <div className="section-header">
            <h2>Lingkungan PeTIK Depok</h2>
            <p>Tempat dimana ActivistHub dikembangkan dengan penuh dedikasi</p>
          </div>
          <div className="campus-content">
            <div className="campus-info">
              <h3>PeTIK Depok</h3>
              <p>
                Pesantren Teknologi Informasi dan Komunikasi Depok adalah
                pesantren modern yang fokus pada pengembangan teknologi untuk
                kepentingan sosial. Di sinilah ActivistHub lahir sebagai bukti
                bahwa teknologi bisa menjadi alat untuk perubahan sosial
                positif.
              </p>
              <div className="campus-stats">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Mahasiswa Aktif</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Program Studi</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Laboratorium</span>
                </div>
              </div>
            </div>
            <div className="campus-image">
              <img
                src="data:image/jpeg;base64,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"
                alt="Kampus PeTIK Depok"
                className="campus-photo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Bergabunglah dengan Gerakan Ini</h2>
            <p>
              Jadilah bagian dari perubahan positif yang kami ciptakan bersama
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={handleMulaiBeraksi}>
                Mulai Beraksi
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/contact")}
              >
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
