import { useState, useEffect } from "react";
import InputField from "../../atoms/InputField";
import Button from "../../atoms/Button";
import { GENRES } from "../../../data/movies";
import styles from "./MovieFormModal.module.css";

const EMPTY_MOVIE = {
  id: null,
  title: "",
  rating: "",
  genre: GENRES[0],
  img: "https://picsum.photos/seed/default/300/400",
  tag: "Baru",
};

const ActionsButtons = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#fff", display: "block" }}
  >
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

/**
 * @param {Object} props
 * @param {Object|null} props.movie
 * @param {(movie: Object) => void} props.onSave
 * @param {(id: number) => void} props.onDelete
 * @param {() => void} props.onClose
 */
const MovieFormModal = ({ movie, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState(EMPTY_MOVIE);

  useEffect(() => {
    if (movie) {
      setForm({
        id: movie.id,
        title: movie.title,
        rating: String(movie.rating ?? ""),
        genre: movie.genre,
        img: movie.img,
        tag: movie.tag || "Baru",
      });
    } else {
      setForm(EMPTY_MOVIE);
    }
  }, [movie]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      return;
    }
    const parsedRating = Number.parseFloat(form.rating);
    const sanitizedRating = Number.isNaN(parsedRating) ? 0 : Math.min(Math.max(parsedRating, 0), 5);
    onSave({
      ...form,
      id: form.id || undefined,
      rating: sanitizedRating,
    });
  };

  const handleDeleteClick = () => {
    if (form.id) {
      onDelete(form.id);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <form className={styles.modal} onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
        <header className={styles.header}>
          <h3>{form.id ? "Edit Film" : "Tambah Film"}</h3>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-hidden>
            <ActionsButtons aria-hidden="true" />
          </button>
        </header>

        <div className={styles.body}>
          <InputField
            label="Judul"
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            placeholder="Contoh: Dune: Part Two"
          />
          <InputField
            label="Rating"
            type="number"
            value={form.rating}
            onChange={(event) => handleChange("rating", event.target.value)}
            min={0}
            max={5}
            step={0.1}
          />

          <label className={styles.label}>
            <span>Genre</span>
            <select
              className={styles.select}
              value={form.genre}
              onChange={(event) => handleChange("genre", event.target.value)}
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>

          <InputField
            label="URL Gambar"
            value={form.img}
            onChange={(event) => handleChange("img", event.target.value)}
            placeholder="/images/contoh.png"
          />

          <InputField
            label="Tag"
            value={form.tag}
            onChange={(event) => handleChange("tag", event.target.value)}
            placeholder="Baru"
          />
        </div>

        <footer className={styles.footer}>
          {form.id && (
            <Button type="button" variant="danger" onClick={handleDeleteClick}>
              Hapus
            </Button>
          )}
          <div className={styles.footerSpacer} />
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">Simpan</Button>
        </footer>
      </form>
    </div>
  );
};

export default MovieFormModal;
