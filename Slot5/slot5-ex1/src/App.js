import React, { useState } from 'react';
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
import { Container } from 'react-bootstrap';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [prepFilter, setPrepFilter] = useState('all');
  const [cookFilter, setCookFilter] = useState('all');

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

  return (
    <div className="App" style={{ background: '#f7f7f7', minHeight: '100vh' }}>
      <AppNavbar />
      <Container style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        <Hero />
        <Filters
          prepFilter={prepFilter}
          setPrepFilter={setPrepFilter}
          cookFilter={cookFilter}
          setCookFilter={setCookFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <RecipeGrid recipes={filteredRecipes} onView={handleViewRecipe} />
        <RecipeModal
          show={showModal}
          handleClose={handleCloseModal}
          recipe={selectedRecipe}
        />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
