import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import './index.css'; // pastikan style global diimport

function App() {
  return (
    <BrowserRouter>
      {/* ===== Header Utama ===== */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
              <span className="logo-icon"></span>
              <img src="/images/logo.png" alt="UMKM Connect Logo" className="header-logo" />
              <h1>UMKM JOGJA</h1>
          </div>
          <p className="subtitle">
            Bikin Keren UMKM Lokal di Lingkungan Sekitar Kita
          </p>
        </div>
      </header>

      {/* ===== Konten Utama ===== */}
      <main className="container">
        <Routes>
          {/* Halaman Utama / Direktori */}
          <Route path="/" element={<HomePage />} />

          {/* Halaman Detail */}
          <Route path="/umkm/:id" element={<DetailPage />} />
        </Routes>
      </main>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p>© 2025 UMKM Jogja — Dukung Produk Lokal ❤️</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
