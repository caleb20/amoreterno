import { useEffect, useState } from 'react';
import api from '../utils/axios';

export default function useStations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
