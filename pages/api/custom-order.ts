import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error formidable:', err);
      res.status(500).json({ error: 'Error al procesar el formulario', details: err.message });
      return;
    }
    try {
      console.log('Campos recibidos:', fields);
      console.log('Archivos recibidos:', files);
      let imageFile = files.image;
      if (Array.isArray(imageFile)) imageFile = imageFile[0];
      if (!imageFile || !imageFile.filepath) {
        console.error('No se recibió archivo de imagen válido:', imageFile);
        return res.status(400).json({ error: 'No se recibió archivo de imagen válido' });
      }
      // 1. Subir imagen a imgbb
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
      } catch (uploadError) {
        console.error('Error al subir la imagen a imgbb:', uploadError);
        return res.status(500).json({ error: 'Error al subir la imagen' });
      }
      // Solo responder con la URL de la imagen
      return res.status(200).json({ success: true, imageUrl });
    } catch (error) {
      console.error('Error general en custom-order:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
    }
  });
}
