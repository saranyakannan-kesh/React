import './App.css';
import MovieList from './Components/MovieGroups';
import MovieGroups from './Components/MovieGroups';


function App() {
  return (
    <div className="container mt-4">  
     <h1 className="text-center mb-4">Video Catalog</h1>
    <MovieGroups/>
  </div>
  );
}

export default App;
