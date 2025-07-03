import React, { useEffect, useState } from 'react';
import api from '../utils/axios';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/testimonials')
      .then(res => {
        setTestimonials(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar testimonios');
        setLoading(false);
      });
    // Si hay stats en otro endpoint, agregar aquí
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className="h-4 w-4 text-yellow-400 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  if (loading) return <div className="text-center py-12">Cargando testimonios...</div>;
  if (error) return <div className="text-center text-error py-12">{error}</div>;

  return (
    <section className="pt-12 pb-6 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-primary mb-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Miles de sonrisas entregadas en Lima y Callao
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-4">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-surface rounded-lg p-6 shadow-primary">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={`Cliente ${testimonial.name}`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name || 'Cliente');
                  }}
                />
                <div>
                  <div className="font-bold text-text-primary">{testimonial.name}</div>
                  <div className="text-xs text-text-secondary">{testimonial.location}</div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-xs text-text-secondary">{testimonial.days_ago} días atrás</span>
              </div>
              
              <p className="text-text-secondary mb-2">{testimonial.comment}</p>
              <div className="text-xs text-accent">{testimonial.deliveryLocation}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;