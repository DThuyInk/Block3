
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Navbar.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FreeMovies from './components/FreeMovies';
import FavouriteMovies from './components/FavouriteMovies';
import MovieRequestForm from './components/MovieRequestForm';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App" style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<FreeMovies />} />
          <Route path="/favourites" element={<FavouriteMovies />} />
          <Route path="/request" element={<MovieRequestForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
