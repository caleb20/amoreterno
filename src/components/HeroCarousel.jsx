import React, { useEffect, useState } from 'react';
import api from '../utils/axios';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicSubtitle, setDynamicSubtitle] = useState('');
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/hero-slides')
      .then(res => {
        setSlides(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar slides');
        setLoading(false);
      });
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Update dynamic subtitle based on time
  useEffect(() => {
    const updateSubtitle = () => {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour < 12) {
        setDynamicSubtitle('Entrega garantizada hoy antes de las 6pm');
      } else if (hour < 17) {
        setDynamicSubtitle('Última oportunidad - Entrega hasta las 8pm');
      } else {
        setDynamicSubtitle('Ordena ahora para entrega mañana temprano');
      }
    };

    updateSubtitle();
    const interval = setInterval(updateSubtitle, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return <div className="text-center py-12">Cargando slides...</div>;
  if (error) return <div className="text-center text-error py-12">{error}</div>;
  if (!slides.length) return null;

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-poppins font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-2">{slide.subtitle}</p>
                <p className="text-base md:text-lg mb-8 opacity-90">
                  {index === 0 ? dynamicSubtitle : slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={slide.cta_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center space-x-2"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                    <span>{slide.cta_text}</span>
                  </a>
                  <button
                    onClick={scrollToProducts}
                    className="bg-white text-accent px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-gray-50 transition-colors duration-150"
                  >
                    Ver Catálogo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-150 ${
              index === currentSlide
                ? 'bg-white bg-opacity-90'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;