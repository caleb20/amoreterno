import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../src/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('occasions')
      .select('*');

    if (error) {
      console.error('Error fetching occasions:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err: any) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
