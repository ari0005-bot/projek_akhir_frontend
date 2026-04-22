import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMessages.css";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaReply,
  FaArrowLeft,
  FaInbox,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const UserMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    console.log("User info from localStorage:", userInfo);

    if (!userInfo) {
      console.log("No user info found, redirecting to login");
      alert("Anda harus login terlebih dahulu untuk melihat pesan.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userInfo);
    console.log("Parsed user:", user);

    if (!user.email) {
      console.log("User has no email, redirecting to login");
      alert("Data user tidak lengkap. Silakan login kembali.");
      navigate("/login");
      return;
    }

    setUserEmail(user.email);
    console.log("User email set:", user.email);

    const storedMessages = localStorage.getItem("contactMessages");
    console.log("Stored messages:", storedMessages);

    if (storedMessages) {
      const allMessages = JSON.parse(storedMessages);
      console.log("All messages:", allMessages);

      const userMessages = allMessages.filter(
        (msg) => msg.email === user.email,
      );
      console.log("User messages:", userMessages);
      setMessages(userMessages);
    } else {
      console.log("No stored messages found");
    }
  }, [navigate]);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const getStatusIcon = (message) => {
    if (message.replies && message.replies.length > 0) {
      return <FaReply className="status-icon replied" />;
    } else if (message.status === "read") {
      return <FaEnvelopeOpen className="status-icon read" />;
    } else {
      return <FaEnvelope className="status-icon unread" />;
    }
  };

  const getStatusText = (message) => {
    if (message.replies && message.replies.length > 0) {
      return "Dibalas";
    } else if (message.status === "read") {
      return "Dibaca";
    } else {
      return "Belum Dibaca";
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="user-messages-container">
      <section className="user-messages-header">
        <div className="container">
          <div className="header-content">
            <div className="header-info">
              <button className="back-btn" onClick={handleBack}>
                <FaArrowLeft />
                Kembali ke Dashboard
              </button>
              <h1>
                <FaInbox />
                Pesan Saya
              </h1>
              <p>
                Lihat pesan yang Anda kirim dan balasan dari admin/organizer
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{messages.length}</span>
                <span className="stat-label">Total Pesan</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {
                    messages.filter(
                      (msg) => msg.replies && msg.replies.length > 0,
                    ).length
                  }
                </span>
                <span className="stat-label">Dibalas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="user-messages-section">
        <div className="container">
          <div className="user-messages-layout">
            {/* Messages List */}
            <div className="user-messages-list">
              {messages.length === 0 ? (
                <div className="no-messages">
                  <FaEnvelope className="no-messages-icon" />
                  <h3>Belum Ada Pesan</h3>
                  <p>
                    Anda belum mengirim pesan apa pun. Kunjungi halaman kontak
                    untuk mengirim pesan.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/contact")}
                  >
                    Kirim Pesan
                  </button>
                </div>
              ) : (
                <div className="messages-grid">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-card ${selectedMessage?.id === message.id ? "selected" : ""}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="message-header">
                        <div className="message-sender">
                          {getStatusIcon(message)}
                          <div>
                            <h4>{message.subject}</h4>
                            <p className="message-preview">
                              {message.message.substring(0, 100)}...
                            </p>
                          </div>
                        </div>
                        <div className="message-meta">
                          <span className="message-status">
                            {getStatusText(message)}
                          </span>
                          <span className="message-time">
                            <FaClock />
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedMessage && (
              <div className="message-detail">
                <div className="detail-header">
                  <h3>{selectedMessage.subject}</h3>
                  <div className="detail-meta">
                    <span className="detail-time">
                      <FaClock />
                      {formatDate(selectedMessage.timestamp)}
                    </span>
                    <span className="detail-status">
                      {getStatusText(selectedMessage)}
                    </span>
                  </div>
                </div>

                <div className="detail-content">
                  <div className="original-message">
                    <h4>Pesan Anda:</h4>
                    <p>{selectedMessage.message}</p>
                  </div>

                  {selectedMessage.replies &&
                    selectedMessage.replies.length > 0 && (
                      <div className="replies-section">
                        <h4>
                          <FaReply />
                          Balasan dari{" "}
                          {
                            selectedMessage.replies[
                              selectedMessage.replies.length - 1
                            ].sender
                          }
                          :
                        </h4>
                        {selectedMessage.replies.map((reply, index) => (
                          <div key={index} className="reply-item">
                            <div className="reply-header">
                              <span className="reply-sender">
                                {reply.sender}
                              </span>
                              <span className="reply-time">
                                {formatDate(reply.timestamp)}
                              </span>
                            </div>
                            <div className="reply-text">{reply.text}</div>
                          </div>
                        ))}
                      </div>
                    )}

                  {(!selectedMessage.replies ||
                    selectedMessage.replies.length === 0) && (
                    <div className="no-reply">
                      <FaClock />
                      <p>
                        Belum ada balasan. Admin/organizer akan segera merespons
                        pesan Anda.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserMessages;
