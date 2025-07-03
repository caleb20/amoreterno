import { useState, useMemo, useEffect } from 'react';
import api from '../utils/axios';
import type { Product, Category, Occasion } from '../types';

interface Filters {
  category: string;
  occasion: string;
  priceRange: { min: number; max: number };
  onSale: boolean;
  featured: boolean;
}

export const useProducts = () => {
  const [filters, setFilters] = useState<Filters>({
    category: '',
    occasion: '',
    priceRange: { min: 0, max: 1000 },
    onSale: false,
    featured: false
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        
        // Por ahora, extraer categorías únicas de los productos
        const uniqueCategories = Array.from(
          new Set(productsRes.data.map((product: Product) => product.category).filter(Boolean))
        ).map((category, index) => ({
          id: index + 1,
          name: category as string,
          description: `Categoría ${category}`
        }));
        setCategories(uniqueCategories);
        
      } catch (err: any) {
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
          !(product.description?.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.occasion && !(product.occasion?.includes(filters.occasion))) {
        return false;
      }
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }
      if (filters.onSale && !product.original_price) {
        return false;
      }
      if (filters.featured && !(product.featured || product.is_featured)) {
        return false;
      }
      return true;
    });
  }, [products, filters, searchTerm]);

  const featuredProducts = useMemo(() => {
    return products.filter(product => product.featured || product.is_featured);
  }, [products]);

  const saleProducts = useMemo(() => {
    return products.filter(product => product.original_price && product.discount);
  }, [products]);

  const filterByCategory = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const filterByOccasion = (occasionId: string) => {
    setFilters(prev => ({ ...prev, occasion: occasionId }));
  };

  const filterByPriceRange = (min: number, max: number) => {
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

  const getProductById = (productId: number) => {
    return products.find(product => product.id === productId);
  };

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.category === categoryId);
  };

  const getProductsByOccasion = (occasionId: string) => {
    return products.filter(product => product.occasion?.includes(occasionId));
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
    getProductsByOccasion,
    loading,
    error
  };
};