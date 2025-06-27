import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Coordenadas oficiales de la Línea 1 del Metro de Lima (fuente: Google Maps y Wikipedia)
const estaciones = [
  { nombre: 'Villa El Salvador', lat: -12.158889, lng: -76.978611 },
  { nombre: 'Parque Industrial', lat: -12.1475, lng: -76.977222 },
  { nombre: 'Pumacahua', lat: -12.136111, lng: -76.9725 },
  { nombre: 'Villa María', lat: -12.124722, lng: -76.968333 },
  { nombre: 'San Juan', lat: -12.113611, lng: -76.963333 },
  { nombre: 'Atocongo', lat: -12.1025, lng: -76.958889 },
  { nombre: 'Jorge Chávez', lat: -12.092222, lng: -76.954444 },
  { nombre: 'Ayacucho', lat: -12.081944, lng: -76.950278 },
  { nombre: 'Los Cabitos', lat: -12.071389, lng: -76.945833 },
  { nombre: 'San Borja Sur', lat: -12.061111, lng: -76.941111 },
  { nombre: 'La Cultura', lat: -12.050833, lng: -76.936944 },
  { nombre: 'Arriola', lat: -12.040556, lng: -76.9325 },
  { nombre: 'Gamarra', lat: -12.030278, lng: -76.928056 },
  { nombre: 'Miguel Grau', lat: -12.02, lng: -76.923611 },
  { nombre: 'El Ángel', lat: -12.009722, lng: -76.919167 },
  { nombre: 'Presbítero Maestro', lat: -11.999444, lng: -76.914722 },
  { nombre: 'Caja de Agua', lat: -11.989167, lng: -76.910278 },
  { nombre: 'Pirámide del Sol', lat: -11.978889, lng: -76.905833 },
  { nombre: 'Los Jardines', lat: -11.968611, lng: -76.901389 },
  { nombre: 'San Carlos', lat: -11.958333, lng: -76.897222 },
  { nombre: 'San Martín', lat: -11.948056, lng: -76.892778 },
  { nombre: 'Santa Rosa', lat: -11.937778, lng: -76.888333 },
  { nombre: 'Bayóvar', lat: -11.9275, lng: -76.883889 }
];


const MapaEstacionesLinea1 = () => {
  const { selectedStation, setSelectedStation } = useCart();
  const [selected, setSelected] = useState(selectedStation ? estaciones.find(e => e.nombre === selectedStation) : null);

  const containerStyle = {
    width: '100%',
    maxWidth: 700,
    height: '400px',
    borderRadius: '12px',
    border: '1px solid #eee',
    margin: '0 auto'
  };
  // Centrar el mapa en la estación seleccionada o en el centro general
  const center = selected
    ? { lat: selected.lat, lng: selected.lng }
    : { lat: -12.09, lng: -76.92 };

  // Reemplaza 'TU_API_KEY' por tu API Key de Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAWG6XXnjhPvjOKZMDIT3NKMfQGjnRAs6M',
  });

  if (!isLoaded) return <div className="text-center text-text-secondary">Cargando mapa...</div>;

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-text-primary mb-2 text-center">Mapa de Entregas: Estaciones Línea 1</h3>
      <div className="flex justify-center">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={selected ? 15 : 12}
        >
          {estaciones.map(est => (
            <Marker
              key={est.nombre}
              position={{ lat: est.lat, lng: est.lng }}
              title={est.nombre}
              onClick={() => {
                setSelected(est);
                setSelectedStation(est.nombre);
              }}
              icon={selected && selected.nombre === est.nombre ? {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: { width: 40, height: 40 }
              } : undefined}
            />
          ))}
        </GoogleMap>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {estaciones.map(est => (
          <button
            key={est.nombre}
            onClick={() => {
              setSelected(est);
              setSelectedStation(est.nombre);
              // Notificación visual tipo carrito
              const notification = document.createElement('div');
              notification.className = 'fixed top-20 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg z-50';
              notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"/>\n        </svg>\n        <span>Estación seleccionada: <b>${est.nombre}</b></span>\n      </div>\n    `;
              document.body.appendChild(notification);
              setTimeout(() => {
                document.body.removeChild(notification);
              }, 3500);
            }}
            className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 ${selected && selected.nombre === est.nombre ? 'bg-accent text-white border-accent' : 'bg-surface text-text-secondary border-gray-300 hover:bg-accent hover:text-white hover:border-accent'}`}
          >
            🚉 {est.nombre}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 text-center">
          <span className="inline-block bg-accent-50 text-accent px-4 py-2 rounded-lg font-medium shadow">
            Estación seleccionada: {selected.nombre}
          </span>
        </div>
      )}
      <p className="text-center text-text-secondary mt-4 text-sm">
        Todas las entregas se realizan en las estaciones de la Línea 1 del Metro de Lima.
        <br />
        Para entregas en otro lugar o provincia, coordinar por WhatsApp.
      </p>
    </div>
  );
};

export default MapaEstacionesLinea1;
