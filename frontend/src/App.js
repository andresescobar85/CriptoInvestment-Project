import React, { useState, useEffect } from 'react';
import { fetchLatest, fetchHistory } from './api/api';
import Navbar from './components/Navbar';
import CryptoCard from './components/CryptoCard';
import HistoryChart from './components/HistoryChart';
import './App.css';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLatest();
    const interval = setInterval(loadLatest, 60000); // Refrescar cada minuto
    return () => clearInterval(interval);
  }, []);

  const loadLatest = async () => {
    try {
      const { data } = await fetchLatest();
      setCryptos(data);
    } catch (e) { console.error("Error al cargar datos"); }
  };

  const handleSelectCrypto = async (id) => {
    setLoading(true);
    setSelectedId(id);
    try {
      const { data } = await fetchHistory(id);
      setHistory(data);
    } catch (e) { console.error("Error al cargar historial"); }
    setLoading(false);
  };

  const selectedCrypto = cryptos.find(c => c.id === selectedId);

  return (
    <div className="App">
      <Navbar onHome={() => setSelectedId(null)} />
      
      <main className="container">
        {!selectedId ? (
          <div className="dashboard-grid">
            {cryptos.map(c => (
              <CryptoCard key={c.id} crypto={c} onClick={handleSelectCrypto} />
            ))}
          </div>
        ) : (
          <div className="detail-view">
            <button className="btn-back" onClick={() => setSelectedId(null)}>← Volver al Dashboard</button>
            {loading ? <p>Cargando gráfico...</p> : <HistoryChart data={history} name={selectedCrypto?.name} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;