import { createSlice, createAsyncThunk,PayloadAction  } from "@reduxjs/toolkit";
import axios from "axios";
import { MovieState } from "../Type/movie";


const API_KEY = "5c7ffb34";
const BASE_URL = "https://www.omdbapi.com/";

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  searchQuery: "english",
  movieType: "",
  currentPage: 1,
  totalResults: 0,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchQuery: string, { getState }) => {
    const { movies } = getState() as { movies: MovieState };
    const { movieType, currentPage } = movies;
    
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        s: searchQuery,
        type: movieType || undefined,
        page: currentPage,
        apikey: API_KEY,
      },
    });

    return response.data;
  }
);


  const MovieSlice = createSlice({
    name: "Movies",
    initialState,
    reducers: {
      setSearchQuery: (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload;
        state.currentPage = 1;
      },
      setMovieType: (state, action: PayloadAction<string>) => {
        state.movieType = action.payload;
        state.currentPage = 1;
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovies.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
          state.loading = false;
          if (action.payload.Response === "True") {
            state.movies = action.payload.Search;
            state.totalResults = parseInt(action.payload.totalResults);
          } else {
            state.movies = [];
            state.error = action.payload.Error;
          }
        })
        .addCase(fetchMovies.rejected, (state) => {
          state.loading = false;
          state.error = "Failed to fetch movies";
        });
    },
  });
  

export const { setSearchQuery, setMovieType, setCurrentPage } = MovieSlice.actions;
export default MovieSlice.reducer;
