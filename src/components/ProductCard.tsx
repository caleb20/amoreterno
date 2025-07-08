import React from 'react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true, compact = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>${product.name} agregado al carrito</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  if (compact) {
    return (
      <div className="product-card-compact group cursor-pointer relative" onClick={handleAddToCart}>
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start">
          {product.tags?.includes('popular') && (
            <span className="featured-badge">⭐ Popular</span>
          )}
          {product.discount && (
            <span className="discount-badge">
              -{product.discount}%
            </span>
          )}
        </div>
        
        {/* Imagen */}
        <div className="relative overflow-hidden product-image-hover">
          <img
            src={product.image || '/placeholder-flower.jpg'}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            }}
          />
          
          {/* Botón en hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
              className="btn-compact-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
        
        {/* Contenido compacto */}
        <div className="p-4">
          <h3 className="product-title mb-3 text-lg">{product.name}</h3>
          
          <div className="flex items-center justify-between mb-2">
            {product.original_price && (
              <span className="price-original text-sm">
                S/. {product.original_price.toFixed(2)}
              </span>
            )}
            <span className="price-badge text-base">
              S/. {product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Información compacta */}
          <div className="flex gap-2 text-sm">
            <span className="delivery-badge">🚚 2-4h</span>
            {(product.discount || product.original_price) && (
              <span className="time-badge">⏰ 4h</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card-compact group cursor-pointer relative">
      {/* Badges en la parte superior */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start">
        {/* Badges izquierda */}
        <div className="flex flex-col gap-1">
          {product.tags?.includes('popular') && (
            <span className="featured-badge">⭐ Popular</span>
          )}
          {product.tags?.includes('exclusivo') && (
            <span className="bg-secondary text-gray-800 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
              🌟 Exclusivo
            </span>
          )}
          {product.is_featured && !product.discount && (
            <span className="featured-badge">✨ Destacado</span>
          )}
          
          {/* Tags dinámicos - otros tags que no sean los específicos */}
          {product.tags?.filter(tag => !['popular', 'exclusivo'].includes(tag)).map((tag, index) => (
            <span key={index} className="bg-accent text-gray-800 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>
        
        {/* Badge de descuento derecha */}
        {product.discount && (
          <span className="discount-badge">
            -{product.discount}%
          </span>
        )}
      </div>
      
      {/* Imagen del producto */}
      <div className="relative overflow-hidden product-image-hover">
        <img
          src={product.image || '/placeholder-flower.jpg'}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
          }}
        />
        
        {/* Overlay con botón en hover (solo desktop) */}
        {showAddToCart && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 hidden md:flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
            </button>
          </div>
        )}
      </div>
      
      {/* Contenido de la tarjeta - Completo */}
      <div className="p-6">
        {/* Título del producto */}
        <h3 className="text-xl font-poppins font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Descripción si existe */}
        {product.description && (
          <p className="text-text-secondary mb-4 line-clamp-2 text-sm">
            {product.description}
          </p>
        )}
        
        {/* Precios y Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through font-medium">
                S/. {product.original_price.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-poppins font-bold price-badge">
              S/. {product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Rating completo */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {renderStars(4.5)}
            </div>
            <span className="text-sm text-text-secondary ml-1">(4.5)</span>
          </div>
        </div>
        
        {/* Stock indicator */}
        {product.stock !== undefined && (
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600 text-sm font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                {product.stock} En stock
              </span>
            ) : (
              <span className="text-red-600 text-sm font-medium">Sin stock</span>
            )}
          </div>
        )}

        {/* Información de oferta válida */}
        {(product.discount || product.original_price) && (
          <div className="mt-3 text-sm">
            <span className="flex items-center bg-orange-50 text-orange-700 px-3 py-2 rounded-lg font-medium border border-orange-200">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
              </svg>
              Oferta válida hasta {product.offer_ends_in}
            </span>
          </div>
        )}
        
        {/* Botón para móvil */}
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 mt-4 md:hidden transform hover:scale-105 active:scale-95 py-3 text-base"
          >
            {product.stock === 0 ? 'Sin stock' : '🛒 Agregar al carrito'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
