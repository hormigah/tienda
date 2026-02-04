import { useState } from 'react';
import './Slider.css';

interface SliderProps {
  images: string[];
  alt?: string;
}

export default function Slider({ images, alt = 'Product image' }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return <div className="slider slider--empty">No hay imágenes disponibles</div>;
  }

  return (
    <div className="slider">
      <div className="slider__main">
        <button
          className="slider__button slider__button--prev"
          onClick={goToPrevious}
          aria-label="Imagen anterior"
        >
          &#10094;
        </button>
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="slider__image"
        />
        <button
          className="slider__button slider__button--next"
          onClick={goToNext}
          aria-label="Imagen siguiente"
        >
          &#10095;
        </button>
      </div>
      <div className="slider__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`slider__thumbnail ${index === currentIndex ? 'slider__thumbnail--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ver imagen ${index + 1}`}
          >
            <img src={image} alt={`${alt} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
