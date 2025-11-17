import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Units from './pages/Units';
import UnitDetail from './pages/UnitDetail';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="units" element={<Units />} />
          <Route path="units/:id" element={<UnitDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
