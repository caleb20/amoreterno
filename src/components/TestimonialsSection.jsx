import React from 'react';
import database from '../data/database.json';

const TestimonialsSection = () => {
  const { testimonials, stats } = database;

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
                    e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                  }}
                />
                <div>
                  <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-text-secondary">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-text-secondary italic mb-4">"{testimonial.comment}"</p>
              
              <div className="text-xs text-success">
                ✓ Entregado en {testimonial.deliveryLocation} - Hace {testimonial.daysAgo} {testimonial.daysAgo === 1 ? 'día' : 'días'}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;