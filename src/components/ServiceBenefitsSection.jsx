import React, { useEffect, useState } from 'react';
import api from '../utils/axios';

const ServiceBenefitsSection = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/features')
      .then(res => {
        setFeatures(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar beneficios');
        setLoading(false);
      });
  }, []);

  const renderFeatureIcon = (icon) => {
    switch (icon) {
      case 'lightning':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        );
      case 'shield':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        );
      case 'heart':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="text-center py-12">Cargando beneficios...</div>;
  if (error) return <div className="text-center text-error py-12">{error}</div>;

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-primary mb-4">
            ¿Por qué Elegir Magia Florería?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprometidos con la excelencia en cada entrega
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 bg-${feature.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-20 transition-colors duration-300`}>
                <svg className={`w-10 h-10 text-${feature.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {renderFeatureIcon(feature.icon)}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary mb-2">{feature.description}</p>
              <div className="text-xs text-success">{feature.stat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefitsSection;