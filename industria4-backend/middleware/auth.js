// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener el token de los encabezados de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Asumiendo formato "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar el objeto de usuario a la solicitud
    next();
  } catch (error) {
    console.error('Token inválido:', error.message);
    return res.status(403).json({ message: 'Token inválido.' });
  }
};
