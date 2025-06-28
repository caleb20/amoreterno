import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../utils/axios';

const Cart = () => {

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
  const [selectedPayment, setSelectedPayment] = useState('yape');
  // Usar la estación seleccionada global del contexto
  const { selectedStation, setSelectedStation } = useCart();
  const [isProvince, setIsProvince] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    api.get('/api/company-info')
      .then(res => setCompanyInfo(res.data))
      .catch(() => setCompanyInfo(null));
  }, []);

  useEffect(() => {
    api.get('/api/bank-accounts')
      .then(res => setBankAccounts(res.data))
      .catch(() => setBankAccounts([]));
  }, []);

  if (!isOpen) return null;

  // Calcular costo de envío
  const shipping = isProvince ? 25 : (selectedStation ? 10 : 0);
  const totalWithShipping = totalPrice + shipping;

  const handleWhatsAppOrder = () => {
    const cartItems = cart.map(item => 
      `${item.name} (x${item.quantity}) - S/. ${(item.price * item.quantity).toFixed(2)}`
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
    const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full max-w-full sm:w-[400px] md:w-[480px] bg-surface shadow-2xl z-50 transition-all duration-500 ease-in-out transform translate-x-0 animate-slide-cart">

        <div className="h-full flex flex-col">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-poppins font-semibold text-text-primary">Tu Carrito</h2>
            <button
              onClick={closeCart}
              className="text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center text-text-secondary">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12M7 19h12"/>
                </svg>
                <p>Tu carrito está vacío</p>
                <p className="text-sm mt-2">Agrega algunos productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{item.name}</h4>
                      <p className="text-sm text-text-secondary">S/. {item.price.toFixed(2)} c/u</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-error hover:text-red-700 transition-colors duration-150"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-4">
                {/* Selección de punto de entrega */}
                <div className="mb-2">
                  <div className="text-sm text-text-secondary mb-1">
                    <span className="font-semibold text-accent">Lugar de entrega:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <button
                      type="button"
                      className={`px-3 py-1 rounded border text-xs font-semibold transition-all duration-200 text-center ${!isProvince && selectedStation !== 'OTROS' ? 'bg-accent text-white border-accent' : 'bg-surface text-text-secondary border-gray-300 hover:bg-accent hover:text-white hover:border-accent'}`}
                      onClick={() => {
                        setIsProvince(false);
                        setSelectedStation(selectedStation === 'OTROS' ? '' : selectedStation);
                        // Mostrar notificación si ya hay estación seleccionada
                        if (selectedStation && selectedStation !== 'OTROS') {
                          const notification = document.createElement('div');
                          notification.className = 'fixed top-20 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg z-50';
                          notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"/>\n        </svg>\n        <span>Estación seleccionada: <b>${selectedStation}</b></span>\n      </div>\n    `;
                          document.body.appendChild(notification);
                          setTimeout(() => {
                            document.body.removeChild(notification);
                          }, 3500);
                        }
                        // Siempre cerrar el carrito y redirigir a la sección de estaciones
                        closeCart();
                        setTimeout(() => {
                          window.dispatchEvent(new CustomEvent('scrollToEstaciones'));
                        }, 350);
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
                        // Notificación para "Otros"
                        const notification = document.createElement('div');
                        notification.className = 'fixed top-20 right-4 bg-warning text-white px-6 py-3 rounded-lg shadow-lg z-50';
                        notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"/>\n        </svg>\n        <span>Lugar de entrega: <b>Otros (coordinar por WhatsApp)</b></span>\n      </div>\n    `;
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
                        // Notificación para "Provincia"
                        const notification = document.createElement('div');
                        notification.className = 'fixed top-20 right-4 bg-warning text-white px-6 py-3 rounded-lg shadow-lg z-50';
                        notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"/>\n        </svg>\n        <span>Lugar de entrega: <b>Provincia (coordinar por WhatsApp)</b></span>\n      </div>\n    `;
                        document.body.appendChild(notification);
                        setTimeout(() => {
                          document.body.removeChild(notification);
                        }, 3500);
                      }}
                    >
                      Provincia
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-text-secondary">
                    {isProvince
                      ? 'Envío: S/ 25 (coordinar por WhatsApp)'
                      : selectedStation
                        ? `Envío: S/ 10 a estación Línea 1 (${selectedStation})`
                        : 'Envío: S/ 10 a estación Línea 1 (por coordinar)'}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-poppins font-semibold text-text-primary">Total:</span>
                  <span className="text-xl font-poppins font-bold text-accent">
                    S/ {totalWithShipping.toFixed(2)}
                  </span>
                </div>
                {estimatedDeliveryTime && (
                  <div className="text-sm text-text-secondary">
                    <p>Tiempo estimado de entrega: <span className="font-medium text-success">{estimatedDeliveryTime}</span></p>
                  </div>
                )}
                {/* Métodos de pago como botones */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Métodos de Pago</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { key: 'yape', label: 'Yape', icon: '/yape-logo.png' },
                      { key: 'plin', label: 'Plin', icon: '/plin-logo.png' },
                      { key: 'transfer', label: 'Transferencia', icon: null },
                      { key: 'cash', label: 'Contraentrega', icon: null }
                    ].map((method) => (
                      <button
                        key={method.key}
                        type="button"
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm transition-colors duration-150 focus:outline-none w-full text-center ${selectedPayment === method.key ? 'bg-accent text-white border-accent' : 'bg-white text-text-primary border-gray-300 hover:bg-gray-100'}`}
                        onClick={() => setSelectedPayment(method.key)}
                      >
                        {method.icon && <img src={method.icon} alt={method.label} className="h-6 w-6 object-contain mx-auto" />}
                        <span className="flex-1 text-center mx-auto">{method.label}</span>
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
                            {bankAccounts.map((acc, idx) => (
                              <li key={idx} className="border rounded p-2">
                                <span className="font-bold">{acc.bank}:</span> {acc.account_number}<br />
                                <span className="font-bold">CCI:</span> {acc.cci}<br />
                                <span className="font-bold">Titular:</span> {acc.holder}<br />
                                <span className="font-bold">Tipo:</span> {acc.type}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-text-secondary">Solicita los datos para transferencia al finalizar tu pedido.</p>
                        )}
                      </div>
                    )}
                    {selectedPayment === 'cash' && (
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">Pago Contraentrega</h4>
                        <p className="text-xs text-text-secondary">Puedes pagar en efectivo o con Yape/Plin al recibir tu pedido.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón de checkout eliminado */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="block w-full bg-success text-white text-center px-4 py-2 rounded-md font-poppins font-medium text-base hover:bg-green-600 transition-colors duration-300"
                >
                  Ordenar por WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;