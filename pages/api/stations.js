import { supabase } from '../../src/utils/supabaseClient';

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('estaciones')
    .select('*')
    .order('orden', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}
