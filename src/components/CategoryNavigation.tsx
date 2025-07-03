import React, { useEffect, useState } from 'react';
import Icon from './AppIcon';
import api from '../utils/axios';
import ProductCard from './ProductCard';
import VisualEffects from './VisualEffects';
import type { Occasion, Product } from '../types';

interface CategoryNavigationProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

interface CategoryOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  message: string | null;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ selectedCategory, onCategoryChange }) => {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showingProducts, setShowingProducts] = useState<number>(6);
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get<Occasion[]>('/api/occasions'),
      api.get<Product[]>('/api/products')
    ])
      .then(([occasionsRes, productsRes]) => {
        setOccasions(occasionsRes.data);
        setProducts(productsRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar datos');
        setLoading(false);
      });
  }, []);

  // Manejar clic en categoría con efectos
  const handleCategoryClick = (categoryId: string) => {
    // Encontrar la ocasión seleccionada
    const selectedOccasion = occasions.find(occasion => occasion.id === categoryId);
    
    // Activar efecto si existe
    if (selectedOccasion?.effect) {
      setActiveEffect(selectedOccasion.effect);
      // Limpiar el efecto después de 3 segundos
      setTimeout(() => setActiveEffect(null), 3000);
    }
    
    // Cambiar la categoría
    onCategoryChange(categoryId);
  };

  // Filtrar productos cuando cambie la categoría seleccionada
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'todos' && products.length > 0) {
      // Filtrar por ID de la ocasión, no por nombre
      const filtered = products.filter(product => 
        product.occasion && product.occasion.includes(selectedCategory)
      );
      setFilteredProducts(filtered);
      setShowingProducts(6); // Reset al cambiar categoría
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products, occasions]);

  const occasionCategories: CategoryOption[] = occasions.map(occasion => ({
    id: occasion.id,
    name: occasion.name,
    icon: occasion.icon || 'Heart', // Usar el icono que viene del API, con fallback a Heart
    color: 'text-accent',
    bgColor: 'bg-accent-light',
    message: occasion.description || null
  }));

  const categories = occasionCategories;

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Explora por Ocasiones
            </h2>
            <div className="animate-pulse flex space-x-4 justify-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 w-20 bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="ocasiones" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Explora por Ocasiones
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Encuentra el arreglo perfecto para cada momento especial
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg min-w-[120px] ${
                selectedCategory === category.id
                  ? 'bg-accent text-white shadow-xl scale-105'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className={`p-3 rounded-full mb-3 transition-colors duration-300 ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-white shadow-md group-hover:shadow-lg'
              }`}>
                <Icon 
                  name={category.icon as keyof typeof import('lucide-react')}
                  className={`w-6 h-6 ${
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'text-accent'
                  }`} 
                />
              </div>
              <span className="text-sm font-semibold text-center leading-tight">
                {category.name}
              </span>
              
              {/* Indicador de selección */}
              {selectedCategory === category.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
              )}
              
              {/* Tooltip con mensaje */}
              {category.message && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  {category.message}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Sección de productos filtrados */}
        {selectedCategory && selectedCategory !== 'todos' && filteredProducts.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                Productos para {occasions.find(occ => occ.id === selectedCategory)?.name}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, showingProducts).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length > showingProducts && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowingProducts(prev => prev + 3)}
                  className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors duration-300 font-medium"
                >
                  Ver más productos ({filteredProducts.length - showingProducts} restantes)
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Mensaje cuando no hay productos para la ocasión seleccionada */}
        {selectedCategory && selectedCategory !== 'todos' && filteredProducts.length === 0 && !loading && (
          <div className="mt-12 text-center">
            <p className="text-text-secondary">
              No hay productos disponibles para esta ocasión actualmente.
            </p>
          </div>
        )}
      </div>
      
      {/* Efectos visuales */}
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

export default CategoryNavigation;
