import { useState, useMemo } from 'react';
import database from '../data/database.json';

export const useProducts = () => {
  const [filters, setFilters] = useState({
    category: '',
    occasion: '',
    priceRange: { min: 0, max: 1000 },
    onSale: false,
    featured: false
  });

  const [searchTerm, setSearchTerm] = useState('');

  const products = database.products;
  const categories = database.categories;
  const occasions = database.occasions;

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search term filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Occasion filter
      if (filters.occasion && !product.occasion.includes(filters.occasion)) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      // On sale filter
      if (filters.onSale && !product.originalPrice) {
        return false;
      }

      // Featured filter
      if (filters.featured && !product.featured) {
        return false;
      }

      return true;
    });
  }, [products, filters, searchTerm]);

  const featuredProducts = useMemo(() => {
    return products.filter(product => product.featured);
  }, [products]);

  const saleProducts = useMemo(() => {
    return products.filter(product => product.originalPrice && product.discount);
  }, [products]);

  const filterByCategory = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const filterByOccasion = (occasionId) => {
    setFilters(prev => ({ ...prev, occasion: occasionId }));
  };

  const filterByPriceRange = (min, max) => {
    setFilters(prev => ({ ...prev, priceRange: { min, max } }));
  };

  const toggleSaleFilter = () => {
    setFilters(prev => ({ ...prev, onSale: !prev.onSale }));
  };

  const toggleFeaturedFilter = () => {
    setFilters(prev => ({ ...prev, featured: !prev.featured }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      occasion: '',
      priceRange: { min: 0, max: 1000 },
      onSale: false,
      featured: false
    });
    setSearchTerm('');
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category === categoryId);
  };

  const getProductsByOccasion = (occasionId) => {
    return products.filter(product => product.occasion.includes(occasionId));
  };

  return {
    products: filteredProducts,
    allProducts: products,
    featuredProducts,
    saleProducts,
    categories,
    occasions,
    filters,
    searchTerm,
    setSearchTerm,
    filterByCategory,
    filterByOccasion,
    filterByPriceRange,
    toggleSaleFilter,
    toggleFeaturedFilter,
    clearFilters,
    getProductById,
    getProductsByCategory,
    getProductsByOccasion
  };
};