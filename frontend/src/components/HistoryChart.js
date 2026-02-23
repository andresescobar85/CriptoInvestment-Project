import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HistoryChart = ({ data, name }) => {
  return (
    <div className="chart-container">
      <h2>Historial de {name} (Últimas 24h)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="last_updated" hide={true} />
          <YAxis domain={['auto', 'auto']} tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Precio']}
            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#61DAFB" 
            strokeWidth={3} 
            dot={false} 
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;