import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import "./MyFooter.css";

const MyFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Tentang Kami", path: "/about" },
      { name: "Dampak Kami", path: "/impact" },
      { name: "FAQ", path: "/faq" },
      { name: "Kontak", path: "/contact" },
    ],
    events: [
      { name: "Cari Event", path: "/dashboard" },
      { name: "Buat Event", path: "/create-event" },
    ],
    support: [
      { name: "Panduan", path: "/guide" },
      { name: "Kebijakan Privasi", path: "/privacy" },
      { name: "Syarat & Ketentuan", path: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook", url: "#" },
    { icon: <FaTwitter />, name: "Twitter", url: "#" },
    { icon: <FaInstagram />, name: "Instagram", url: "#" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", url: "#" },
    { icon: <FaYoutube />, name: "YouTube", url: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <FaHeart />
                </div>
                <span className="logo-text">ActivistHub</span>
              </div>
              <p className="footer-description">
                Platform digital yang menghubungkan volunteer dengan kegiatan
                sosial untuk menciptakan dampak positif di masyarakat.
              </p>
              <div className="footer-social">
                <h4>Ikuti Kami</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="social-link"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-links-section">
              <div className="links-column">
                <h3>Platform</h3>
                <ul className="footer-links">
                  {footerLinks.platform.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="links-column">
                <h3>Events</h3>
                <ul className="footer-links">
                  {footerLinks.events.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="links-column">
                <h3>Dukungan</h3>
                <ul className="footer-links">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

                          </div>

            <div className="footer-contact">
              <h3>Hubungi Kami</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FaEnvelope />
                  <span>info@activisthub.id</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>

              <div className="newsletter">
                <h4>Newsletter</h4>
                <p>Dapatkan update event terbaru</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Email Anda" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                © {currentYear} ActivistHub. Dibuat dengan{" "}
                <FaHeart className="heart-icon" /> untuk Indonesia
              </p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy">Kebijakan Privasi</Link>
              <span className="separator">|</span>
              <Link to="/terms">Syarat & Ketentuan</Link>
              <span className="separator">|</span>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-decoration">
        <div className="footer-shape shape-1"></div>
        <div className="footer-shape shape-2"></div>
        <div className="footer-shape shape-3"></div>
      </div>
    </footer>
  );
};

export default MyFooter;
