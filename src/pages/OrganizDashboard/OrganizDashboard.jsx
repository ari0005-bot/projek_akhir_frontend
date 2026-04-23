import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserCheck, FaInbox, FaSearch } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";
import { getEvents, deleteEvent, createEvent } from "../../services/api";
import { SiEventstore } from "react-icons/si";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./OrganizDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const OrganizDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [participants, setParticipants] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const totalEvents = events.length;
  const totalRegistrations = registeredEvents.length;
  const totalParticipants = Object.values(participants).flat().length;
  const pendingRegistrations = registeredEvents.filter(
    (reg) => reg.status === "Menunggu Verifikasi",
  ).length;
  const acceptedRegistrations = registeredEvents.filter(
    (reg) => reg.status === "Terdaftar",
  ).length;

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryStats = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});
  const categoryChartData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        label: "Jumlah Event",
        data: Object.values(categoryStats),
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(14, 165, 233, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const registrationStatusData = {
    labels: ["Diterima", "Menunggu Verifikasi"],
    datasets: [
      {
        data: [acceptedRegistrations, pendingRegistrations],
        backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(251, 191, 36, 0.8)"],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(251, 191, 36, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
            weight: "bold",
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 11,
            weight: "600",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: "600",
          },
        },
      },
    },
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserRole(parsedUser.role);
    }
    fetchData();

    const selectedEvent = localStorage.getItem("selectedEvent");
    if (selectedEvent) {
      localStorage.removeItem("selectedEvent");
    }
  }, []);

  const fetchData = async () => {
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
      localEvents.forEach((localEvent) => {
        if (!allEvents.find((event) => event.id === localEvent.id)) {
          allEvents.push(localEvent);
        }
      });

      setEvents(allEvents);

      const registered = localStorage.getItem("registeredEvents");
      const registeredEventsData = registered ? JSON.parse(registered) : [];
      setRegisteredEvents(registeredEventsData);

      const participantsData = localStorage.getItem("eventParticipants");
      let participants = participantsData ? JSON.parse(participantsData) : {};

      const syncedParticipants = {};
      registeredEventsData.forEach((reg) => {
        if (!syncedParticipants[reg.eventId]) {
          syncedParticipants[reg.eventId] = [];
        }
        syncedParticipants[reg.eventId].push(reg);
      });

      Object.keys(participants).forEach((eventId) => {
        if (!syncedParticipants[eventId]) {
          syncedParticipants[eventId] = participants[eventId];
        }
      });

      setParticipants(syncedParticipants);
      localStorage.setItem(
        "eventParticipants",
        JSON.stringify(syncedParticipants),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEventRegistration = (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const newReg = {
      eventId,
      userId: user.id || user.email,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone || "",
      status: "Menunggu Verifikasi",
    };

    const updated = [...registeredEvents, newReg];
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));

    const updatedParticipants = {
      ...participants,
      [eventId]: [...(participants[eventId] || []), newReg],
    };

    setParticipants(updatedParticipants);
    localStorage.setItem(
      "eventParticipants",
      JSON.stringify(updatedParticipants),
    );

    alert("Berhasil daftar!");
  };

  const handleAcceptParticipant = (eventId, email) => {
    const updated = { ...participants };

    updated[eventId] = updated[eventId].map((p) =>
      p.userEmail === email ? { ...p, status: "Terdaftar" } : p,
    );

    setParticipants(updated);
    localStorage.setItem("eventParticipants", JSON.stringify(updated));

    const updatedRegisteredEvents = registeredEvents.map((reg) =>
      reg.eventId === eventId && reg.userEmail === email
        ? { ...reg, status: "Terdaftar" }
        : reg,
    );
    setRegisteredEvents(updatedRegisteredEvents);
    localStorage.setItem(
      "registeredEvents",
      JSON.stringify(updatedRegisteredEvents),
    );
  };

  
  const isUserRegistered = (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return false;

    return registeredEvents.some(
      (r) => r.eventId === eventId && r.userId === (user.id || user.email),
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus event ini?")) {
      try {
        await deleteEvent(id);
        alert("Event berhasil dihapus!");
      } catch (error) {
        console.error("API Error, using localStorage for delete:", error);
        const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
        const updatedEvents = existingEvents.filter((e) => e.id !== id);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        alert("Event berhasil dihapus!");
      }
      setEvents(events.filter((e) => e.id !== id));
    }
  };
  if (userRole === "admin") {
    navigate("/admin-dashboard");
    return <div>Loading...</div>;
  }

  if (userRole === "organizer") {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Dashboard Organizer</h2>
          <div className="header-buttons">
            <button
              className="btn btn-primary btn-add"
              onClick={() => navigate("/create-event")}
            >
              + Tambah Event
            </button>
            <button
              className="btn btn-messages"
              onClick={() => navigate("/messages")}
            >
              ? Pesan Masuk
            </button>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <SiEventstore />
            </div>
            <div className="stat-content">
              <h3>{events.length}</h3>
              <p>Total Event</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <HiMiniUserGroup />
            </div>
            <div className="stat-content">
              <h3>{Object.values(participants).flat().length}</h3>
              <p>Total Pendaftar</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUserCheck />
            </div>
            <div className="stat-content">
              <h3>
                {
                  registeredEvents.filter((reg) => reg.status === "Terdaftar")
                    .length
                }
              </h3>
              <p>Diterima</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <ImSpinner3 />
            </div>
            <div className="stat-content">
              <h3>
                {
                  registeredEvents.filter(
                    (reg) => reg.status === "Menunggu Verifikasi",
                  ).length
                }
              </h3>
              <p>Menunggu Verifikasi</p>
            </div>
          </div>
        </div>

        <div className="charts-section">
          <h3>Visualisasi Data</h3>
          <div className="charts-grid">
            <div className="chart-card">
              <h4>Distribusi Kategori Event</h4>
              <div className="chart-container">
                <Bar data={categoryChartData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-card">
              <h4>Status Pendaftaran</h4>
              <div className="chart-container pie-chart">
                <Pie
                  data={registrationStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          font: {
                            size: 12,
                            weight: "bold",
                          },
                          padding: 15,
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        padding: 12,
                        cornerRadius: 8,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="detailed-stats-section">
          <h3>Statistik Detail</h3>
          <div className="detailed-stats-grid">
            <div className="detail-stat-card">
              <h4>Performa Event</h4>
              <div className="performance-metrics">
                <div className="metric">
                  <span className="metric-label">
                    Rata-rata Pendaftar per Event
                  </span>
                  <span className="metric-value">
                    {events.length > 0
                      ? Math.round(
                          Object.values(participants).flat().length /
                            events.length,
                        )
                      : 0}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">
                    Event dengan Pendaftar Terbanyak
                  </span>
                  <span className="metric-value">
                    {events.length > 0
                      ? events.reduce((max, event) =>
                          (participants[event.id]?.length || 0) >
                          (participants[max.id]?.length || 0)
                            ? event
                            : max,
                        ).title
                      : "Tidak ada"}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Tingkat Penerimaan</span>
                  <span className="metric-value">
                    {registeredEvents.length > 0
                      ? Math.round(
                          (registeredEvents.filter(
                            (reg) => reg.status === "Terdaftar",
                          ).length /
                            registeredEvents.length) *
                            100,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-section">
          <h3>Daftar Event</h3>
          <div style={{marginBottom: '20px'}}>
            <div style={{position: 'relative', maxWidth: '400px'}}>
              <FaSearch style={{position: 'absolute', left: '10px', top: '12px', color: '#999'}} />
              <input
                type="text"
                placeholder="Cari event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 35px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
          <div className="table-wrapper">
            {loading ? (
              <div className="loading-state">Loading...</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((e) => (
                    <tr key={e.id}>
                      <td>{e.title}</td>
                      <td>
                        <span className="badge-category">{e.category}</span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(e.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="participants-section">
          <h3>Peserta Event</h3>
          <div className="participants-grid">
            {events.map((e) => (
              <div key={e.id} className="participant-card">
                <div className="participant-header">
                  <h4>{e.title}</h4>
                  <span className="participant-count">
                    {participants[e.id]?.length || 0} peserta
                  </span>
                </div>
                <div className="participants-list">
                  {(participants[e.id] || []).length > 0 ? (
                    (participants[e.id] || []).map((p, i) => (
                      <div key={i} className="participant-item">
                        <div className="participant-info">
                          <strong>{p.userName}</strong>
                          <span>{p.userEmail}</span>
                        </div>
                        <div className="participant-right-section">
                          <span
                            className={`status-badge ${p.status === "Terdaftar" ? "accepted" : "pending"}`}
                          >
                            {p.status}
                          </span>
                          <div className="participant-actions">
                            {p.status === "Menunggu Verifikasi" && (
                              <button
                                className="btn-accept"
                                onClick={() =>
                                  handleAcceptParticipant(e.id, p.userEmail)
                                }
                              >
                                Terima
                              </button>
                            )}
                                                      </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-participants">Belum ada peserta</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (userRole === "volunteer" || userRole === "user") {
    const user = JSON.parse(localStorage.getItem("user"));
    const roleLabel = userRole === "volunteer" ? "Volunteer" : "User";

    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Dashboard {roleLabel}</h2>
          <div className="header-buttons">
            <button
              className="btn btn-messages"
              onClick={() => navigate("/user-messages")}
            >
              <FaInbox />
              Pesan Saya
            </button>
          </div>
          <div className="volunteer-stats">
            <div className="stat-item">
              <span className="stat-number">{events.length}</span>
              <span className="stat-label">Event Tersedia</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{registeredEvents.length}</span>
              <span className="stat-label">Event Diikuti</span>
            </div>
          </div>
        </div>

        <div className="my-events-section">
          <h3>Event Tersedia</h3>
          <div style={{marginBottom: '20px'}}>
            <div style={{position: 'relative', maxWidth: '400px'}}>
              <FaSearch style={{position: 'absolute', left: '10px', top: '12px', color: '#999'}} />
              <input
                type="text"
                placeholder="Cari event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 35px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
          <div className="cards-container">
            {filteredEvents.map((e) => {
              const reg = registeredEvents.find(
                (r) =>
                  r.eventId === e.id && r.userId === (user?.id || user?.email),
              );

              return (
                <div key={e.id} className="event-card volunteer-card">
                  <div className="card-image">
                    {e.image ? (
                      <img src={e.image} alt={e.title} />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#64748b",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        No Image
                      </div>
                    )}
                    <div className="card-overlay">
                      <span className="badge-category">{e.category}</span>
                      {reg && (
                        <span
                          className={`registration-status ${reg.status === "Terdaftar" ? "registered" : "not-registered"}`}
                        >
                          {reg.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <div className="event-location">📍 {e.location}</div>
                    </div>
                    <h3 className="event-title">{e.title}</h3>
                    <p className="event-description">{e.description}</p>
                    <div className="card-meta">
                      <span className="event-category-badge">{e.category}</span>
                    </div>
                    <div className="card-actions">
                      {reg ? (
                        <button className="btn-book registered-btn" disabled>
                          {reg.status}
                        </button>
                      ) : (
                        <button
                          className="btn-book"
                          onClick={() => handleEventRegistration(e.id)}
                        >
                          Daftar Event
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <p>Loading dashboard...</p>;
};

export default OrganizDashboard;
