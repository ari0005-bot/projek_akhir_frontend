import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Videos.css";
import {
  FaPlay,
  FaClock,
  FaUser,
  FaCheckCircle,
  FaStar,
  FaBook,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaArrowLeft,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaDownload,
  FaClosedCaptioning,
  FaVolumeUp,
  FaExpand,
  FaCompress,
  FaStepForward,
  FaStepBackward,
  FaPause,
  FaStop,
  FaHeart,
  FaBookmark,
  FaEye,
  FaGraduationCap,
  FaHandshake,
  FaRocket,
  FaUsers,
  FaTools,
  FaLightbulb,
  FaQuestionCircle,
} from "react-icons/fa";

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = [
    { id: "all", name: "Semua Video", icon: <FaPlay /> },
    { id: "getting-started", name: "Memulai", icon: <FaRocket /> },
    { id: "finding-events", name: "Mencari Event", icon: <FaSearch /> },
    { id: "joining-events", name: "Bergabung Event", icon: <FaUsers /> },
    { id: "creating-events", name: "Membuat Event", icon: <FaCalendarAlt /> },
    { id: "best-practices", name: "Best Practices", icon: <FaStar /> },
    { id: "troubleshooting", name: "Troubleshooting", icon: <FaTools /> },
  ];

  const videosData = [
    {
      id: 1,
      title: "Cara Daftar Akun ActivistHub",
      description:
        "Panduan lengkap langkah demi langkah untuk membuat akun baru di ActivistHub",
      category: "getting-started",
      duration: "5:30",
      views: 15420,
      thumbnail:
        "https://via.placeholder.com/300x200/22c55e/ffffff?text=Daftar+Akun",
      videoUrl: "#",
      level: "Pemula",
      tags: ["pendaftaran", "akun", "verifikasi"],
      chapters: [
        { title: "Pengantar Platform", time: "0:00" },
        { title: "Formulir Pendaftaran", time: "1:30" },
        { title: "Verifikasi Email", time: "3:00" },
        { title: "Lengkapi Profil", time: "4:30" },
      ],
      instructor: "Tim ActivistHub",
      uploadDate: "15 April 2025",
      rating: 4.8,
      likes: 892,
      comments: 156,
    },
    {
      id: 2,
      title: "Mencari Kegiatan Sosial yang Tepat",
      description:
        "Tips dan trik untuk menemukan kegiatan sosial yang sesuai dengan minat dan jadwal Anda",
      category: "finding-events",
      duration: "7:15",
      views: 12350,
      thumbnail:
        "https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Mencari+Event",
      videoUrl: "#",
      level: "Pemula",
      tags: ["pencarian", "filter", "minat"],
      chapters: [
        { title: "Fitur Pencarian", time: "0:00" },
        { title: "Filter Kategori", time: "2:00" },
        { title: "Pencarian Lokasi", time: "4:30" },
        { title: "Save Favorit", time: "6:00" },
      ],
      instructor: "Sarah Putri",
      uploadDate: "12 April 2025",
      rating: 4.6,
      likes: 745,
      comments: 98,
    },
    {
      id: 3,
      title: "Mendaftar sebagai Relawan",
      description:
        "Proses lengkap pendaftaran dan partisipasi sebagai relawan dalam kegiatan sosial",
      category: "joining-events",
      duration: "6:45",
      views: 18920,
      thumbnail:
        "https://via.placeholder.com/300x200/22c55e/ffffff?text=Daftar+Relawan",
      videoUrl: "#",
      level: "Pemula",
      tags: ["pendaftaran", "relawan", "partisipasi"],
      chapters: [
        { title: "Pilih Kegiatan", time: "0:00" },
        { title: "Formulir Pendaftaran", time: "1:45" },
        { title: "Konfirmasi Kehadiran", time: "3:30" },
        { title: "Persiapan Hari H", time: "5:30" },
      ],
      instructor: "Ahmad Rizki",
      uploadDate: "10 April 2025",
      rating: 4.9,
      likes: 1203,
      comments: 234,
    },
    {
      id: 4,
      title: "Membuat Event Sosial Pertama",
      description:
        "Panduan lengkap untuk organizer pemula dalam membuat dan mengelola kegiatan sosial",
      category: "creating-events",
      duration: "10:20",
      views: 25670,
      thumbnail:
        "https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Membuat+Event",
      videoUrl: "#",
      level: "Menengah",
      tags: ["organizer", "event", "pemula"],
      chapters: [
        { title: "Dashboard Overview", time: "0:00" },
        { title: "Formulir Event", time: "2:00" },
        { title: "Pengaturan Lokasi", time: "4:30" },
        { title: "Promosi Event", time: "7:00" },
        { title: "Manage Participants", time: "9:00" },
      ],
      instructor: "Budi Santoso",
      uploadDate: "8 April 2025",
      rating: 4.7,
      likes: 1567,
      comments: 312,
    },
    {
      id: 5,
      title: "Best Practices untuk Relawan",
      description:
        "Tips dan praktik terbaik untuk menjadi relawan yang efektif dan berdampak",
      category: "best-practices",
      duration: "8:30",
      views: 22150,
      thumbnail:
        "https://via.placeholder.com/300x200/f59e0b/ffffff?text=Best+Practices",
      videoUrl: "#",
      level: "Menengah",
      tags: ["tips", "praktik", "relawan"],
      chapters: [
        { title: "Mindset Relawan", time: "0:00" },
        { title: "Komunikasi Efektif", time: "2:30" },
        { title: "Teamwork", time: "5:00" },
        { title: "Dokumentasi", time: "7:30" },
      ],
      instructor: "Maya Sari",
      uploadDate: "5 April 2025",
      rating: 4.8,
      likes: 987,
      comments: 189,
    },
    {
      id: 6,
      title: "Troubleshooting Umum Platform",
      description:
        "Solusi untuk masalah teknis yang sering dihadapi pengguna ActivistHub",
      category: "troubleshooting",
      duration: "9:15",
      views: 8900,
      thumbnail:
        "https://via.placeholder.com/300x200/ef4444/ffffff?text=Troubleshooting",
      videoUrl: "#",
      level: "Semua",
      tags: ["troubleshooting", "teknis", "bantuan"],
      chapters: [
        { title: "Login Issues", time: "0:00" },
        { title: "Payment Problems", time: "3:00" },
        { title: "App Crashes", time: "6:00" },
        { title: "Contact Support", time: "8:00" },
      ],
      instructor: "Tim Support",
      uploadDate: "3 April 2025",
      rating: 4.5,
      likes: 543,
      comments: 87,
    },
  ];

  const filteredVideos = videosData.filter((video) => {
    const matchesCategory =
      activeCategory === "all" || video.category === activeCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < Math.floor(rating) ? "filled" : "empty"} />
    ));
  };

  return (
    <div className="videos-container">
      <section className="videos-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <FaPlay />
            </div>
            <h1>Video Tutorial</h1>
            <p>
              Panduan visual lengkap untuk memaksimalkan pengalaman Anda di
              ActivistHub
            </p>
            <div className="hero-stats">
              <div className="stat">
                <FaGraduationCap />
                <span>50+ Video Tutorial</span>
              </div>
              <div className="stat">
                <FaClock />
                <span>6+ Jam Konten</span>
              </div>
              <div className="stat">
                <FaUsers />
                <span>100K+ Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="search-filter-section">
        <div className="container">
          <div className="search-filter-container">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Cari video tutorial..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="videos-grid-section">
        <div className="container">
          <div className="videos-grid">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="video-card"
                onClick={() => handleVideoSelect(video)}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-overlay">
                    <FaPlay />
                  </div>
                  <div className="duration-badge">
                    <FaClock />
                    <span>{video.duration}</span>
                  </div>
                  <div className="level-badge">
                    <span>{video.level}</span>
                  </div>
                </div>

                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>

                  <div className="video-meta">
                    <div className="meta-item">
                      <FaEye />
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                    <div className="meta-item">
                      <FaCalendarAlt />
                      <span>{video.uploadDate}</span>
                    </div>
                    <div className="meta-item">
                      <FaUser />
                      <span>{video.instructor}</span>
                    </div>
                  </div>

                  <div className="video-stats">
                    <div className="rating">
                      {renderStars(video.rating)}
                      <span>{video.rating}</span>
                    </div>
                    <div className="engagement">
                      <div className="engagement-item">
                        <FaThumbsUp />
                        <span>{video.likes}</span>
                      </div>
                      <div className="engagement-item">
                        <FaComment />
                        <span>{video.comments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="video-tags">
                    {video.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="video-player-modal"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="player-header">
              <h2>{selectedVideo.title}</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>
            </div>

            <div className="video-player">
              <div className="video-container">
                <div className="video-placeholder">
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                  />
                  <div className="play-button-large" onClick={handlePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </div>
                </div>

                <div className="video-controls">
                  <div className="progress-bar" onClick={handleSeek}>
                    <div
                      className="progress-filled"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="control-buttons">
                  <div className="left-controls">
                    <button className="control-btn">
                      <FaStepBackward />
                    </button>
                    <button className="control-btn" onClick={handlePlayPause}>
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button className="control-btn">
                      <FaStepForward />
                    </button>
                  </div>

                  <div className="right-controls">
                    <button
                      className="control-btn"
                      onClick={() =>
                        setPlaybackSpeed(
                          playbackSpeed === 2 ? 0.5 : playbackSpeed * 2,
                        )
                      }
                    >
                      {playbackSpeed}x
                    </button>
                    <button className="control-btn" onClick={toggleFullscreen}>
                      {isFullscreen ? <FaCompress /> : <FaExpand />}
                    </button>
                  </div>
                </div>

                <div className="bottom-controls">
                  <div className="time-display">
                    <span>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="volume-control">
                    <FaVolumeUp />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="player-sidebar">
            <div className="video-details">
              <h3>Detail Video</h3>
              <div className="detail-item">
                <FaUser />
                <span>Instructor: {selectedVideo.instructor}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt />
                <span>Upload: {selectedVideo.uploadDate}</span>
              </div>
              <div className="detail-item">
                <FaClock />
                <span>Durasi: {selectedVideo.duration}</span>
              </div>
              <div className="detail-item">
                <FaEye />
                <span>{selectedVideo.views.toLocaleString()} views</span>
              </div>
              <div className="detail-item">
                <FaStar />
                <span>Rating: {selectedVideo.rating}/5.0</span>
              </div>
            </div>

            <div className="video-chapters">
              <h3>Bab Video</h3>
              <div className="chapters-list">
                {selectedVideo.chapters.map((chapter, index) => (
                  <div key={index} className="chapter-item">
                    <span className="chapter-time">{chapter.time}</span>
                    <span className="chapter-title">{chapter.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="video-actions">
              <button className="action-btn">
                <FaThumbsUp />
                <span>{selectedVideo.likes}</span>
              </button>
              <button className="action-btn">
                <FaComment />
                <span>{selectedVideo.comments}</span>
              </button>
              <button className="action-btn">
                <FaShare />
                <span>Bagikan</span>
              </button>
              <button className="action-btn">
                <FaDownload />
                <span>Download</span>
              </button>
              <button className="action-btn">
                <FaBookmark />
                <span>Simpan</span>
              </button>
            </div>

            <div className="video-tags">
              <h3>Tags</h3>
              <div className="tags-list">
                {selectedVideo.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Videos;
