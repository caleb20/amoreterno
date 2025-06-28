import { supabase } from '../../src/utils/supabaseClient';

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('company_info')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}
