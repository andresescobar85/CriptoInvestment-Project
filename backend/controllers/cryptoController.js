const db = require('../config/database');

const cryptoController = {
    // 1. Obtener los precios más recientes para el Dashboard
    getLatestPrices: async (req, res) => {
        try {
            // Esta consulta trae el último registro de historial para cada cripto
            const query = `
                SELECT c.id, c.name, c.symbol, ph.price, ph.percent_change_24h, ph.market_cap 
                FROM cryptos c
                JOIN price_history ph ON c.id = ph.crypto_id
                WHERE ph.id IN (
                    SELECT MAX(id) 
                    FROM price_history 
                    GROUP BY crypto_id
                )
            `;
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener precios recientes", details: error.message });
        }
    },

    // 2. Obtener historial para el Gráfico (Línea de tiempo)
    getHistory: async (req, res) => {
        const { id } = req.params;
        const { range } = req.query; // Ejemplo: '7d', '24h'

        let filter = "";
        if (range === '24h') filter = "AND last_updated >= NOW() - INTERVAL 1 DAY";
        else if (range === '7d') filter = "AND last_updated >= NOW() - INTERVAL 7 DAY";

        try {
            const query = `
                SELECT price, last_updated 
                FROM price_history 
                WHERE crypto_id = ? ${filter}
                ORDER BY last_updated ASC
            `;
            const [rows] = await db.query(query, [id]);

            // Formateamos los datos para Recharts (JSON plano)
            const formattedData = rows.map(row => ({
                price: parseFloat(row.price),
                // Formateamos la fecha para que sea legible en el eje X
                last_updated: new Date(row.last_updated).toLocaleString('es-ES', {
                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                })
            }));

            res.json(formattedData);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener historial", details: error.message });
        }
    },

    // 3. Buscar y añadir nueva cripto (Para el buscador del Dashboard)
    addCrypto: async (req, res) => {
        const { cmc_id, symbol, name } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO cryptos (cmc_id, symbol, name) VALUES (?, ?, ?)',
                [cmc_id, symbol, name]
            );
            res.json({ message: "Criptomoneda añadida", id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: "Error al añadir moneda", details: error.message });
        }
    }
};

module.exports = cryptoController;