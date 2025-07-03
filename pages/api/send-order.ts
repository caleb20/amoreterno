import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { imageBase64 } = req.body;
  let imageUrl = '';
  try {
    const formData = new URLSearchParams();
    formData.append('key', process.env.IMGBB_API_KEY || '');
    formData.append('image', imageBase64 && imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64);

    const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });
    const imgbbData = await imgbbRes.json();
    imageUrl = imgbbData && imgbbData.data && imgbbData.data.url ? imgbbData.data.url : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&cs=tinysrgb&w=800';
  } catch (err) {
    imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&cs=tinysrgb&w=800';
    // return res.status(500).json({ error: 'Error subiendo la imagen' });
  }
  res.status(200).json({ imageUrl });
}