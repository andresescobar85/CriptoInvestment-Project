import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CryptoCard = ({ crypto, onClick }) => {
  const isPositive = crypto.percent_change_24h >= 0;

  return (
    <div className="crypto-card" onClick={() => onClick(crypto.id)}>
      <div className="card-header">
        <h3>{crypto.name}</h3>
        <span className="symbol">{crypto.symbol}</span>
      </div>
      <div className="card-body">
        <p className="price">${parseFloat(crypto.price).toLocaleString()}</p>
        <div className={`change ${isPositive ? 'up' : 'down'}`}>
          {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
          {Math.abs(crypto.percent_change_24h).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;