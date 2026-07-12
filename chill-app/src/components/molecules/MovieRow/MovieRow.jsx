import MovieCard from "../MovieCard";
import styles from "./MovieRow.module.css";

/**
 * @param {Object} props
 * @param {string} props.title - Section heading
 * @param {Array}  props.movies - array of movie objects
 * @param {"sm"|"md"|"lg"} props.size - card size
 * @param {string} [props.emptyMessage]
 * @param {(movie: Object) => void} [props.onEdit]
 * @param {(id: number) => void} [props.onDelete]
 * @param {Array<number>} [props.favoriteIds]
 * @param {(id: number) => void} [props.onToggleFavorite]
 */
const MovieRow = ({ title, movies, size = "md", emptyMessage, onEdit, onDelete, favoriteIds, onToggleFavorite }) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{title}</h3>
      {movies.length >= 1 ? (
        <div className={styles.row}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              size={size}
              isFavorite={favoriteIds?.includes(String(movie.id))}
              onToggleFavorite={onToggleFavorite}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyRow}>
          <p>{emptyMessage || "Tidak ada film untuk ditampilkan"}</p>
        </div>
      )}
    </section>
  );
};

export default MovieRow;
