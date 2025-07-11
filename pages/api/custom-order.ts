import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile, Fields, Files } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error processing form', details: err.message });
    }

    try {
      let imageFile = files.image as FormidableFile | FormidableFile[] | undefined;
      if (Array.isArray(imageFile)) imageFile = imageFile[0];
      if (!imageFile || typeof imageFile.filepath !== 'string') {
        console.error('Invalid image file:', imageFile);
        return res.status(400).json({ error: 'Invalid image file' });
      }

      let imageUrl = '';
      try {
        const fileData = fs.readFileSync(imageFile.filepath);
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
          method: 'POST',
          body: new URLSearchParams({ image: fileData.toString('base64') }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const imgbbData = await imgbbRes.json();
        imageUrl = imgbbData.data.url;
      } catch (uploadError: any) {
        console.error('Error uploading image to imgbb:', uploadError);
        return res.status(500).json({ error: 'Error uploading image' });
      }

      return res.status(200).json({ success: true, imageUrl });
    } catch (error: any) {
      console.error('Unexpected error in custom-order:', error);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
}
