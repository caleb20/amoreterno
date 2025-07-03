// pages/api/products.js
import { supabase } from '../../src/utils/supabaseClient';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_occasions:product_occasions(occasion_id),
        product_tags:product_tags(tag)
      `);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Transformar el resultado para que cada producto tenga un array de occasion y tags
    const products = data.map(product => ({
      ...product,
      occasion: product.product_occasions?.map(po => po.occasion_id) || [],
      tags: product.product_tags?.map(pt => pt.tag) || [],
    }));

    res.status(200).json(products);
  } catch (e) {
    console.error('API error:', e);
    res.status(500).json({ error: e.message });
  }
}