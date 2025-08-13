import React, { useState } from 'react';
import { Toast, Container, Dropdown, Pagination, Row, Col, Form } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import recipes from './data/recipes';
import AppNavbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import Footer from './components/Footer';

import RecipeCarousel from './components/RecipeCarousel';
import RecipeRequestFormModal from './components/RecipeRequestFormModal';
import Header from './components/Header';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [prepFilter, setPrepFilter] = useState('all');
  const [cookFilter, setCookFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [favourites, setFavourites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Add to favourite handler
  const handleAddFavourite = (recipe) => {
    if (!favourites.some(r => r.id === recipe.id)) {
      setFavourites([...favourites, recipe]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  // Filter and search logic
  const filteredRecipes = recipes.filter(recipe => {
    const searchMatch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const prepMatch =
      prepFilter === 'all' ||
      (prepFilter === '0-5' && recipe.prep <= 5) ||
      (prepFilter === '6-10' && recipe.prep > 5 && recipe.prep <= 10) ||
      (prepFilter === '11+' && recipe.prep > 10);
    const cookMatch =
      cookFilter === 'all' ||
      (cookFilter === '0-5' && recipe.cook <= 5) ||
      (cookFilter === '6-15' && recipe.cook > 5 && recipe.cook <= 15) ||
      (cookFilter === '16+' && recipe.cook > 15);
    return searchMatch && prepMatch && cookMatch;
  });

  // Sorting logic
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'prep-asc':
        return a.prep - b.prep;
      case 'prep-desc':
        return b.prep - a.prep;
      case 'cook-asc':
        return a.cook - b.cook;
      case 'cook-desc':
        return b.cook - a.cook;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalRecipes = sortedRecipes.length;
  const totalPages = Math.ceil(totalRecipes / itemsPerPage);
  const paginatedRecipes = sortedRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset về trang đầu khi đổi số lượng
  };

  // Pagination items
  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Header />
      <div className="App" style={{ background: '#f7f7f7', minHeight: '100vh' }}>
        <RecipeCarousel />
        <Container style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <Hero />
          <Filters
            prepFilter={prepFilter}
            setPrepFilter={setPrepFilter}
            cookFilter={cookFilter}
            setCookFilter={setCookFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          {/* Dropdown chọn số lượng items */}
          <Row className="mb-3">
            <Col xs="auto">
              <Form.Label>Items per page:</Form.Label>
            </Col>
            <Col xs="auto">
              <Form.Select value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ width: 100 }}>
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </Form.Select>
            </Col>
          </Row>
          {/* RecipeGrid chỉ nhận paginatedRecipes */}
          <RecipeGrid
            recipes={paginatedRecipes}
            onView={handleViewRecipe}
            onAddFavourite={handleAddFavourite}
            favourites={favourites}
          />
          {/* Pagination */}
          <Pagination className="justify-content-center mt-4">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={5000}
            autohide
            style={{ position: 'fixed', top: 80, right: 30, minWidth: 220, zIndex: 9999 }}
          >
            <Toast.Header>
              <span role="img" aria-label="heart" style={{ color: '#e74c3c', fontSize: '1.2rem', marginRight: '8px' }}>♡</span>
              <strong className="me-auto">Favourites</strong>
            </Toast.Header>
            <Toast.Body>Added to favourites</Toast.Body>
          </Toast>
          <RecipeModal
            show={showModal}
            handleClose={handleCloseModal}
            recipe={selectedRecipe}
          />
        </Container>
        <Footer />
        <RecipeRequestFormModal
          show={showRequestModal}
          handleClose={() => setShowRequestModal(false)}
        />
      </div>
    </>
  );
}

export default App;
