import React, { useState, useEffect } from 'react';
import UmkmCard from '../components/UmkmCard';
import Loading from '../components/Loading';

// Halaman Utama / Direktori
export default function HomePage() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk filter
  const [searchTerm, setSearchTerm] = useState('');
  const [kategori, setKategori] = useState('Semua');

  // Efek untuk mengambil data dari backend
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Buat URL dengan query params untuk search dan filter
      const params = new URLSearchParams({
        search: searchTerm,
        kategori: kategori,
      });

      try {
        const response = await fetch(`http://localhost:4000/umkm?${params.toString()}`);
        const data = await response.json();
        setUmkmList(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    // Gunakan debounce sederhana agar tidak fetch setiap ketikan
    const handler = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, kategori]);

  return (
    <>
      {/* ===== Search dan Filter ===== */}
      <section className="filter-section">
        <h2 className="filter-title">Temukan UMKM Favoritmu</h2>
        <p className="filter-subtitle">
          Jelajahi beragam usaha kecil menengah lokal dari Yogyakarta 
        </p>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Cari UMKM berdasarkan nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
            <option value="Semua">Semua Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Jasa">Jasa</option>
          </select>
        </div>
      </section>

      {/* ===== Grid UMKM ===== */}
      {loading ? (
        <Loading />
      ) : (
        <section className="umkm-section">
          {umkmList.length > 0 ? (
            <div className="umkm-grid">
              {umkmList.map((umkm) => (
                <UmkmCard key={umkm.id} umkm={umkm} />
              ))}
            </div>
          ) : (
            <p className="no-result">Tidak ada UMKM yang cocok dengan pencarian Anda.</p>
          )}
        </section>
      )}
    </>
  );
}
