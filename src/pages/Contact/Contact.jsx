import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import { messageUtils } from "../../utils/messageUtils";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFAQ = () => {
    navigate("/faq");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      messageUtils.addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        type: "contact_form",
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(""), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Alamat",
      content:
        "PeTIK (Pesantren Teknologi Informasi dan Komunikasi) Program Kuliah IT Gratis Binaan YBM PLN, Depok, Jawa Barat",
      color: "#22c55e",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "info@activisthub.id\nactivisthub@gmail.com",
      color: "#0ea5e9",
    },
    {
      icon: <FaPhone />,
      title: "Telepon",
      content: "+62 831-7499-7982\n+62 812-3456-7890 (WhatsApp)",
      color: "#f59e0b",
    },
    {
      icon: <FaClock />,
      title: "Jam Operasional",
      content: "Senin - Jumat: 09:00 - 17:00\nSabtu-Minggu: 09:00 - 13:00",
      color: "#8b5cf6",
    },
  ];

  const teamMembers = [
    {
      name: "Ahmad Rizki",
      role: "Community Manager",
      email: "ahmad@activisthub.id",
      avatar: <FaUserCircle />,
    },
    {
      name: "Sarah Putri",
      role: "Partnership Coordinator",
      email: "sarah@activisthub.id",
      avatar: <FaUserCircle />,
    },
    {
      name: "Budi Santoso",
      role: "Technical Support",
      email: "budi@activisthub.id",
      avatar: <FaUserCircle />,
    },
    {
      name: "Maya Sari",
      role: "Event Coordinator",
      email: "maya@activisthub.id",
      avatar: <FaUserCircle />,
    },
  ];

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hubungi Kami</h1>
            <p>
              Kami siap mendengar dari Anda. Mari berkolaborasi untuk
              menciptakan perubahan positif bersama.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container">
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-card">
                <div className="info-icon" style={{ color: info.color }}>
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                <p style={{ whiteSpace: "pre-line" }}>{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Kirim Pesan</h2>
                <p>Isi formulir di bawah ini dan kami akan segera merespon</p>
              </div>

              {submitStatus === "success" && (
                <div className="success-message">
                  <span>✅</span>
                  <p>
                    Pesan Anda telah terkirim! Kami akan segera menghubungi
                    Anda.
                  </p>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subjek *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Apa yang ingin Anda diskusikan?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Pesan *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tuliskan pesan Anda di sini..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pesan"
                  )}
                </button>
              </form>
            </div>

            <div className="map-section">
              <div className="map-header">
                <h2>Lokasi Kami</h2>
                <p>Kunjungi kantor kami di Kampus PeTIK Depok</p>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7897654321!2d106.7769512!3d-6.387473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e92c0df5da9d:0x8499222ee6779470!2sPeTIK+(Pesantren+Teknologi+Informasi+dan+Komunikasi)+Program+Kuliah+IT+Gratis+Binaan+YBM+PLN!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "20px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - PeTIK Location"
                ></iframe>
              </div>
              <div className="map-info">
                <div className="info-item">
                  <span className="info-label">Alamat:</span>
                  <span>Kampus PeTIK Depok, Depok, Jawa Barat</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Koordinat:</span>
                  <span>-6.387473° S, 106.7769512° E</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Parkir:</span>
                  <span>Tersedia area parkir luas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Tim yang Siap Membantu</h2>
            <p>Hubungi langsung tim kami sesuai kebutuhan Anda</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">
                  <span>{member.avatar}</span>
                </div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <a href={`mailto:${member.email}`} className="member-email">
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-link-section">
        <div className="container">
          <div className="faq-content">
            <h2>Punya Pertanyaan?</h2>
            <p>
              Lihat FAQ kami untuk jawaban cepat atas pertanyaan yang sering
              diajukan
            </p>
            <button className="faq-btn" onClick={handleFAQ}>Lihat FAQ</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
