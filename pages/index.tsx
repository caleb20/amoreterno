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
  const [selectedOccasionId, setSelectedOccasionId] = useState<string>('');

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
        {/* Google Fonts: Poppins */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Amor Eterno" />
        <meta property="og:description" content="Flores, arreglos florales y regalos para toda ocasión en Lima y provincias. Entrega rápida y personalizada." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://amoreterno.pe/" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amor Eterno" />
        <meta name="twitter:description" content="Flores, arreglos florales y regalos para toda ocasión en Lima y provincias. Entrega rápida y personalizada." />
        <meta name="twitter:image" content="/logo.png" />
        {/* Google Analytics (GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');`
        }} />
        {/* Robots meta tag for SEO */}
        <meta name="robots" content="index, follow" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://amoreterno.pe/" />
      </Head>
      <main className="min-h-screen bg-surface">
        <Header scrollToOcasiones={scrollToOcasiones} />
        <section className="relative z-10 bg-gradient-to-br from-primary-50 via-secondary-50 to-surface pb-8 pt-2">
          <HeroCarousel />
        </section>
        <section className="bg-surface py-12">
          <ProductSection selectedCategory={selectedCategory} />
        </section>
        <section className="bg-gradient-to-br from-secondary-50 via-surface to-accent-50 py-12">
          <OffersSection />
        </section>
        <section className="bg-surface py-12">
          <CategoryNavigation selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        </section>
        <section className="bg-gradient-to-br from-mint-50 via-surface to-primary-50 py-12">
          <CustomOrderUpload />
        </section>
        <section className="bg-surface py-12">
          <div id="mapa-estaciones" className="rounded-2xl shadow-primary transition-shadow duration-300 hover:shadow-primary-lg px-0 py-4 md:px-6 md:py-6 mt-0 mb-0 w-full max-w-7xl mx-auto">
            <MapaEstacionesLinea1 />
          </div>
        </section>
        <section className="bg-gradient-to-br from-accent-50 via-surface to-mint-50 py-12">
          <TestimonialsSection />
        </section>
        <section className="bg-surface py-12">
          <ContactSection />
        </section>
        <footer className="bg-gray-900 text-white py-12 mt-8">
          <Footer />
        </footer>
        <Cart />
      </main>
    </CartProvider>
  );
}
