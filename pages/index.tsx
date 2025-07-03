import Head from 'next/head';
import { useState, useEffect } from 'react';
import api from '../src/utils/axios';
import Header from '../src/components/Header';
import HeroCarousel from '../src/components/HeroCarousel';
import OffersSection from '../src/components/OffersSection';
import TestimonialsSection from '../src/components/TestimonialsSection';
import ContactSection from '../src/components/ContactSection';
import Footer from '../src/components/Footer';
import Cart from '../src/components/Cart';
import { CartProvider } from '../src/context/CartContext';
import CustomOrderUpload from '../src/components/CustomOrderUpload';
import MapaEstacionesLinea1 from '../src/components/MapaEstacionesLinea1';
import SkeletonPage from '../src/components/SkeletonPage';
import CategoryNavigation from '../src/components/CategoryNavigation';
import ProductSection from '../src/components/ProductSection';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Función para hacer scroll a ocasiones (sin toggle)
  const scrollToOcasiones = () => {
    const element = document.getElementById('ocasiones');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.documentElement.lang = 'es';
    // Simular carga global
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonPage />;

  return (
    <CartProvider>
      <Head>
        <title>Amor Eterno</title>
        <meta name="description" content="Flores, arreglos florales y regalos para toda ocasión en Lima y provincias. Entrega rápida y personalizada." />
        <meta name="keywords" content="flores, amor eterno, arreglos florales, regalos, delivery, Lima, provincia, rosas, tulipanes, cumpleaños, aniversario, san valentín, condolencias, florería" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen bg-primary-50">
        <Header scrollToOcasiones={scrollToOcasiones} />
        <HeroCarousel />
        <ProductSection selectedCategory="todos" />
        <OffersSection />
        <CategoryNavigation selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <CustomOrderUpload />
        <div className="bg-white rounded-2xl shadow-2xl transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] px-0 py-4 md:px-6 md:py-6 mt-0 mb-0 w-full max-w-7xl mx-auto">
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
