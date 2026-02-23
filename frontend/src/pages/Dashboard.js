import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ onSelect }) => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchLatest = () => {
      axios.get('http://localhost:5000/api/latest')
        .then(res => setCryptos(res.data));
    };
    fetchLatest();
    const interval = setInterval(fetchLatest, 60000); // Actualización dinámica
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-grid">
      {cryptos.map(c => (
        <div key={c.id} className="card" onClick={() => onSelect(c.id)}>
          <h3>{c.name} ({c.symbol})</h3>
          <p className="price">${c.price.toFixed(2)}</p>
          <span className={c.percent_change_24h > 0 ? 'up' : 'down'}>
            {c.percent_change_24h}%
          </span>
        </div>
      ))}
    </div>
  );
};
export default Dashboard;