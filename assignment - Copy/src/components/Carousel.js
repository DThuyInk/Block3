import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';
import Button from 'react-bootstrap/Button';

const Carousel = ({ figures }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideInterval = useRef(null);
  const slideCount = figures.length;

  useEffect(() => {
    if (!paused) {
      slideInterval.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slideCount);
      }, 3000);
    }
    return () => clearInterval(slideInterval.current);
  }, [paused, slideCount]);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Button className="carousel-control prev" onClick={goToPrev}>&lt;</Button>
      <div className="carousel-slide">
        <img
          src={figures[current].image}
          alt={figures[current].alt}
          className="carousel-img"
        />
        <div className="carousel-overlay">
          <div className="carousel-title">{figures[current].name}</div>
          <div className="carousel-brand">{figures[current].brand}</div>
        </div>
      </div>
      <Button className="carousel-control next" onClick={goToNext}>&gt;</Button>
    </div>
  )
};

export default Carousel;
