import { useState, useMemo, useEffect } from 'react';
import api from '../utils/axios';

export const useProducts = () => {
  const [filters, setFilters] = useState({
    category: '',
    occasion: '',
    priceRange: { min: 0, max: 1000 },
    onSale: false,
    featured: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsRes, occasionsRes] = await Promise.all([
          api.get('/api/products'),
          api.get('/api/occasions'),
        ]);
        setProducts(productsRes.data);
        setOccasions(occasionsRes.data);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.occasion && !product.occasion.includes(filters.occasion)) {
        return false;
      }
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }
      if (filters.onSale && !product.original_price) {
        return false;
      }
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
    return products.filter(product => product.original_price && product.discount);
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
    getProductsByOccasion,
    loading,
    error
  };
};