import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

const OffersSection: React.FC = () => {
  const { saleProducts } = useProducts();
  const [visibleProducts, setVisibleProducts] = useState(6); // Inicialmente mostrar 6 productos

  // Obtener productos para mostrar con paginación
  const productsToShow = saleProducts.slice(0, visibleProducts);
  const hasMoreProducts = saleProducts.length > visibleProducts;

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 3); // Cargar 3 productos más
  };

  return (
    <section id="ofertas" className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-primary mb-4">
            Ofertas Especiales
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Aprovecha estos descuentos por tiempo limitado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsToShow.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Botón Ver más */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium"
            >
              Ver más ofertas ({saleProducts.length - visibleProducts} restantes)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OffersSection;