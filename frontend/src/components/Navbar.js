import React from 'react';
import { TrendingUp } from 'lucide-react';

const Navbar = ({ onHome }) => (
  <nav className="navbar">
    <div className="nav-logo" onClick={onHome} style={{ cursor: 'pointer' }}>
      <TrendingUp size={32} color="#61DAFB" />
      <h1>CryptoInvestment</h1>
    </div>
  </nav>
);

export default Navbar;