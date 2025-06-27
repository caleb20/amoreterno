import React from 'react';
import database from '../data/database.json';

const ServiceBenefitsSection = () => {
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
          {database.features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 bg-${feature.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-20 transition-colors duration-300`}>
                <svg className={`w-10 h-10 text-${feature.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {renderFeatureIcon(feature.icon)}
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className={`text-sm text-${feature.color} font-medium`}>
                {feature.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Money-back Guarantee */}
        <div className="mt-12 bg-secondary-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-poppins font-semibold text-text-primary mb-4">
            Garantía de Satisfacción
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed mb-6">
            Si no estás completamente satisfecho con tu pedido, te devolvemos el 100% de tu dinero. 
            Nuestra prioridad es tu felicidad y la de quien recibe las flores.
          </p>
          <span className="bg-success text-white px-6 py-2 rounded-full font-medium">
            ✓ Garantía 100% - Sin preguntas
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefitsSection; 