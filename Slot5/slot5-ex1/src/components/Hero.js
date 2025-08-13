import React from 'react';

function Hero() {
  return (
    <header className="text-center" style={{ marginBottom: '32px' }}>
      <h1
        style={{
          fontWeight: 700,
          color: '#234e3c',
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontSize: '2.3rem',
          letterSpacing: '-1px',
          marginBottom: '18px'
        }}
      >
        Explore our simple, healthy recipes
      </h1>
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <p
          className="text-muted"
          style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '1.07rem',
            marginTop: 12,
            marginBottom: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.6',
            minHeight: '4.8em',
            maxHeight: '4.8em'
          }}
        >
          Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search bar to find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your eye.
        </p>
      </div>
    </header>
  );
}

export default Hero;