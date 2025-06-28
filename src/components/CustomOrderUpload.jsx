import React, { useState, useRef, useCallback, useEffect } from 'react';
import Icon from './AppIcon';

// Subcomponente: Sección de subida de imagen
const ImageUploadSection = ({ uploadedImage, isDragOver, isUploading, fileInputRef, handleFileInputChange, handleDrop, handleDragOver, handleDragLeave, handleRemoveImage }) => (
  <div className="p-8 bg-surface">
    <h3 className="text-xl font-semibold text-text-primary mb-6">
      Sube tu Imagen de Referencia
    </h3>
    {!uploadedImage ? (
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-standard cursor-pointer ${
          isDragOver 
            ? 'border-accent bg-accent-50' :'border-border hover:border-accent hover:bg-surface-100'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        aria-label="Zona de subida de imagen"
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-text-secondary">Subiendo imagen...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={32} className="text-accent" />
            </div>
            <div>
              <p className="text-lg font-medium text-text-primary mb-2">
                Arrastra tu imagen aquí
              </p>
              <p className="text-text-secondary">
                o haz clic para seleccionar un archivo
              </p>
            </div>
            <p className="text-sm text-text-muted">
              JPG, PNG, WEBP hasta 5MB
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    ) : (
      <div className="space-y-4">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={uploadedImage.preview}
            alt="Preview"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 w-8 h-8 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-standard"
            aria-label="Eliminar imagen"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-success-600">
          <Icon name="CheckCircle" size={16} />
          <span>Imagen subida: {uploadedImage.name}</span>
        </div>
      </div>
    )}
  </div>
);

// Subcomponente: Formulario de detalles del pedido
const OrderDetailsForm = ({ customMessage, setCustomMessage, contactInfo, handleInputChange, handleSubmit, uploadedImage, isUploading }) => (
  <div className="p-8">
    <h3 className="text-xl font-semibold text-text-primary mb-6">
      Detalles del Pedido
    </h3>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="customMessage" className="block text-sm font-medium text-text-primary mb-2">
          Mensaje Personalizado (Opcional)
        </label>
        <textarea
          id="customMessage"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Describe tu visión, colores preferidos, ocasión especial, etc."
          rows={4}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-standard resize-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Nombre *
          </label>
          <input
            id="name"
            type="text"
            value={contactInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-standard"
            placeholder="Tu nombre completo"
            aria-label="Nombre"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
            Teléfono *
          </label>
          <input
            id="phone"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-standard"
            placeholder="+51 999 888 777"
            aria-label="Teléfono"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email (Opcional)
        </label>
        <input
          id="email"
          type="email"
          value={contactInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-standard"
          placeholder="tu@email.com"
          aria-label="Email"
        />
      </div>
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div className="text-sm text-text-primary">
            <p className="font-medium mb-1">¿Cómo funciona?</p>
            <ul className="space-y-1 text-text-secondary">
              <li>• Te contactaremos en 30 minutos</li>
              <li>• Confirmaremos detalles y precio</li>
              <li>• Tiempo de preparación: 2-4 horas</li>
            </ul>
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={!uploadedImage || isUploading}
        className="w-full bg-accent hover:bg-accent-600 disabled:bg-text-muted disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-standard"
        aria-label="Enviar Solicitud Personalizada"
      >
        {isUploading ? 'Subiendo...' : 'Enviar Solicitud Personalizada'}
      </button>
    </form>
  </div>
);

// Componente principal
const CustomOrderUpload = () => {
  // State y refs
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', email: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Handlers con useCallback para evitar renders innecesarios
  const handleFileSelect = useCallback((file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, sube solo imágenes (JPG, PNG, WEBP)');
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('La imagen es muy grande. Máximo 5MB permitido.');
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage({ file, preview: e.target.result, name: file.name });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  // Cambia la función handleSubmit para enviar los datos al backend seguro
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert('Por favor, sube una imagen de referencia');
      return;
    }
    if (!contactInfo.name || !contactInfo.phone) {
      alert('Por favor, completa tu nombre y teléfono');
      return;
    }
    setIsUploading(true);
    try {
      // Prepara el formData para enviar imagen y datos
      const formData = new FormData();
      formData.append('image', uploadedImage.file);
      formData.append('name', contactInfo.name);
      formData.append('phone', contactInfo.phone);
      formData.append('email', contactInfo.email || 'No proporcionado');
      formData.append('message', customMessage || 'Sin mensaje personalizado');
      const res = await fetch('/api/custom-order', {
        method: 'POST',
        body: formData,
      });
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('Error al parsear respuesta JSON:', jsonErr);
        alert('Error inesperado al procesar la respuesta del servidor.');
        setIsUploading(false);
        return;
      }
      console.log('Respuesta del backend:', data);
      if (data.success && data.imageUrl) {
        // Enviar email con EmailJS desde el frontend
        try {
          // Carga EmailJS si no está cargado
          if (!window.emailjs) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
              script.onload = resolve;
              script.onerror = reject;
              document.body.appendChild(script);
            });
          }
          // Inicializa EmailJS
          window.emailjs.init('yXg6YZq8x4NZFxZNi');
          // Prepara los parámetros para la plantilla
          const templateParams = {
            name: contactInfo.name,
            phone: contactInfo.phone,
            email: contactInfo.email || 'No proporcionado',
            message: customMessage || 'Sin mensaje personalizado',
            image_url: data.imageUrl,
          };
          const result = await window.emailjs.send(
            'service_dbe7uxl',
            'template_cg3t2y1',
            templateParams
          );
          console.log('Email enviado:', result);
          setShowSuccess(true);
          setUploadedImage(null);
          setCustomMessage('');
          setContactInfo({ name: '', phone: '', email: '' });
          if (fileInputRef.current) fileInputRef.current.value = '';
          setTimeout(() => setShowSuccess(false), 3000);
        } catch (emailErr) {
          console.error('Error al enviar email con EmailJS:', emailErr);
          alert('La imagen se subió correctamente, pero hubo un error al enviar el email de confirmación. Por favor, contáctanos directamente.');
        }
      } else {
        console.error('Error reportado por backend:', data);
        alert('Ocurrió un error al enviar tu solicitud. Intenta nuevamente.');
      }
    } catch (error) {
      alert('Ocurrió un error al enviar tu solicitud. Intenta nuevamente.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }, [uploadedImage, contactInfo, customMessage, fileInputRef]);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-500 p-6">
          <h1 className="text-3xl font-extrabold text-white">
            Orden Personalizada
          </h1>
          <p className="text-sm text-primary-100 mt-1">
            Completa los siguientes pasos para crear tu orden personalizada.
          </p>
        </div>
        <div className="divide-y divide-border md:divide-y-0 md:divide-x flex flex-col md:flex-row">
          {/* Sección de subida de imagen */}
          <div className="md:w-1/2">
            <ImageUploadSection
              uploadedImage={uploadedImage}
              isDragOver={isDragOver}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
              handleFileInputChange={handleFileInputChange}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleRemoveImage={handleRemoveImage}
            />
          </div>
          {/* Formulario de detalles del pedido */}
          <div className="md:w-1/2">
            <OrderDetailsForm
              customMessage={customMessage}
              setCustomMessage={setCustomMessage}
              contactInfo={contactInfo}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              uploadedImage={uploadedImage}
              isUploading={isUploading}
            />
          </div>
        </div>
        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
              <div className="flex items-center justify-center h-12 w-12 bg-success-100 rounded-full mx-auto mb-4">
                <Icon name="Check" size={24} className="text-success-600" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary text-center mb-2">
                ¡Solicitud Enviada!
              </h2>
              <p className="text-sm text-text-secondary text-center">
                Gracias por tu solicitud. Te contactaremos pronto para más detalles.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomOrderUpload;