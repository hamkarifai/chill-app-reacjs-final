import { useEffect } from "react";
import { useMoviesRedux } from "../hooks/useMoviesRedux";
import MovieCard from "../components/molecules/MovieCard";
import styles from "./MovieListView.module.css";

/**
 * Component untuk menampilkan daftar movie dari Redux Store
 * Menggunakan useMoviesRedux hook untuk get data, add, edit, dan delete
 */
function MovieListView() {
  const { movies, loading, error, fetchMovies, deleteMovie } = useMoviesRedux();

  // Fetch movies saat component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus film ini?")) {
      await deleteMovie(id);
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading movies...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Movie List</h2>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className={styles.gridContainer}>
          {movies.map((movie) => (
            <div key={movie.id} className={styles.movieWrapper}>
              <MovieCard movie={movie} />
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieListView;
