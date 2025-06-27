import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import database from '../data/database.json';

const UrgentDeliverySection = () => {
  const { countdown, formatTime, isExpired } = useCountdown(17, 0); // 5:00 PM cutoff

  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-6">
              Entrega Garantizada Hoy
            </h2>
            <div className="bg-surface rounded-lg p-6 shadow-primary mb-6">
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-accent mb-2">Tiempo Restante</div>
                {!isExpired ? (
                  <div className="text-4xl font-poppins font-bold text-text-primary">
                    <span>{formatTime(countdown.hours)}</span>:
                    <span>{formatTime(countdown.minutes)}</span>:
                    <span>{formatTime(countdown.seconds)}</span>
                  </div>
                ) : (
                  <div className="text-2xl font-poppins font-bold text-warning">
                    Tiempo agotado para hoy
                  </div>
                )}
                <div className="text-sm text-text-secondary mt-2">Para entrega el mismo día</div>
              </div>
            </div>
            <div className="space-y-3">
              {database.deliveryZones.map(zone => (
                <div key={zone.name} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    zone.status === 'available' ? 'bg-success' : 'bg-warning'
                  }`}></div>
                  <span className="text-text-secondary">
                    {zone.name}: Hasta {zone.cutoffTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-surface rounded-lg p-6 shadow-primary">
              <h3 className="text-xl font-poppins font-semibold mb-4">Zonas de Entrega</h3>
              <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2874&auto=format&fit=crop"
                  alt="Mapa de Lima con zonas de entrega"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {database.deliveryZones.map(zone => (
                      <div
                        key={zone.name}
                        className={`${
                          zone.status === 'available' ? 'bg-success' : 'bg-warning'
                        } bg-opacity-90 text-white p-3 rounded-lg`}
                      >
                        <div className="font-semibold">{zone.name}</div>
                        <div className="text-sm">
                          {zone.status === 'available' ? 'Disponible' : 'Última hora'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-accent hover:text-accent-700 font-medium">
                  Ver todas las zonas →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentDeliverySection; 