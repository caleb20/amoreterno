import React, { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import database from '../data/database.json';

// Subcomponente: Barra de confianza
// TrustBar sin stats (solo branding o vacío)
const TrustBar = () => (
  <div className="bg-primary-50 border-b border-primary-200">
    <div className="max-w-7xl mx-auto px-4 py-2 text-center text-text-secondary text-sm">
      {/* Puedes poner aquí un mensaje de confianza o dejarlo vacío */}
    </div>
  </div>
);

// Subcomponente: Navegación de escritorio
const DesktopNav = ({ scrollToSection }) => (
  <div className="hidden md:flex items-center space-x-8">
    <button onClick={() => scrollToSection('productos')} className="text-text-secondary hover:text-accent transition-colors duration-150">Productos</button>
    <button onClick={() => scrollToSection('ocasiones')} className="text-text-secondary hover:text-accent transition-colors duration-150">Ocasiones</button>
    <button onClick={() => scrollToSection('ofertas')} className="text-text-secondary hover:text-accent transition-colors duration-150">Ofertas</button>
    <button onClick={() => scrollToSection('contacto')} className="text-text-secondary hover:text-accent transition-colors duration-150">Contacto</button>
  </div>
);

// Subcomponente: Botón de carrito
const CartButton = ({ itemCount, toggleCart }) => (
  <button
    onClick={toggleCart}
    className="relative p-2 text-text-secondary hover:text-accent transition-colors duration-150"
    aria-label="Abrir carrito"
  >
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12M7 19h12"/>
    </svg>
    {itemCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {itemCount}
      </span>
    )}
  </button>
);

// Subcomponente: Botón de WhatsApp
const WhatsAppButton = ({ whatsapp }) => (
  <a
    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-success text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors duration-150"
    aria-label="Contactar por WhatsApp"
  >
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
    </svg>
    <span className="hidden sm:inline">WhatsApp</span>
  </a>
);

// Subcomponente: Menú móvil
const MobileMenu = ({ mobileMenuOpen, scrollToSection }) => (
  mobileMenuOpen ? (
    <div className="md:hidden py-4 border-t border-gray-200">
      <div className="flex flex-col space-y-4">
        <button onClick={() => scrollToSection('productos')} className="text-left text-text-secondary hover:text-accent transition-colors duration-150">Productos</button>
        <button onClick={() => scrollToSection('ocasiones')} className="text-left text-text-secondary hover:text-accent transition-colors duration-150">Ocasiones</button>
        <button onClick={() => scrollToSection('ofertas')} className="text-left text-text-secondary hover:text-accent transition-colors duration-150">Ofertas</button>
        <button onClick={() => scrollToSection('contacto')} className="text-left text-text-secondary hover:text-accent transition-colors duration-150">Contacto</button>
      </div>
    </div>
  ) : null
);

// Componente principal
const Header = () => {
  const { itemCount, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const companyInfo = database.companyInfo;


  // Handler para scroll suave y cerrar menú móvil
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  // Escuchar evento global para scroll a estaciones desde el carrito
  React.useEffect(() => {
    const handler = () => {
      scrollToSection('contacto'); // id de la sección donde está el mapa de estaciones
    };
    window.addEventListener('scrollToEstaciones', handler);
    return () => window.removeEventListener('scrollToEstaciones', handler);
  }, [scrollToSection]);

  return (
    <>
      {/* <TrustBar /> */}
      <nav className="bg-surface shadow-primary sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo-text.png" alt="Amor Eterno" className="h-10 w-auto max-w-[180px] object-contain" />
            </div>
            <DesktopNav scrollToSection={scrollToSection} />
            <div className="flex items-center space-x-4">
              {/* Botón menú móvil */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-accent transition-colors duration-150"
                aria-label="Abrir menú móvil"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <CartButton itemCount={itemCount} toggleCart={toggleCart} />
              <WhatsAppButton whatsapp={companyInfo.whatsapp} />
            </div>
          </div>
          <MobileMenu mobileMenuOpen={mobileMenuOpen} scrollToSection={scrollToSection} />
        </div>
      </nav>
    </>
  );
};

export default Header;