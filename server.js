const express = require('express');
const app = express();
const PORT = 3000;

// Middleware agar server bisa membaca data berformat JSON dan melayani file statis
app.use(express.json());
app.use(express.static(__dirname)); // <--- Tambahkan baris ini

// Contoh endpoint uji coba server
app.get('/api/test', (req, res) => {
    res.json({ pesan: "Backend Node.js untuk PT Gagah Putera Satria berhasil terhubung!" });
});

// Menyimpan data pelamar sementara di server
let daftarPelamar = [];

// Endpoint untuk menerima pendaftaran pelamar dari form
app.post('/api/lamar', (req, res) => {
    const dataPelamarBaru = req.body;
    daftarPelamar.push(dataPelamarBaru);
    console.log("Data pelamar masuk:", dataPelamarBaru);
    
    res.json({ 
        sukses: true, 
        pesan: "Lamaran berhasil dikirim dan tersimpan di server!",
        data: dataPelamarBaru 
    });
});

// Endpoint untuk melihat daftar pelamar yang masuk
app.get('/api/pelamar', (req, res) => {
    res.json(daftarPelamar);
});

// Menyalakan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});