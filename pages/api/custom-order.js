import formidable from 'formidable';
import fs from 'fs';
import emailjs from '@emailjs/nodejs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error al procesar el formulario' });
    }
    try {
      // 1. Subir imagen a imgbb
      let imageUrl = '';
      if (files.image) {
        const imageData = fs.readFileSync(files.image.filepath, { encoding: 'base64' });
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
          method: 'POST',
          body: new URLSearchParams({ image: imageData }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const imgbbData = await imgbbRes.json();
        imageUrl = imgbbData.data.url;
      }
      // 2. Enviar email con EmailJS
      const templateParams = {
        from_name: fields.name,
        from_phone: fields.phone,
        from_email: fields.email || 'No proporcionado',
        message: fields.message || 'Sin mensaje personalizado',
        image_url: imageUrl,
        image_filename: files.image ? files.image.originalFilename : '',
      };
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: process.env.EMAILJS_PUBLIC_KEY }
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
    }
  });
}
