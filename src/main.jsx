import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Mesmo componente com propriedades diferentes
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
