export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  
  export interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    movieType: string;
    currentPage: number;
    totalResults: number;
  }
  