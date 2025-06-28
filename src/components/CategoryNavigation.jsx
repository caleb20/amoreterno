import React, { useEffect, useState } from 'react';
import Icon from './AppIcon';
import api from '../utils/axios';

const CategoryNavigation = ({ selectedCategory, onCategoryChange }) => {
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/occasions')
      .then(res => {
        setOccasions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar ocasiones');
        setLoading(false);
      });
  }, []);

  const allOption = {
    id: 'todos',
    name: 'Todos',
    icon: 'Grid3X3',
    color: 'text-text-primary',
    bgColor: 'bg-surface',
    message: null
  };
  const categories = [allOption, ...occasions];
  const selectedOccasion = occasions.find(o => o.id === selectedCategory);

  if (loading) return <div className="text-center py-8">Cargando ocasiones...</div>;
  if (error) return <div className="text-center text-error py-8">{error}</div>;

  return (
    <div className="mt-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          Encuentra el Arreglo Perfecto
        </h3>
        <p className="text-text-secondary">
          Selecciona la ocasión para ver productos personalizados
        </p>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center space-x-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-250 ${
              selectedCategory === category.id
                ? 'bg-primary-100 text-primary'
                : 'bg-surface text-text-primary'
            }`}
          >
            <Icon name={category.icon} className={`w-6 h-6 ${category.color}`} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Mobile Navigation - Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 px-4 -mx-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-250 min-w-[100px] ${
                selectedCategory === category.id
                  ? 'bg-accent text-white shadow-lg'
                  : `${category.bgColor} ${category.color} hover:shadow-md`
              }`}
            >
              <Icon name={category.icon} size={24} />
              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      <div className="mt-8 text-center">
        {/* Mensaje de ocasión o descripción de categoría */}
        {selectedOccasion?.message && (
          <div className={`${selectedOccasion.bgColor} border rounded-lg p-4 max-w-2xl mx-auto`} style={{ borderColor: `var(--${selectedOccasion.color.replace('text-', '')}-100)` }}>
            <p className={`${selectedOccasion.color}-600 font-medium`}>
              {selectedOccasion.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNavigation;