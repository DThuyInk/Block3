import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    image: process.env.PUBLIC_URL + '/images/movie1.jpg',
    title: 'Avengers: Endgame',
    desc: 'Cuộc chiến cuối cùng của các siêu anh hùng Marvel.'
  },
  {
    image: process.env.PUBLIC_URL + '/images/movie2.jpg',
    title: 'Inception',
    desc: 'Giấc mơ trong giấc mơ, hành trình vào tiềm thức.'
  },
  {
    image: process.env.PUBLIC_URL + '/images/movie3.jpg',
    title: 'Interstellar',
    desc: 'Khám phá vũ trụ để cứu lấy nhân loại.'
  }
];

const HeroCarousel = () => (
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    interval={2000}
    dynamicHeight={false}
    swipeable
  >
    {slides.map((slide, idx) => (
      <div key={idx}>
        <img src={slide.image} alt={slide.title} style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }} />
        <div className="legend">
          <h3>{slide.title}</h3>
          <p>{slide.desc}</p>
        </div>
      </div>
    ))}
  </Carousel>
);

export default HeroCarousel;
