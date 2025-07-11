import { supabase } from '../../src/utils/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CompanyInfo } from '../../src/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompanyInfo | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('company_info')
      .select('*');

    if (error) {
      console.error('Error fetching company info:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Company info not found' });
    }

    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
