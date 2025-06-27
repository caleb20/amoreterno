import React from 'react';
import Icon from './AppIcon';
import database from '../data/database.json';

const CategoryNavigation = ({ selectedCategory, onCategoryChange }) => {
  // Opción extra para mostrar todos
  const allOption = {
    id: 'todos',
    name: 'Todos',
    icon: 'Grid3X3',
    color: 'text-text-primary',
    bgColor: 'bg-surface',
    message: null
  };
  // Leer categorías y ocasiones desde la base de datos
  const occasions = database.occasions || [];
  // Unir categorías y ocasiones para navegación
  const categories = [allOption, ...occasions];

  // Buscar la ocasión seleccionada para mostrar el mensaje
  const selectedOccasion = occasions.find(o => o.id === selectedCategory);

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
                ? 'bg-accent text-white shadow-lg transform scale-105'
                : `${category.bgColor} ${category.color} hover:shadow-md hover:scale-102`
            }`}
          >
            <Icon name={category.icon} size={20} />
            <span className="font-medium">{category.name}</span>
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