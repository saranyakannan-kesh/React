import React from "react";
import { useDispatch } from "react-redux";
import { fetchMovies,setSearchQuery  } from "../Redux/movieSlice";
import { AppDispatch } from "../Redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

interface SearchProps {
    searchQuery: string;
    setSearchQuerys: (query: string) => void;
  }



const Search: React.FC<SearchProps> = ({searchQuery,setSearchQuerys}) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;    

    dispatch(setSearchQuery(searchQuery));    
    dispatch(fetchMovies(searchQuery)) 
      .unwrap()
      .catch((error) => console.error("Error fetching movies:", error));


  };

  return (
    <div className="input-group my-3 w-50 mx-auto">
      <input
        type="text"
        className="form-control"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuerys(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

