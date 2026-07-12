import { useState } from "react";
import Badge from "../../atoms/Badge";
import StarRating from "../../atoms/StarRating";
import Button from "../../atoms/Button";
import styles from "./MovieCard.module.css";

/**
 * @param {Object} props
 * @param {Object} props.movie - { id, title, rating, genre, img, tag? }
 * @param {"sm"|"md"|"lg"} props.size
 * @param {boolean} [props.isFavorite]
 * @param {(id: number) => void} [props.onToggleFavorite]
 * @param {(movie: Object) => void} [props.onEdit]
 * @param {(id: number) => void} [props.onDelete]
 * @param {boolean} [props.showActions]
 */
const MovieCard = ({ movie, size = "md", isFavorite, onToggleFavorite, onEdit, onDelete, showActions = true }) => {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDoubleClick = () => {
    onEdit?.(movie);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite?.(movie.id);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (confirmDelete) {
      onDelete?.(movie.id);
      setConfirmDelete(false);
      return;
    }
    setConfirmDelete(true);
    setTimeout(() => setConfirmDelete(false), 2500);
  };

  return (
    <div
      className={[styles.card, styles[size], hovered ? styles.hovered : ""].join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={handleDoubleClick}
    >
      <img
        src={movie.img}
        alt={movie.title}
        className={styles.img}
        onError={(e) => { e.target.style.background = "#1a1a2e"; }}
      />

      {movie.tag && (
        <div className={styles.tag}>
          <Badge text={movie.tag} />
        </div>
      )}

      {hovered && showActions && (
        <>
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={[styles.iconButton, styles.editButton].join(" ")}
              onClick={() => onEdit?.(movie)}
              aria-label="Edit film"
              title="Edit"
            >
              ✏️
            </button>
            <button
              type="button"
              className={[styles.iconButton, styles.deleteButton, confirmDelete && styles.confirmDelete].join(" ")}
              onClick={handleDeleteClick}
              aria-label="Hapus film"
              title={confirmDelete ? "Konfirmasi" : "Hapus"}
            >
              {confirmDelete ? "✅" : "🗑️"}
            </button>
          </div>

          <div className={styles.overlay}>
            <p className={styles.title}>{movie.title}</p>
            <StarRating rating={movie.rating} />
            <p className={styles.genre}>{movie.genre}</p>
            <div className={styles.actions}>
              <Button size="sm" icon="▶">Mulai</Button>
              <button
                type="button"
                className={[styles.iconButton, styles.favoriteButton].join(" ")}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        </>
      )}

      {!showActions && hovered && (
        <div className={styles.overlay}>
          <p className={styles.title}>{movie.title}</p>
          <StarRating rating={movie.rating} />
          <p className={styles.genre}>{movie.genre}</p>
          <div className={styles.actions}>
            <Button size="sm" icon="▶">Mulai</Button>
            <button
              type="button"
              className={[styles.iconButton, styles.favoriteButton].join(" ")}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
