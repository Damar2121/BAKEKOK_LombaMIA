import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';

// Halaman Detail UMKM 
export default function DetailPage() {
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // --- PERUBAHAN STATE UNTUK NAVIGASI ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mengganti state dari URL gambar menjadi INDEKS (urutan) gambar
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  // ------------------------------------

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/umkm/${id}`);
        const data = await response.json();
        setUmkm(data);
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  // --- PERUBAHAN FUNGSI MODAL ---

  // Fungsi untuk membuka modal (sekarang menerima 'index' angka)
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null); // Reset indeks
  };

  // Fungsi untuk menutup modal saat klik di background
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // --- TAMBAHAN: Fungsi Navigasi ---
  
  // Fungsi untuk ke gambar selanjutnya
  const showNextImage = (e) => {
    e.stopPropagation(); // Mencegah background click terpicu
    // '%' (modulo) adalah trik agar urutan kembali ke 0 jika sudah di akhir
    setCurrentImageIndex(prevIndex => 
      (prevIndex + 1) % umkm.gallery.length
    );
  };

  // Fungsi untuk ke gambar sebelumnya
  const showPrevImage = (e) => {
    e.stopPropagation(); // Mencegah background click terpicu
    // Trik modulo untuk urutan mundur (wrap-around)
    setCurrentImageIndex(prevIndex =>
      (prevIndex - 1 + umkm.gallery.length) % umkm.gallery.length
    );
  };
  // --------------------------------

  if (loading) return <Loading />;
  if (!umkm) return <div>UMKM tidak ditemukan.</div>;

  const mapEmbedUrl = umkm.mapUrl;

  return (
    <div className="detail-container">
      <Link to="/" className="detail-back-link">
        &larr; Kembali ke Direktori
      </Link>

      {/* ... (kode header, deskripsi, alamat - tidak berubah) ... */}
      
      <div className="detail-header">
        <h2>{umkm.nama}</h2>
        <p>{umkm.kategori}</p>
      </div>
      <div className="detail-section">
        <h3>Cerita Singkat</h3>
        <p>{umkm.deskripsi}</p>
      </div>
      <div className="detail-section">
        <h3>Alamat</h3>
        <p>{umkm.alamat}</p>
      </div>

      {/* Galeri Foto */}
      <div className="detail-section">
        <h3>Galeri Foto</h3>
        <div className="detail-gallery">
          {/* Perhatikan 'index' ditambahkan di map */}
          {umkm.gallery.map((foto, index) => (
            <img 
              key={index} 
              src={foto} 
              alt={`${umkm.nama} ${index + 1}`} 
              
              // --- PERUBAHAN ONCLICK ---
              // Sekarang mengirim 'index' (angka) ke openModal
              onClick={() => openModal(index)}
              // -----------------------
              
              className="gallery-thumbnail"
            />
          ))}
        </div>
      </div>

      {/* ... (kode Lokasi Peta - tidak berubah) ... */}
      <div className="detail-section">
        <h3>Lokasi</h3>
        <div className="detail-map">
          <iframe
            title="Lokasi UMKM"
            src={mapEmbedUrl}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* --- PERUBAHAN KODE MODAL FOTO --- */}
      {/* Cek 'isModalOpen' DAN 'currentImageIndex' tidak null */}
      {isModalOpen && currentImageIndex !== null && (
        <div className="fullscreen-modal" onClick={handleBackgroundClick}>
          
          {/* Tombol Close */}
          <span className="close-button" onClick={closeModal}>&times;</span>

          {/* TAMBAHAN: Tombol Navigasi 'Previous' */}
          <span className="prev-button" onClick={showPrevImage}>&lsaquo;</span>

          {/* TAMBAHAN: Tombol Navigasi 'Next' */}
          <span className="next-button" onClick={showNextImage}>&rsaquo;</span>

          {/* Gambar Fullscreen (src diubah) */}
          <img 
            // Mengambil gambar dari galeri berdasarkan INDEKS
            src={umkm.gallery[currentImageIndex]} 
            alt="Fullscreen" 
            className="fullscreen-content" 
          />
        </div>
      )}
      {/* ------------------------------- */}

    </div>
  );
}