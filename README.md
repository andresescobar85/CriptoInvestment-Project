📈 Crypto Investment Tracker
Esta plataforma es una solución Full-Stack diseñada para centralizar el monitoreo de criptoactivos. Permite a los inversores visualizar precios en tiempo real y analizar la evolución histórica de sus activos mediante un dashboard privado, eliminando la dependencia de plataformas externas para el almacenamiento de datos históricos.

🛠️ Tecnologías Utilizadas
Frontend: React.js, Axios, Recharts (Gráficos), CSS3.

Backend: Node.js.

Base de Datos: MySQL 8.0+.

API Externa: CoinMarketCap Professional API.

📋 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

Node.js (v16 o superior).

MySQL Workbench.

Una API Key de CoinMarketCap (Obtenla gratis aquí).

🗄️ 1. Instalación de la Base de Datos
Sigue estos pasos para configurar el almacenamiento:

Abre tu cliente de MySQL (Workbench o Terminal).

Copia y ejecuta el siguiente script para crear la estructura, el usuario y los permisos:

SQL

-- 1. Crear la base de datos y usarla
CREATE DATABASE IF NOT EXISTS cryptoinvestment_db;

USE cryptoinvestment_db;

-- 2. Crear tabla Maestra de Criptomonedas
CREATE TABLE IF NOT EXISTS cryptos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cmc_id INT NOT NULL UNIQUE,
    symbol VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear tabla Transaccional de Historial
CREATE TABLE IF NOT EXISTS price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crypto_id INT NOT NULL,
    price DECIMAL(20, 10) NOT NULL,
    market_cap DECIMAL(25, 2),
    percent_change_24h DECIMAL(10, 5),
    last_updated DATETIME,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_crypto_id FOREIGN KEY (crypto_id) REFERENCES cryptos(id) ON DELETE CASCADE
);

-- 4. Insertar monedas iniciales
INSERT INTO cryptos (cmc_id, symbol, name, slug) VALUES 
(1, 'BTC', 'Bitcoin', 'bitcoin'),
(1027, 'ETH', 'Ethereum', 'ethereum'),
(825, 'USDT', 'Tether', 'tether');


🚀 2. Configuración del Proyecto


Backend


Navega a la carpeta del servidor: cd backend.

Instala las dependencias: npm install.

Modificar el archivo .env basado en el siguiente ejemplo proporcionado:

Fragmento de código
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_password
DB_NAME=cryptoinvestment_db
CMC_API_KEY=tu_api_key_aqui
PORT=5000


Inicia el servidor: npm run dev.

Frontend
Navega a la carpeta del cliente: cd frontend.

Instala las dependencias: npm install.

Inicia la aplicación: npm start.

Abre http://localhost:3000 en tu navegador.

📂 Estructura de Carpetas
/backend: API REST en Node.js, controladores y rutas.

/frontend: Interfaz de usuario en React y componentes gráficos.

.env: Plantilla para la configuración de variables de entorno.
