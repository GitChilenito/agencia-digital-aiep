const jwt = require('jsonwebtoken');
const SECRET_KEY = 'llave_secreta_aiep_2026';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ 
      message: "Acceso no autorizado. Token inexistente o cookie eliminada." 
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Token inválido o expirado. Inicie sesión nuevamente." 
    });
  }
};

module.exports = verifyToken;