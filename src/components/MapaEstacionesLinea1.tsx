import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import useStations from '../hooks/useStations';

// Definir el tipo de estación localmente para reflejar la estructura real
interface StationMap {
  nombre: string;
  lat: string;
  lng: string;
}

const MapaEstacionesLinea1 = () => {
  const { selectedStation, setSelectedStation } = useCart();
  // Tipar estaciones y selected correctamente
  const { stations: estaciones, loading: loadingStations, error: errorStations } = useStations() as { stations: StationMap[]; loading: boolean; error: string | null };
  const [selected, setSelected] = useState<StationMap | null>(null);

  const containerStyle = {
    width: '100vw',
    maxWidth: '100%',
    height: '400px',
    borderRadius: '12px',
    border: '1px solid #eee',
    margin: '0 auto'
  };
  // Centrar el mapa en la estación seleccionada o en el centro general
  const center = selected
    ? { lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }
    : { lat: -12.09, lng: -76.92 };

  // Reemplaza 'TU_API_KEY' por tu API Key de Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAWG6XXnjhPvjOKZMDIT3NKMfQGjnRAs6M',
  });

  // Si hay una estación seleccionada en el contexto, sincronizar con el estado local
  useEffect(() => {
    if (selectedStation && estaciones.length > 0) {
      const found = estaciones.find(e => e.nombre === selectedStation);
      setSelected(found || null);
    } else if (!selectedStation && estaciones.length > 0) {
      setSelected(null);
    }
  }, [selectedStation, estaciones]);

  // Evitar renderizar el mapa y botones si estaciones está vacío
  if (!isLoaded || loadingStations) return <div className="text-center text-text-secondary">Cargando mapa...</div>;
  if (errorStations) return <div className="text-center text-error">{errorStations}</div>;
  if (!estaciones || estaciones.length === 0) return <div className="text-center text-error">No hay estaciones disponibles.</div>;

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
              position={{ lat: parseFloat(est.lat), lng: parseFloat(est.lng) }}
              title={est.nombre}
              onClick={() => {
                setSelected(est);
                setSelectedStation(est.nombre);
              }}
            />
          ))}
          {/* Puntero especial para la estación seleccionada */}
          {selected && (
            <Marker
              position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
              title={selected.nombre}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: typeof window !== 'undefined' && window.google && window.google.maps ? new window.google.maps.Size(40, 40) : undefined
              }}
            />
          )}
        </GoogleMap>
      </div>
      {/* Selector de estación: combo en mobile, botones en desktop */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {/* Combo para mobile */}
        <div className="w-full md:hidden mb-4 flex justify-center">
          <select
            className="w-full max-w-xs mx-auto px-3 py-1.5 rounded-md border border-gray-300 text-sm text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            value={selected ? selected.nombre : ''}
            onChange={e => {
              const est = estaciones.find(est => est.nombre === e.target.value);
              setSelected(est || null);
              setSelectedStation(est ? est.nombre : '');
              if (est) {
                const notification = document.createElement('div');
                notification.className = 'fixed top-20 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50';
                notification.innerHTML = `\n      <div class=\"flex items-center space-x-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"/>\n        </svg>\n        <span>Estación seleccionada: <b>${est.nombre}</b></span>\n      </div>\n    `;
                document.body.appendChild(notification);
                setTimeout(() => {
                  document.body.removeChild(notification);
                }, 3500);
              }
            }}
          >
            <option value="">Selecciona una estación...</option>
            {estaciones.map(est => (
              <option key={est.nombre} value={est.nombre}>🚉 {est.nombre}</option>
            ))}
          </select>
        </div>
        {/* Botones para desktop */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 w-full">
          {estaciones.map(est => (
            <button
              key={est.nombre}
              onClick={() => {
                setSelected(est);
                setSelectedStation(est.nombre);
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
