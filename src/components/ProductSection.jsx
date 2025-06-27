import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import database from '../data/database.json';

const ProductSection = ({ selectedCategory }) => {
  const { allProducts } = useProducts();

  // Determinar productos a mostrar según la categoría seleccionada
  let filteredProducts = allProducts;
  let sectionTitle = 'Productos Destacados';
  let sectionDescription = 'Nuestros arreglos más populares, perfectos para cualquier ocasión especial';

  if (selectedCategory && selectedCategory !== 'todos') {
    // Buscar si es una categoría de flores
    const category = database.categories.find(c => c.id === selectedCategory);
    if (category) {
      filteredProducts = allProducts.filter(product => product.category === selectedCategory);
      sectionTitle = category.name;
      sectionDescription = category.description;
    } else {
      // Buscar si es una ocasión válida
      const occasion = database.occasions.find(o => o.id === selectedCategory);
      if (occasion) {
        filteredProducts = allProducts.filter(product => product.occasion.includes(selectedCategory));
        sectionTitle = `Para: ${occasion.name}`;
        sectionDescription = occasion.description;
      }
    }
  }

  return (
    <section id="productos" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-primary mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-3 text-center text-text-secondary py-12">
              No hay productos para esta selección.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;