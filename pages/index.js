import Head from 'next/head';
import { useEffect, useState } from 'react';
import api from '../src/utils/axios';
import Header from '../src/components/Header';
import HeroCarousel from '../src/components/HeroCarousel';
import CategoryNavigation from '../src/components/CategoryNavigation';
import ProductSection from '../src/components/ProductSection';
import OffersSection from '../src/components/OffersSection';
import TestimonialsSection from '../src/components/TestimonialsSection';
import ContactSection from '../src/components/ContactSection';
import Footer from '../src/components/Footer';
import Cart from '../src/components/Cart';
import { CartProvider } from '../src/context/CartContext';
import CustomOrderUpload from '../src/components/CustomOrderUpload';
import MapaEstacionesLinea1 from '../src/components/MapaEstacionesLinea1';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    document.documentElement.lang = 'es';
  }, []);

  return (
    <CartProvider>
      <Head>
        <title>Amor Eterno</title>
        <meta name="description" content="Flores, arreglos florales y regalos para toda ocasión en Lima y provincias. Entrega rápida y personalizada." />
        <meta name="keywords" content="flores, amor eterno, arreglos florales, regalos, delivery, Lima, provincia, rosas, tulipanes, cumpleaños, aniversario, san valentín, condolencias, florería" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroCarousel />
        <CategoryNavigation selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <ProductSection selectedCategory={selectedCategory} />
        <OffersSection />
        <CustomOrderUpload />
        <div className="bg-white rounded-2xl shadow-lg px-0 py-4 md:px-6 md:py-6 -mt-4 mb-2 w-full max-w-7xl mx-auto">
          <MapaEstacionesLinea1 />
        </div>
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
}
