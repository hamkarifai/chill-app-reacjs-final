import { useState, useEffect } from "react";
import { useMoviesRedux } from "../hooks/useMoviesRedux";
import styles from "./MovieFormModalExample.module.css";

/**
 * Component Modal untuk Add Movie baru atau Edit movie existing
 * Menggunakan Redux dispatch untuk addMovie atau updateMovie
 *
 * Props:
 * - isOpen: boolean untuk mengontrol visibility modal
 * - onClose: function yang dipanggil saat modal ditutup
 * - movieToEdit: object movie yang akan diedit (opsional, jika ada maka mode edit)
 */
function MovieFormModalExample({ isOpen, onClose, movieToEdit = null }) {
  const { addMovie, updateMovie, loading, error, success, resetSuccess } =
    useMoviesRedux();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    rating: 0,
    img: "",
    tag: "",
  });

  // Populate form jika ada movieToEdit
  useEffect(() => {
    if (movieToEdit) {
      setFormData({
        title: movieToEdit.title || "",
        genre: movieToEdit.genre || "",
        rating: movieToEdit.rating || 0,
        img: movieToEdit.img || "",
        tag: movieToEdit.tag || "",
      });
    } else {
      setFormData({
        title: "",
        genre: "",
        rating: 0,
        img: "",
        tag: "",
      });
    }
  }, [movieToEdit, isOpen]);

  // Close modal saat success
  useEffect(() => {
    if (success) {
      resetSuccess();
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [success, resetSuccess, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movieToEdit) {
      // Mode Edit
      await updateMovie(movieToEdit.id, formData);
    } else {
      // Mode Add
      await addMovie(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{movieToEdit ? "Edit Movie" : "Add New Movie"}</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Movie Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="genre">Genre *</label>
            <input
              id="genre"
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating (0-5) *</label>
            <input
              id="rating"
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="img">Image URL *</label>
            <input
              id="img"
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tag">Tag</label>
            <input
              id="tag"
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : movieToEdit
                  ? "Update Movie"
                  : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieFormModalExample;
