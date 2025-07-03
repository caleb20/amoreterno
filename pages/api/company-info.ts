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
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    const companyInfo = data && data.length > 0 ? data[0] : {};
    res.status(200).json(companyInfo);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
