import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Usamos nombres que describan la acción (fetch = buscar/traer)
export const fetchLatest = () => axios.get(`${API_URL}/latest`);

// Añadimos 'range' como parámetro opcional (por defecto 24h)
export const fetchHistory = (id, range = '24h') => 
    axios.get(`${API_URL}/history/${id}?range=${range}`);

// Si decides usar la función de añadir nuevas monedas:
export const addCrypto = (cryptoData) => axios.post(`${API_URL}/add`, cryptoData);