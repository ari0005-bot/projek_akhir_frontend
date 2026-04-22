import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Impact.css";
import { FaUserTie } from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";
import { GiHeavyCollar } from "react-icons/gi";
import { FaTree } from "react-icons/fa6";
import { IoEarthSharp } from "react-icons/io5";
import { MdMoreTime } from "react-icons/md";
import { FaUserCircle, FaUserAstronaut } from "react-icons/fa";

const Impact = () => {
  const navigate = useNavigate();
  const [animatedNumbers, setAnimatedNumbers] = useState({
    volunteers: 0,
    events: 0,
    trash: 0,
    trees: 0,
    villages: 0,
    hours: 0,
  });

  const checkUserLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  };

  const handleStartAction = () => {
    const user = checkUserLogin();
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const targetNumbers = {
    volunteers: 15420,
    events: 850,
    trash: 1200,
    trees: 500,
    villages: 10,
    hours: 45000,
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateNumbers = () => {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedNumbers({
          volunteers: Math.floor(targetNumbers.volunteers * progress),
          events: Math.floor(targetNumbers.events * progress),
          trash: Math.floor(targetNumbers.trash * progress),
          trees: Math.floor(targetNumbers.trees * progress),
          villages: Math.floor(targetNumbers.villages * progress),
          hours: Math.floor(targetNumbers.hours * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timer);
  }, []);

  const impactCategories = [
    {
      icon: "https://cdn.antaranews.com/cache/1200x800/2023/10/17/ilustrasi-menjaga-lingkungan.jpg",
      title: "Lingkungan",
      description: "Aksi bersih-bersih, penanaman pohon, dan konservasi alam",
      percentage: 45,
      color: "#22c55e",
    },
    {
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZcqapskGvIMu7jDRVVi6VgjdSkVyNmzqOA&s",
      title: "Pendidikan",
      description: "Mengajar anak-anak, beasiswa, dan pelatihan skill",
      percentage: 30,
      color: "#0ea5e9",
    },
    {
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEBL03889BP22lLqu4iPfGPPIOeozrWbHH0A&s",
      title: "Kesehatan",
      description: "Donor darah, cek kesehatan gratis, dan edukasi kesehatan",
      percentage: 15,
      color: "#f59e0b",
    },
    {
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80BbEPSBjBhNIGnAVnZN6PoflJ-xitI7lPg&s",
      title: "Sosial",
      description: "Bantuan bencana, panti jompo, dan pemberdayaan masyarakat",
      percentage: 10,
      color: "#8b5cf6",
    },
  ];

  const recentImpacts = [
    {
      date: "15 Maret 2025",
      title: "Beach Cleanup Pantai Anyer",
      location: "Banten",
      impact: "500 kg sampah terangkat",
      volunteers: 120,
      image:
        "https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Takengon/o/1769667794785-mlmtaa2gurqullh/lyjvu9acl6qqgyz.jpeg",
    },
    {
      date: "10 Maret 2025",
      title: "Gerakan 1000 Pohon",
      location: "Jawa Tengah",
      impact: "1,000 pohon ditanam",
      volunteers: 250,
      image:
        "https://image-korankaltim.sgp1.cdn.digitaloceanspaces.com/seputarfakta/news/photo/da23eeb4-17e8-4981-8656-5d59ed87da3d.jpg",
    },
    {
      date: "5 Maret 2025",
      title: "Bakti Sosial Panti Jompo",
      location: "Jakarta",
      impact: "200 lansia terbantu",
      volunteers: 45,
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiVAvomd1U4Rgk6iqCvMahwhlhRKFPpSGBHzpqO68_jLI4obKTsyTTALtppdPnFixBRvDNV7TXs4wN9EZIn22uQO5ApqXnWiJOGtn7Yyi36XrCCZDc_DsYHYTmIW1tv20COCm-Kt32TA/s1600/2017-12-17-PHOTO-00005657.jpg",
    },
    {
      date: "28 Februari 2025",
      title: "Donor Darah Massal",
      location: "Surabaya",
      impact: "300 kantong darah",
      volunteers: 180,
      image:
        "https://jtvmadiun.com/wp-content/uploads/2025/06/KOTA-MADIUN-HARI-DONOR-DARAH-SEDUNIA-KUL.mp4_000054080.jpg",
    },
  ];

  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Dampak Nyata Kita</h1>
            <p>
              Setiap aksi kecil menciptakan perubahan besar. Lihat bagaimana
              gerakan kita menginspirasi perubahan positif di seluruh Indonesia.
            </p>
          </div>
        </div>
      </section>

      <section className="main-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FaUserTie />
              </div>
              <div className="stat-number">
                {animatedNumbers.volunteers.toLocaleString("id-ID")}+
              </div>
              <div className="stat-label">Relawan Terdaftar</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <TbActivityHeartbeat />
              </div>
              <div className="stat-number">
                {animatedNumbers.events.toLocaleString("id-ID")}+
              </div>
              <div className="stat-label">Kegiatan Dilaksanakan</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <GiHeavyCollar />
              </div>
              <div className="stat-number">
                {animatedNumbers.trash.toLocaleString("id-ID")} Kg
              </div>
              <div className="stat-label">Sampah Terangkat</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaTree />
              </div>
              <div className="stat-number">
                {animatedNumbers.trees.toLocaleString("id-ID")}+
              </div>
              <div className="stat-label">Pohon Ditanam</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <IoEarthSharp />
              </div>
              <div className="stat-number">{animatedNumbers.villages}+</div>
              <div className="stat-label">Desa Terbantu</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <MdMoreTime />
              </div>
              <div className="stat-number">
                {animatedNumbers.hours.toLocaleString("id-ID")}+
              </div>
              <div className="stat-label">Jam Relawan</div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Kategori Dampak</h2>
            <p>Sebaran dampak positif kita berdasarkan berbagai sektor</p>
          </div>
          <div className="categories-grid">
            {impactCategories.map((category, index) => (
              <div key={index} className="category-card">
                <div
                  className="category-icon"
                  style={{ color: category.color }}
                >
                  {category.icon.startsWith("http") ? (
                    <img
                      src={category.icon}
                      alt={category.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    category.icon
                  )}
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                    }}
                  ></div>
                </div>
                <span className="percentage">{category.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recent-impacts">
        <div className="container">
          <div className="section-header">
            <h2>Dampak Terkini</h2>
            <p>Kegiatan-kegiatan yang baru saja kita laksanakan</p>
          </div>
          <div className="impacts-timeline">
            {recentImpacts.map((impact, index) => (
              <div key={index} className="impact-item">
                <div className="impact-date">
                  <div className="date-badge">
                    {impact.date.split(" ")[0]}
                    <span>{impact.date.split(" ")[1]}</span>
                  </div>
                </div>
                <div className="impact-content">
                  <div className="impact-image">
                    {impact.image.startsWith("http") ? (
                      <img
                        src={impact.image}
                        alt={impact.title}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : (
                      <span>{impact.image}</span>
                    )}
                  </div>
                  <div className="impact-info">
                    <h3>{impact.title}</h3>
                    <div className="impact-meta">
                      <span className="location">📍 {impact.location}</span>
                      <span className="volunteers">
                        👥 {impact.volunteers} relawan
                      </span>
                    </div>
                    <p className="impact-result">{impact.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Cerita dari Relawan</h2>
            <p>Pengalaman inspiratif dari mereka yang sudah beraksi</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Bergabung dengan ActivistHub mengubah hidup saya. Saya tidak
                  hanya membantu orang lain, tapi juga menemukan tujuan hidup
                  yang sebenarnya."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <FaUserCircle />
                </div>
                <div className="author-info">
                  <h4>Joko Ireng</h4>
                  <span>Relawan, Jakarta</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Platform ini memudahkan saya menemukan kegiatan sosial yang
                  sesuai dengan passion. Sangat recommended untuk anak muda yang
                  ingin berkontribusi!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <FaUserCircle />
                </div>
                <div className="author-info">
                  <h4>Maman Boled</h4>
                  <span>Organizer, Surabaya</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Dulu saya bingung mau mulai dari mana. Sekarang dengan
                  ActivistHub, saya bisa ikut berbagai aksi sosial dan bertemu
                  banyak teman baru."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <FaUserCircle />
                </div>
                <div className="author-info">
                  <h4>Nyai Iah</h4>
                  <span>Relawan, Bandung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Bergabunglah dengan Gerakan Ini</h2>
            <p>
              Jadilah bagian dari statistik inspiratif ini. Mulailah
              perjalananmu sebagai agent of change hari ini!
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={handleStartAction}>
                Mulai Beraksi
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
