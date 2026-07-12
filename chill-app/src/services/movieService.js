const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://6a40e7771ff1d27becc11135.mockapi.io/api/v1/movies";

const transformMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  rating: movie.rating ? movie.rating / 20 : 0,
  genre: movie.genre,
  img: movie.coverImage || movie.img,
  tag: movie.tag,
});

export const getMovies = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();
  return data.map(transformMovie);
};

export const addMovie = async (movie) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: movie.title,
      rating: movie.rating * 20,
      genre: movie.genre,
      coverImage: movie.img,
      tag: movie.tag,
    }),
  });
  if (!response.ok) throw new Error("Failed to add movie");
  const data = await response.json();
  return transformMovie(data);
};

export const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: movie.title,
      rating: movie.rating * 20,
      genre: movie.genre,
      coverImage: movie.img,
      tag: movie.tag,
    }),
  });
  if (!response.ok) throw new Error("Failed to update movie");
  const data = await response.json();
  return transformMovie(data);
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete movie");
  return id;
};

const movieService = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};

export default movieService;
