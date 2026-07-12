import { useState, useMemo } from "react";
import Navbar from "../../components/organisms/Navbar";
import HeroBanner from "../../components/organisms/HeroBanner";
import MovieRow from "../../components/molecules/MovieRow";
import MovieFormModal from "../../components/organisms/MovieFormModal";
import FavoriteModal from "../../components/organisms/FavoriteModal";
import Footer from "../../components/organisms/Footer";
import { HERO_DATA } from "../../data/movies";
import useMovies from "../../hooks/useMovies";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { movies, loading, addMovie, updateMovie, deleteMovie } = useMovies();
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem("favoriteIds");
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);

  const continuing = useMemo(() => movies.slice(0, 5), [movies]);
  const topRating = useMemo(
    () => [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [movies]
  );
  const trending = useMemo(() => movies.slice(5, 10), [movies]);
  const newRelease = useMemo(() => movies.slice(10, 15), [movies]);

  const openAddModal = () => {
    setEditingMovie(null);
    setIsFormOpen(true);
  };

  const openEditModal = (movie) => {
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleSaveMovie = async (movieData) => {
    try {
      if (movieData.id) {
        await updateMovie(movieData.id, movieData);
      } else {
        await addMovie(movieData);
      }
      setIsFormOpen(false);
      setEditingMovie(null);
    } catch (err) {
      console.error("Failed to save movie:", err);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
    } catch (err) {
      console.error("Failed to delete movie:", err);
    }
    setIsFormOpen(false);
    setEditingMovie(null);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingMovie(null);
  };

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      localStorage.setItem("favoriteIds", JSON.stringify(next));
      return next;
    });
  };

  const favoriteMovies = useMemo(
    () => movies.filter((m) => favoriteIds.includes(String(m.id))),
    [movies, favoriteIds]
  );

  const user = { username: "Pengguna", avatar: "M" };

  if (loading && movies.length === 0) {
    return <div className={styles.page}>Loading movies...</div>;
  }

  return (
    <div className={styles.page}>
      <Navbar
        user={user}
        onOpenFavorites={() => setIsFavoriteModalOpen(true)}
        onAddMovie={openAddModal}
      />

      <HeroBanner data={HERO_DATA} />

      <main className={styles.content}>
        <MovieRow
          title="Film Favorit Saya"
          movies={favoriteMovies}
          size="md"
          emptyMessage="Belum ada film favorit"
        />
        <MovieRow
          title="Melanjutkan Tonton Film"
          movies={continuing}
          size="md"
          onEdit={openEditModal}
          onDelete={handleDeleteMovie}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
        <MovieRow
          title="Top Rating Film dan Series Hari ini"
          movies={topRating}
          size="lg"
          onEdit={openEditModal}
          onDelete={handleDeleteMovie}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
        <MovieRow
          title="Film Trending"
          movies={trending}
          size="md"
          onEdit={openEditModal}
          onDelete={handleDeleteMovie}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
        <MovieRow
          title="Rilis Baru"
          movies={newRelease}
          size="md"
          onEdit={openEditModal}
          onDelete={handleDeleteMovie}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <Footer />

      {isFormOpen && (
        <MovieFormModal
          movie={editingMovie}
          onSave={handleSaveMovie}
          onDelete={handleDeleteMovie}
          onClose={closeFormModal}
        />
      )}
      {isFavoriteModalOpen && (
        <FavoriteModal
          movies={favoriteMovies}
          onClose={() => setIsFavoriteModalOpen(false)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default HomePage;