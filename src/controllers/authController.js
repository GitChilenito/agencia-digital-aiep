const jwt = require('jsonwebtoken');
const users = require('../data/users');
const SECRET_KEY = 'llave_secreta_aiep_2026';

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ 
      message: "Credenciales incorrectas. No autorizado." 
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: '15m' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  });

  return res.status(200).json({
    message: "Autenticación exitosa. Sesión iniciada.",
    user: { id: user.id, username: user.username, role: user.role }
  });
};

const getPrivateData = (req, res) => {
  return res.status(200).json({
    message: "Acceso concedido a la ruta privada.",
    content: "Datos confidenciales del servidor Backend de Agencia Digital AIEP.",
    userData: req.user
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({
    message: "Sesión cerrada correctamente. Cookie eliminada."
  });
};

module.exports = { login, getPrivateData, logout };