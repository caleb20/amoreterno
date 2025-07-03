import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import type { Occasion } from '../types';
import Icon from './AppIcon';
import VisualEffects from './VisualEffects';

const OcasionesSection: React.FC = () => {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get<Occasion[]>('/api/occasions')
      .then(res => {
        setOccasions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar ocasiones');
        setLoading(false);
      });
  }, []);

  const handleOccasionClick = (occasion: Occasion) => {
    if (occasion.effect) {
      setActiveEffect(occasion.effect);
      // El efecto se auto-desactivará después de su duración
      setTimeout(() => setActiveEffect(null), 4000); // Coincide con la duración
    }
  };

  if (loading) {
    return (
      <section id="ocasiones" className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-primary mb-4">
              Ocasiones Especiales
            </h2>
            <div className="animate-pulse flex space-x-4 justify-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 w-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="ocasiones" className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="ocasiones" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-primary mb-4">
            Ocasiones Especiales
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Encuentra el arreglo perfecto para cada momento especial de tu vida
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              onClick={() => handleOccasionClick(occasion)}
              className="group relative flex flex-col items-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              {/* Icono de la ocasión */}
              <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-accent to-accent-dark shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Icon 
                  name={occasion.icon || "Heart"} 
                  className="w-8 h-8 text-white" 
                />
              </div>
              
              {/* Nombre de la ocasión */}
              <h3 className="text-sm font-semibold text-text-primary text-center leading-tight group-hover:text-accent transition-colors duration-300">
                {occasion.name}
              </h3>
              
              {/* Descripción opcional */}
              {occasion.description && (
                <p className="text-xs text-text-secondary text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {occasion.description}
                </p>
              )}
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
        
        {/* Llamada a la acción */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            ¿No encuentras la ocasión perfecta?
          </p>
          <button className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent-dark transition-colors duration-300 font-medium">
            Ver todos los productos
          </button>
        </div>
      </div>
      
      {/* Efectos visuales más grandes y suaves */}
      {activeEffect && (
        <VisualEffects 
          type={activeEffect as 'confetti' | 'hearts' | 'diploma' | 'flowers' | 'stars' | 'sparkles' | 'default'} 
          trigger={!!activeEffect}
          onComplete={() => setActiveEffect(null)}
        />
      )}
    </section>
  );
};

export default OcasionesSection;
