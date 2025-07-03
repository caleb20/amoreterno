import { useEffect, useState } from 'react';
import api from '../utils/axios';

export interface Station {
  nombre: string;
  lat: string;
  lng: string;
  // Agrega aquí otras propiedades si las necesitas
}

export default function useStations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/stations')
      .then(res => {
        setStations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar estaciones');
        setLoading(false);
      });
  }, []);

  return { stations, loading, error };
}
