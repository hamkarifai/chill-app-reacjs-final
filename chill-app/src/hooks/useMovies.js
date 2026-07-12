import { useState, useEffect, useCallback } from "react";
import movieService from "../services/movieService";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.getMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addMovie = useCallback(async (movieData) => {
    setLoading(true);
    setError(null);
    try {
      const newMovie = await movieService.addMovie(movieData);
      setMovies((prev) => [...prev, newMovie]);
      return newMovie;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMovie = useCallback(async (id, movieData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedMovie = await movieService.updateMovie(id, movieData);
      setMovies((prev) => prev.map((m) => (m.id === id ? updatedMovie : m)));
      return updatedMovie;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMovie = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await movieService.deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m.id !== id));
      return id;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, addMovie, updateMovie, deleteMovie, refetch: fetchMovies };
};

export default useMovies;