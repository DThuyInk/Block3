import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button, Badge, Modal, Toast, ToastContainer, Form, InputGroup, Alert } from 'react-bootstrap';
import { movies, allGenres } from '../data/movie';

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}

const MovieCard = ({ movie, isFavourite, onToggleFavourite, onShowDetails }) => (
  <Card className="mb-4 h-100 movie-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <Card.Img variant="top" src={process.env.PUBLIC_URL + movie.poster} alt={movie.title} style={{ height: '300px', objectFit: 'cover' }} />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>{truncate(movie.description, 80)}</Card.Text>
      <div className="mb-2">
        <Badge bg="info" className="me-2">{movie.genre}</Badge>
        <span><strong>Year:</strong> {movie.year}</span> | <span><strong>Country:</strong> {movie.country}</span> | <span><strong>Duration:</strong> {movie.duration} phút</span>
      </div>
      <div className="d-flex justify-content-between">
        <Button variant={isFavourite ? "outline-danger" : "success"} onClick={() => onToggleFavourite(movie)}>
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </Button>
        <Button variant="primary" onClick={() => onShowDetails(movie)}>Details</Button>
      </div>
    </Card.Body>
  </Card>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  isFavourite: PropTypes.bool,
  onToggleFavourite: PropTypes.func,
  onShowDetails: PropTypes.func,
};

const FreeMoviesGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [genre, setGenre] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('none');
  const [favourites, setFavourites] = useState(() => {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
  });

  const handleToggleFavourite = (movie) => {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (favs.find(m => m.id === movie.id)) {
      favs = favs.filter(m => m.id !== movie.id);
      setToastMsg('Removed from favourites!');
    } else {
      favs.push(movie);
      setToastMsg('Added to favourites!');
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
    setFavourites(favs);
    setShowToast(true);
  };

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const genreMovies = genre === 'All' ? movies : movies.filter(m => m.genre === genre);
  let filteredMovies = genreMovies.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.description.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === 'asc') {
    filteredMovies = [...filteredMovies].sort((a, b) => a.duration - b.duration);
  } else if (sort === 'desc') {
    filteredMovies = [...filteredMovies].sort((a, b) => b.duration - a.duration);
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-3 gap-3 flex-wrap">
        <Form.Select style={{ maxWidth: 200 }} value={genre} onChange={e => setGenre(e.target.value)}>
          {allGenres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Form.Select>
        <InputGroup style={{ maxWidth: 300 }}>
          <InputGroup.Text><i className="bi bi-search" /></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm phim..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </InputGroup>
        <Form.Select style={{ maxWidth: 180 }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="none">Sắp xếp: None</option>
          <option value="asc">Duration ↑</option>
          <option value="desc">Duration ↓</option>
        </Form.Select>
        <span className="ms-3">Hiển thị <strong>{filteredMovies.length}</strong> kết quả</span>
      </div>
      {filteredMovies.length === 0 ? (
        <Alert variant="warning">No movies found</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {filteredMovies.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                isFavourite={!!favourites.find(m => m.id === movie.id)}
                onToggleFavourite={handleToggleFavourite}
                onShowDetails={handleShowDetails}
              />
            </Col>
          ))}
        </Row>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={process.env.PUBLIC_URL + selectedMovie?.poster} alt={selectedMovie?.title} style={{ width: '100%', marginBottom: '1rem', objectFit: 'cover' }} />
          <p><strong>Year:</strong> {selectedMovie?.year}</p>
          <p><strong>Country:</strong> {selectedMovie?.country}</p>
          <p><strong>Duration:</strong> {selectedMovie?.duration} phút</p>
          <Badge bg="info" className="mb-2">{selectedMovie?.genre}</Badge>
          <p><strong>Description:</strong> {selectedMovie?.description}</p>
          <p><strong>Showtimes:</strong> 19:00, 21:30 (Demo)</p>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide bg="success">
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default FreeMoviesGrid;
