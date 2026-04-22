import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";
import {
  FaQuestionCircle,
  FaHandsHelping,
  FaCalendarAlt,
  FaCog,
  FaEnvelope,
  FaComments,
  FaWhatsapp,
  FaBook,
  FaVideo,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const categories = [
    {
      id: "general",
      name: "Umum",
      icon: <FaQuestionCircle />,
      description: "Pertanyaan dasar tentang ActivistHub",
    },
    {
      id: "volunteer",
      name: "Relawan",
      icon: <FaHandsHelping />,
      description: "Informasi untuk para relawan",
    },
    {
      id: "organizer",
      name: "Organizer",
      icon: <FaCalendarAlt />,
      description: "Panduan untuk penyelenggara acara",
    },
    {
      id: "technical",
      name: "Teknis",
      icon: <FaCog />,
      description: "Bantuan teknis dan troubleshooting",
    },
  ];

  const faqData = {
    general: [
      {
        question: "Apa itu ActivistHub?",
        answer:
          "ActivistHub adalah platform digital yang menghubungkan volunteer dengan berbagai kegiatan sosial di seluruh Indonesia. Platform ini memudahkan pencarian, pendaftaran, dan pelacakan partisipasi dalam aksi-aksi sosial yang positif.",
      },
      {
        question: "Apakah menggunakan ActivistHub gratis?",
        answer:
          "Ya, ActivistHub sepenuhnya gratis untuk para volunteer. Tidak ada biaya pendaftaran atau biaya tersembunyi. Untuk organizer, tersedia fitur gratis dan premium sesuai kebutuhan.",
      },
      {
        question: "Bagaimana cara saya bergabung dengan ActivistHub?",
        answer:
          "Cukup klik tombol 'Daftar' di halaman utama, isi formulir pendaftaran dengan data diri Anda, verifikasi email, dan Anda sudah bisa mulai menjelajahi kegiatan sosial yang tersedia.",
      },
      {
        question: "Apakah data saya aman di ActivistHub?",
        answer:
          "Kami sangat serius dalam melindungi privasi Anda. Semua data pribadi dienkripsi dan kami tidak akan pernah membagikan informasi Anda kepada pihak ketiga tanpa izin Anda.",
      },
      {
        question: "Di mana saja ActivistHub tersedia?",
        answer:
          "Saat ini ActivistHub tersedia di lebih dari 50 kota di seluruh Indonesia dan terus berkembang. Kami berencana untuk ekspansi ke seluruh nusantara.",
      },
    ],
    volunteer: [
      {
        question: "Bagaimana cara mencari kegiatan sosial?",
        answer:
          "Setelah login, Anda bisa menggunakan fitur pencarian di halaman Events. Filter berdasarkan kategori, lokasi, atau tanggal untuk menemukan kegiatan yang sesuai dengan minat dan jadwal Anda.",
      },
      {
        question: "Apa saja persyaratan untuk menjadi relawan?",
        answer:
          "Persyaratan bervariasi tergantung jenis kegiatan. Umumnya Anda harus berusia minimal 17 tahun, sehat jasmani dan rohani, dan memiliki komitmen untuk mengikuti kegiatan hingga selesai.",
      },
      {
        question: "Bagaimana cara membatalkan pendaftaran?",
        answer:
          "Anda bisa membatalkan pendaftaran melalui halaman profil Anda di bagian 'Kegiatan Saya'. Klik tombol 'Batalkan' pada kegiatan yang ingin dibatalkan. Disarankan untuk membatalkan minimal 24 jam sebelum kegiatan dimulai.",
      },
      {
        question: "Apakah saya akan mendapatkan sertifikat?",
        answer:
          "Ya, untuk kegiatan yang berdurasi lebih dari 4 jam atau kegiatan rutin, Anda akan mendapatkan sertifikat digital yang bisa diunduh dari profil Anda.",
      },
      {
        question: "Bagaimana cara melihat riwayat partisipasi saya?",
        answer:
          "Riwayat partisipasi Anda bisa dilihat di halaman profil pada bagian 'Statistik' atau 'Riwayat Kegiatan'. Di sana Anda bisa melihat semua kegiatan yang pernah diikuti beserta jam relawan yang terakumulasi.",
      },
    ],
    organizer: [
      {
        question: "Bagaimana cara menjadi organizer?",
        answer:
          "Daftar sebagai pengguna terlebih dahulu, lalu kunjungi halaman profil dan klik 'Upgrade ke Organizer'. Isi formulir verifikasi dan tunggu proses approval dari tim kami (biasanya 1-2 hari kerja).",
      },
      {
        question: "Apa saja fitur yang tersedia untuk organizer?",
        answer:
          "Organizer bisa membuat dan mengelola event, melihat statistik peserta, mengirim notifikasi, mengelola relawan, dan mengakses dashboard analitik untuk melihat performa kegiatan.",
      },
      {
        question: "Apakah ada biaya untuk membuat event?",
        answer:
          "Event basic gratis untuk maksimal 50 peserta. Untuk event dengan lebih dari 50 peserta atau fitur premium, tersedia paket berbayar yang sangat terjangkau.",
      },
      {
        question: "Bagaimana cara memverifikasi peserta?",
        answer:
          "Sistem kami menyediakan QR code untuk setiap peserta yang terdaftar. Saat acara, cukup scan QR code peserta menggunakan smartphone untuk verifikasi kehadiran otomatis.",
      },
      {
        question: "Bisakah saya menghapus event yang sudah dibuat?",
        answer:
          "Ya, Anda bisa menghapus event selama belum ada peserta yang mendaftar. Jika sudah ada peserta, Anda hanya bisa membatalkan event dan sistem akan otomatis memberitahu semua peserta.",
      },
    ],
    technical: [
      {
        question: "Mengapa saya tidak bisa login?",
        answer:
          "Pastikan email dan password yang Anda masukkan sudah benar. Periksa juga apakah email Anda sudah terverifikasi. Jika masih tidak bisa, gunakan fitur 'Lupa Password' untuk reset password Anda.",
      },
      {
        question: "Apa yang harus dilakukan jika lupa password?",
        answer:
          "Klik link 'Lupa Password' di halaman login. Masukkan email Anda, dan kami akan mengirimkan link reset password ke email Anda. Link tersebut berlaku selama 24 jam.",
      },
      {
        question: "Kenapa notifikasi tidak muncul?",
        answer:
          "Pastikan Anda sudah mengizinkan notifikasi browser dan notifikasi email diatur ke 'Aktif'. Cek juga folder spam di email Anda jika tidak menerima notifikasi email.",
      },
      {
        question: "Apakah ActivistHub tersedia dalam bentuk aplikasi mobile?",
        answer:
          "Saat ini ActivistHub tersedia sebagai website responsive yang optimal di mobile. Aplikasi mobile untuk iOS dan Android sedang dalam pengembangan dan akan segera dirilis.",
      },
      {
        question: "Bagaimana cara melaporkan bug atau masalah teknis?",
        answer:
          "Anda bisa melaporkan masalah teknis melalui halaman Contact Us atau email ke support@activisthub.id. Tim teknis kami akan merespon dalam 24 jam.",
      },
    ],
  };

  const currentFAQs = faqData[activeCategory] || [];

  return (
    <div className="faq-container">
      <section className="faq-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Pusat Bantuan</h1>
            <p>
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang
              ActivistHub
            </p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-card ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-items-section">
        <div className="container">
          <div className="faq-list">
            {currentFAQs.map((item, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleItem(index)}>
                  <h3>{item.question}</h3>
                  <span
                    className={`toggle-icon ${expandedItems.includes(index) ? "expanded" : ""}`}
                  >
                    ?
                  </span>
                </div>
                <div
                  className={`faq-answer ${expandedItems.includes(index) ? "expanded" : ""}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-support-section">
        <div className="container">
          <div className="support-content">
            <h2>Masih Butuh Bantuan?</h2>
            <p>
              Tim support kami siap membantu Anda 24/7. Jangan ragu untuk
              menghubungi kami jika pertanyaan Anda belum terjawab di FAQ.
            </p>
            <div className="support-options">
              <div className="support-option">
                <div className="support-icon">
                  <FaEnvelope />
                </div>
                <h3>Email Support</h3>
                <p>activisthub@gmail.com</p>
                <span>Respons dalam 24 jam</span>
              </div>
              <div className="support-option">
                <div className="support-icon">
                  <FaComments />
                </div>
                <h3>Live Chat</h3>
                <p>Senin - Jumat, 09:00 - 17:00</p>
                <span>Respons langsung</span>
              </div>
              <div className="support-option">
                <div className="support-icon">
                  <FaWhatsapp />
                </div>
                <h3>WhatsApp</h3>
                <p>+62 831-7499-7982</p>
                <span>Respons cepat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            <div className="link-card">
              <h3>
                <FaBook /> Panduan Pemula
              </h3>
              <p>
                Tutorial lengkap untuk memulai perjalanan Anda di ActivistHub
              </p>
              <Link to="/guide">Baca Panduan</Link>
            </div>
            <div className="link-card">
              <h3>
                <FaVideo /> Video Tutorial
              </h3>
              <p>Video panduan langkah demi langkah untuk semua fitur</p>
              <Link to="/videos">Tonton Video</Link>
            </div>
            <div className="link-card">
              <h3>
                <FaShieldAlt /> Kebijakan Privasi
              </h3>
              <p>Informasi lengkap tentang perlindungan data Anda</p>
              <Link to="/privacy">Baca Kebijakan</Link>
            </div>
            <div className="link-card">
              <h3>
                <FaFileContract /> Syarat & Ketentuan
              </h3>
              <p>Peraturan dan ketentuan penggunaan platform</p>
              <Link to="/terms">Baca Syarat</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
