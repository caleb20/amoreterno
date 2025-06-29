import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

const OffersSection = () => {
  const { saleProducts } = useProducts();

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
          {saleProducts.map(product => (
            <ProductCard key={product.id} product={product} compact={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;