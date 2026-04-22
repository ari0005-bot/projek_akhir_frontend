import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/api";
import "./CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageInputType, setImageInputType] = useState("file");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Ukuran gambar terlalu besar. Maksimal 1MB.");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newEvent = {
        ...formData,
        id: Date.now().toString(),
      };

      try {
        await createEvent(newEvent);
        console.log("Event berhasil disimpan ke API");
      } catch (apiError) {
        console.warn("Gagal menyimpan ke API, menggunakan localStorage saja:", apiError);
        
        const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
        const updatedEvents = [...existingEvents, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
      }

      setFormData({
        title: "",
        category: "",
        location: "",
        description: "",
        image: "",
      });
      setImagePreview("");
      setImageInputType("file");

      alert("Event berhasil ditambahkan!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan? Data yang belum disimpan akan hilang.")) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        <div className="create-event-header">
          <h1>Tambah Event Baru</h1>
          <p>Lengkapi informasi event di bawah ini</p>
        </div>

        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Judul Event *</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Masukkan judul event"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori *</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Masukkan kategori event"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Lokasi *</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Masukkan lokasi event"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Deskripsi *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Masukkan deskripsi lengkap event"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label>Gambar Event</label>
            <div className="image-type-selector">
              <label className="radio-option">
                <input
                  type="radio"
                  name="imageType"
                  value="file"
                  checked={imageInputType === "file"}
                  onChange={() => setImageInputType("file")}
                />
                <span>Upload File</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="imageType"
                  value="url"
                  checked={imageInputType === "url"}
                  onChange={() => setImageInputType("url")}
                />
                <span>URL Gambar</span>
              </label>
            </div>
            
            {imageInputType === "file" ? (
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
            ) : (
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                placeholder="Masukkan URL gambar"
                value={formData.image}
                onChange={handleImageUrlChange}
                className="url-input"
              />
            )}
            
            {imagePreview && (
              <div className="image-preview">
                <h4>Preview:</h4>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="preview-img"
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
