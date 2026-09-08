const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de Express.js ejecutándose en http://localhost:${PORT}`);
});