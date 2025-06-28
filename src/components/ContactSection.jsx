import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import MapaEstacionesLinea1 from './MapaEstacionesLinea1';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/api/company-info'),
      api.get('/api/payment-methods'),
      api.get('/api/features')
    ])
      .then(([companyRes, paymentRes, featuresRes]) => {
        setCompanyInfo(companyRes.data);
        setPaymentMethods(paymentRes.data);
        setFeatures(featuresRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar datos de contacto');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>¡Suscripción exitosa! Revisa tu email para el descuento.</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);

    // Reset form
    setFormData({ email: '', name: '', terms: false });
    setIsSubmitting(false);
  };

  if (loading) return <div className="text-center py-12">Cargando información de contacto...</div>;
  if (error) return <div className="text-center text-error py-12">{error}</div>;

  return (
    <section id="contacto" className="pt-6 pb-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info de entregas en estaciones */}
        <div className="mb-6">
          <div className="bg-accent-50 border-l-4 border-accent p-4 rounded-lg shadow-sm text-center">
            <span className="text-accent font-semibold">
              Todas las entregas en Lima se realizan en las estaciones del tren de Lima (Línea 1).
              <br />
              Para entregas en otro lugar o provincia, coordinar por WhatsApp.
            </span>
          </div>
        </div>
        {/* Mapa de estaciones */}
        <div className="mb-6">
          {/* El mapa se muestra solo en desktop, pero puedes quitar la clase si quieres que sea global */}
          <div className="hidden md:block">
            <MapaEstacionesLinea1 />
          </div>
          {/* En mobile, solo el texto */}
          <div className="md:hidden text-center text-text-secondary text-sm mt-4">
            Ver mapa de estaciones en versión escritorio.
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-6">Contáctanos</h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Estamos aquí para ayudarte a crear momentos especiales. Contáctanos por WhatsApp para 
              atención inmediata o llámanos directamente.
            </p>

            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">WhatsApp</h4>
                  <p className="text-text-secondary">{companyInfo.whatsapp}</p>
                  <p className="text-sm text-success">Respuesta promedio: {companyInfo.responseTime}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Teléfono</h4>
                  <p className="text-text-secondary">{companyInfo.phone}</p>
                  <p className="text-sm text-text-secondary">{companyInfo.workingHours}</p>
                </div>
              </div>

              {/* Business Registration */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Empresa Registrada</h4>
                  <p className="text-text-secondary">RUC: {companyInfo.ruc}</p>
                  <p className="text-sm text-text-secondary">Licencia Municipal Vigente</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={companyInfo && companyInfo.whatsapp ? `https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                </svg>
                <span>Chatear Ahora</span>
              </a>
              <a
                href={companyInfo && companyInfo.phone ? `tel:${companyInfo.phone.replace(/[^0-9]/g, '')}` : '#'}
                className="bg-surface text-accent border-2 border-accent px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-accent hover:text-white transition-all duration-300 inline-flex items-center justify-center space-x-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>Llamar</span>
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-6">Ofertas Exclusivas</h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Suscríbete a nuestro newsletter y recibe descuentos especiales, tips de cuidado floral 
              y las últimas novedades directamente en tu email.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Nombre (opcional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-text-secondary">
                  Acepto recibir ofertas y promociones por email. Puedo cancelar mi suscripción en cualquier momento.
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Suscribiendo...' : 'Suscribirse y Recibir 10% de Descuento'}
              </button>
            </form>

            {/* Benefits */}
            <div className="space-y-3">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                  <span className="text-sm text-text-secondary">
                    {index === 0 && 'Descuentos exclusivos para suscriptores'}
                    {index === 1 && 'Acceso anticipado a nuevos productos'}
                    {index === 2 && 'Tips de cuidado y decoración'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;