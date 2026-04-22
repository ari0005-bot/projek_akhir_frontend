import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Terms.css";
import { 
  FaFileContract, 
  FaUserCheck, 
  FaShieldAlt, 
  FaBalanceScale,
  FaGavel,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaBan,
  FaClock,
  FaHandshake,
  FaHeart,
  FaUserShield,
  FaCalendarAlt,
  FaArrowLeft,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";

const Terms = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedItem, setExpandedItem] = useState(null);

  const sections = [
    {
      id: "overview",
      title: "Ringkasan",
      icon: <FaFileContract />,
      description: "Gambaran umum syarat dan ketentuan ActivistHub"
    },
    {
      id: "acceptance",
      title: "Penerimaan Syarat",
      icon: <FaUserCheck />,
      description: "Bagaimana Anda menyetujui syarat penggunaan"
    },
    {
      id: "user-responsibilities",
      title: "Kewajiban Pengguna",
      icon: <FaShieldAlt />,
      description: "Tanggung jawab dan kewajiban Anda sebagai pengguna"
    },
    {
      id: "prohibited-activities",
      title: "Aktivitas Dilarang",
      icon: <FaBan />,
      description: "Aktivitas yang tidak diizinkan di platform"
    },
    {
      id: "intellectual-property",
      title: "Kekayaan Intelektual",
      icon: <FaBalanceScale />,
      description: "Hak cipta dan penggunaan konten"
    },
    {
      id: "liability",
      title: "Batasan Tanggung Jawab",
      icon: <FaGavel />,
      description: "Batasan tanggung jawab ActivistHub"
    },
    {
      id: "termination",
      title: "Penghentian Layanan",
      icon: <FaExclamationTriangle />,
      description: "Kondisi penghentian akun dan layanan"
    },
    {
      id: "disputes",
      title: "Penyelesaian Sengketa",
      icon: <FaHandshake />,
      description: "Proses penyelesaian perselisihan"
    }
  ];

  const overviewContent = {
    introduction: "Syarat dan Ketentuan ini ('Syarat') mengatur penggunaan platform ActivistHub ('Platform') yang disediakan oleh ActivistHub Indonesia ('Kami', 'Perusahaan'). Dengan mengakses atau menggunakan Platform, Anda ('Pengguna') setuju untuk terikat oleh Syarat ini.",
    lastUpdated: "15 April 2025",
    scope: "Syarat ini berlaku untuk semua Pengguna, termasuk relawan, organizer, dan pengunjung situs web kami. Pengguna di bawah usia 18 tahun harus mendapatkan persetujuan orang tua/wali.",
    acceptance: "Penggunaan Platform berarti Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat ini. Jika Anda tidak menyetujui Syarat ini, jangan gunakan Platform."
  };

  const acceptanceContent = [
    {
      point: "Persetujuan Bind",
      description: "Dengan membuat akun dan menggunakan Platform, Anda secara otomatis menyetujui Syarat ini",
      details: [
        "Pembuatan akun merupakan persetujuan terhadap Syarat",
        "Penggunaan fitur Platform berarti penerimaan Syarat",
        "Kontinuitas penggunaan menunjukkan persetujuan berkelanjutan",
        "Syarat berlaku sejak tanggal pendaftaran pertama"
      ]
    },
    {
      point: "Perubahan Syarat",
      description: "Kami berhak mengubah Syarat dari waktu ke waktu",
      details: [
        "Perubahan akan diinformasikan 30 hari sebelum efektif",
        "Penggunaan berkelanjutan setelah perubahan berarti persetujuan",
        "Perubahan material akan dikomunikasikan secara jelas",
        "Versi terbaru Syarat selalu tersedia di Platform"
      ]
    },
    {
      point: "Bahasa",
      description: "Syarat ini berlaku dalam Bahasa Indonesia",
      details: [
        "Versi Bahasa Indonesia adalah yang mengikat secara hukum",
        "Terjemahan tersedia untuk referensi saja",
        "Jika ada perbedaan, versi Bahasa Indonesia yang berlaku",
        "Interpretasi Syarat mengikuti hukum Republik Indonesia"
      ]
    }
  ];

  const userResponsibilitiesContent = [
    {
      category: "Informasi Akun",
      description: "Kewajiban terkait informasi dan keamanan akun",
      responsibilities: [
        "Memberikan informasi yang akurat, lengkap, dan terkini",
        "Menjaga kerahasiaan kredensial login",
        "Tidak membagikan akun kepada pihak ketiga",
        "Segera menginformasikan jika akun dicuri atau disalahgunakan",
        "Memperbarui informasi profil secara berkala"
      ]
    },
    {
      category: "Perilaku Pengguna",
      description: "Standar perilaku yang diharapkan dari Pengguna",
      responsibilities: [
        "Bersikap sopan dan menghormati Pengguna lain",
        "Tidak melakukan pelecehan, bullying, atau intimidasi",
        "Menghormati perbedaan pandangan dan pendapat",
        "Tidak menyebarkan informasi palsu atau menyesatkan",
        "Menggunakan Platform untuk tujuan yang sesuai dengan misi"
      ]
    },
    {
      category: "Kepatuhan Hukum",
      description: "Kewajiban untuk mematuhi hukum yang berlaku",
      responsibilities: [
        "Mematuhi semua peraturan perundang-undangan",
        "Tidak menggunakan Platform untuk kegiatan ilegal",
        "Menghormati hak kekayaan intelektual pihak ketiga",
        "Tidak terlibat dalam penipuan atau penyalahgunaan",
        "Melaporkan aktivitas mencurigakan kepada kami"
      ]
    },
    {
      category: "Partisipasi Kegiatan",
      description: "Tanggung jawab saat berpartisipasi dalam kegiatan",
      responsibilities: [
        "Memenuhi komitmen yang telah disetujui",
        "Datang tepat waktu dan siap untuk berpartisipasi",
        "Mengikuti instruksi dari organizer yang sah",
        "Menginformasikan jika tidak dapat hadir secara bertanggung jawab",
        "Memberikan kontribusi positif selama kegiatan berlangsung"
      ]
    }
  ];

  const prohibitedActivitiesContent = [
    {
      category: "Aktivitas Ilegal",
      description: "Kegiatan yang melanggar hukum",
      examples: [
        "Penipuan, pemerasan, atau penipuan online",
        "Perjudian, perjudian online, atau betting",
        "Penjualan barang ilegal atau terlarang",
        "Promosi atau partisipasi dalam kegiatan teroris",
        "Pelanggaran hak cipta atau kekayaan intelektual"
      ],
      consequence: "Suspend permanen dan pelaporan ke pihak berwenang"
    },
    {
      category: "Aktivitas Berbahaya",
      description: "Kegiatan yang membahayakan keselamatan",
      examples: [
        "Promosi kekerasan, diskriminasi, atau kebencian",
        "Penyebaran konten berbahaya atau beracun",
        "Ancaman terhadap individu atau kelompok",
        "Bullying, pelecehan, atau intimidasi",
        "Promosi self-harm atau bunuh diri"
      ],
      consequence: "Suspend sementara dan investigasi"
    },
    {
      category: "Aktivitas Penipuan",
      description: "Kegiatan yang menyesatkan atau memanipulasi",
      examples: [
        "Membuat akun palsu atau menyamar sebagai orang lain",
        "Menggunakan informasi palsu untuk verifikasi",
        "Promosi kegiatan palsu atau tidak ada",
        "Memanipulasi sistem atau fitur Platform",
        "Mengumpulkan donasi untuk tujuan palsu"
      ],
      consequence: "Banned permanen dan blacklist"
    },
    {
      category: "Aktivitas Spam",
      description: "Kegiatan yang mengganggu atau tidak diinginkan",
      examples: [
        "Mengirim pesan atau email yang tidak diinginkan",
        "Posting komentar atau konten berulang-ulang",
        "Menggunakan bot untuk aktivitas otomatis",
        "Promosi berlebihan atau iklan yang tidak relevan",
        "Mengganggu pengalaman Pengguna lain"
      ],
      consequence: "Warning dan suspend berulang"
    }
  ];

  const intellectualPropertyContent = [
    {
      type: "Konten Pengguna",
      description: "Hak atas konten yang Anda buat atau bagikan",
      details: [
        "Anda mempertahankan kepemilikan konten yang Anda buat",
        "Kami tidak mengklaim kepemilikan konten Pengguna",
        "Anda memberikan kami lisensi untuk menggunakan konten Anda",
        "Lisensi bersifat non-eksklusif dan royalty-free",
        "Kami dapat menggunakan konten untuk meningkatkan Platform"
      ]
    },
    {
      type: "Konten Platform",
      description: "Kekayaan intelektual milik ActivistHub",
      details: [
        "Platform, fitur, dan teknologi milik ActivistHub",
        "Desain, logo, dan merek dilindungi hak cipta",
        "Tidak boleh menyalin, memodifikasi, atau mendistribusikan",
        "Penggunaan terbatas sesuai Syarat yang berlaku",
        "Pelanggaran akan ditindak sesuai hukum"
      ]
    },
    {
      type: "Penggunaan yang Diizinkan",
      description: "Cara penggunaan konten yang diperbolehkan",
      examples: [
        "Melihat dan mengunduh konten untuk penggunaan pribadi",
        "Membagikan konten ke media sosial dengan kredit",
        "Menggunakan konten untuk tujuan edukasi atau inspirasi",
        "Mengutip konten dengan menyebutkan sumber",
        "Menggunakan konten dalam presentasi non-komersial"
      ]
    },
    {
      type: "Penggunaan Dilarang",
      description: "Penggunaan konten yang tidak diizinkan",
      examples: [
        "Menggunakan konten untuk kepentingan komersial tanpa izin",
        "Mengklaim konten orang lain sebagai milik Anda",
        "Memodifikasi atau mengubah konten tanpa izin",
        "Menjual atau melisensikan konten Platform",
        "Menggunakan konten untuk kegiatan yang melanggar hukum"
      ]
    }
  ];

  const liabilityContent = [
    {
      area: "Platform Availability",
      description: "Ketersediaan dan performa Platform",
      limitations: [
        "Platform disediakan 'sebagaimana adanya' (as-is)",
        "Kami tidak menjamin 100% uptime atau error-free",
        "Maintenance terjadwal dapat menyebabkan downtime",
        "Kami tidak bertanggung jawab atas loss dari downtime",
        "Kami berusaha memberikan layanan terbaik yang mungkin"
      ]
    },
    {
      area: "User Interactions",
      description: "Interaksi antar Pengguna dan kegiatan",
      limitations: [
        "Kami tidak mengontrol interaksi antar Pengguna",
        "Kami tidak bertanggung jawab atas perilaku Pengguna",
        "Kami tidak menjamin keabsahan informasi Pengguna",
        "Kami tidak memediasi sengketa antar Pengguna",
        "Verifikasi organizer dilakukan dengan sebaik-baiknya"
      ]
    },
    {
      area: "External Links",
      description: "Link ke situs web atau layanan pihak ketiga",
      limitations: [
        "Platform mungkin mengandung link ke situs eksternal",
        "Kami tidak bertanggung jawab atas konten situs eksternal",
        "Penggunaan situs eksternal sesuai syarat masing-masing",
        "Kami tidak mendukung atau menjamin situs eksternal",
        "Pengguna disarankan berhati-hati saat mengunjungi link eksternal"
      ]
    },
    {
      area: "Financial Transactions",
      description: "Transaksi keuangan melalui Platform",
      limitations: [
        "Kami tidak bertanggung jawab atas transaksi Pengguna",
        "Kami tidak menjamin keamanan metode pembayaran pihak ketiga",
        "Dispute transaksi diselesaikan antar pihak terkait",
        "Kami tidak bertanggung jawab atas loss atau fraud",
        "Pengguna bertanggung jawab atas keputusan finansial mereka"
      ]
    }
  ];

  const terminationContent = [
    {
      type: "Termination oleh Pengguna",
      description: "Hak Pengguna untuk menghentikan penggunaan Platform",
      process: [
        "Pengguna dapat menutup akun kapan saja",
        "Data pribadi akan dihapus sesuai kebijakan privasi",
        "Konten yang dibuat Pengguna mungkin tetap tersimpan",
        "Aktivitas berjalan akan diselesaikan sesuai komitmen",
        "Tidak ada refund untuk biaya yang telah dibayar"
      ]
    },
    {
      type: "Termination oleh Kami",
      description: "Hak Kami untuk menghentikan akses Pengguna",
      reasons: [
        "Pelanggaran berat terhadap Syarat",
        "Aktivitas ilegal atau berbahaya",
        "Penyalahgunaan Platform atau fitur",
        "Tidak aktif selama periode waktu tertentu",
        "Permintaan dari pihak berwenang atau hukum"
      ]
    },
    {
      type: "Proses Termination",
      description: "Tahapan dan konsekuensi penghentian",
      steps: [
        "Pemberitahuan tertulis sebelum termination",
        "Kesempatan untuk memperbaiki pelanggaran (jika applicable)",
        "Suspension sementara sebelum termination permanen",
        "Penghapusan akses ke Platform dan fitur",
        "Penyimpanan data sesuai periode retensi yang berlaku"
      ]
    },
    {
      type: "Efek Termination",
      description: "Apa yang terjadi setelah termination",
      consequences: [
        "Akses ke Platform dan fitur akan dihentikan",
        "Konten mungkin dihapus atau diarsipkan",
        "Tidak ada refund untuk biaya berlangganan",
        "Kewajiban yang telah ada tetap berlaku",
        "Hak untuk membuat akun baru mungkin dibatasi"
      ]
    }
  ];

  const disputesContent = [
    {
      stage: "Negosiasi Langsung",
      description: "Upaya penyelesaian antar pihak terkait",
      process: [
        "Pihak yang bersengketa berusaha menyelesaikan secara langsung",
        "Komunikasi dilakukan secara baik dan menghormati",
        "Dokumentasi semua percakapan dan kesepakatan",
        "Waktu penyelesaian maksimal 14 hari kerja",
        "Kami dapat memfasilitasi komunikasi jika diminta"
      ]
    },
    {
      stage: "Mediasi Platform",
      description: "Peran ActivistHub dalam memfasilitasi penyelesaian",
      process: [
        "Jika negosiasi gagal, Pengguna dapat meminta mediasi",
        "Tim mediasi netral akan membantu menemukan solusi",
        "Proses mediasi maksimal 30 hari kerja",
        "Biaya mediasi dibagi rata antar pihak",
        "Hasil mediasi bersifat mengikat jika disetujui semua pihak"
      ]
    },
    {
      stage: "Arbitrase",
      description: "Penyelesaian melalui arbitrase independen",
      process: [
        "Jika mediasi gagal, sengketa dapat diselesaikan melalui arbitrase",
        "Arbitrase dilakukan oleh lembaga arbitrase terpercaya",
        "Keputusan arbitrase bersifat final dan mengikat",
        "Biaya arbitrase ditanggung pihak yang kalah",
        "Proses arbitrase mengikuti aturan arbitrase yang berlaku"
      ]
    },
    {
      stage: "Penyelesaian Hukum",
      description: "Opsi terakhir melalui proses peradilan",
      process: [
        "Pihak dapat membawa sengketa ke pengadilan",
        "Yurisdiksi pengadilan adalah Jakarta, Indonesia",
        "Hukum yang berlaku adalah hukum Republik Indonesia",
        "Biaya hukum ditanggung masing-masing pihak",
        "Keputusan pengadilan bersifat final dan eksekusi"
      ]
    }
  ];

  const toggleItem = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const getSectionContent = () => {
    switch(activeSection) {
      case "overview":
        return { type: "overview", content: overviewContent };
      case "acceptance":
        return { type: "list", content: acceptanceContent };
      case "user-responsibilities":
        return { type: "list", content: userResponsibilitiesContent };
      case "prohibited-activities":
        return { type: "list", content: prohibitedActivitiesContent };
      case "intellectual-property":
        return { type: "list", content: intellectualPropertyContent };
      case "liability":
        return { type: "list", content: liabilityContent };
      case "termination":
        return { type: "list", content: terminationContent };
      case "disputes":
        return { type: "list", content: disputesContent };
      default:
        return { type: "overview", content: overviewContent };
    }
  };

  return (
    <div className="terms-container">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <FaFileContract />
            </div>
            <h1>Syarat & Ketentuan</h1>
            <p>Peraturan dan ketentuan penggunaan platform ActivistHub untuk menciptakan lingkungan yang aman dan adil bagi semua pengguna</p>
            <div className="hero-meta">
              <div className="meta-item">
                <FaCalendarAlt />
                <span>Terakhir diperbarui: {overviewContent.lastUpdated}</span>
              </div>
              <div className="meta-item">
                <FaCheckCircle />
                <span>Berlaku efektif sejak pendaftaran</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="terms-navigation">
        <div className="container">
          <div className="nav-grid">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-card ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="nav-icon">{section.icon}</div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="terms-content">
        <div className="container">
          {getSectionContent().type === "overview" ? (
            <div className="overview-content">
              <div className="overview-card">
                <h2>Pengantar</h2>
                <p>{overviewContent.introduction}</p>
              </div>
              
              <div className="overview-card">
                <h2>Lingkup</h2>
                <p>{overviewContent.scope}</p>
              </div>
              
              <div className="overview-card">
                <h2>Persetujuan</h2>
                <p>{overviewContent.acceptance}</p>
              </div>
            </div>
          ) : (
            <div className="list-content">
              {getSectionContent().content.map((item, index) => (
                <div key={index} className="content-card">
                  <div className="card-header">
                    <h3>{item.point || item.category || item.type || item.area || item.stage}</h3>
                    <p>{item.description}</p>
                    {item.consequence && (
                      <div className="consequence-badge">
                        <FaExclamationTriangle />
                        <span>Konsekuensi: {item.consequence}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-content">
                    {item.details && (
                      <div className="details-list">
                        <h4>Detail:</h4>
                        <ul>
                          {item.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>
                              <FaInfoCircle className="info-icon" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.responsibilities && (
                      <div className="responsibilities-list">
                        <h4>Kewajiban:</h4>
                        <ul>
                          {item.responsibilities.map((responsibility, responsibilityIndex) => (
                            <li key={responsibilityIndex}>
                              <FaUserShield className="shield-icon" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.examples && (
                      <div className="examples-list">
                        <h4>Contoh:</h4>
                        <ul>
                          {item.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex}>
                              <FaBan className="ban-icon" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.limitations && (
                      <div className="limitations-list">
                        <h4>Batasan:</h4>
                        <ul>
                          {item.limitations.map((limitation, limitationIndex) => (
                            <li key={limitationIndex}>
                              <FaExclamationTriangle className="warning-icon" />
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.process && (
                      <div className="process-list">
                        <h4>Proses:</h4>
                        <ul>
                          {item.process.map((step, stepIndex) => (
                            <li key={stepIndex}>
                              <FaClock className="clock-icon" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.steps && (
                      <div className="steps-list">
                        <h4>Tahapan:</h4>
                        <ul>
                          {item.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>
                              <FaCheckCircle className="check-icon" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.reasons && (
                      <div className="reasons-list">
                        <h4>Alasan:</h4>
                        <ul>
                          {item.reasons.map((reason, reasonIndex) => (
                            <li key={reasonIndex}>
                              <FaExclamationTriangle className="warning-icon" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.consequences && (
                      <div className="consequences-list">
                        <h4>Konsekuensi:</h4>
                        <ul>
                          {item.consequences.map((consequence, consequenceIndex) => (
                            <li key={consequenceIndex}>
                              <FaGavel className="gavel-icon" />
                              {consequence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="terms-contact-section">
        <div className="container">
          <div className="contact-content">
            <h2>Pertanyaan tentang Syarat & Ketentuan?</h2>
            <p>Jika Anda memiliki pertanyaan atau membutuhkan klarifikasi tentang syarat dan ketentuan kami, jangan ragu untuk menghubungi tim legal kami.</p>
            
            <div className="contact-methods">
              <div className="contact-card">
                <FaEnvelope />
                <h3>Email Legal</h3>
                <p>legal@activisthub.id</p>
                <span>Respon dalam 72 jam</span>
              </div>
              
              <div className="contact-card">
                <FaPhone />
                <h3>Hotline Legal</h3>
                <p>+62 800-1234-5679</p>
                <span>Senin - Jumat, 09:00 - 17:00</span>
              </div>
              
              <div className="contact-card">
                <FaBalanceScale />
                <h3>Konsultasi Hukum</h3>
                <p>consultation@activisthub.id</p>
                <span>Untuk konsultasi mendalam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to FAQ */}
      <section className="back-section">
        <div className="container">
          <Link to="/faq" className="back-button">
            <FaArrowLeft />
            Kembali ke FAQ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Terms;
