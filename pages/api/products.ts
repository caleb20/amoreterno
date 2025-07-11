// pages/api/products.js
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../src/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_occasions:product_occasions(occasion_id),
        product_tags:product_tags(tag)
      `);

    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: error.message });
    }

    const products = data.map(product => ({
      ...product,
      occasion: product.product_occasions?.map((po: any) => po.occasion_id) || [],
      tags: product.product_tags?.map((pt: any) => pt.tag) || [],
    }));

    res.status(200).json(products);
  } catch (err: any) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}