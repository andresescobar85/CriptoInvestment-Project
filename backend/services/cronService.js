const cron = require('node-cron');
const { updateCryptoPrices } = require('./cryptoService');

// Se ejecuta cada 30 minutos
cron.schedule('*/30 * * * *', () => {
    console.log('[Cron Job] Iniciando recolección de precios...');
    updateCryptoPrices();
});