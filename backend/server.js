require('dotenv').config();
const express = require('express');
const cors = require('cors');

// --- 1. IMPORTACIONES NECESARIAS ---
const cryptoRoutes = require('./routes/cryptoRoutes'); // Importa tus rutas
require('./services/cronService'); // Esto arranca el cron job automáticamente

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- 2. CONEXIÓN DE RUTAS ---
// Esto le dice a Express que use el archivo cryptoRoutes para cualquier cosa que empiece con /api
app.use('/api', cryptoRoutes); 

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ message: "¡Backend de CryptoInvestment funcionando!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

const { updateCryptoPrices } = require('./services/cryptoService');

app.listen(PORT, async () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
    
    // Llamada manual inmediata para llenar la tabla la primera vez
    console.log("⏳ Recolectando precios iniciales...");
    await updateCryptoPrices(); 
});