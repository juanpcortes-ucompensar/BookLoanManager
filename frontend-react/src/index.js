// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';  // Asegúrate de que Bootstrap se cargue
import { BrowserRouter as Router } from 'react-router-dom';  // Solo un Router aquí

ReactDOM.render(
  <Router> {/* Aquí envuelves todo tu App con Router */}
    <App />
  </Router>,
  document.getElementById('root')
);
