import React from 'react';
import { Link } from 'react-router-dom';

// Komponen Card untuk Halaman Utama 
export default function UmkmCard({ umkm }) {
  // Ambil gambar pertama dari galeri sebagai thumbnail
  const thumbnail = umkm.gallery[0] || 'https://via.placeholder.com/300x180?text=No+Image';

  return (
    <Link to={`/umkm/${umkm.id}`} className="umkm-card">
      <img src={thumbnail} alt={umkm.nama} />
      <div className="umkm-card-content">
        <span className="kategori">{umkm.kategori}</span>
        <h3>{umkm.nama}</h3>
        <p>{umkm.deskripsi}</p>
      </div>
    </Link>
  );
}