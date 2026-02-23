const express = require('express');
const router = express.Router();
// Importamos el objeto cryptoController que creaste
const cryptoController = require('../controllers/cryptoController');

// 1. Ruta para obtener los precios más recientes (Dashboard)
router.get('/latest', cryptoController.getLatestPrices);

// 2. Ruta para obtener el historial (Gráfico)
// El ":id" es el parámetro que recibes en req.params
router.get('/history/:id', cryptoController.getHistory);

// 3. Ruta para añadir nuevas monedas (Buscador)
router.post('/add', cryptoController.addCrypto);

module.exports = router;