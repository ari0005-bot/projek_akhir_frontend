import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/api";
import "./LandingPage.css";
import { MdVolunteerActivism } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";
import { GiImpactPoint } from "react-icons/gi";
import { FaUserPlus, FaSignInAlt, FaHandsHelping } from "react-icons/fa";
const LandingPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const checkUserLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  };

  const handleStartNow = () => {
    const user = checkUserLogin();
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let apiEvents = [];
        let localEvents = [];

        try {
          const { data } = await getEvents();
          apiEvents = data;
        } catch (apiError) {
          console.warn("API Error, using localStorage only:", apiError);
        }

        localEvents = JSON.parse(localStorage.getItem("events") || "[]");

        const allEvents = [...apiEvents];

        if (apiEvents.length === 0) {
          localEvents.forEach((localEvent) => {
            if (!allEvents.find((event) => event.id === localEvent.id)) {
              allEvents.push(localEvent);
            }
          });
        }

        const validEvents = allEvents.filter((event) => {
          if (!event || typeof event !== "object") return false;
          return (
            event.id &&
            event.title &&
            event.image &&
            event.category &&
            event.location
          );
        });
        setEvents(validEvents);
        setDisplayEvents(validEvents.slice(0, 6));
      } catch (error) {
        console.error("Gagal mengambil data events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const handleViewDetail = (event) => {
    if (isLoggedIn()) {
      localStorage.setItem("selectedEvent", JSON.stringify(event));
      alert(`Menuju detail event: ${event.title}`);
      navigate("/dashboard");
    } else {
      localStorage.setItem("pendingEvent", JSON.stringify(event));
      alert("Silakan login terlebih dahulu untuk melihat detail event");
      navigate("/login");
    }
  };

  const handleMulaiBeraksi = () => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleJourneyStep = (step) => {
    if (step === 1) {
      navigate("/register");
    } else if (step === 2) {
      if (isLoggedIn()) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } else if (step === 3) {
      if (isLoggedIn()) {
        navigate("/dashboard");
      } else {
        navigate("/register");
      }
    }
  };
  return (
    <div className="landing-wrapper">
      <div className="animated-background">
        <div className="floating-shapes">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="shape"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <div className="logo-animation">
              <div className="logo-circle"></div>
              <div className="logo-text">AH</div>
            </div>
          </div>
          <h1
            style={{
              transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`,
            }}
          >
            Activist<span className="highlight">Hub</span>
          </h1>
          <p>Temukan dan Bergabung dengan Aksi Sosial di Sekitarmu</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleMulaiBeraksi}>
              Mulai Beraksi
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/register")}
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </header>

      <section className="welcome-section">
        <div className="container">
          <div className="welcome-header">
            <h2>Bersama Kita Bisa Membuat Perubahan</h2>
            <p>
              ActivistHub adalah platform revolusioner yang menghubungkan
              volunteer dengan kegiatan sosial yang berdampak positif
            </p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="welcome-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <MdVolunteerActivism />
              </div>
              <span className="stat-number">1000+</span>
              <span className="stat-label">Volunteer</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <LiaUsersSolid />
              </div>
              <span className="stat-number">50+</span>
              <span className="stat-label">Kegiatan</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <GiImpactPoint />
              </div>
              <span className="stat-number">10K+</span>
              <span className="stat-label">Dampak</span>
            </div>
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="container">
          <div className="journey-header">
            <h2>Langkah Mudah Untuk Beraksi</h2>
            <p>
              Ikuti 3 langkah sederhana ini dan mulailah perjalananmu sebagai
              agent of change
            </p>
          </div>
          <div className="journey-steps">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Daftar Akun</h3>
                <p>Buat akun gratis dan lengkapi profil personal kamu</p>
                <button
                  className="step-btn"
                  onClick={() => handleJourneyStep(1)}
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Login & Explore</h3>
                <p>Masuk ke akun dan jelajahi berbagai kegiatan sosial</p>
                <button
                  className="step-btn"
                  onClick={() => handleJourneyStep(2)}
                >
                  Masuk Sekarang
                </button>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Bergabung & Beraksi</h3>
                <p>Pilih kegiatan yang sesuai dan mulai berdampak</p>
                <button
                  className="step-btn"
                  onClick={() => handleJourneyStep(3)}
                >
                  Lihat Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Waktunya Untuk Beraksi!</h2>
            <p>
              Bergabunglah dengan gerakan sosial terbesar dan raih kesempatan
              untuk menciptakan dampak nyata di masyarakat
            </p>
            <div className="cta-buttons">
              <button
                className="btn-primary"
                onClick={handleStartNow}
              >
                Mulai Sekarang
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/login")}
              >
                Sudah Punya Akun
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="events-header-section">
        <div className="container">
          <div className="events-header">
            <h2>Temukan Aksi Sosial Yang Menginspirasi</h2>
            <p>
              Jelajahi berbagai kegiatan yang sedang berlangsung dan temukan
              kesempatan untuk berkontribusi sesuai passion kamu
            </p>
          </div>
        </div>
      </section>

      <main className="content-container">
        <div className="container">
          <div className="event-grid">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Memuat data events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="no-events">
                <div className="no-events-icon">📅</div>
                <p>Belum ada events tersedia</p>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/create-event")}
                >
                  Buat Event Pertama
                </button>
              </div>
            ) : (
              displayEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="event-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateY(${scrollY * 0.1 * (index % 3)}px)`,
                  }}
                >
                  <div className="event-image-container">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/400/250?${event.id}`;
                      }}
                    />
                    <span className="category-badge">{event.category}</span>
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-body">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-meta">
                      <span className="event-location">
                        📍 {event.location}
                      </span>
                    </div>
                    <button
                      className="btn-join"
                      onClick={() => handleViewDetail(event)}
                    >
                      {isLoggedIn() ? "Lihat Detail" : "Daftar Sekarang"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
