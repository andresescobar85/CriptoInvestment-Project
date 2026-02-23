const axios = require('axios');
const db = require('../config/database');

const updateCryptoPrices = async () => {
    try {
        const [rows] = await db.query('SELECT cmc_id, id FROM cryptos');
        if (rows.length === 0) return;

        const ids = rows.map(c => c.cmc_id).join(',');
        const response = await axios.get(`${process.env.CMC_URL}/v1/cryptocurrency/quotes/latest`, {
            params: { id: ids },
            headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY }
        });

        const apiData = response.data.data;

        for (const crypto of rows) {
            const info = apiData[crypto.cmc_id];
            await db.query(
                `INSERT INTO price_history (crypto_id, price, market_cap, percent_change_24h, last_updated) 
                 VALUES (?, ?, ?, ?, ?)`,
                [crypto.id, info.quote.USD.price, info.quote.USD.market_cap, info.quote.USD.percent_change_24h, new Date(info.quote.USD.last_updated)]
            );
        }
        console.log("✅ Datos de CoinMarketCap sincronizados con éxito.");
    } catch (error) {
        console.error("❌ Error en cryptoService:", error.message);
    }
};

module.exports = { updateCryptoPrices };