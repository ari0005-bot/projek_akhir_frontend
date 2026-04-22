import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";
import { 
  FaShieldAlt, 
  FaLock, 
  FaDatabase, 
  FaUserShield,
  FaCookie,
  FaEye,
  FaTrash,
  FaUserCheck,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from "react-icons/fa";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedItem, setExpandedItem] = useState(null);

  const sections = [
    {
      id: "overview",
      title: "Ringkasan",
      icon: <FaShieldAlt />,
      description: "Gambaran umum kebijakan privasi ActivistHub"
    },
    {
      id: "data-collection",
      title: "Pengumpulan Data",
      icon: <FaDatabase />,
      description: "Data apa yang kami kumpulkan dan mengapa"
    },
    {
      id: "data-usage",
      title: "Penggunaan Data",
      icon: <FaEye />,
      description: "Bagaimana kami menggunakan data Anda"
    },
    {
      id: "data-protection",
      title: "Perlindungan Data",
      icon: <FaLock />,
      description: "Langkah-langkah keamanan yang kami terapkan"
    },
    {
      id: "user-rights",
      title: "Hak Pengguna",
      icon: <FaUserCheck />,
      description: "Hak Anda atas data pribadi"
    },
    {
      id: "cookies",
      title: "Kebijakan Cookie",
      icon: <FaCookie />,
      description: "Penggunaan cookie di platform kami"
    },
    {
      id: "third-party",
      title: "Pihak Ketiga",
      icon: <FaGlobe />,
      description: "Berbagi data dengan pihak ketiga"
    },
    {
      id: "contact",
      title: "Kontak Privasi",
      icon: <FaEnvelope />,
      description: "Cara menghubungi tim privasi kami"
    }
  ];

  const overviewContent = {
    introduction: "ActivistHub ('kami') sangat serius dalam melindungi privasi dan keamanan data pribadi pengguna kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan membagikan informasi pribadi Anda saat menggunakan platform ActivistHub.",
    lastUpdated: "15 April 2025",
    scope: "Kebijakan ini berlaku untuk semua pengguna platform ActivistHub, termasuk relawan, organizer, dan pengunjung situs web kami.",
    commitment: "Kami berkomitmen untuk transparan dalam praktik privasi kami dan memberikan kontrol kepada Anda atas data pribadi Anda."
  };

  const dataCollectionContent = [
    {
      category: "Data Pendaftaran",
      description: "Data yang Anda berikan saat membuat akun",
      items: [
        "Nama lengkap dan identitas",
        "Email dan nomor telepon",
        "Tanggal lahir dan usia",
        "Alamat tempat tinggal",
        "Foto profil dan identitas",
        "Informasi pendidikan dan pekerjaan"
      ],
      purpose: "Untuk verifikasi identitas dan memastikan keamanan platform"
    },
    {
      category: "Data Aktivitas",
      description: "Data yang kami kumpulkan saat Anda menggunakan platform",
      items: [
        "Kegiatan sosial yang Anda ikuti",
        "Riwayat partisipasi dan kontribusi",
        "Interaksi dengan konten dan pengguna lain",
        "Preferensi dan minat sosial",
        "Lokasi saat menggunakan fitur tertentu",
        "Waktu dan durasi penggunaan platform"
      ],
      purpose: "Untuk memberikan pengalaman yang dipersonalisasi dan relevan"
    },
    {
      category: "Data Teknis",
      description: "Data yang dikumpulkan secara otomatis",
      items: [
        "IP address dan device information",
        "Browser type dan operating system",
        "Cookies dan tracking technologies",
        "Log aktivitas dan error reports",
        "Performance data dan analytics",
        "Geographic location berdasarkan IP"
      ],
      purpose: "Untuk keamanan, maintenance, dan improvement platform"
    },
    {
      category: "Data Komunikasi",
      description: "Data dari komunikasi Anda dengan kami",
      items: [
        "Email dan pesan yang Anda kirim",
        "Feedback dan complaint yang Anda berikan",
        "Support request dan chat transcripts",
        "Survey responses dan form submissions",
        "Ulasan dan rating yang Anda berikan"
      ],
      purpose: "Untuk memberikan support dan meningkatkan layanan"
    }
  ];

  const dataUsageContent = [
    {
      purpose: "Penyediaan Layanan",
      description: "Menggunakan data Anda untuk menjalankan platform",
      examples: [
        "Memproses pendaftaran dan verifikasi",
        "Mencocokkan relawan dengan kegiatan yang sesuai",
        "Mengelola partisipasi dalam kegiatan sosial",
        "Mengirim notifikasi dan update penting",
        "Memfasilitasi komunikasi antar pengguna"
      ]
    },
    {
      purpose: "Personalisasi",
      description: "Menyesuaikan pengalaman Anda dengan preferensi",
      examples: [
        "Memberikan rekomendasi kegiatan yang relevan",
        "Menyesuaikan konten berdasarkan minat Anda",
        "Mengingatkan kegiatan yang mungkin Anda sukai",
        "Personalisasi dashboard dan interface",
        "Menampilkan statistik dan progress personal"
      ]
    },
    {
      purpose: "Keamanan dan Kepercayaan",
      description: "Memastikan platform aman dan terpercaya",
      examples: [
        "Verifikasi identitas untuk mencegah penipuan",
        "Screening organizer dan kegiatan",
        "Monitoring aktivitas mencurigakan",
        "Investigasi laporan penyalahgunaan",
        "Melindungi komunitas dari konten berbahaya"
      ]
    },
    {
      purpose: "Improvement Layanan",
      description: "Menggunakan data untuk meningkatkan platform",
      examples: [
        "Analisis penggunaan fitur untuk optimasi",
        "Identifikasi bug dan technical issues",
        "Mengembangkan fitur baru berdasarkan kebutuhan",
        "Meningkatkan user experience dan interface",
        "Optimasi performa dan kecepatan platform"
      ]
    }
  ];

  const dataProtectionContent = [
    {
      measure: "Enkripsi Data",
      description: "Semua data pribadi dienkripsi dengan standar industri",
      details: [
        "SSL/TLS encryption untuk data transmission",
        "AES-256 encryption untuk data storage",
        "End-to-end encryption untuk komunikasi sensitif",
        "Regular encryption key rotation",
        "Secure protocols untuk API communications"
      ],
      level: "Tinggi"
    },
    {
      measure: "Access Control",
      description: "Kontrol akses yang ketat untuk data pengguna",
      details: [
        "Role-based access control (RBAC)",
        "Multi-factor authentication untuk staff",
        "Regular access review dan audit",
        "Principle of least privilege",
        "Audit log untuk semua data access"
      ],
      level: "Tinggi"
    },
    {
      measure: "Network Security",
      description: "Perlindungan infrastruktur jaringan",
      details: [
        "Firewall dan intrusion detection systems",
        "DDoS protection dan load balancing",
        "Regular security scanning dan penetration testing",
        "Secure data centers dengan physical security",
        "24/7 security monitoring dan incident response"
      ],
      level: "Tinggi"
    },
    {
      measure: "Data Backup",
      description: "Backup dan recovery yang reliable",
      details: [
        "Daily automated backups",
        "Geographically distributed backup locations",
        "Regular backup restoration testing",
        "Point-in-time recovery capabilities",
        "Backup encryption dan access controls"
      ],
      level: "Sedang"
    }
  ];

  const userRightsContent = [
    {
      right: "Akses Data",
      description: "Hak Anda untuk mengakses data pribadi",
      actions: [
        "Melihat semua data yang kami simpan tentang Anda",
        "Mendapatkan salinan data dalam format terstruktur",
        "Export data untuk penggunaan pribadi",
        "Request data correction jika ada kesalahan",
        "Mendapatkan riwayat aktivitas dan perubahan"
      ],
      process: "Login ke dashboard > Pengaturan > Privasi > Download Data"
    },
    {
      right: "Koreksi Data",
      description: "Hak untuk memperbaiki data yang tidak akurat",
      actions: [
        "Edit informasi profil dan preferensi",
        "Update contact information dan alamat",
        "Koreksi data identitas jika ada perubahan",
        "Request correction data yang tidak bisa di-edit langsung",
        "Melacak status permintaan koreksi"
      ],
      process: "Hubungi support atau edit langsung di profil"
    },
    {
      right: "Hapus Data",
      description: "Hak untuk meminta penghapusan data pribadi",
      actions: [
        "Request penghapusan akun dan semua data terkait",
        "Hapus data spesifik tanpa menutup akun",
        "Request anonymisasi data untuk keperluan statistik",
        "Mendapatkan konfirmasi penghapusan data",
        "Memahami implikasi penghapusan data"
      ],
      process: "Pengaturan > Privasi > Hapus Data atau Hubungi Support"
    },
    {
      right: "Portabilitas Data",
      description: "Hak untuk memindahkan data ke platform lain",
      actions: [
        "Export data dalam format standar (JSON, CSV)",
        "Request data transfer ke platform partner",
        "Mendapatkan bantuan untuk proses migrasi",
        "Memastikan data transfer yang aman",
        "Mendapatkan dokumentasi format data"
      ],
      process: "Dashboard > Pengaturan > Export Data"
    },
    {
      right: "Withdraw Consent",
      description: "Hak untuk menarik persetujuan penggunaan data",
      actions: [
        "Menonaktifkan tracking dan analytics",
        "Menolak penggunaan data untuk marketing",
        "Memilih keluar dari komunikasi tertentu",
        "Mengubah preferensi privasi kapan saja",
        "Menghapus consent untuk penggunaan data tertentu"
      ],
      process: "Pengaturan > Privasi > Consent Management"
    }
  ];

  const cookiesContent = [
    {
      type: "Essential Cookies",
      purpose: "Cookie yang diperlukan untuk fungsi dasar platform",
      examples: [
        "Authentication cookies untuk login session",
        "Security cookies untuk keamanan",
        "Load balancing cookies untuk performance",
        "Session management cookies",
        "CSRF protection cookies"
      ],
      duration: "Session hingga 30 hari",
      required: true
    },
    {
      type: "Analytics Cookies",
      purpose: "Cookie untuk memahami penggunaan platform",
      examples: [
        "Google Analytics cookies",
        "Hotjar heatmapping cookies",
        "Custom event tracking cookies",
        "User journey tracking cookies",
        "Performance monitoring cookies"
      ],
      duration: "30 hari hingga 2 tahun",
      required: false
    },
    {
      type: "Marketing Cookies",
      purpose: "Cookie untuk keperluan marketing dan promosi",
      examples: [
        "Facebook Pixel cookies",
        "Google Ads cookies",
        "Email marketing tracking cookies",
        "Retargeting campaign cookies",
        "Affiliate tracking cookies"
      ],
      duration: "30 hari hingga 1 tahun",
      required: false
    },
    {
      type: "Functional Cookies",
      purpose: "Cookie untuk meningkatkan fungsi platform",
      examples: [
        "Language preference cookies",
        "Theme and display settings cookies",
        "Remembered search filters cookies",
        "Custom dashboard layout cookies",
        "Feature flag cookies"
      ],
      duration: "Session hingga 1 tahun",
      required: false
    }
  ];

  const thirdPartyContent = [
    {
      category: "Payment Processors",
      description: "Layanan pembayaran untuk transaksi",
      companies: ["Midtrans", "Xendit", "Stripe"],
      dataShared: ["Payment information", "Billing address", "Transaction details"],
      purpose: "Memproses donasi dan pembayaran kegiatan"
    },
    {
      category: "Analytics Services",
      description: "Platform analytics untuk memahami penggunaan",
      companies: ["Google Analytics", "Hotjar", "Mixpanel"],
      dataShared: ["Usage patterns", "Device information", "Behavioral data"],
      purpose: "Meningkatkan user experience dan platform"
    },
    {
      category: "Communication Services",
      description: "Layanan komunikasi untuk notifikasi",
      companies: ["SendGrid", "WhatsApp Business API", "Firebase Cloud Messaging"],
      dataShared: ["Email addresses", "Phone numbers", "Device tokens"],
      purpose: "Mengirim notifikasi dan komunikasi penting"
    },
    {
      category: "Cloud Infrastructure",
      description: "Provider untuk hosting dan storage",
      companies: ["AWS", "Google Cloud Platform", "Cloudflare"],
      dataShared: ["Application data", "Backup data", "Performance metrics"],
      purpose: "Menjalankan infrastruktur platform secara aman"
    },
    {
      category: "Identity Verification",
      description: "Layanan verifikasi identitas",
      companies: ["Veriff", "Jumio", "ID.me"],
      dataShared: ["Identity documents", "Biometric data", "Verification results"],
      purpose: "Memverifikasi identitas pengguna dan mencegah penipuan"
    }
  ];

  const toggleItem = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const getSectionContent = () => {
    switch(activeSection) {
      case "overview":
        return { type: "overview", content: overviewContent };
      case "data-collection":
        return { type: "list", content: dataCollectionContent };
      case "data-usage":
        return { type: "list", content: dataUsageContent };
      case "data-protection":
        return { type: "list", content: dataProtectionContent };
      case "user-rights":
        return { type: "list", content: userRightsContent };
      case "cookies":
        return { type: "list", content: cookiesContent };
      case "third-party":
        return { type: "list", content: thirdPartyContent };
      default:
        return { type: "overview", content: overviewContent };
    }
  };

  return (
    <div className="privacy-container">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <FaShieldAlt />
            </div>
            <h1>Kebijakan Privasi</h1>
            <p>Komitmen kami dalam melindungi data pribadi Anda dengan transparansi dan keamanan tertinggi</p>
            <div className="hero-meta">
              <div className="meta-item">
                <FaCalendarAlt />
                <span>Terakhir diperbarui: {overviewContent.lastUpdated}</span>
              </div>
              <div className="meta-item">
                <FaCheckCircle />
                <span>Kompatibel dengan GDPR dan PDPA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="privacy-navigation">
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
      <section className="privacy-content">
        <div className="container">
          {getSectionContent().type === "overview" ? (
            <div className="overview-content">
              <div className="overview-card">
                <h2>Pengantar</h2>
                <p>{overviewContent.introduction}</p>
              </div>
              
              <div className="overview-card">
                <h2>Lingkup Kebijakan</h2>
                <p>{overviewContent.scope}</p>
              </div>
              
              <div className="overview-card">
                <h2>Komitmen Kami</h2>
                <p>{overviewContent.commitment}</p>
              </div>
            </div>
          ) : (
            <div className="list-content">
              {getSectionContent().content.map((item, index) => (
                <div key={index} className="content-card">
                  <div className="card-header">
                    <h3>{item.category || item.purpose || item.type}</h3>
                    <p>{item.description}</p>
                    {item.level && (
                      <div className={`security-level ${item.level.toLowerCase()}`}>
                        <FaShieldAlt />
                        <span>Tingkat Keamanan: {item.level}</span>
                      </div>
                    )}
                    {item.required !== undefined && (
                      <div className={`requirement-status ${item.required ? 'required' : 'optional'}`}>
                        {item.required ? <FaExclamationTriangle /> : <FaInfoCircle />}
                        <span>{item.required ? 'Wajib' : 'Opsional'}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-content">
                    {item.items && (
                      <div className="items-list">
                        <h4>Item yang Dikumpulkan:</h4>
                        <ul>
                          {item.items.map((listItem, listIndex) => (
                            <li key={listIndex}>
                              <FaCheckCircle className="check-icon" />
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.examples && (
                      <div className="examples-list">
                        <h4>Contoh Penggunaan:</h4>
                        <ul>
                          {item.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex}>
                              <FaInfoCircle className="info-icon" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.details && (
                      <div className="details-list">
                        <h4>Detail Implementasi:</h4>
                        <ul>
                          {item.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>
                              <FaShieldAlt className="shield-icon" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.actions && (
                      <div className="actions-list">
                        <h4>Tindakan yang Tersedia:</h4>
                        <ul>
                          {item.actions.map((action, actionIndex) => (
                            <li key={actionIndex}>
                              <FaUserCheck className="user-icon" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.companies && (
                      <div className="companies-list">
                        <h4>Perusahaan Partner:</h4>
                        <div className="companies-grid">
                          {item.companies.map((company, companyIndex) => (
                            <div key={companyIndex} className="company-item">
                              <FaGlobe />
                              <span>{company}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.dataShared && (
                      <div className="data-shared-list">
                        <h4>Data yang Dibagikan:</h4>
                        <ul>
                          {item.dataShared.map((data, dataIndex) => (
                            <li key={dataIndex}>
                              <FaDatabase className="data-icon" />
                              {data}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.purpose && (
                      <div className="purpose-section">
                        <h4>Tujuan:</h4>
                        <p>{item.purpose}</p>
                      </div>
                    )}

                    {item.process && (
                      <div className="process-section">
                        <h4>Cara Melakukan:</h4>
                        <p>{item.process}</p>
                      </div>
                    )}

                    {item.duration && (
                      <div className="duration-section">
                        <h4>Durasi:</h4>
                        <p>{item.duration}</p>
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
      <section className="privacy-contact-section">
        <div className="container">
          <div className="contact-content">
            <h2>Pertanyaan tentang Privasi?</h2>
            <p>Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi kami, jangan ragu untuk menghubungi tim privasi kami.</p>
            
            <div className="contact-methods">
              <div className="contact-card">
                <FaEnvelope />
                <h3>Email Privasi</h3>
                <p>privacy@activisthub.id</p>
                <span>Respon dalam 48 jam</span>
              </div>
              
              <div className="contact-card">
                <FaPhone />
                <h3>Hotline Privasi</h3>
                <p>+62 800-1234-5678</p>
                <span>Senin - Jumat, 09:00 - 17:00</span>
              </div>
              
              <div className="contact-card">
                <FaUserShield />
                <h3>Data Protection Officer</h3>
                <p>dpo@activisthub.id</p>
                <span>Untuk permintaan formal dan legal</span>
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

export default Privacy;
