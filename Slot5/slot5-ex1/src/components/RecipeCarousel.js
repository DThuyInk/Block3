import React from 'react';
import { Carousel } from 'react-bootstrap';
import recipes from '../data/recipes';

function RecipeCarousel() {
  return (
    <div style={{
      width: '100vw',
      maxWidth: '100vw',
      margin: '32px 0 40px 0',
      position: 'relative',
      left: '50%',
      right: '50%',
      transform: 'translateX(-50%)',
      borderRadius: 0,
      overflow: 'hidden',
      boxShadow: '0 2px 24px rgba(0,0,0,0.08)'
    }}>
      <Carousel interval={3500} controls={false} indicators={true} wrap={true} pause={false}>
        {recipes.map((recipe, idx) => (
          <Carousel.Item key={idx}>
            <div style={{ position: 'relative', width: '100%', height: 340 }}>
              {/* Background image blurred */}
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(6px) brightness(0.85)', // giảm blur, tăng brightness
                  zIndex: 1
                }}
              />
              {/* Overlay for darken effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(34,78,60,0.13)',
                zIndex: 2
              }} />
              {/* Content */}
              <div style={{
                position: 'relative',
                zIndex: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#234e3c',
                textShadow: '0 2px 12px rgba(0,0,0,0.10)'
              }}>
                <h2 style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  marginBottom: '18px',
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: '14px',
                  padding: '12px 40px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  letterSpacing: '-1px',
                  textTransform: 'capitalize'
                }}>
                  {recipe.title}
                </h2>
                <p style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: '1.25rem',
                  color: '#234e3c',
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: '10px',
                  padding: '10px 28px',
                  maxWidth: 540,
                  marginBottom: 0,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  textAlign: 'center',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  {recipe.description}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default RecipeCarousel;