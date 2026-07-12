import { useState, useEffect } from "react";
import MovieCard from "../../molecules/MovieCard";
import styles from "./FavoriteModal.module.css";

/**
 * @param {Object} props
 * @param {Array} props.movies
 * @param {() => void} props.onClose
 * @param {(id: number) => void} props.onToggleFavorite
 */
const FavoriteModal = ({ movies, onClose, onToggleFavorite }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <header className={styles.header}>
          <h3>Film Favorit Saya</h3>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </header>

        <div className={styles.body}>
          {movies.length === 0 ? (
            <div>
              <p className={styles.emptyText}>Belum ada film favorit.</p>
              <p className={styles.emptyText}>Double-click kartu film untuk menambah atau menghapus dari favorit.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {movies.map((movie) => (
<MovieCard
                   key={movie.id}
                   movie={movie}
                   size="md"
                   isFavorite
                   onToggleFavorite={onToggleFavorite}
                   showActions={false}
                 />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
