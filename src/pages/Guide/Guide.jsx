import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Guide.css";
import {
  FaUser,
  FaCalendarAlt,
  FaSearch,
  FaHandshake,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPlay,
  FaBook,
  FaUsers,
  FaHeart,
  FaClock,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";

const Guide = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedStep, setExpandedStep] = useState(null);

  const sections = [
    {
      id: "getting-started",
      title: "Memulai Perjalanan",
      icon: <FaRocket />,
      description: "Langkah pertama untuk bergabung dengan ActivistHub",
    },
    {
      id: "find-events",
      title: "Mencari Kegiatan",
      icon: <FaSearch />,
      description: "Cara menemukan kegiatan sosial yang tepat untuk Anda",
    },
    {
      id: "join-events",
      title: "Bergabung dengan Kegiatan",
      icon: <FaHandshake />,
      description: "Proses pendaftaran dan partisipasi dalam kegiatan",
    },
    {
      id: "organize-events",
      title: "Menyelenggarakan Kegiatan",
      icon: <FaCalendarAlt />,
      description: "Panduan lengkap untuk membuat dan mengelola event",
    },
    {
      id: "profile-management",
      title: "Mengelola Profil",
      icon: <FaUser />,
      description: "Tips untuk profil yang menarik dan efektif",
    },
    {
      id: "best-practices",
      title: "Praktik Terbaik",
      icon: <FaStar />,
      description: "Tips dan trik untuk pengalaman terbaik",
    },
  ];

  const gettingStartedSteps = [
    {
      step: 1,
      title: "Buat Akun",
      description: "Daftar sebagai relawan atau organizer",
      details: [
        "Klik tombol 'Daftar' di halaman utama",
        "Isi formulir pendaftaran dengan data yang valid",
        "Verifikasi email Anda",
        "Lengkapi profil dengan foto dan informasi",
      ],
      tips: "Gunakan email yang aktif dan password yang mudah diingat tapi aman",
    },
    {
      step: 2,
      title: "Verifikasi Identitas",
      description: "Proses verifikasi untuk keamanan akun",
      details: [
        "Upload foto KTP atau identitas lainnya",
        "Tunggu proses verifikasi (maksimal 2x24 jam)",
        "Notifikasi akan dikirim via email",
        "Akun Anda siap digunakan setelah verifikasi",
      ],
      tips: "Pastikan foto identitas jelas dan tidak blur",
    },
    {
      step: 3,
      title: "Lengkapi Profil",
      description: "Buat profil yang menarik dan lengkap",
      details: [
        "Tambahkan foto profil yang profesional",
        "Tulis bio yang menarik tentang diri Anda",
        "Pilih minat dan keahlian Anda",
        "Set preferensi lokasi dan kategori kegiatan",
      ],
      tips: "Profil lengkap meningkatkan kepercayaan organizer",
    },
  ];

  const findEventsSteps = [
    {
      step: 1,
      title: "Gunakan Fitur Pencarian",
      description: "Temukan kegiatan yang sesuai dengan minat Anda",
      details: [
        "Gunakan kata kunci yang relevan",
        "Filter berdasarkan kategori (Lingkungan, Pendidikan, dll)",
        "Atur jarak lokasi dari posisi Anda",
        "Pilih tanggal yang sesuai jadwal Anda",
      ],
      tips: "Gunakan filter kombinasi untuk hasil yang lebih spesifik",
    },
    {
      step: 2,
      title: "Baca Detail Kegiatan",
      description: "Pahami informasi lengkap sebelum mendaftar",
      details: [
        "Periksa tanggal dan lokasi kegiatan",
        "Baca deskripsi dan tujuan kegiatan",
        "Lihat persyaratan yang dibutuhkan",
        "Perhatikan kuota peserta yang tersedia",
      ],
      tips: "Pastikan Anda memenuhi semua persyaratan sebelum mendaftar",
    },
    {
      step: 3,
      title: "Simpan Kegiatan Favorit",
      description: "Bookmark kegiatan yang menarik untuk nanti",
      details: [
        "Klik tombol hati untuk menyimpan favorit",
        "Akses favorit dari dashboard",
        "Dapatkan notifikasi perubahan kegiatan",
        "Bagikan kegiatan ke teman-teman",
      ],
      tips: "Simpan kegiatan yang Anda minati untuk tidak ketinggalan",
    },
  ];

  const joinEventsSteps = [
    {
      step: 1,
      title: "Daftar sebagai Relawan",
      description: "Proses pendaftaran untuk kegiatan yang dipilih",
      details: [
        "Klik tombol 'Daftar' pada halaman kegiatan",
        "Isi formulir pendaftaran singkat",
        "Tulis motivasi mengapa ingin ikut",
        "Konfirmasi kehadiran Anda",
      ],
      tips: "Tulis motivasi yang jujur dan singkat",
    },
    {
      step: 2,
      title: "Tunggu Konfirmasi",
      description: "Proses review oleh penyelenggara kegiatan",
      details: [
        "Organizer akan review aplikasi Anda",
        "Proses review maksimal 3 hari kerja",
        "Email konfirmasi akan dikirim",
        "Status dapat dicek di dashboard",
      ],
      tips: "Pastikan email Anda aktif untuk notifikasi",
    },
    {
      step: 3,
      title: "Persiapkan Diri",
      description: "Persiapan sebelum hari H kegiatan",
      details: [
        "Baca instruksi dari organizer",
        "Siapkan pakaian dan perlengkapan",
        "Konfirmasi kehadiran kembali",
        "Catat lokasi dan waktu kegiatan",
      ],
      tips: "Hubungi organizer jika ada pertanyaan",
    },
    {
      step: 4,
      title: "Ikuti Kegiatan",
      description: "Partisipasi aktif saat hari H",
      details: [
        "Datang tepat waktu",
        "Ikuti instruksi penyelenggara",
        "Bantu sesama relawan",
        "Dokumentasikan pengalaman Anda",
      ],
      tips: "Bawa kamera untuk dokumentasi pribadi",
    },
  ];

  const organizeEventsSteps = [
    {
      step: 1,
      title: "Buat Event Baru",
      description: "Mulai dengan membuat kegiatan sosial",
      details: [
        "Klik 'Buat Event' di dashboard",
        "Isi informasi dasar kegiatan",
        "Upload foto yang menarik",
        "Set tanggal dan lokasi kegiatan",
      ],
      tips: "Gunakan foto berkualitas tinggi untuk menarik relawan",
    },
    {
      step: 2,
      title: "Detail Kegiatan",
      description: "Lengkapi informasi penting kegiatan",
      details: [
        "Tulis deskripsi yang jelas dan menarik",
        "Tentukan kuota maksimal peserta",
        "Set persyaratan untuk relawan",
        "Tentukan kebutuhan logistik",
      ],
      tips: "Deskripsi yang detail meningkatkan kepercayaan relawan",
    },
    {
      step: 3,
      title: "Promosikan Event",
      description: "Sebarkan informasi kegiatan Anda",
      details: [
        "Bagikan ke media sosial",
        "Undang relawan dari komunitas",
        "Gunakan fitur promosi ActivistHub",
        "Follow up dengan relawan yang mendaftar",
      ],
      tips: "Promosi lebih awal untuk hasil maksimal",
    },
    {
      step: 4,
      title: "Kelola Event",
      description: "Pantau dan kelola kegiatan berjalan",
      details: [
        "Review aplikasi relawan",
        "Kirim informasi update ke relawan",
        "Prepare logistik hari H",
        "Dokumentasikan kegiatan",
      ],
      tips: "Komunikasi yang baik kunci keberhasilan event",
    },
  ];

  const profileManagementSteps = [
    {
      step: 1,
      title: "Foto Profil",
      description: "Pilih foto yang representatif",
      details: [
        "Gunakan foto wajah yang jelas",
        "Background yang bersih dan netral",
        "Ekspresi yang friendly dan approachable",
        "Format file JPG atau PNG",
      ],
      tips: "Foto profesional meningkatkan kepercayaan",
    },
    {
      step: 2,
      title: "Bio dan Deskripsi",
      description: "Tuliskan deskripsi diri yang menarik",
      details: [
        "Jelaskan minat sosial Anda",
        "Sebutkan pengalaman relawan",
        "Tulis skills yang Anda miliki",
        "Sertakan motivasi bergabung",
      ],
      tips: "Bio singkat tapi padat lebih efektif",
    },
    {
      step: 3,
      title: "Minat dan Keahlian",
      description: "Pilih kategori yang sesuai",
      details: [
        "Pilih minimal 3 kategori minat",
        "Tandai keahlian yang Anda miliki",
        "Set preferensi lokasi",
        "Update availability Anda",
      ],
      tips: "Minat yang spesifik membantu matching event",
    },
  ];

  const bestPracticesSteps = [
    {
      step: 1,
      title: "Komunikasi yang Baik",
      description: "Pentingnya komunikasi dalam aktivitas sosial",
      details: [
        "Respons pesan dengan cepat",
        "Gunakan bahasa yang sopan",
        "Jelas dalam berkoordinasi",
        "Update perubahan rencana",
      ],
      tips: "Komunikasi proaktif mencegah misunderstanding",
    },
    {
      step: 2,
      title: "Time Management",
      description: "Kelola waktu dengan efektif",
      details: [
        "Datang tepat waktu",
        "Siapkan jadwal kegiatan",
        "Prioritaskan komitmen",
        "Berikan notifikasi jika terlambat",
      ],
      tips: "Disiplin waktu menunjukkan profesionalisme",
    },
    {
      step: 3,
      title: "Teamwork",
      description: "Kerja sama dengan tim yang baik",
      details: [
        "Bantu sesama relawan",
        "Ikuti instruksi leader",
        "Kontribusi aktif dalam diskusi",
        "Support tim dalam kesulitan",
      ],
      tips: "Teamwork yang baik hasilkan impact maksimal",
    },
    {
      step: 4,
      title: "Dokumentasi",
      description: "Catat pengalaman berharga Anda",
      details: [
        "Ambil foto kegiatan",
        "Tulis refleksi pascakegiatan",
        "Update progress di profil",
        "Bagikan cerita inspiratif",
      ],
      tips: "Dokumentasi membantu tracking impact personal",
    },
  ];

  const getStepsContent = () => {
    switch (activeSection) {
      case "getting-started":
        return gettingStartedSteps;
      case "find-events":
        return findEventsSteps;
      case "join-events":
        return joinEventsSteps;
      case "organize-events":
        return organizeEventsSteps;
      case "profile-management":
        return profileManagementSteps;
      case "best-practices":
        return bestPracticesSteps;
      default:
        return gettingStartedSteps;
    }
  };

  const toggleStep = (stepNumber) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="guide-container">
      <section className="guide-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <FaBook />
            </div>
            <h1>Panduan Lengkap ActivistHub</h1>
            <p>
              Petunjuk langkah demi langkah untuk memaksimalkan pengalaman Anda
              dalam gerakan sosial
            </p>
            <div className="hero-stats">
              <div className="stat">
                <FaUsers />
                <span>50,000+ Relawan</span>
              </div>
              <div className="stat">
                <FaCalendarAlt />
                <span>1,000+ Kegiatan</span>
              </div>
              <div className="stat">
                <FaHeart />
                <span>100% Impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="guide-navigation">
        <div className="container">
          <div className="nav-grid">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-card ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="nav-icon">{section.icon}</div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <FaArrowRight className="nav-arrow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-content">
        <div className="container">
          <div className="content-header">
            <h2>{sections.find((s) => s.id === activeSection)?.title}</h2>
            <p>{sections.find((s) => s.id === activeSection)?.description}</p>
          </div>

          <div className="steps-container">
            {getStepsContent().map((step) => (
              <div key={step.step} className="step-card">
                <div
                  className="step-header"
                  onClick={() => toggleStep(step.step)}
                >
                  <div className="step-number">
                    <FaCheckCircle />
                    <span>{step.step}</span>
                  </div>
                  <div className="step-info">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <div className="step-toggle">
                    <FaPlay
                      className={`toggle-icon ${expandedStep === step.step ? "expanded" : ""}`}
                    />
                  </div>
                </div>

                {expandedStep === step.step && (
                  <div className="step-details">
                    <div className="step-list">
                      <h4>Langkah-langkah:</h4>
                      <ul>
                        {step.details.map((detail, index) => (
                          <li key={index}>
                            <FaCheckCircle className="check-icon" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="step-tips">
                      <div className="tip-header">
                        <FaLightbulb />
                        <h4>Tips Pro:</h4>
                      </div>
                      <p>{step.tips}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="video-tutorial-section">
        <div className="container">
          <div className="section-header">
            <h2>Video Tutorial</h2>
            <p>
              Pelajari cara menggunakan ActivistHub melalui video panduan kami
            </p>
          </div>
          <div className="video-grid">
            <div className="video-card">
              <div className="video-thumbnail">
                <FaPlay className="play-icon" />
              </div>
              <h3>Cara Daftar Akun</h3>
              <p>Panduan lengkap pendaftaran akun relawan</p>
              <span>5 menit</span>
            </div>
            <div className="video-card">
              <div className="video-thumbnail">
                <FaPlay className="play-icon" />
              </div>
              <h3>Mencari Kegiatan</h3>
              <p>Tips menemukan kegiatan yang tepat</p>
              <span>7 menit</span>
            </div>
            <div className="video-card">
              <div className="video-thumbnail">
                <FaPlay className="play-icon" />
              </div>
              <h3>Membuat Event</h3>
              <p>Panduan untuk organizer pemula</p>
              <span>10 menit</span>
            </div>
            <div className="video-card">
              <div className="video-thumbnail">
                <FaPlay className="play-icon" />
              </div>
              <h3>Tips Best Practices</h3>
              <p>Praktik terbaik untuk relawan</p>
              <span>8 menit</span>
            </div>
          </div>
        </div>
      </section>

      <section className="guide-faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Pertanyaan Umum</h2>
            <p>Jawaban untuk pertanyaan yang sering diajukan</p>
          </div>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <FaQuestionCircle />
              </div>
              <h3>Bagaimana cara mengubah password?</h3>
              <p>
                Masuk ke menu Pengaturan Keamanan Ubah Password. Masukkan
                password lama dan baru Anda.
              </p>
            </div>
            <div className="faq-card">
              <div className="faq-icon">
                <FaQuestionCircle />
              </div>
              <h3>Bagaimana cara membatalkan pendaftaran?</h3>
              <p>
                Hubungi organizer langsung melalui chat atau email minimal 24
                jam sebelum kegiatan.
              </p>
            </div>
            <div className="faq-card">
              <div className="faq-icon">
                <FaQuestionCircle />
              </div>
              <h3>Bagaimana cara mendapatkan sertifikat?</h3>
              <p>
                Sertifikat otomatis diberikan setelah menyelesaikan kegiatan dan
                diisi oleh organizer.
              </p>
            </div>
            <div className="faq-card">
              <div className="faq-icon">
                <FaExclamationTriangle />
              </div>
              <h3>Bagaimana jika ada masalah teknis?</h3>
              <p>
                Hubungi tech support melalui live chat atau email
                support@activisthub.id
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="guide-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Siap Memulai Perjalanan Sosial Anda?</h2>
            <p>
              Bergabunglah dengan ribuan relawan yang sudah membuat dampak nyata
            </p>
            <div className="cta-buttons">
              <Link to="/dashboard" className="btn-primary">
                Mulai Sekarang
              </Link>
              <Link to="/contact" className="btn-secondary">
                Butuh Bantuan?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;
