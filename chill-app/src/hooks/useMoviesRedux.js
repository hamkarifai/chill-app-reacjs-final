import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  addMovie,
  updateMovieAsync,
  deleteMovieAsync,
  resetError,
  resetSuccess,
} from "../store/redux/moviesSlice";

/**
 * Custom Hook untuk menggunakan Movies dari Redux
 * Menyediakan akses ke state dan action dispatcher
 */
export const useMoviesRedux = () => {
  const dispatch = useDispatch();
  const {
    data: movies,
    loading,
    error,
    success,
  } = useSelector((state) => state.movies);

  return {
    // State
    movies,
    loading,
    error,
    success,

    // Actions
    fetchMovies: () => dispatch(fetchMovies()),
    addMovie: (movieData) => dispatch(addMovie(movieData)),
    updateMovie: (id, movieData) =>
      dispatch(updateMovieAsync({ id, movieData })),
    deleteMovie: (id) => dispatch(deleteMovieAsync(id)),
    resetError: () => dispatch(resetError()),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};

export default useMoviesRedux;
