
// Este endpoint solo debe usarse en desarrollo o con autenticación adecuada en producción
export default function handler(req, res) {
  res.status(200).json({
    SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
    IMGBB_API_KEY: process.env.IMGBB_API_KEY,
  });
}
