

import React from 'react';
import HeroCarousel from './HeroCarousel';
import FreeMoviesGrid from './FreeMoviesGrid';


const FreeMovies = () => {
  return (
    <div style={{ paddingTop: '70px' }}>
      <HeroCarousel />
      <h2 style={{ marginTop: '2rem' }}>Free Movies</h2>
      <FreeMoviesGrid />
    </div>
  );
};

export default FreeMovies;
