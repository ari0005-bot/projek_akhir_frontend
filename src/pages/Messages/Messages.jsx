import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaReply,
  FaTrash,
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaCalendarAlt,
  FaClock,
  FaReplyAll,
  FaPaperPlane,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaArrowLeft,
} from "react-icons/fa";
import { messageUtils } from "../../utils/messageUtils";

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role || "volunteer";
  };

  const userRole = getUserRole();

  useEffect(() => {
    if (userRole !== "admin" && userRole !== "organizer") {
      navigate("/dashboard");
      return;
    }

    const loadedMessages = messageUtils.getMessages();
    const messagesWithStatus = loadedMessages.map((msg) => ({
      ...msg,
      status: msg.status || "unread",
      timestamp: msg.timestamp || new Date().toISOString(),
    }));

    setMessages(messagesWithStatus);
    setFilteredMessages(messagesWithStatus);
  }, [navigate, userRole]);

  useEffect(() => {
    let filtered = messages;

    if (statusFilter !== "all") {
      filtered = filtered.filter((msg) => msg.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((msg) => msg.type === typeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredMessages(filtered);
  }, [messages, searchTerm, statusFilter, typeFilter]);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);

    if (message.status === "unread") {
      const updatedMessages = messages.map((msg) =>
        msg.id === message.id ? { ...msg, status: "read" } : msg,
      );
      setMessages(updatedMessages);
      messageUtils.updateMessageStatus(message.id, "read");
    }
  };

  const handleDelete = (messageId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      const updatedMessages = messages.filter((msg) => msg.id !== messageId);
      setMessages(updatedMessages);
      messageUtils.deleteMessage(messageId);

      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) {
      alert("Silakan masukkan balasan Anda");
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      const replyData = {
        text: replyText,
        sender: userRole,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = messages.map((msg) =>
        msg.id === selectedMessage.id
          ? {
              ...msg,
              replies: [...(msg.replies || []), replyData],
              status: "replied",
            }
          : msg,
      );

      setMessages(updatedMessages);
      messageUtils.addReply(selectedMessage.id, replyData);

      setReplyText("");
      setShowReplyModal(false);
      setIsSending(false);

      alert("Balasan berhasil dikirim!");
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      unread: { label: "Baru", color: "#ef4444", icon: <FaEnvelope /> },
      read: { label: "Dibaca", color: "#6b7280", icon: <FaEnvelopeOpen /> },
      replied: { label: "Dibalas", color: "#22c55e", icon: <FaReply /> },
    };

    const config = statusConfig[status] || statusConfig.unread;
    return (
      <span className="status-badge" style={{ backgroundColor: config.color }}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      contact_form: { label: "Formulir Kontak", color: "#3b82f6" },
      volunteer: { label: "Relawan", color: "#22c55e" },
      organizer: { label: "Organizer", color: "#f59e0b" },
      general: { label: "Umum", color: "#8b5cf6" },
    };

    const config = typeConfig[type] || typeConfig.general;
    return (
      <span className="type-badge" style={{ backgroundColor: config.color }}>
        {config.label}
      </span>
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return (
        "Hari ini, " +
        date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } else if (diffDays === 1) {
      return (
        "Kemarin, " +
        date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } else if (diffDays < 7) {
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const getUnreadCount = () => {
    return messages.filter((msg) => msg.status === "unread").length;
  };

  return (
    <div className="messages-container">
      <section className="messages-header">
        <div className="container">
          <div className="header-content">
            <div className="header-info">
              <h1>Pesan Masuk</h1>
              <p>Kelola pesan dari pengguna dan relawan</p>
              {getUnreadCount() > 0 && (
                <div className="unread-indicator">
                  <FaExclamationTriangle />
                  <span>{getUnreadCount()} pesan baru</span>
                </div>
              )}
            </div>
            <button 
              className="btn-back"
              onClick={() => navigate("/dashboard")}
            >
              <FaArrowLeft />
              Kembali
            </button>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{messages.length}</span>
                <span className="stat-label">Total Pesan</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{getUnreadCount()}</span>
                <span className="stat-label">Belum Dibaca</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Cari pesan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Semua Status</option>
                <option value="unread">Belum Dibaca</option>
                <option value="read">Sudah Dibaca</option>
                <option value="replied">Sudah Dibalas</option>
              </select>
            </div>

            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Semua Tipe</option>
                <option value="contact_form">Formulir Kontak</option>
                <option value="volunteer">Relawan</option>
                <option value="organizer">Organizer</option>
                <option value="general">Umum</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="messages-section">
        <div className="container">
          <div className="messages-layout">
            <div className="messages-list">
              {filteredMessages.length === 0 ? (
                <div className="no-messages">
                  <FaEnvelope className="no-messages-icon" />
                  <h3>Tidak Ada Pesan</h3>
                  <p>
                    Belum ada pesan yang sesuai dengan filter yang Anda pilih.
                  </p>
                </div>
              ) : (
                <div className="messages-grid">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-card ${message.status === "unread" ? "unread" : ""} ${selectedMessage?.id === message.id ? "selected" : ""}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="message-header">
                        <div className="message-sender">
                          <FaUserCircle className="sender-avatar" />
                          <div className="sender-info">
                            <h4>{message.name}</h4>
                            <p>{message.email}</p>
                          </div>
                        </div>
                        <div className="message-meta">
                          {getStatusBadge(message.status)}
                          <span className="message-time">
                            <FaClock />
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      </div>

                      <div className="message-content">
                        <h5>{message.subject}</h5>
                        <p>
                          {message.message.substring(0, 150)}
                          {message.message.length > 150 ? "..." : ""}
                        </p>
                        {getTypeBadge(message.type)}
                      </div>

                      <div className="message-actions">
                        <button
                          className="action-btn delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                          title="Hapus"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedMessage && (
              <div className="message-detail">
                <div className="detail-header">
                  <h3>Detail Pesan</h3>
                  <button
                    className="close-btn"
                    onClick={() => setSelectedMessage(null)}
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="detail-content">
                  <div className="sender-details">
                    <FaUserCircle className="sender-avatar-large" />
                    <div className="sender-info">
                      <h4>{selectedMessage.name}</h4>
                      <p>{selectedMessage.email}</p>
                      <div className="message-meta-detail">
                        <span className="meta-item">
                          <FaCalendarAlt />
                          {formatDate(selectedMessage.timestamp)}
                        </span>
                        {getStatusBadge(selectedMessage.status)}
                        {getTypeBadge(selectedMessage.type)}
                      </div>
                    </div>
                  </div>

                  <div className="message-subject">
                    <h5>Subjek: {selectedMessage.subject}</h5>
                  </div>

                  <div className="message-full">
                    <p>{selectedMessage.message}</p>
                  </div>

                  {selectedMessage.replies &&
                    selectedMessage.replies.length > 0 && (
                      <div className="replies-section">
                        <h4>Riwayat Balasan</h4>
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
                            <p className="reply-text">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                <div className="detail-actions">
                  <button
                    className="btn-primary"
                    onClick={() => setShowReplyModal(true)}
                  >
                    <FaReply />
                    Balas Pesan
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <FaTrash />
                    Hapus Pesan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showReplyModal && (
        <div className="modal-overlay">
          <div className="reply-modal">
            <div className="modal-header">
              <h3>Balas Pesan</h3>
              <button
                className="close-btn"
                onClick={() => setShowReplyModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-content">
              <div className="original-message">
                <h4>Pesan Asli:</h4>
                <p>
                  <strong>Dari:</strong> {selectedMessage.name} (
                  {selectedMessage.email})
                </p>
                <p>
                  <strong>Subjek:</strong> {selectedMessage.subject}
                </p>
                <p>
                  <strong>Pesan:</strong> {selectedMessage.message}
                </p>
              </div>

              <div className="reply-form">
                <label htmlFor="reply-text">Balasan Anda:</label>
                <textarea
                  id="reply-text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Ketik balasan Anda di sini..."
                  rows="6"
                  className="reply-textarea"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowReplyModal(false)}
              >
                Batal
              </button>
              <button
                className="btn-primary"
                onClick={handleReply}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <FaPaperPlane className="spinning" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Kirim Balasan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
