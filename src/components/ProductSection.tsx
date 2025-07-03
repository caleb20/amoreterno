import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

interface ProductSectionProps {
  selectedCategory: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ selectedCategory }) => {
  const { allProducts, categories = [], loading, error } = useProducts();
  const [visibleProducts, setVisibleProducts] = useState(6); // Inicialmente mostrar 6 productos

  // Resetear la cantidad de productos visibles cuando cambie la categoría
  useEffect(() => {
    setVisibleProducts(6);
  }, [selectedCategory]);

  // Determinar productos a mostrar según la categoría seleccionada
  let filteredProducts = allProducts;
  let sectionTitle = 'Productos Destacados';
  let sectionDescription = 'Nuestros arreglos más populares, perfectos para cualquier ocasión especial';

  if (selectedCategory && selectedCategory !== 'todos') {
    // Buscar si es una categoría de flores
    const category = categories.find(c => c.name === selectedCategory || c.id.toString() === selectedCategory);
    if (category) {
      filteredProducts = allProducts.filter(product => product.category === category.name);
      sectionTitle = category.name;
      sectionDescription = category.description || '';
    }
    // Si no es una categoría, simplemente no filtrar por ocasión
  }

  // Obtener productos para mostrar con paginación
  const productsToShow = filteredProducts.slice(0, visibleProducts);
  const hasMoreProducts = filteredProducts.length > visibleProducts;

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 3); // Cargar 3 productos más
  };

  if (loading) {
    return <div className="text-center py-12">Cargando productos...</div>;
  }
  if (error) {
    return <div className="text-center text-error py-12">{error}</div>;
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
          {productsToShow.length > 0 ? (
            productsToShow.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-3 text-center text-text-secondary py-12">
              No hay productos para esta selección.
            </div>
          )}
        </div>

        {/* Botón Ver más */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium"
            >
              Ver más productos ({filteredProducts.length - visibleProducts} restantes)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;