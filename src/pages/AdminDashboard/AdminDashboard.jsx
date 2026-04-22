import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  getEvents,
  deleteEvent,
  deleteUser,
} from "../../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [participants, setParticipants] = useState({});

  useEffect(() => {
    fetchData();
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

      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      setUsers(localUsers);

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus event ini?")) {
      try {
        await deleteEvent(id);
      } catch (error) {
        console.error("API Error, using localStorage for delete:", error);
        const existingEvents = JSON.parse(
          localStorage.getItem("events") || "[]",
        );
        const updatedEvents = existingEvents.filter((e) => e.id !== id);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
      }
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await deleteUser(userId);
      } catch (error) {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = existingUsers.filter((u) => u.id !== userId);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((u) => u.id !== userId);
        return updatedUsers;
      });
      alert("User berhasil dihapus!");
    }
  };

  const totalEvents = events.length;
  const totalUsers = users.length;
  const totalOrganizers = users.filter(
    (user) => user.role === "organizer",
  ).length;
  const totalVolunteers = users.filter(
    (user) => user.role === "volunteer",
  ).length;
  const totalRegistrations = registeredEvents.length;
  const totalParticipants = Object.values(participants).flat().length;
  const pendingRegistrations = registeredEvents.filter(
    (reg) => reg.status === "Menunggu Verifikasi",
  ).length;
  const acceptedRegistrations = registeredEvents.filter(
    (reg) => reg.status === "Terdaftar",
  ).length;

  const categoryStats = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const locationStats = events.reduce((acc, event) => {
    acc[event.location] = (acc[event.location] || 0) + 1;
    return acc;
  }, {});
  const categoryChartData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        label: "Jumlah Event per Kategori",
        data: Object.values(categoryStats),
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(14, 165, 233, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
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

  const userRoleData = {
    labels: ["Admin", "Organizer", "Volunteer"],
    datasets: [
      {
        data: [
          users.filter((user) => user.role === "admin").length,
          totalOrganizers,
          totalVolunteers,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(14, 165, 233, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const eventPerformanceData = {
    labels: events
      .slice(0, 5)
      .map((event) =>
        event.title.length > 20
          ? event.title.substring(0, 20) + "..."
          : event.title,
      ),
    datasets: [
      {
        label: "Jumlah Peserta",
        data: events
          .slice(0, 5)
          .map((event) => participants[event.id]?.length || 0),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
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

  if (loading) {
    return (
      <div className="admin-dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Admin Dashboard</h1>
            <p>Selamat datang di panel administrasi ActivistHub</p>
          </div>
          <button
            className="messages-btn"
            onClick={() => navigate("/messages")}
          >
            ? Pesan Masuk
          </button>
        </div>
      </div>

      <section className="overview-section">
        <h2>Overview Statistik</h2>
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{totalEvents}</h3>
              <p>Total Event</p>
            </div>
          </div>
          <div className="stat-card secondary">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{totalUsers}</h3>
              <p>Total User</p>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{totalOrganizers}</h3>
              <p>Organizer</p>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{totalVolunteers}</h3>
              <p>Volunteer</p>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{totalRegistrations}</h3>
              <p>Total Pendaftaran</p>
            </div>
          </div>
          <div className="stat-card danger">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{pendingRegistrations}</h3>
              <p>Menunggu Verifikasi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="registration-section">
        <h2>Status Pendaftaran</h2>
        <div className="registration-stats">
          <div className="registration-card accepted">
            <div className="registration-icon">📋</div>
            <div className="registration-info">
              <h3>{acceptedRegistrations}</h3>
              <p>Diterima</p>
            </div>
            <div className="registration-percentage">
              {totalRegistrations > 0
                ? Math.round((acceptedRegistrations / totalRegistrations) * 100)
                : 0}
              %
            </div>
          </div>
          <div className="registration-card pending">
            <div className="registration-icon">📋</div>
            <div className="registration-info">
              <h3>{pendingRegistrations}</h3>
              <p>Menunggu Verifikasi</p>
            </div>
            <div className="registration-percentage">
              {totalRegistrations > 0
                ? Math.round((pendingRegistrations / totalRegistrations) * 100)
                : 0}
              %
            </div>
          </div>
        </div>
      </section>

      <div className="charts-grid">
        <section className="chart-section">
          <h2>Distribusi Kategori Event</h2>
          <div className="chart-container">
            <Bar data={categoryChartData} options={chartOptions} />
          </div>
        </section>

        <section className="chart-section">
          <h2>Status Pendaftaran</h2>
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
        </section>

        <section className="chart-section">
          <h2>Distribusi User</h2>
          <div className="chart-container pie-chart">
            <Pie
              data={userRoleData}
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
        </section>

        <section className="chart-section">
          <h2>Performa Event (Top 5)</h2>
          <div className="chart-container">
            <Bar data={eventPerformanceData} options={chartOptions} />
          </div>
        </section>
      </div>

      <section className="events-section">
        <h2>Event Terbaru</h2>
        <div className="events-table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Judul Event</th>
                <th>Kategori</th>
                <th>Lokasi</th>
                <th>Peserta</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 5).map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>
                    <span className="badge-category">{event.category}</span>
                  </td>
                  <td>{event.location}</td>
                  <td>{participants[event.id]?.length || 0}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="users-section">
        <h2>Manajemen User</h2>
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.slice(0, 5).map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge-role ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    <div className="no-users">
                      <p>Belum ada user terdaftar.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
