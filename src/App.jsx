import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import CategoryNavigation from './components/CategoryNavigation';
import ProductSection from './components/ProductSection';
import OffersSection from './components/OffersSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import ServiceBenefitsSection from './components/ServiceBenefitsSection';
import CustomOrderUpload from './components/CustomOrderUpload';
import { SEO } from './utils/constants';

function App() {
  useEffect(() => {
    // Set document title and meta description
    document.title = 'Amor Eterno';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Flores, arreglos florales y regalos para toda ocasión en Lima y provincias. Entrega rápida y personalizada.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'flores, amor eterno, arreglos florales, regalos, delivery, Lima, provincia, rosas, tulipanes, cumpleaños, aniversario, san valentín, condolencias, florería');
    }

    // Set language
    document.documentElement.lang = 'es';

    // Set favicon
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = '/logo.png';
  }, []);

  // Estado para la navegación de categorías
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroCarousel />
        <CategoryNavigation
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ProductSection selectedCategory={selectedCategory} />
        <OffersSection />
        <CustomOrderUpload />
        <ServiceBenefitsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;