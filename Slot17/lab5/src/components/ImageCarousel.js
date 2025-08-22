import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';


const images = [
  {
    src: process.env.PUBLIC_URL + '/images/elaicheesecake.png',
    title: 'Bánh Elai Cheesecake',
    desc: 'Bánh cheesecake hương vị elai đặc biệt, mềm mịn và thơm ngon.'
  },
  {
    src: process.env.PUBLIC_URL + '/images/uthappizza.png',
    title: 'Pizza Ấn Độ',
    desc: 'Pizza kiểu Nam Ấn với lớp topping đa dạng và đậm đà.'
  },
  {
    src: process.env.PUBLIC_URL + '/images/vadonut.png',
    title: 'Bánh Vada Donut',
    desc: 'Bánh donut kiểu Ấn, giòn bên ngoài, mềm bên trong.'
  },
];

const ImageCarousel = ({ autoPlay = true, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, autoPlay, interval]);

  const goToSlide = (idx) => setCurrent(idx);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <img src={images[current].src} alt={`slide-${current}`} className="carousel-img" />
        {/* Overlay thông tin ảnh */}
        <div className="carousel-info-overlay">
          <h3 className="carousel-title">{images[current].title}</h3>
          <p className="carousel-desc">{images[current].desc}</p>
        </div>
        <button className="carousel-arrow left" onClick={prevSlide}>&lt;</button>
        <button className="carousel-arrow right" onClick={nextSlide}>&gt;</button>
      </div>
      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={"carousel-dot" + (idx === current ? " active" : "")}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
