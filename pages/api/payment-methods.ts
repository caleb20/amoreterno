import type { NextApiRequest, NextApiResponse } from 'next';

const paymentMethods = [
  { id: 'yape', name: 'Yape', image: '/yape-logo.png' },
  { id: 'plin', name: 'Plin', image: '/plin-logo.png' },
  { id: 'transfer', name: 'Transferencia', image: null },
  { id: 'cash', name: 'Contraentrega', image: null }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    res.status(200).json(paymentMethods);
  } catch (err: any) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
