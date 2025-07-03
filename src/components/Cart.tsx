import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../utils/axios';
import type { CartItem } from '../types';

interface PaymentMethod {
  id: string;
  name: string;
  image?: string;
}

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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Cargar datos cuando se abre el carrito
      Promise.all([
        api.get('/api/delivery-zones'),
        api.get('/api/payment-methods'),
        api.get('/api/bank-accounts')
      ]).then(([zonesRes, paymentRes, accountsRes]) => {
        setDeliveryZones(zonesRes.data || []);
        setPaymentMethods(paymentRes.data || []);
        setBankAccounts(accountsRes.data || []);
      }).catch(error => {
        console.error('Error loading cart data:', error);
      });
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                className="mt-4 bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-dark transition-colors"
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
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-accent font-bold">S/ {item.product.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
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
                  <span>Total:</span>
                  <span className="text-accent">S/ {totalPrice.toFixed(2)}</span>
                </div>
                {estimatedDeliveryTime && (
                  <p className="text-sm text-gray-600 mt-2">
                    Tiempo estimado: {estimatedDeliveryTime}
                  </p>
                )}
              </div>

              {/* Formulario de datos */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold">Datos de entrega</h3>
                
                <input
                  type="text"
                  name="customerName"
                  placeholder="Nombre completo"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="Teléfono"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                
                <input
                  type="email"
                  name="customerEmail"
                  placeholder="Email (opcional)"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
                
                <textarea
                  name="deliveryAddress"
                  placeholder="Dirección de entrega"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg h-20"
                  required
                />

                {/* Selección de estación */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Estación de Metro más cercana (opcional)</label>
                  <button
                    type="button"
                    onClick={handleStationSelect}
                    className="w-full p-3 border rounded-lg text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {selectedStation || 'Seleccionar estación'}
                  </button>
                </div>
              </div>

              {/* Método de pago */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold">Método de pago</h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                        selectedPayment === method.id
                          ? 'border-accent bg-accent-light'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {method.image && (
                        <img src={method.image} alt={method.name} className="w-8 h-8" />
                      )}
                      <span>{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón de enviar pedido */}
              <button
                onClick={handleSubmitOrder}
                disabled={loading || !formData.customerName || !formData.customerPhone || !formData.deliveryAddress}
                className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Pedido'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
