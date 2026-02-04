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
    return <div className="Slider Slider--empty">No hay imágenes disponibles</div>;
  }

  return (
    <div className="Slider">
      <div className="Slider__main">
        <button
          className="Slider__button Slider__button--prev"
          onClick={goToPrevious}
          aria-label="Imagen anterior"
        >
          &#10094;
        </button>
        <img src={images[currentIndex]} alt={`${alt} ${currentIndex + 1}`} className="Slider__image" />
        <button
          className="Slider__button Slider__button--next"
          onClick={goToNext}
          aria-label="Imagen siguiente"
        >
          &#10095;
        </button>
      </div>
      <div className="Slider__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`Slider__thumbnail ${index === currentIndex ? 'Slider__thumbnail--active' : ''}`}
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
