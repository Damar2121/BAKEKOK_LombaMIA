const express = require('express');
const cors = require('cors');
const dataUMKM = require('./data-umkm.json');

const app = express();
const PORT = 4000;

app.use(cors());

// Endpoint untuk Halaman Utama (dengan filter dan search)
// [cite: 18, 19]
app.get('/umkm', (req, res) => {
  const { search, kategori } = req.query;
  
  let hasil = [...dataUMKM];

  // 1. Filter berdasarkan Kategori 
  if (kategori && kategori !== 'Semua') {
    hasil = hasil.filter(umkm => umkm.kategori === kategori);
  }

  // 2. Filter berdasarkan Nama (Search) 
  if (search) {
    hasil = hasil.filter(umkm => 
      umkm.nama.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(hasil);
});

// Endpoint untuk Halaman Detail 
app.get('/umkm/:id', (req, res) => {
  const { id } = req.params;
  const umkm = dataUMKM.find(item => item.id === parseInt(id));

  if (umkm) {
    res.json(umkm);
  } else {
    res.status(404).json({ message: 'UMKM tidak ditemukan' });
  }
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});