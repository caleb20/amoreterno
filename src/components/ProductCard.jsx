import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, showAddToCart = true, compact = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
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

  const renderStars = (rating) => {
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
      <div className="card-product group cursor-pointer relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:translate-y-[-2px]" onClick={handleAddToCart}>
        {product.discount && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-error text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </span>
          </div>
        )}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            }}
          />
          {/* Botón Agregar al Carrito en hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
              className="bg-accent text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-poppins font-semibold text-text-primary mb-2">{product.name}</h3>
          <div className="flex items-center space-x-2 mb-2">
            {product.original_price && (
              <span className="text-sm text-text-secondary line-through">
                S/. {product.original_price.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-poppins font-bold text-accent">
              S/. {product.price.toFixed(2)}
            </span>
          </div>
          {product.offerEndsIn && (
            <div className="text-xs text-warning">⏰ Quedan {product.offerEndsIn}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card-product group cursor-pointer" onClick={handleAddToCart}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
          }}
        />
        
        {/* Product Tags */}
        <div className="absolute top-4 left-4">
          {Array.isArray(product.tags) && product.tags.includes('popular') && (
            <span className="bg-accent text-white px-2 py-1 rounded-full text-sm font-medium">
              Más Popular
            </span>
          )}
          {Array.isArray(product.tags) && product.tags.includes('exclusivo') && (
            <span className="bg-secondary text-white px-2 py-1 rounded-full text-sm font-medium">
              Exclusivo
            </span>
          )}
          {Array.isArray(product.tags) && product.tags.includes('combo') && (
            <span className="bg-primary text-white px-2 py-1 rounded-full text-sm font-medium">
              Combo
            </span>
          )}
        </div>

        {/* Hover Add to Cart Button */}
        {showAddToCart && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-accent text-white px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              Agregar al Carrito
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-poppins font-semibold text-text-primary mb-2">
          {product.name}
        </h3>
        <p className="text-text-secondary mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {product.original_price && (
              <span className="text-lg text-text-secondary line-through">
                S/. {product.original_price.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-poppins font-bold text-accent">
              S/. {product.price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-text-secondary">({product.review_count})</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-success">
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            Entrega en {product.delivery_time}
          </span>
        </div>

        {product.offer_ends_in && (
          <div className="mt-3 text-sm text-warning">
            <span className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
              </svg>
              Oferta válida hasta {product.offer_ends_in}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;