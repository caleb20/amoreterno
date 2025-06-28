import React, { useEffect, useState } from 'react';
import api from '../utils/axios';

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/company-info')
      .then(res => {
        setCompanyInfo(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar información de la empresa');
        setLoading(false);
      });
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return <div className="text-center py-12">Cargando información...</div>;
  if (error) return <div className="text-center text-error py-12">{error}</div>;
  if (!companyInfo) return null;

  return (
    <footer className="bg-text-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 2C15.5 2 12 5.5 12 10c0 2.5 1 4.8 2.6 6.5L20 38l5.4-21.5C27 14.8 28 12.5 28 10c0-4.5-3.5-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                <circle cx="20" cy="10" r="2" fill="white"/>
              </svg>
              <span className="ml-2 text-xl font-poppins font-bold">{companyInfo.name}</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Creando momentos mágicos con flores frescas y entregas confiables en Lima y Callao desde 2019.
            </p>
            <div className="flex space-x-4">
              {companyInfo.socialMedia && Object.entries(companyInfo.socialMedia).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {platform === 'twitter' && (
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    )}
                    {platform === 'facebook' && (
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    )}
                    {platform === 'instagram' && (
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    )}
                    {platform === 'pinterest' && (
                      <path d="M12.056 0C5.5 0 .056 5.5.056 12.056s5.444 12.056 12 12.056 12-5.5 12-12.056S18.612 0 12.056 0zm5.338 8.663l-1.5 7.087c-.113.506-.412.631-.837.394l-2.313-1.706-1.112 1.075c-.125.125-.231.231-.475.231l.169-2.387 4.362-3.944c.188-.169-.044-.262-.294-.094l-5.394 3.394-2.325-.725c-.506-.156-.513-.506.106-.75l9.087-3.506c.425-.156.8.094.663.731z"/>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('productos')} 
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Productos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ofertas')} 
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Ofertas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ocasiones')} 
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Ocasiones
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacto')} 
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Contacto
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Seguimiento de Pedido
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Entrega Mismo Día
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Arreglos Personalizados
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Eventos Corporativos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Suscripción Mensual
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Cuidado de Plantas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-gray-300">{companyInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-gray-300">{companyInfo.whatsapp}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-gray-300">{companyInfo.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 {companyInfo.name}. Todos los derechos reservados. RUC: {companyInfo.ruc}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-primary text-sm transition-colors duration-300">
              Términos y Condiciones
            </a>
            <a href="#" className="text-gray-300 hover:text-primary text-sm transition-colors duration-300">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-300 hover:text-primary text-sm transition-colors duration-300">
              Política de Devoluciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;