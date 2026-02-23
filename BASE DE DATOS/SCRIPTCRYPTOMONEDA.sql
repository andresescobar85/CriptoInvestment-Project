-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS cryptoinvestment_db;
USE cryptoinvestment_db;

-- 2. Crear la tabla de Criptomonedas (Maestra)
CREATE TABLE IF NOT EXISTS cryptos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cmc_id INT NOT NULL UNIQUE,     -- ID que nos da la API de CoinMarketCap
    symbol VARCHAR(10) NOT NULL,    -- Ejemplo: BTC
    name VARCHAR(100) NOT NULL,     -- Ejemplo: Bitcoin
    slug VARCHAR(100),              -- Nombre en URL: bitcoin
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear la tabla de Historial de Precios (Transaccional)
CREATE TABLE IF NOT EXISTS price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crypto_id INT NOT NULL,         -- Relación con la tabla cryptos
    price DECIMAL(20, 10) NOT NULL, -- Soporta muchos decimales para criptos baratas
    market_cap DECIMAL(25, 2),
    percent_change_24h DECIMAL(10, 5),
    last_updated DATETIME,          -- Fecha exacta que nos da la API
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha en que guardamos nosotros
    CONSTRAINT fk_crypto_id FOREIGN KEY (crypto_id) REFERENCES cryptos(id) ON DELETE CASCADE
);

-- 4. Insertar algunas monedas de prueba para empezar
INSERT INTO cryptos (cmc_id, symbol, name, slug) VALUES 
(1, 'BTC', 'Bitcoin', 'bitcoin'),
(1027, 'ETH', 'Ethereum', 'ethereum'),
(825, 'USDT', 'Tether', 'tether');