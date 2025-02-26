import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import BootstrapPagination from "./Pagination";
import SearchBar from "./Search";
import LoadingSpinner from "./LoadingSpinner";
import { fetchMovies, setMovieType, setSearchQuery } from "../Redux/movieSlice";

const MovieGroups: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, movieType, currentPage,searchQuery } = useSelector(
    (state: RootState) => state.movies
  );


  useEffect(() => {
    dispatch(fetchMovies(searchQuery || "english"));
  }, [dispatch, movieType, currentPage, searchQuery]);



  return (

    <Container>

        <Row className="align-items-center my-3">
       
        <Col xs={2}>
          <BootstrapPagination /> 
        </Col>
       
        
        <Col xs={6} className="text-center">
          <SearchBar searchQuery={searchQuery} setSearchQuerys={(query) => dispatch(setSearchQuery(query))} />
        </Col>
        
        
        <Col xs={4} className="text-end">
          <Button
            variant={movieType === "" ? "primary" : "outline-primary"}
            onClick={() => dispatch(setMovieType(""))}
          >
            All
          </Button>{" "}
          <Button
            variant={movieType === "movie" ? "danger" : "outline-danger"}
            onClick={() => dispatch(setMovieType("Movie"))}
          >
            Movie
          </Button>{" "}
          <Button
            variant={movieType === "series" ? "success" : "outline-success"}
            onClick={() => dispatch(setMovieType("Series"))}
          >
            Series
          </Button>{" "}
          <Button
            variant={movieType === "episode" ? "warning" : "outline-warning"}
            onClick={() => dispatch(setMovieType("Episode"))}
          >
            Episode
          </Button>
        </Col>
      </Row>

    
    {loading && <div className="text-center"><LoadingSpinner/></div>}
      
      
      {error && <div className="text-center text-danger"><p>Error: {error}</p></div>}

      
{!error && 
        <Table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Year</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
            {movies.map((movie) => (
                <tr key={movie.imdbID}>
              
                <td>
                  <img src={movie.Poster} alt={movie.Title} width="100" />
                </td>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td className="text-center">
                    <span className="bg-primary text-white px-3 py-2 rounded d-inline-block">
                        {movie.Type}
                    </span>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
}

    </Container>

  );
};

export default MovieGroups;
