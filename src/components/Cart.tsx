import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import api from '../utils/axios';
import type { CartItem } from '../types';

const paymentMethods = [
  { key: 'yape', label: 'Yape', icon: '/yape-logo.png' },
  { key: 'plin', label: 'Plin', icon: '/plin-logo.png' },
  { key: 'transfer', label: 'Transferencia', icon: null },
  { key: 'cash', label: 'Contraentrega', icon: null }
];

const Cart: React.FC = () => {
  // Hooks siempre al inicio
  const {
    cart,
    isOpen,
    removeFromCart,
    updateQuantity,
    closeCart,
    totalPrice,
    estimatedDeliveryTime
  } = useCart();
  
  const [selectedPayment, setSelectedPayment] = useState<string>('yape');
  // Usar la estación seleccionada global del contexto
  const { selectedStation, setSelectedStation } = useCart();
  const [isProvince, setIsProvince] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    station: '',
    orderNote: ''
  });
  const [deliveryZones, setDeliveryZones] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      api.get('/api/bank-accounts')
        .then(res => {
          setBankAccounts(res.data || []);
          console.log('Bank accounts cargadas:', res.data);
        })
        .catch(error => {
          console.error('Error loading bank accounts:', error);
        });
      api.get('/api/company-info')
        .then(res => setCompanyInfo(res.data))
        .catch(() => setCompanyInfo(null));
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        closeCart();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeCart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleStationSelect = () => {
    // Dispatch custom event para scroll a estaciones
    window.dispatchEvent(new CustomEvent('scrollToEstaciones'));
    closeCart();
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cart,
        customer: formData,
        payment: selectedPayment,
        station: selectedStation,
        total: totalPrice,
        deliveryType: isProvince ? 'province' : 'local'
      };

      const response = await api.post('/api/send-order', orderData);
      
      if (response.data.success) {
        alert('¡Pedido enviado correctamente! Te contactaremos pronto.');
        // Limpiar carrito y cerrar
        // clearCart(); // Si tienes esta función
        closeCart();
      } else {
        alert('Error al enviar el pedido. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error al enviar el pedido. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Calcular costo de envío
  const shipping = isProvince ? 25 : (selectedStation ? 10 : 0);
  const totalWithShipping = totalPrice + shipping;

  const handleWhatsAppOrder = () => {
    const cartItems = cart.map((item: CartItem) =>
      `${item.product.name} (x${item.quantity}) - S/. ${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');
    let deliveryMsg = '';
    if (isProvince) {
      deliveryMsg = '\n\nEntrega: Provincia (coordinar punto exacto)\nEnvío: S/. 25.00';
    } else if (selectedStation) {
      deliveryMsg = `\n\nEntrega: Estación Línea 1 - ${selectedStation}\nEnvío: S/. 10.00`;
    } else {
      deliveryMsg = '\n\nEntrega: Línea 1 (por coordinar)\nEnvío: S/. 10.00';
    }
    const message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${cartItems}${deliveryMsg}\n\nTotal: S/. ${totalWithShipping.toFixed(2)}\n\nTiempo estimado de entrega: ${estimatedDeliveryTime}`;
    if (companyInfo && companyInfo.whatsapp) {
      const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert('No se pudo obtener el número de WhatsApp de la empresa.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay con fade */}
      <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 animate-fade-in" />
      {/* Sidebar a la derecha con slide y sombra */}
      <div
        ref={sidebarRef}
        className="relative bg-white h-full w-full max-w-md shadow-2xl overflow-y-auto transform transition-transform duration-300 animate-slide-in-right"
        style={{ minWidth: 340 }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Tu Carrito</h2>
            <button
              onClick={closeCart}
              className="text-gray-500 hover:text-gray-700 text-3xl"
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <button
                onClick={closeCart}
                className="btn-accent mt-4"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Lista de productos */}
              <div className="space-y-4 mb-6">
                {cart.map((item: CartItem) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    {item.product.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-primary font-bold text-lg">S/ {item.product.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border-2 border-primary bg-primary-50 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 font-semibold text-primary hover:border-primary"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-primary text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border-2 border-primary bg-primary-50 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 font-semibold text-primary hover:border-primary"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="ml-2 text-red-500 hover:text-red-700 text-lg"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-primary text-2xl">S/ {totalPrice.toFixed(2)}</span>
                </div>
                {estimatedDeliveryTime && (
                  <p className="text-sm text-gray-700 mt-2">
                    Tiempo estimado: {estimatedDeliveryTime}
                  </p>
                )}
              </div>

              {/* Método de pago */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold">Método de pago</h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.key}
                      type="button"
                      onClick={() => setSelectedPayment(method.key)}
                      className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                        selectedPayment === method.key
                          ? 'border-accent bg-accent-light'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {method.icon && (
                        <img src={method.icon} alt={method.label} className="w-8 h-8" />
                      )}
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
                {/* Detalle del método seleccionado */}
                <div className="mt-2">
                  {selectedPayment === 'yape' && (
                    <div className="flex flex-col items-center p-3 border rounded-lg">
                      <img src="/qr/yape.png" alt="QR Yape" className="h-24 w-24 object-contain rounded" />
                    </div>
                  )}
                  {selectedPayment === 'plin' && (
                    <div className="flex flex-col items-center p-3 border rounded-lg">
                      <img src="/qr/plin.png" alt="QR Plin" className="h-24 w-24 object-contain rounded" />
                    </div>
                  )}
                  {selectedPayment === 'transfer' && (
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">Transferencia Bancaria</h4>
                      {bankAccounts && bankAccounts.length > 0 ? (
                        <ul className="space-y-2 text-xs">
                          {bankAccounts.map((acc: any, idx: number) => (
                            <li key={idx} className="border rounded p-2">
                              <span className="font-bold">{acc.bank}:</span> {acc.account_number}<br />
                              <span className="font-bold">CCI:</span> {acc.cci}<br />
                              <span className="font-bold">Titular:</span> {acc.holder}<br />
                              <span className="font-bold">Tipo:</span> {acc.type}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-500">Solicita los datos para transferencia al finalizar tu pedido.</p>
                      )}
                    </div>
                  )}
                  {selectedPayment === 'cash' && (
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">Pago Contraentrega</h4>
                      <p className="text-xs text-gray-500">Puedes pagar en efectivo o con Yape/Plin al recibir tu pedido.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Selección de punto de entrega */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-bold text-primary text-base">Lugar de entrega:</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <button
                    type="button"
                    className={`px-3 py-1 rounded border text-xs font-semibold transition-all duration-200 text-center ${!isProvince && selectedStation !== 'OTROS' ? 'bg-accent text-white border-accent' : 'bg-surface text-text-secondary border-gray-300 hover:bg-accent hover:text-white hover:border-accent'}`}
                    onClick={() => {
                      setIsProvince(false);
                      setSelectedStation(selectedStation === 'OTROS' ? '' : selectedStation);
                      if (selectedStation && selectedStation !== 'OTROS') {
                        const notification = document.createElement('div');
                        notification.className = 'fixed top-20 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50';
                        notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"/>\n        </svg>\n        <span>Estación seleccionada: <b>${selectedStation}</b></span>\n      </div>\n    `;
                        document.body.appendChild(notification);
                        setTimeout(() => {
                          document.body.removeChild(notification);
                        }, 3500);
                      }
                      closeCart();
                      setTimeout(() => {
                        const estaciones = document.getElementById('estaciones');
                        if (estaciones) {
                          estaciones.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          window.dispatchEvent(new CustomEvent('scrollToEstaciones'));
                        }
                      }, 600); // delay mayor para asegurar que el Cart ya no esté visible
                    }}
                  >
                    {selectedStation && selectedStation !== 'OTROS' ? `Estación: ${selectedStation}` : 'Estación Línea 1'}
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 rounded border text-xs font-semibold transition-all duration-200 text-center ${selectedStation === 'OTROS' ? 'bg-accent text-white border-accent' : 'bg-surface text-text-secondary border-gray-300 hover:bg-accent hover:text-white hover:border-accent'}`}
                    onClick={() => {
                      setIsProvince(false);
                      setSelectedStation('OTROS');
                      const notification = document.createElement('div');
                      notification.className = 'fixed top-20 right-4 bg-secondary text-gray-800 px-6 py-3 rounded-lg shadow-lg z-50 border border-secondary-300';
                      notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"/>\n        </svg>\n        <span>Lugar de entrega: <b>Otros (coordinar por WhatsApp)</b></span>\n      </div>\n    `;
                      document.body.appendChild(notification);
                      setTimeout(() => {
                        document.body.removeChild(notification);
                      }, 3500);
                    }}
                  >
                    Otros Lima
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 rounded border text-xs font-semibold transition-all duration-200 text-center ${isProvince ? 'bg-accent text-white border-accent' : 'bg-surface text-text-secondary border-gray-300 hover:bg-accent hover:text-white hover:border-accent'}`}
                    onClick={() => {
                      setIsProvince(true);
                      setSelectedStation('');
                      const notification = document.createElement('div');
                      notification.className = 'fixed top-20 right-4 bg-accent text-gray-800 px-6 py-3 rounded-lg shadow-lg z-50 border border-accent-300';
                      notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"/>\n        </svg>\n        <span>Lugar de entrega: <b>Provincia (coordinar por WhatsApp)</b></span>\n      </div>\n    `;
                      document.body.appendChild(notification);
                      setTimeout(() => {
                        document.body.removeChild(notification);
                      }, 3500);
                    }}
                  >
                    Provincia
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {isProvince
                    ? 'Envío: S/ 25 (coordinar por WhatsApp)'
                    : selectedStation
                      ? `Envío: S/ 10 a estación Línea 1 (${selectedStation})`
                      : 'Envío: S/ 10 a estación Línea 1 (por coordinar)'}
                </div>
              </div>

              {/* Botón de enviar pedido */}
              <button
                onClick={handleWhatsAppOrder}
                disabled={loading || cart.length === 0}
                className="btn-success w-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
              >
                {loading ? 'Enviando...' : 'Enviar Pedido'}
              </button>
            </>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.35s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default Cart;
