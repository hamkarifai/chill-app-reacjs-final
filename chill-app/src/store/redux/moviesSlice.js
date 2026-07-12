import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as movieService from "../../services/movieService";

// Async Thunks untuk API calls
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const data = await movieService.getMovies();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const data = await movieService.addMovie(movieData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateMovieAsync = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, movieData }, { rejectWithValue }) => {
    try {
      const data = await movieService.updateMovie(id, movieData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteMovieAsync = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      await movieService.deleteMovie(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Initial State
const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
};

// Movies Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Synchronous actions
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    clearMovies: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Movies
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Movie
    builder
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.success = true;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Movie
    builder
      .addCase(updateMovieAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovieAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateMovieAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Movie
    builder
      .addCase(deleteMovieAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((m) => m.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteMovieAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetSuccess, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
