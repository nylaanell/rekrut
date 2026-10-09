// ==========================================
// 1. LOGIKA NAVIGASI MULTI-STEP & DINAMIS DETAIL PELAMAR
// ==========================================
let currentStep = 1;
const totalSteps = 5;

function ubahStep(arah) {
  currentStep += arah;
  if (currentStep < 1) currentStep = 1;
  if (currentStep > totalSteps) currentStep = totalSteps;

  for (let i = 1; i <= totalSteps; i++) {
    const el = document.getElementById(`step${i}`);
    if (el) {
      el.classList.add("d-none");
    }
  }

  const activeStep = document.getElementById(`step${currentStep}`);
  if (activeStep) {
    activeStep.classList.remove("d-none");
  }

  const indicator = document.getElementById("textStepIndicator");
  if (indicator) {
    indicator.innerText = `Halaman ${currentStep} dari ${totalSteps}`;
  }

  const prevBtn = document.getElementById("btnPrevDetail");
  const nextBtn = document.getElementById("btnNextDetail");
  
  if (prevBtn) prevBtn.disabled = (currentStep === 1);
  if (nextBtn) nextBtn.disabled = (currentStep === totalSteps);
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// LOGIKA POP-UP NOTIFIKASI STATUS PELAMAR (Global)
// ==========================================
function bukaModalKonfirmasi() {
  const modalKonfirmasiEl = document.getElementById('modalKonfirmasi');
  if (modalKonfirmasiEl) {
    const modalKonfirmasi = new bootstrap.Modal(modalKonfirmasiEl);
    modalKonfirmasi.show();
  }
}

// ==========================================
// LOGIKA TAMBAH DOKUMEN BARU (Global)
// ==========================================
function bukaModalTambahDokumen() {
  const inputNama = document.getElementById("inputNamaDokumenBaru");
  const selectKetentuan = document.getElementById("selectKetentuanDokumen");
  if (inputNama) inputNama.value = "";
  if (selectKetentuan) selectKetentuan.value = "Wajib";

  const modalEl = document.getElementById('modalTambahDokumen');
  if (modalEl) {
    const myModal = new bootstrap.Modal(modalEl);
    myModal.show();
  }
}

// ==========================================
// LOGIKA MODAL POP-UP LOWONGAN TUTUP (Global)
// ==========================================
function tampilkanModalTutup(event) {
  if (event) event.preventDefault();
  const modalTutupEl = document.getElementById('modalLowonganTutup');
  if (modalTutupEl) {
    const modalTutup = new bootstrap.Modal(modalTutupEl);
    modalTutup.show();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // INISIALISASI OTOMATIS LOWONGAN BAWAAN KE LOCALSTORAGE (Menjaga agar semua data bawaan & baru tersinkronisasi)
  let daftarLowonganCheck = JSON.parse(localStorage.getItem("daftarLowongan")) || [];
  if (daftarLowonganCheck.length === 0) {
    daftarLowonganCheck = [
      {
        judul: "IT Support",
        departemen: "Divisi: IT",
        jumlah: "1 orang",
        status: "Akan ditutup",
        lokasi: "Banjarmasin",
        tipe: "Full-time",
        gaji: "Gaji: Tidak diperlihatkan",
        deskripsi: "Profesional teknologi yang bertanggung jawab untuk mengelola, memelihara, mengonfigurasi, serta memecahkan masalah perangkat keras (hardware), perangkat lunak (software), dan jaringan komputer di dalam perusahaan.",
        tanggungJawab: "Mampu dan mengatasi kendala pada komputer, laptop, printer, dan perangkat IT lainnya baik secara langsung maupun jarak jauh (remote).\nMampu memelihara kestabilan jaringan LAN, Wi-Fi, router, dan switch agar operasional kantor tidak terganggu.\nSerta membantu proses backup data server internal secara berkala dan menangani ancaman virus atau malware.",
        kualifikasi: "Pendidikan minimal S1 jurusan Teknik Informatika, Sistem Informasi, Teknik Komputer, atau Ilmu Komputer.\nPengalaman 1 tahun.\nPaham troubleshooting PC & instalasi jaringan kantor.\nJujur, cekatan, ramah, dan komunikatif.\nSiap bekerja full-time di kantor (WFO).",
        tglTutup: "2026-08-15"
      },
      {
        judul: "Staff Marketing",
        departemen: "Divisi: Pemasaran",
        jumlah: "2 orang",
        status: "Dibuka",
        lokasi: "Banjarmasin",
        tipe: "Full-time",
        gaji: "Gaji: Rp 4.500.000 - Rp 6.000.000",
        deskripsi: "Bertanggung jawab dalam melakukan kegiatan pemasaran, promosi, dan meningkatkan brand perusahaan di pasaran lokal maupun digital.",
        tanggungJawab: "Merancang dan mengeksekusi strategi pemasaran harian dan bulanan.\nMelakukan riset tren pasar dan analisis kompetitor.\nMenjalin relasi yang baik dengan klien serta mitra strategis.",
        kualifikasi: "Pendidikan minimal D3/S1 Semua Jurusan.\nPengalaman minimal 1 tahun di bidang marketing/sales.\nMemiliki kemampuan komunikasi dan negosiasi yang sangat baik.\nDapat bekerja dengan target.",
        tglTutup: "2026-08-20"
      },
      {
        judul: "Finance & Accounting",
        departemen: "Divisi: Keuangan",
        jumlah: "2 orang",
        status: "Dibuka",
        lokasi: "Banjarmasin",
        tipe: "Full-time",
        gaji: "Gaji: Rp 5.000.000 - Rp 7.000.000",
        deskripsi: "Mencatat serta melaporkan transaksi keuangan sekaligus mengolah arus kas dan perancangan anggaran perusahaan secara akurat.",
        tanggungJawab: "Membuat laporan keuangan bulanan (Laba Rugi, Neraca, Arus Kas).\nMelakukan rekonsiliasi bank dan audit kas kecil.\nMengelola perpajakan perusahaan (PPh & PPN).",
        kualifikasi: "Pendidikan minimal S1 Akuntansi / Keuangan.\nMenguasai software akuntansi dan Microsoft Excel tingkat lanjut.\nMemiliki sertifikat Brevet A & B menjadi nilai tambah.\nTeliti, jujur, dan berintegritas tinggi.",
        tglTutup: "2026-08-25"
      },
      {
        judul: "Marketing Officer",
        departemen: "Divisi: Pemasaran",
        jumlah: "1 orang",
        status: "Ditutup",
        lokasi: "Banjarmasin",
        tipe: "Full-time",
        gaji: "Gaji: Kompetitif",
        deskripsi: "Merencanakan, menjalankan, dan menganalisis strategi pemasaran untuk memperkenalkan produk perusahaan ke cakupan yang lebih luas.",
        tanggungJawab: "Mengembangkan kampanye pemasaran digital dan offline.\nMengelola media sosial perusahaan.\nMengevaluasi efektivitas kampanye pemasaran.",
        kualifikasi: "Pendidikan minimal S1 Ilmu Komunikasi / Marketing / Bisnis.\nKreatif dan update dengan tren digital marketing.\nMampu mengoperasikan tools analytic dasar.",
        tglTutup: "2026-07-15"
      }
    ];
    localStorage.setItem("daftarLowongan", JSON.stringify(daftarLowonganCheck));
  }

  const btnPrevDetail = document.getElementById("btnPrevDetail");
  const btnNextDetail = document.getElementById("btnNextDetail");

  if (btnPrevDetail) {
    btnPrevDetail.addEventListener("click", function () {
      ubahStep(-1);
    });
  }

  if (btnNextDetail) {
    btnNextDetail.addEventListener("click", function () {
      ubahStep(1);
    });
  }

  // Database Detail Pelamar 100% Unik & Berbeda untuk Setiap ID Pelamar (Termasuk No SIM, Tanggal Mulai Kerja, & Status Saat Ini)
  const databasePelamar = {
    "GPS-2026-00842": {
      nama: "Budi Hartono", posisi: "IT Support", tgl: "22 Jul 2026",
      status: "Seleksi CV",
      telp: "081255557890", lahir: "14/08/1998", tempat: "Banjarmasin", ktp: "6371011408980003",
      alamat: "Jl. Ahmad Yani Km 5.5 No. 42, Kel. Pemurus Dalam, Kec. Banjarmasin Selatan", 
      berat: "63", tinggi: "172", kebangsaan: "Indonesia", agama: "Islam", kelamin: "Laki-laki", 
      golDarah: "O", statusKawin: "Belum Menikah", statusRumah: "Rumah Milik Orang Tua", 
      noSim: "982310239102",
      foto: "images/foto-budi.png",
      ayah: "Bambang Santoso", usiaAyah: "56 Tahun", pekAyah: "Wiraswasta",
      ibu: "Sri Wahyuni", usiaIbu: "52 Tahun", pekIbu: "Ibu Rumah Tangga",
      sdNama: "SDN Mentaos 1 Banjarmasin", sdJur: "Tidak ada", sdThn: "2010-2016", sdLulus: "Lulus",
      smpNama: "SMP Negeri 1 Banjarmasin", smpJur: "Tidak ada", smpThn: "2016-2019", smpLulus: "Lulus",
      smaNama: "SMK Negeri 2 Banjarmasin", smaJur: "Rekayasa Perangkat Lunak", smaThn: "2019-2022", smaLulus: "Lulus",
      univKampus: "Universitas Lambung Mangkurat", univJur: "S1 Teknik Informatika", univThn: "2022-2026", univStatus: "Lulus (IPK 3.75)",
      kursusNama: "UI/UX & Web Development Bootcamp", kursusDurasi: "2023 (6 Bulan)",
      bahasa: "Bahasa Inggris", bahasaLevel: "Tingkat Menengah (Intermediate)",
      orgNama: "Himpunan Mahasiswa Teknologi Informasi", orgPeran: "Koordinator Divisi Media",
      hobiDesc: "Membaca artikel teknologi, mendesain UI kit, dan berenang.",
      perusahaan: "PT Digital Kreatif Nusantara", alamatPerusahaan: "Jl. Lambung Mangkurat No. 88, Banjarmasin", telpPerusahaan: "0511-3345890",
      jabatanAkhir: "UI/UX & Frontend Developer", jabatanAwal: "Junior Web Designer", periode: "Januari 2024 - Juni 2026",
      uraian: "Merancang antarmuka aplikasi web rekrutmen, membuat wireframe hingga prototype high-fidelity di Figma.",
      refNama: "Hendra Wijaya, S.Kom", refAlamat: "Jl. Veteran Km 3.5 No. 12, Banjarmasin", refTelp: "081344449012", refHub: "Mantan Atasan",
      daruratNama: "Bambang Santoso", daruratAlamat: "Jl. Ahmad Yani Km 5.5 No. 42, Banjarmasin", daruratTelp: "081150001234", daruratHub: "Ayah Kandung",
      gaji: "Rp 5.500.000", luarKota: "Ya", mulai: "2026-08-01"
    },
    "GPS-2026-00843": {
      nama: "Rizky Ananda", posisi: "Marketing", tgl: "22 Jul 2026",
      status: "HR Call",
      telp: "081344443322", lahir: "05/12/1995", tempat: "Martapura", ktp: "6303050512950001",
      alamat: "Jl. Kayu Tangi No. 12, Kel. Pangeran, Kec. Banjarmasin Utara", 
      berat: "68", tinggi: "175", kebangsaan: "Indonesia", agama: "Islam", kelamin: "Laki-laki", 
      golDarah: "A", statusKawin: "Belum Menikah", statusRumah: "Kontrak / Kos", 
      noSim: "951205382910",
      foto: "images/foto-budi.png",
      ayah: "Ahmad Ananda", usiaAyah: "58 Tahun", pekAyah: "Pensiunan PNS",
      ibu: "Siti Aminah", usiaIbu: "54 Tahun", pekIbu: "Wiraswasta",
      sdNama: "SD Negeri Martapura 1", sdJur: "Tidak ada", sdThn: "2002-2008", sdLulus: "Lulus",
      smpNama: "SMP Negeri 1 Martapura", smpJur: "Tidak ada", smpThn: "2008-2011", smpLulus: "Lulus",
      smaNama: "SMA Negeri 1 Martapura", smaJur: "Ilmu Pengetahuan Sosial (IPS)", smaThn: "2011-2014", smaLulus: "Lulus",
      univKampus: "Universitas Banjarmasin", univJur: "S1 Manajemen Bisnis", univThn: "2014-2018", univStatus: "Lulus (IPK 3.52)",
      kursusNama: "Digital Marketing & Growth Hacking Course", kursusDurasi: "2021 (3 Bulan)",
      bahasa: "Bahasa Inggris & Mandarin", bahasaLevel: "Mahir (Advanced)",
      orgNama: "Klub Kewirausahaan Muda Banjar", orgPeran: "Ketua Divisi Sponsorship",
      hobiDesc: "Futsal, investasi saham, dan membaca buku psikologi konsumen.",
      perusahaan: "PT Media Kreasi Utama", alamatPerusahaan: "Jl. A. Yani Km 7, Banjarbaru", telpPerusahaan: "0511-4772111",
      jabatanAkhir: "Senior Marketing Executive", jabatanAwal: "Sales Representative", periode: "Maret 2022 - Juni 2026",
      uraian: "Mengelola strategi pemasaran digital, melakukan riset pasar, dan meningkatkan penjualan produk hingga 35%.",
      refNama: "Deni Setiawan, S.E.", refAlamat: "Jl. A. Yani Km 6, Banjarmasin", refTelp: "081234567890", refHub: "Manager Marketing",
      daruratNama: "Siti Aminah", daruratAlamat: "Jl. Kayu Tangi No. 12, Banjarmasin", daruratTelp: "081344443322", daruratHub: "Ibu Kandung",
      gaji: "Rp 6.000.000", luarKota: "Ya", mulai: "2026-08-05"
    },
    "GPS-2026-00844": {
      nama: "Siti Rahmawati", posisi: "Pajak", tgl: "21 Jul 2026",
      status: "Interview - I",
      telp: "081122334455", lahir: "20/03/1997", tempat: "Banjarbaru", ktp: "6372022003970002",
      alamat: "Jl. Brigjen H. Hasan Basry, Kel. Alalak Utara, Kec. Banjarmasin Utara", 
      berat: "52", tinggi: "160", kebangsaan: "Indonesia", agama: "Islam", kelamin: "Perempuan", 
      golDarah: "B", statusKawin: "Belum Menikah", statusRumah: "Rumah Sendiri", 
      noSim: "970320491823",
      foto: "images/foto-cewe.png",
      ayah: "H. M. Arsyad", usiaAyah: "60 Tahun", pekAyah: "Pegawai Swasta",
      ibu: "Hj. Fatimah", usiaIbu: "57 Tahun", pekIbu: "Ibu Rumah Tangga",
      sdNama: "SDN Banjarbaru Utara 2", sdJur: "Tidak ada", sdThn: "2003-2009", sdLulus: "Lulus",
      smpNama: "SMP Negeri 2 Banjarbaru", smpJur: "Tidak ada", smpThn: "2009-2012", smpLulus: "Lulus",
      smaNama: "SMA Negeri 2 Banjarbaru", smaJur: "Ilmu Pengetahuan Alam (IPA)", smaThn: "2012-2015", smaLulus: "Lulus",
      univKampus: "Politeknik Negeri Banjarmasin", univJur: "D3 Akuntansi Perpajakan", univThn: "2015-2018", univStatus: "Lulus (IPK 3.82)",
      kursusNama: "Sertifikasi Brevet A & B Terpadu", kursusDurasi: "2019 (4 Bulan)",
      bahasa: "Bahasa Inggris", bahasaLevel: "Menengah (Intermediate)",
      orgNama: "Ikatan Mahasiswa Akuntansi Poliban", orgPeran: "Bendahara Umum",
      hobiDesc: "Menulis jurnal keuangan, merangkai bunga, dan jogging.",
      perusahaan: "KAP Wardhana & Rekan", alamatPerusahaan: "Jl. A. Yani Km 3.5, Banjarmasin", telpPerusahaan: "0511-3267890",
      jabatanAkhir: "Tax Accounting Staff", jabatanAwal: "Junior Auditor", periode: "Februari 2023 - Juli 2026",
      uraian: "Menyusun laporan perpajakan bulanan dan tahunan perusahaan (PPh 21, PPh 23, dan PPN), serta audit internal.",
      refNama: "Dra. Nurul Hidayah", refAlamat: "Jl. Perdagangan, Banjarmasin", refTelp: "081155667788", refHub: "Senior Partner",
      daruratNama: "H. M. Arsyad", daruratAlamat: "Jl. Brigjen H. Hasan Basry, Banjarmasin", daruratTelp: "081122334455", daruratHub: "Ayah Kandung",
      gaji: "Rp 5.000.000", luarKota: "Tidak", mulai: "2026-08-10"
    },
    "GPS-2026-00845": {
      nama: "Dimas Pratama", posisi: "HRGA", tgl: "20 Jul 2026",
      status: "Seleksi CV",
      telp: "081988776655", lahir: "10/01/1996", tempat: "Banjarmasin", ktp: "6371011001960004",
      alamat: "Jl. Veteran No. 88, Kel. Melayu, Kec. Banjarmasin Tengah", 
      berat: "65", tinggi: "170", kebangsaan: "Indonesia", agama: "Islam", kelamin: "Laki-laki", 
      golDarah: "AB", statusKawin: "Menikah", statusRumah: "Rumah Milik Sendiri", 
      noSim: "960110593821",
      foto: "images/foto-budi.png",
      ayah: "Supriyadi", usiaAyah: "55 Tahun", pekAyah: "ASN",
      ibu: "Dewi Lestari", usiaIbu: "50 Tahun", pekIbu: "Guru",
      sdNama: "SDN Melayu 7 Banjarmasin", sdJur: "Tidak ada", sdThn: "2002-2008", sdLulus: "Lulus",
      smpNama: "SMP Negeri 6 Banjarmasin", smpJur: "Tidak ada", smpThn: "2008-2011", smpLulus: "Lulus",
      smaNama: "SMA Negeri 7 Banjarmasin", smaJur: "IPS", smaThn: "2011-2014", smaLulus: "Lulus",
      univKampus: "Universitas Mulawarman", univJur: "S1 Psikologi", univThn: "2014-2018", univStatus: "Lulus (IPK 3.45)",
      kursusNama: "Professional HR Practitioner Training & Assessment", kursusDurasi: "2020 (3 Bulan)",
      bahasa: "Bahasa Inggris", bahasaLevel: "Menengah (Intermediate)",
      orgNama: "Himpunan Psikologi Muda", orgPeran: "Wakil Ketua",
      hobiDesc: "Bulutangkis, fotografi portrait, dan catur.",
      perusahaan: "PT Banjar Mitra Sejahtera", alamatPerusahaan: "Jl. Pangeran Antasari, Banjarmasin", telpPerusahaan: "0511-3351234",
      jabatanAkhir: "HR Recruitment Staff", jabatanAwal: "Admin HR", periode: "Januari 2022 - Juni 2026",
      uraian: "Melakukan screening CV, penjadwalan interview user & HRD, serta pengelolaan database absensi dan payroll karyawan.",
      refNama: "Rahmat Hidayat, M.Psi.", refAlamat: "Jl. Kuripan, Banjarmasin", refTelp: "081999888777", refHub: "HR Manager",
      daruratNama: "Dewi Lestari", daruratAlamat: "Jl. Veteran No. 88, Banjarmasin", daruratTelp: "081988776655", daruratHub: "Ibu Kandung",
      gaji: "Rp 4.800.000", luarKota: "Ya", mulai: "2026-08-01"
    },
    "GPS-2026-00846": {
      nama: "Nadia Wijaya", posisi: "Accounting", tgl: "22 Jul 2026",
      status: "HR Call",
      telp: "081566778899", lahir: "25/07/1998", tempat: "Kandangan", ktp: "6306012507980005",
      alamat: "Jl. Lambung Mangkurat No. 15, Kel. Kertak Baru Ilir, Kec. Banjarmasin Tengah", 
      berat: "50", tinggi: "158", kebangsaan: "Indonesia", agama: "Kristen", kelamin: "Perempuan", 
      golDarah: "O", statusKawin: "Belum Menikah", statusRumah: "Kost", 
      noSim: "980725491032",
      foto: "images/foto-cewe.png",
      ayah: "Handoko Wijaya", usiaAyah: "59 Tahun", pekAyah: "Pedagang",
      ibu: "Lanny Kusuma", usiaIbu: "55 Tahun", pekIbu: "Ibu Rumah Tangga",
      sdNama: "SD Kristen Kalam Kudus", sdJur: "Tidak ada", sdThn: "2004-2010", sdLulus: "Lulus",
      smpNama: "SMP Kristen Kalam Kudus", smpJur: "Tidak ada", smpThn: "2010-2013", smpLulus: "Lulus",
      smaNama: "SMA Kristen Kalam Kudus", smaJur: "IPA", smaThn: "2013-2016", smaLulus: "Lulus",
      univKampus: "Universitas Kristen Petra", univJur: "S1 Akuntansi", univThn: "2016-2020", univStatus: "Lulus (IPK 3.68)",
      kursusNama: "Advanced Financial Modeling & Excel", kursusDurasi: "2021 (2 Bulan)",
      bahasa: "Bahasa Inggris", bahasaLevel: "Mahir (Advanced)",
      orgNama: "Paduan Suara Mahasiswa Petra", orgPeran: "Anggota Aktif",
      hobiDesc: "Bermain piano, membaca novel fiksi, dan baking kue.",
      perusahaan: "PT Global Finansial", alamatPerusahaan: "Jl. A. Yani Km 2, Banjarmasin", telpPerusahaan: "0511-3259988",
      jabatanAkhir: "Junior Accountant", jabatanAwal: "Staff Keuangan", periode: "Juni 2024 - Juli 2026",
      uraian: "Mencatat transaksi keuangan kas masuk dan kas keluar, membuat buku besar, serta rekonsiliasi bank bulanan.",
      refNama: "Yudi Santoso, S.E.", refAlamat: "Jl. Kolonel Sugiono, Banjarmasin", refTelp: "081511223344", refHub: "Chief Accountant",
      daruratNama: "Handoko Wijaya", daruratAlamat: "Jl. Lambung Mangkurat No. 15, Banjarmasin", daruratTelp: "081566778899", daruratHub: "Ayah Kandung",
      gaji: "Rp 4.500.000", luarKota: "Tidak", mulai: "2026-08-15"
    },
    "GPS-2026-00847": {
      nama: "Fajar Nugraha", posisi: "Software Engineer", tgl: "15 Jul 2026",
      status: "Interview - I",
      telp: "081233445566", lahir: "02/11/1994", tempat: "Barabai", ktp: "6307020211940006",
      alamat: "Jl. Pangeran Antasari No. 9, Kel. Sungai Baru, Kec. Banjarmasin Tengah", 
      berat: "70", tinggi: "178", kebangsaan: "Indonesia", agama: "Islam", kelamin: "Laki-laki", 
      golDarah: "A", statusKawin: "Menikah", statusRumah: "Rumah Milik Sendiri", 
      noSim: "941102384912",
      foto: "images/foto-budi.png",
      ayah: "Drs. H. M. Kasim", usiaAyah: "62 Tahun", pekAyah: "Pensiunan Guru",
      ibu: "Hj. Raniah", usiaIbu: "58 Tahun", pekIbu: "Bidan",
      sdNama: "SDN Barabai Timur 1", sdJur: "Tidak ada", sdThn: "2000-2006", sdLulus: "Lulus",
      smpNama: "SMP Negeri 1 Barabai", smpJur: "Tidak ada", smpThn: "2006-2009", smpLulus: "Lulus",
      smaNama: "SMA Negeri 1 Barabai", smaJur: "IPA", smaThn: "2009-2012", smaLulus: "Lulus",
      univKampus: "Institut Teknologi Sepuluh Nopember (ITS)", univJur: "S1 Teknik Informatika", univThn: "2012-2016", univStatus: "Lulus (IPK 3.55)",
      kursusNama: "Cloud Architecture & DevOps Masterclass", kursusDurasi: "2020 (5 Bulan)",
      bahasa: "Bahasa Inggris", bahasaLevel: "Mahir (Advanced)",
      orgNama: "GDG (Google Developer Groups) Surabaya", orgPeran: "Core Team Member",
      hobiDesc: "Open source contribution, IoT tinkering, dan sepedaan.",
      perusahaan: "PT Inovasi Solusi Digital", alamatPerusahaan: "Jl. Hasan Basry, Banjarmasin", telpPerusahaan: "0511-3304455",
      jabatanAkhir: "Backend Developer", jabatanAwal: "Junior Programmer", periode: "Oktober 2021 - Juli 2026",
      uraian: "Mengembangkan REST API menggunakan Node.js dan Express, optimalisasi query database PostgreSQL, serta integrasi layanan pihak ketiga.",
      refNama: "Ir. Fauzan Azima", refAlamat: "Jl. Kayu Tangi, Banjarmasin", refTelp: "081233112233", refHub: "CTO",
      daruratNama: "Hj. Raniah", daruratAlamat: "Jl. Pangeran Antasari No. 9, Banjarmasin", daruratTelp: "081233445566", daruratHub: "Ibu Kandung",
      gaji: "Rp 7.000.000", luarKota: "Ya", mulai: "2026-08-01"
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const idLamaran = urlParams.get("id");

  if (idLamaran && databasePelamar[idLamaran]) {
    const data = databasePelamar[idLamaran];

    if (document.getElementById("namaPelamarHeader")) document.getElementById("namaPelamarHeader").innerText = data.nama;
    if (document.getElementById("subHeaderPelamar")) document.getElementById("subHeaderPelamar").innerText = `${data.posisi} > ${idLamaran} > Dilamar ${data.tgl}`;
    if (document.getElementById("fotoPelamar")) document.getElementById("fotoPelamar").src = data.foto;

    if (document.getElementById("inputNamaLengkap")) document.getElementById("inputNamaLengkap").value = data.nama;
    if (document.getElementById("inputAlamat")) document.getElementById("inputAlamat").value = data.alamat;
    if (document.getElementById("inputTelepon")) document.getElementById("inputTelepon").value = data.telp;
    if (document.getElementById("inputTglLahir")) document.getElementById("inputTglLahir").value = data.lahir;
    if (document.getElementById("inputTempatLahir")) document.getElementById("inputTempatLahir").value = data.tempat;
    if (document.getElementById("inputKtp")) document.getElementById("inputKtp").value = data.ktp;
    if (document.getElementById("inputBerat")) document.getElementById("inputBerat").value = data.berat;
    if (document.getElementById("inputTinggi")) document.getElementById("inputTinggi").value = data.tinggi;
    if (document.getElementById("inputKebangsaan")) document.getElementById("inputKebangsaan").value = data.kebangsaan;
    if (document.getElementById("inputAgama")) document.getElementById("inputAgama").value = data.agama;
    if (document.getElementById("inputJenisKelamin")) document.getElementById("inputJenisKelamin").value = data.kelamin;
    if (document.getElementById("inputGolDarah")) document.getElementById("inputGolDarah").value = data.golDarah;
    if (document.getElementById("inputStatusKawin")) document.getElementById("inputStatusKawin").value = data.statusKawin;
    if (document.getElementById("inputStatusRumah")) document.getElementById("inputStatusRumah").value = data.statusRumah;

    const step1OpsionalInputs = document.querySelectorAll("#step1 .footer-opsional-box input");
    if (step1OpsionalInputs.length >= 3) {
      step1OpsionalInputs[2].value = data.noSim;
    }

    if (document.getElementById("inputNamaAyah")) document.getElementById("inputNamaAyah").value = data.ayah;
    if (document.getElementById("inputUsiaAyah")) document.getElementById("inputUsiaAyah").value = data.usiaAyah;
    if (document.getElementById("inputPekerjaanAyah")) document.getElementById("inputPekerjaanAyah").value = data.pekAyah;
    if (document.getElementById("inputNamaIbu")) document.getElementById("inputNamaIbu").value = data.ibu;
    if (document.getElementById("inputUsiaIbu")) document.getElementById("inputUsiaIbu").value = data.usiaIbu;
    if (document.getElementById("inputPekerjaanIbu")) document.getElementById("inputPekerjaanIbu").value = data.pekIbu;

    if (document.getElementById("inputSdNama")) document.getElementById("inputSdNama").value = data.sdNama;
    if (document.getElementById("inputSdJurusan")) document.getElementById("inputSdJurusan").value = data.sdJur;
    if (document.getElementById("inputSdTahun")) document.getElementById("inputSdTahun").value = data.sdThn;
    if (document.getElementById("inputSdLulus")) document.getElementById("inputSdLulus").value = data.sdLulus;

    if (document.getElementById("inputSmpNama")) document.getElementById("inputSmpNama").value = data.smpNama;
    if (document.getElementById("inputSmpJurusan")) document.getElementById("inputSmpJurusan").value = data.smpJur;
    if (document.getElementById("inputSmpTahun")) document.getElementById("inputSmpTahun").value = data.smpThn;
    if (document.getElementById("inputSmpLulus")) document.getElementById("inputSmpLulus").value = data.smpLulus;

    if (document.getElementById("inputSmaNama")) document.getElementById("inputSmaNama").value = data.smaNama;
    if (document.getElementById("inputSmaJurusan")) document.getElementById("inputSmaJurusan").value = data.smaJur;
    if (document.getElementById("inputSmaTahun")) document.getElementById("inputSmaTahun").value = data.smaThn;
    if (document.getElementById("inputSmaLulus")) document.getElementById("inputSmaLulus").value = data.smaLulus;

    const step3OpsionalInputs = document.querySelectorAll("#step3 .footer-opsional-box input");
    if (step3OpsionalInputs.length >= 10) {
      step3OpsionalInputs[0].value = data.univKampus;
      step3OpsionalInputs[1].value = data.univJur;
      step3OpsionalInputs[2].value = data.univThn;
      step3OpsionalInputs[3].value = data.univStatus;

      step3OpsionalInputs[4].value = data.kursusNama;
      step3OpsionalInputs[5].value = data.kursusDurasi;

      step3OpsionalInputs[6].value = data.bahasa;
      step3OpsionalInputs[7].value = data.bahasaLevel;

      step3OpsionalInputs[8].value = data.orgNama;
      step3OpsionalInputs[9].value = data.orgPeran;

      if (step3OpsionalInputs.length >= 11) {
        step3OpsionalInputs[10].value = data.hobiDesc;
      }
    }

    if (document.getElementById("inputPerusahaan")) document.getElementById("inputPerusahaan").value = data.perusahaan;
    if (document.getElementById("inputAlamatPerusahaan")) document.getElementById("inputAlamatPerusahaan").value = data.alamatPerusahaan;
    if (document.getElementById("inputTelpPerusahaan")) document.getElementById("inputTelpPerusahaan").value = data.telpPerusahaan;
    if (document.getElementById("inputJabatanAkhir")) document.getElementById("inputJabatanAkhir").value = data.jabatanAkhir;
    if (document.getElementById("inputJabatanAwal")) document.getElementById("inputJabatanAwal").value = data.jabatanAwal;
    if (document.getElementById("inputPeriodeKerja")) document.getElementById("inputPeriodeKerja").value = data.periode;
    if (document.getElementById("inputUraianTugas")) document.getElementById("inputUraianTugas").value = data.uraian;

    if (document.getElementById("inputRefNama")) document.getElementById("inputRefNama").value = data.refNama;
    if (document.getElementById("inputRefAlamat")) document.getElementById("inputRefAlamat").value = data.refAlamat;
    if (document.getElementById("inputRefTelp")) document.getElementById("inputRefTelp").value = data.refTelp;
    if (document.getElementById("inputRefHubungan")) document.getElementById("inputRefHubungan").value = data.refHub;

    if (document.getElementById("inputDaruratNama")) document.getElementById("inputDaruratNama").value = data.daruratNama;
    if (document.getElementById("inputDaruratAlamat")) document.getElementById("inputDaruratAlamat").value = data.daruratAlamat;
    if (document.getElementById("inputDaruratTelp")) document.getElementById("inputDaruratTelp").value = data.daruratTelp;
    if (document.getElementById("inputDaruratHubungan")) document.getElementById("inputDaruratHubungan").value = data.daruratHub;

    if (document.getElementById("inputEkspektasiGaji")) document.getElementById("inputEkspektasiGaji").value = data.gaji;
    if (document.getElementById("inputLuarKota")) document.getElementById("inputLuarKota").value = data.luarKota;
    
    const mulaiKerjaInput = document.getElementById("inputMulaiKerja");
    if (mulaiKerjaInput) {
      mulaiKerjaInput.type = "date";
      mulaiKerjaInput.value = data.mulai;
    }

    if (document.getElementById("textNamaDokumen")) document.getElementById("textNamaDokumen").innerText = `CV_${data.nama}_${data.posisi}.pdf`;
    
    const checkboxPernyataan = document.getElementById("checkPernyataan");
    if (checkboxPernyataan) {
      checkboxPernyataan.checked = true;
    }

    const selectAllSelects = document.querySelectorAll("#step5 select, .step-section select, select");
    selectAllSelects.forEach(sel => {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.trim().toLowerCase() === data.status.trim().toLowerCase()) {
          sel.value = sel.options[i].value;
          break;
        }
      }
    });
  }

  // 2. LOGIKA HALAMAN LOGIN
  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");
  const togglePasswordButton = document.getElementById("togglePassword");
  const toggleIcon = document.getElementById("toggleIcon");

  if (togglePasswordButton && passwordInput && toggleIcon) {
    togglePasswordButton.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      if (isPassword) {
        toggleIcon.classList.remove("bi-eye");
        toggleIcon.classList.add("bi-eye-slash");
      } else {
        toggleIcon.classList.remove("bi-eye-slash");
        toggleIcon.classList.add("bi-eye");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
      }
      window.location.href = "dashboard.html";
    });
  }

  // 3. LOGIKA NAVIGASI AKTIF (ALL PAGES)
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && currentPath) {
      if (currentPath.includes("detail-lowongan") && href.includes("kelola-lowongan")) {
        navLinks.forEach((item) => item.classList.remove("fw-bold", "text-primary"));
        link.classList.add("fw-bold", "text-primary");
      } 
      else if (!currentPath.includes("detail-lowongan") && href.includes(currentPath)) {
        navLinks.forEach((item) => item.classList.remove("fw-bold", "text-primary"));
        link.classList.add("fw-bold", "text-primary");
      }
    }
  });

  // 4. LOGIKA KELOLA LOWONGAN (Menggunakan Modal Kustom untuk SEMUA kartu lowongan)
  const deleteLowonganBtns = document.querySelectorAll(".kelola-lowongan .btn-danger, .card-job-item .btn-danger");
  deleteLowonganBtns.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = this.closest(".card") || this.closest(".card-job-item");
      const titleEl = card ? card.querySelector(".card-title, h3, h5") : null;
      const jobTitle = titleEl ? titleEl.textContent.trim() : "Lowongan ini";

      const teksPesan = document.getElementById("pesanKonfirmasiHapusText");
      if (teksPesan) {
        teksPesan.innerHTML = `Apakah Anda yakin ingin menghapus lowongan <b>"${jobTitle}"</b>?`;
      }

      const modalEl = document.getElementById("modalHapusLowonganCustom");
      if (modalEl) {
        const myModal = new bootstrap.Modal(modalEl);
        myModal.show();

        const btnYaHapus = document.getElementById("btnYaHapusLowongan");
        if (btnYaHapus) {
          const newBtnYaHapus = btnYaHapus.cloneNode(true);
          btnYaHapus.parentNode.replaceChild(newBtnYaHapus, btnYaHapus);

          newBtnYaHapus.addEventListener("click", function () {
            card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => card.remove(), 300);

            myModal.hide();
          });
        }
      }
    });
  });

  // 5. LOGIKA KELOLA JADWAL SELEKSI
  const deleteJadwalBtns = document.querySelectorAll(".schedule-item .btn-danger");
  deleteJadwalBtns.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const scheduleItem = this.closest(".schedule-item");
      const applicantName = scheduleItem.querySelector("h3").textContent.trim();

      if (confirm(`Apakah Anda yakin ingin membatalkan jadwal seleksi untuk "${applicantName}"?`)) {
        scheduleItem.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        scheduleItem.style.opacity = "0";
        scheduleItem.style.transform = "translateX(20px)";
        setTimeout(() => scheduleItem.remove(), 300);
      }
    });
  });

  // 6. LOGIKA PENCARIAN GLOBAL
  const searchForms = document.querySelectorAll(".search-bar");
  searchForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = this.querySelector("input");
      const keyword = input ? input.value.trim() : "";

      if (keyword !== "") {
        alert(`Mencari data dengan kata kunci: "${keyword}"`);
      } else {
        alert("Silakan masukkan kata kunci pencarian terlebih dahulu.");
      }
    });
  });

  // 7. EVENT LISTENER TOMBOL SIMPAN STATUS DI MODAL
  const btnYaSimpan = document.getElementById("btnYaSimpan");
  if (btnYaSimpan) {
    btnYaSimpan.addEventListener("click", function () {
      const modalKonfirmasiEl = document.getElementById('modalKonfirmasi');
      const modalKonfirmasiInstance = bootstrap.Modal.getInstance(modalKonfirmasiEl);
      if (modalKonfirmasiInstance) {
        modalKonfirmasiInstance.hide();
      }

      setTimeout(() => {
        const modalSuksesEl = document.getElementById('modalSukses');
        if (modalSuksesEl) {
          const modalSukses = new bootstrap.Modal(modalSuksesEl);
          modalSukses.show();
        }
      }, 300);
    });
  }

});

// ==========================================
// LOGIKA HAPUS & TAMBAH DOKUMEN (FORM LOWONGAN)
// ==========================================
let targetRowToDelete = null;

document.addEventListener("DOMContentLoaded", function () {
  
  document.addEventListener("click", function (e) {
    const trashBtn = e.target.closest("#listDokumenContainer .btn-danger");
    if (trashBtn) {
      e.preventDefault();
      
      targetRowToDelete = trashBtn.closest(".item-card-row") || trashBtn.closest(".border");
      
      const labelEl = targetRowToDelete ? targetRowToDelete.querySelector(".form-check-label") : null;
      let namaDoc = labelEl ? `"${labelEl.textContent.trim()}"` : "dokumen ini";
      
      const spanNama = document.getElementById("namaDokumenHapus");
      if (spanNama) {
        spanNama.innerText = namaDoc;
      }

      const modalEl = document.getElementById('modalHapusDokumen');
      if (modalEl) {
        const myModal = new bootstrap.Modal(modalEl);
        myModal.show();
      }
    }
  });

  const btnKonfirmasiHapus = document.getElementById("btnKonfirmasiHapus");
  if (btnKonfirmasiHapus) {
    const newBtnHapus = btnKonfirmasiHapus.cloneNode(true);
    btnKonfirmasiHapus.parentNode.replaceChild(newBtnHapus, btnKonfirmasiHapus);

    newBtnHapus.addEventListener("click", function () {
      if (targetRowToDelete) {
        targetRowToDelete.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        targetRowToDelete.style.opacity = "0";
        targetRowToDelete.style.transform = "scale(0.95)";
        setTimeout(() => targetRowToDelete.remove(), 300);
      }

      const modalEl = document.getElementById('modalHapusDokumen');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }

  const btnSimpanDokumenBaru = document.getElementById("btnSimpanDokumenBaru");
  if (btnSimpanDokumenBaru) {
    const newBtnSimpanDoc = btnSimpanDokumenBaru.cloneNode(true);
    btnSimpanDokumenBaru.parentNode.replaceChild(newBtnSimpanDoc, btnSimpanDokumenBaru);

    newBtnSimpanDoc.addEventListener("click", function () {
      const modalContent = this.closest(".modal-content");
      const inputNama = modalContent ? modalContent.querySelector("input[type='text']") : document.getElementById("inputNamaDokumenBaru");
      const selectBoxModal = modalContent ? modalContent.querySelector("select") : document.getElementById("selectKetentuanDokumen");

      const namaDokumen = inputNama ? inputNama.value.trim() : "";
      const ketentuan = selectBoxModal ? selectBoxModal.value : "Wajib";

      if (!namaDokumen) {
        alert("Silakan masukkan nama dokumen terlebih dahulu.");
        return;
      }

      const container = document.getElementById("listDokumenContainer");
      if (container) {
        const newItem = document.createElement("div");
        newItem.className = "item-card-row d-flex align-items-center justify-content-between p-2 border rounded-2 bg-white";
        newItem.innerHTML = `
          <div class="form-check d-flex align-items-center gap-2 mb-0">
            <input class="form-check-input mt-0" type="checkbox" checked style="width: 16px; height: 16px;" />
            <label class="form-check-label fw-semibold text-dark" style="font-size: 13px; font-weight: 600;">${namaDokumen}</label>
          </div>
          <div class="d-flex align-items-center gap-2">
            <select class="form-select form-select-sm bg-white py-1 px-2" style="font-size: 12.5px; width: 105px; border-radius: 6px;">
              <option value="Wajib" ${ketentuan === 'Wajib' ? 'selected' : ''}>Wajib</option>
              <option value="Opsional" ${ketentuan === 'Opsional' ? 'selected' : ''}>Opsional</option>
            </select>
            <button type="button" class="btn btn-danger text-white px-2 py-1 btn-sm rounded-1" style="background-color: #ff3b30; border: none;">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        `;
        container.appendChild(newItem);
      }

      const modalEl = document.getElementById('modalTambahDokumen');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }
});

// ==========================================
// LOGIKA TAHAP SELEKSI (TAMBAH, EDIT, HAPUS)
// ==========================================
let targetTahapRow = null;

function bukaModalTambahTahap() {
  const inputNama = document.getElementById("inputNamaTahapBaru");
  const inputDurasi = document.getElementById("inputDurasiTahapBaru");
  if (inputNama) inputNama.value = "";
  if (inputDurasi) inputDurasi.value = "5 hari";

  const modalEl = document.getElementById('modalTambahTahap');
  if (modalEl) {
    const myModal = new bootstrap.Modal(modalEl);
    myModal.show();
  }
}

document.addEventListener("DOMContentLoaded", function () {

  document.addEventListener("click", function (e) {
    
    const deleteTahapBtn = e.target.closest("#listTahapContainer .btn-danger");
    if (deleteTahapBtn) {
      e.preventDefault();
      targetTahapRow = deleteTahapBtn.closest(".item-card-row");
      if (targetTahapRow) {
        const namaSpan = targetTahapRow.querySelector(".nama-tahap");
        const textTarget = document.getElementById("namaTahapDihapusText");
        if (textTarget && namaSpan) {
          textTarget.innerText = `"${namaSpan.innerText.trim()}"`;
        }
        const modalEl = document.getElementById('modalHapusTahap');
        if (modalEl) {
          const myModal = new bootstrap.Modal(modalEl);
          myModal.show();
        }
      }
      return;
    }

    const editTahapBtn = e.target.closest("#listTahapContainer .btn-warning");
    if (editTahapBtn) {
      e.preventDefault();
      targetTahapRow = editTahapBtn.closest(".item-card-row");
      if (targetTahapRow) {
        const namaSpan = targetTahapRow.querySelector(".nama-tahap");
        const durasiBtn = targetTahapRow.querySelector(".select-durasi-tahap span");

        const inputNamaEdit = document.getElementById("inputEditNamaTahap");
        const inputDurasiEdit = document.getElementById("inputEditDurasiTahap");

        if (inputNamaEdit && namaSpan) inputNamaEdit.value = namaSpan.innerText.trim();
        if (inputDurasiEdit && durasiBtn) inputDurasiEdit.value = durasiBtn.innerText.trim();

        const modalEl = document.getElementById('modalEditTahap');
        if (modalEl) {
          const myModal = new bootstrap.Modal(modalEl);
          myModal.show();
        }
      }
      return;
    }
  });

  const btnSimpanTahapBaru = document.getElementById("btnSimpanTahapBaru");
  if (btnSimpanTahapBaru) {
    btnSimpanTahapBaru.addEventListener("click", function () {
      const namaTahap = document.getElementById("inputNamaTahapBaru")?.value.trim();
      const durasiTahap = document.getElementById("inputDurasiTahapBaru")?.value.trim() || "5 hari";

      if (!namaTahap) {
        alert("Silakan masukkan nama tahap seleksi terlebih dahulu.");
        return;
      }

      const container = document.getElementById("listTahapContainer");
      if (container) {
        const totalItem = container.querySelectorAll(".item-card-row").length + 1;

        const newRow = document.createElement("div");
        newRow.className = "item-card-row d-flex align-items-center justify-content-between p-2 border rounded-2 bg-white";
        newRow.innerHTML = `
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary text-white rounded-pill px-2 py-1 nomor-tahap" style="font-size: 11px">${totalItem}</span>
            <span class="fw-semibold text-dark nama-tahap" style="font-size: 13px">${namaTahap}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <div class="dropdown custom-dropdown-durasi">
              <button class="btn btn-outline-secondary btn-sm bg-white text-dark d-flex align-items-center justify-content-between dropdown-toggle px-2 py-1 select-durasi-tahap" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="font-size: 12.5px; width: 105px; border-radius: 6px;">
                <span>${durasiTahap}</span>
              </button>
              <ul class="dropdown-menu shadow-sm p-1" style="font-size: 12.5px; min-width: 120px;">
                <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '${durasiTahap}')">${durasiTahap}</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
                <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '5 hari')">5 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
                <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '4 hari')">4 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
                <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '3 hari')">3 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
                <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '2 hari')">2 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
                <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '1 hari')">1 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
              </ul>
            </div>
            <button type="button" class="btn btn-warning text-white py-1 px-2.5 btn-sm rounded-1" style="background-color: #ffc107; border: none">
              <i class="bi bi-pencil"></i>
            </button>
            <button type="button" class="btn btn-danger text-white py-1 px-2.5 btn-sm rounded-1" style="background-color: #ff3b30; border: none">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        `;
        container.appendChild(newRow);
      }

      const modalEl = document.getElementById('modalTambahTahap');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    });
  }

  const btnSimpanEditTahap = document.getElementById("btnSimpanEditTahap");
  if (btnSimpanEditTahap) {
    btnSimpanEditTahap.addEventListener("click", function () {
      const namaBaru = document.getElementById("inputEditNamaTahap")?.value.trim();
      const durasiBaru = document.getElementById("inputEditDurasiTahap")?.value.trim();

      if (targetTahapRow && durasiBaru) {
        const namaSpan = targetTahapRow.querySelector(".nama-tahap");
        const durasiSpan = targetTahapRow.querySelector(".select-durasi-tahap span");
        const dropdownMenu = targetTahapRow.querySelector(".dropdown-menu");

        if (namaSpan && namaBaru) namaSpan.innerText = namaBaru;
        if (durasiSpan) durasiSpan.innerText = durasiBaru;

        if (dropdownMenu) {
          let sudahAda = false;
          const items = dropdownMenu.querySelectorAll("li span");
          items.forEach(item => {
            if (item.innerText.trim() === durasiBaru) {
              sudahAda = true;
            }
          });

          if (!sudahAda) {
            const newLi = document.createElement("li");
            newLi.innerHTML = `<div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '${durasiBaru}')">${durasiBaru}</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div>`;
            dropdownMenu.insertBefore(newLi, dropdownMenu.firstChild);
          }
        }
      }

      const modalEl = document.getElementById('modalEditTahap');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    });
  }

  const btnKonfirmasiHapusTahap = document.getElementById("btnKonfirmasiHapusTahap");
  if (btnKonfirmasiHapusTahap) {
    btnKonfirmasiHapusTahap.addEventListener("click", function () {
      if (targetTahapRow) {
        targetTahapRow.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        targetTahapRow.style.opacity = "0";
        targetTahapRow.style.transform = "scale(0.95)";
        setTimeout(() => {
          targetTahapRow.remove();
          perbaruiNomorUrutTahap();
        }, 300);
      }

      const modalEl = document.getElementById('modalHapusTahap');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    });
  }
});

function perbaruiNomorUrutTahap() {
  const container = document.getElementById("listTahapContainer");
  if (container) {
    const rows = container.querySelectorAll(".item-card-row");
    rows.forEach((row, index) => {
      const badgeNum = row.querySelector(".nomor-tahap");
      if (badgeNum) {
        badgeNum.innerText = index + 1;
      }
    });
  }
}

function pilihDurasi(element, teksDurasi) {
  const dropdownBtnSpan = element.closest(".custom-dropdown-durasi").querySelector(".select-durasi-tahap span");
  if (dropdownBtnSpan) {
    dropdownBtnSpan.innerText = teksDurasi;
  }
}

function hapusOpsiCustom(btn) {
  const liItem = btn.closest("li");
  const dropdownContainer = btn.closest(".custom-dropdown-durasi");
  const dropdownBtnSpan = dropdownContainer.querySelector(".select-durasi-tahap span");
  
  const teksDihapus = liItem.querySelector("span").innerText.trim();
  
  if (dropdownBtnSpan && dropdownBtnSpan.innerText.trim() === teksDihapus) {
    const sisaOpsi = dropdownContainer.querySelectorAll(".dropdown-menu li span");
    let ditemukanOpsiLain = false;
    
    for (let i = 0; i < sisaOpsi.length; i++) {
      if (sisaOpsi[i].innerText.trim() !== teksDihapus) {
        dropdownBtnSpan.innerText = sisaOpsi[i].innerText.trim();
        ditemukanOpsiLain = true;
        break;
      }
    }
    if (!ditemukanOpsiLain) {
      dropdownBtnSpan.innerText = "-";
    }
  }

  if (liItem) {
    liItem.remove();
  }
}

// ==========================================
// LOGIKA HALAMAN DETAIL LOWONGAN & KELOLA LOWONGAN
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  
  const databaseLowongan = {
    "it-support": {
      judul: "IT Support",
      divisi: "Divisi: IT",
      jumlah: "1 orang",
      status: "Akan ditutup",
      statusClass: "bg-warning text-dark",
      lokasi: "Banjarmasin",
      tipe: "Full-time",
      sisaWaktu: "Tersisa 5 hari",
      gaji: "Gaji: Tidak diperlihatkan",
      deskripsi: "Profesional teknologi yang bertanggung jawab untuk mengelola, memelihara, mengonfigurasi, serta memecahkan masalah perangkat keras (hardware), perangkat lunak (software), dan jaringan komputer di dalam perusahaan.",
      tanggungJawab: [
        "Mampu dan mengatasi kendala pada komputer, laptop, printer, dan perangkat IT lainnya baik secara langsung maupun jarak jauh (remote).",
        "Mampu memelihara kestabilan jaringan LAN, Wi-Fi, router, dan switch agar operasional kantor tidak terganggu.",
        "Serta membantu proses backup data server internal secara berkala dan menangani ancaman virus atau malware."
      ],
      kualifikasi: [
        "Pendidikan minimal S1 jurusan Teknik Informatika, Sistem Informasi, Teknik Komputer, atau Ilmu Komputer.",
        "Pengalaman 1 tahun.",
        "Paham troubleshooting PC & instalasi jaringan kantor.",
        "Jujur, cekatan, ramah, dan komunikatif.",
        "Siap bekerja full-time di kantor (WFO).",
        "Poin plus jika memiliki sertifikasi IT (CompTIA/Cisco)."
      ]
    },
    "staff-marketing": {
      judul: "Staff Marketing",
      divisi: "Divisi: Pemasaran",
      jumlah: "2 orang",
      status: "Dibuka",
      statusClass: "bg-success text-white",
      lokasi: "Banjarmasin",
      tipe: "Full-time",
      sisaWaktu: "Tersisa 10 hari",
      gaji: "Gaji: Rp 4.500.000 - Rp 6.000.000",
      deskripsi: "Bertanggung jawab dalam melakukan kegiatan pemasaran, promosi, dan meningkatkan brand perusahaan di pasaran lokal maupun digital.",
      tanggungJawab: [
        "Merancang dan mengeksekusi strategi pemasaran harian dan bulanan.",
        "Melakukan riset tren pasar dan analisis kompetitor.",
        "Menjalin relasi yang baik dengan klien serta mitra strategis."
      ],
      kualifikasi: [
        "Pendidikan minimal D3/S1 Semua Jurusan.",
        "Pengalaman minimal 1 tahun di bidang marketing/sales.",
        "Memiliki kemampuan komunikasi dan negosiasi yang sangat baik.",
        "Dapat bekerja dengan target."
      ]
    },
    "finance-accounting": {
      judul: "Finance & Accounting",
      divisi: "Divisi: Keuangan",
      jumlah: "2 orang",
      status: "Dibuka",
      statusClass: "bg-success text-white",
      lokasi: "Banjarmasin",
      tipe: "Full-time",
      sisaWaktu: "Tersisa 7 hari",
      gaji: "Gaji: Rp 5.000.000 - Rp 7.000.000",
      deskripsi: "Mencatat serta melaporkan transaksi keuangan sekaligus mengolah arus kas dan perancangan anggaran perusahaan secara akurat.",
      tanggungJawab: [
        "Membuat laporan keuangan bulanan (Laba Rugi, Neraca, Arus Kas).",
        "Melakukan rekonsiliasi bank dan audit kas kecil.",
        "Mengelola perpajakan perusahaan (PPh & PPN)."
      ],
      kualifikasi: [
        "Pendidikan minimal S1 Akuntansi / Keuangan.",
        "Menguasai software akuntansi dan Microsoft Excel tingkat lanjut.",
        "Memiliki sertifikat Brevet A & B menjadi nilai tambah.",
        "Teliti, jujur, dan berintegritas tinggi."
      ]
    },
    "marketing-officer": {
      judul: "Marketing Officer",
      divisi: "Divisi: Pemasaran",
      jumlah: "1 orang",
      status: "Tutup",
      statusClass: "bg-danger text-white",
      lokasi: "Banjarmasin",
      tipe: "Full-time",
      sisaWaktu: "Lowongan Berakhir",
      gaji: "Gaji: Kompetitif",
      deskripsi: "Merencanakan, menjalankan, dan menganalisis strategi pemasaran untuk memperkenalkan produk perusahaan ke cakupan yang lebih luas.",
      tanggungJawab: [
        "Mengembangkan kampanye pemasaran digital dan offline.",
        "Mengelola media sosial perusahaan.",
        "Mengevaluasi efektivitas kampanye pemasaran."
      ],
      kualifikasi: [
        "Pendidikan minimal S1 Ilmu Komunikasi / Marketing / Bisnis.",
        "Kreatif dan update dengan tren digital marketing.",
        "Mampu mengoperasikan tools analytic dasar."
      ]
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const lowonganKey = urlParams.get("lowongan") || "it-support";

  if (document.getElementById("detailJudulLowongan") && databaseLowongan[lowonganKey]) {
    const data = databaseLowongan[lowonganKey];

    const judulEl = document.getElementById("detailJudulLowongan");
    judulEl.innerText = data.judul;

    if (data.status.toLowerCase() === "tutup") {
      judulEl.style.color = "#a9a9a9";
    } else {
      judulEl.style.color = "#000000";
    }

    const divisiText = data.divisi + (data.jumlah ? ` | Jumlah Dibutuhkan: ${data.jumlah}` : "");
    document.getElementById("detailDivisiLowongan").innerText = divisiText;
    
    const badgeStatus = document.getElementById("badgeStatusLowongan");
    if (badgeStatus) {
      badgeStatus.innerText = data.status;
      badgeStatus.className = `detail text-wrapper-6 px-3 py-2 ${data.statusClass}`;
    }

    if (document.getElementById("badgeLokasiLowongan")) document.getElementById("badgeLokasiLowongan").innerText = data.lokasi;
    if (document.getElementById("badgeTipeLowongan")) document.getElementById("badgeTipeLowongan").innerText = data.tipe;
    if (document.getElementById("badgeSisaWaktu")) document.getElementById("badgeSisaWaktu").innerText = data.sisaWaktu;
    if (document.getElementById("badgeGajiLowongan")) document.getElementById("badgeGajiLowongan").innerText = data.gaji;
    if (document.getElementById("detailDeskripsiText")) document.getElementById("detailDeskripsiText").innerText = data.deskripsi;

    const listTanggungJawab = document.getElementById("listTanggungJawab");
    if (listTanggungJawab) {
      listTanggungJawab.innerHTML = data.tanggungJawab.map(item => `<li class="mb-1">${item}</li>`).join("");
    }

    const listKualifikasi = document.getElementById("listKualifikasi");
    if (listKualifikasi) {
      listKualifikasi.innerHTML = data.kualifikasi.map(item => `<li class="mb-1">${item}</li>`).join("");
    }
  }

  const cardJobs = document.querySelectorAll(".card-job-item, .kelola-lowongan .card");
  cardJobs.forEach((card) => {
    const judulEl = card.querySelector(".card-title, h3, h5");
    if (judulEl) {
      const teksJudul = judulEl.textContent.trim().toLowerCase();
      let key = "it-support";
      if (teksJudul.includes("staff marketing")) key = "staff-marketing";
      else if (teksJudul.includes("finance")) key = "finance-accounting";
      else if (teksJudul.includes("support")) key = "it-support";
      else if (teksJudul.includes("marketing officer")) key = "marketing-officer";

      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        if (e.target.closest("button") || e.target.closest("a")) return;
        window.location.href = `detail-lowongan.html?lowongan=${key}`;
      });
    }
  });

});

// ==========================================
// SCRIPT INTERAKTIF HALAMAN EDIT & KELOLA LOWONGAN
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  
  // Mengatur tombol edit untuk lowongan bawaan
  const cardJobs = document.querySelectorAll(".card-job-item, .kelola-lowongan .card");
  cardJobs.forEach((card) => {
    const editBtn = card.querySelector(".btn-warning");
    const judulEl = card.querySelector(".card-title, h3, h5");
    
    if (judulEl && editBtn && !editBtn.classList.contains("btn-edit-lokal")) {
      const teksJudul = judulEl.textContent.trim().toLowerCase();
      let key = "it-support";
      if (teksJudul.includes("staff marketing")) key = "staff-marketing";
      else if (teksJudul.includes("finance")) key = "finance-accounting";
      else if (teksJudul.includes("support")) key = "it-support";
      else if (teksJudul.includes("marketing officer")) key = "marketing-officer";

      editBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `edit-lowongan.html?lowongan=${key}`;
      });
    }
  });

  const databaseEditLowongan = {
    "it-support": {
      judul: "IT Support", divisi: "IT", status: "Akan ditutup", tanggal: "2026-08-15", lokasi: "Banjarmasin", tipe: "Full-time",
      deskripsi: "Profesional teknologi yang bertanggung jawab untuk mengelola, memelihara, mengonfigurasi, serta memecahkan masalah perangkat keras (hardware), perangkat lunak (software), dan jaringan komputer di dalam perusahaan.",
      tanggungJawab: "Mampu dan mengatasi kendala pada komputer, laptop, printer, dan perangkat IT lainnya baik secara langsung maupun jarak jauh (remote).\nMampu memelihara kestabilan jaringan LAN, Wi-Fi, router, dan switch agar operasional kantor tidak terganggu.\nSerta membantu proses backup data server internal secara berkala dan menangani ancaman virus atau malware.",
      kualifikasi: "Pendidikan minimal S1 jurusan Teknik Informatika, Sistem Informasi, Teknik Komputer, atau Ilmu Komputer.\nPengalaman 1 tahun.\nPaham troubleshooting PC & instalasi jaringan kantor.\nJujur, cekatan, ramah, dan komunikatif.\nSiap bekerja full-time di kantor (WFO)."
    },
    "staff-marketing": {
      judul: "Staff Marketing", divisi: "Pemasaran", status: "Dibuka", tanggal: "2026-08-20", lokasi: "Banjarmasin", tipe: "Full-time",
      deskripsi: "Bertanggung jawab dalam melakukan kegiatan pemasaran, promosi, dan meningkatkan brand perusahaan di pasaran lokal maupun digital.",
      tanggungJawab: "Merancang dan mengeksekusi strategi pemasaran harian dan bulanan.\nMelakukan riset tren pasar dan analisis kompetitor.\nMenjalin relasi yang baik dengan klien serta mitra strategis.",
      kualifikasi: "Pendidikan minimal D3/S1 Semua Jurusan.\nPengalaman minimal 1 tahun di bidang marketing/sales.\nMemiliki kemampuan komunikasi dan negosiasi yang sangat baik.\nDapat bekerja dengan target."
    },
    "finance-accounting": {
      judul: "Finance & Accounting", divisi: "Keuangan", status: "Dibuka", tanggal: "2026-08-25", lokasi: "Banjarmasin", tipe: "Full-time",
      deskripsi: "Mencatat serta melaporkan transaksi keuangan sekaligus mengolah arus kas dan perancangan anggaran perusahaan secara akurat.",
      tanggungJawab: "Membuat laporan keuangan bulanan (Laba Rugi, Neraca, Arus Kas).\nMelakukan rekonsiliasi bank dan audit kas kecil.\nMengelola perpajakan perusahaan (PPh & PPN).",
      kualifikasi: "Pendidikan minimal S1 Akuntansi / Keuangan.\nMenguasai software akuntansi dan Microsoft Excel tingkat lanjut.\nMemiliki sertifikat Brevet A & B menjadi nilai tambah.\nTeliti, jujur, dan berintegritas tinggi."
    },
    "marketing-officer": {
      judul: "Marketing Officer", divisi: "Pemasaran", status: "Ditutup", tanggal: "2026-07-15", lokasi: "Banjarmasin", tipe: "Full-time",
      deskripsi: "Merencanakan, menjalankan, dan menganalisis strategi pemasaran untuk memperkenalkan produk perusahaan ke cakupan yang lebih luas.",
      tanggungJawab: "Mengembangkan kampanye pemasaran digital dan offline.\nMengelola media sosial perusahaan.\nMengevaluasi efektivitas kampanye pemasaran.",
      kualifikasi: "Pendidikan minimal S1 Ilmu Komunikasi / Marketing / Bisnis.\nKreatif dan update dengan tren digital marketing.\nMampu mengoperasikan tools analytic dasar."
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const lowonganKey = urlParams.get("lowongan");
  const indexLocal = urlParams.get("index");

  // Fungsi helper untuk merender ulang dokumen saat mode edit
  function renderEditDokumen(dokumenArray) {
    const container = document.getElementById("listDokumenContainer");
    if (!container) return;
    container.innerHTML = "";
    dokumenArray.forEach(doc => {
      const isChecked = doc.checked !== undefined ? doc.checked : true;
      const div = document.createElement("div");
      div.className = "item-card-row d-flex align-items-center justify-content-between p-2 border rounded-2 bg-white mb-2";
      div.innerHTML = `
        <div class="form-check d-flex align-items-center gap-2 mb-0">
          <input class="form-check-input mt-0" type="checkbox" ${isChecked ? 'checked' : ''} style="width: 16px; height: 16px;" />
          <label class="form-check-label fw-semibold text-dark" style="font-size: 13px;">${doc.nama}</label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <select class="form-select form-select-sm bg-white py-1 px-2" style="font-size: 12.5px; width: 105px; border-radius: 6px;">
            <option value="Wajib" ${doc.ketentuan === 'Wajib' ? 'selected' : ''}>Wajib</option>
            <option value="Opsional" ${doc.ketentuan === 'Opsional' ? 'selected' : ''}>Opsional</option>
          </select>
          <button type="button" class="btn btn-danger text-white px-2 py-1 btn-sm rounded-1" style="background-color: #ff3b30; border: none;">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
      container.appendChild(div);
    });
  }

  function renderEditTahap(tahapArray) {
  const container = document.getElementById("listTahapContainer");
  if (!container) return;
  container.innerHTML = "";
  tahapArray.forEach((tahap, idx) => {
    const durasiVal = tahap.durasi || "5 hari";
    const div = document.createElement("div");
    div.className = "item-card-row d-flex align-items-center justify-content-between p-2 border rounded-2 bg-white mb-2";
    div.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span class="badge bg-primary text-white rounded-pill px-2 py-1 nomor-tahap" style="font-size: 11px">${idx + 1}</span>
        <span class="fw-semibold text-dark nama-tahap" style="font-size: 13px">${tahap.nama}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="dropdown custom-dropdown-durasi">
          <button class="btn btn-outline-secondary btn-sm bg-white text-dark d-flex align-items-center justify-content-between dropdown-toggle px-2 py-1 select-durasi-tahap" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="font-size: 12.5px; width: 105px; border-radius: 6px;">
            <span>${durasiVal}</span>
          </button>
          <ul class="dropdown-menu shadow-sm p-1" style="font-size: 12.5px; min-width: 120px;">
            <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '5 hari')">5 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
            <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '4 hari')">4 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
            <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '3 hari')">3 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
            <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '2 hari')">2 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
            <li><div class="d-flex align-items-center justify-content-between px-2 py-1 dropdown-item rounded-1" style="cursor: pointer;"><span onclick="pilihDurasi(this, '1 hari')">1 hari</span><button type="button" class="btn btn-link text-danger p-0 ms-2 text-decoration-none" onclick="hapusOpsiCustom(this)" title="Hapus">×</button></div></li>
          </ul>
        </div>
        <button type="button" class="btn btn-warning text-white py-1 px-2.5 btn-sm rounded-1" style="background-color: #ffc107; border: none">
          <i class="bi bi-pencil"></i>
        </button>
        <button type="button" class="btn btn-danger text-white py-1 px-2.5 btn-sm rounded-1" style="background-color: #ff3b30; border: none">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    container.appendChild(div);
  });
}

  if (document.getElementById("editNamaPosisi")) {
    let daftarLowongan = JSON.parse(localStorage.getItem("daftarLowongan")) || [];
    let itemData = null;

    // Cek apakah edit berdasarkan index localStorage atau lowongan key bawaan
    if (indexLocal !== null && daftarLowongan[indexLocal]) {
      itemData = daftarLowongan[indexLocal];
    } else if (lowonganKey) {
      // Jika dari lowongan bawaan, cari di localStorage berdasarkan kecocokan judul
      let cariJudul = "";
      if (lowonganKey === "it-support") cariJudul = "IT Support";
      else if (lowonganKey === "staff-marketing") cariJudul = "Staff Marketing";
      else if (lowonganKey === "finance-accounting") cariJudul = "Finance & Accounting";
      else if (lowonganKey === "marketing-officer") cariJudul = "Marketing Officer";

      const foundIndex = daftarLowongan.findIndex(item => item.judul.toLowerCase() === cariJudul.toLowerCase());
      if (foundIndex !== -1) {
        itemData = daftarLowongan[foundIndex];
        // Ubah URL secara senyap agar penyimpanan mengarah ke index localStorage yang benar
        window.history.replaceState({}, document.title, `edit-lowongan.html?index=${foundIndex}`);
      }
    }

    if (itemData) {
      document.getElementById("editNamaPosisi").value = itemData.judul || "";
      if (document.getElementById("editDivisi")) document.getElementById("editDivisi").value = itemData.departemen || "";
      if (document.getElementById("editStatus")) document.getElementById("editStatus").value = itemData.status || "Dibuka";
      if (document.getElementById("editLokasi")) document.getElementById("editLokasi").value = itemData.lokasi || "";
      if (document.getElementById("editTipe")) document.getElementById("editTipe").value = itemData.tipe || "Full-time";
      if (document.getElementById("editDeskripsi")) document.getElementById("editDeskripsi").value = itemData.deskripsi || "";
      if (document.getElementById("editTanggungJawab")) document.getElementById("editTanggungJawab").value = itemData.tanggungJawab || "";
      if (document.getElementById("editKualifikasi")) document.getElementById("editKualifikasi").value = itemData.kualifikasi || "";
      if (document.getElementById("editTanggal")) document.getElementById("editTanggal").value = itemData.tglTutup || "";
      
      // Render dokumen & tahap dari localStorage
      if (itemData.dokumen && itemData.dokumen.length > 0) {
        renderEditDokumen(itemData.dokumen);
      }
      if (itemData.tahap && itemData.tahap.length > 0) {
        renderEditTahap(itemData.tahap);
      }
    } else if (lowonganKey && databaseEditLowongan[lowonganKey]) {
      // Cadangan jika belum ada di localStorage
      const data = databaseEditLowongan[lowonganKey];
      document.getElementById("editNamaPosisi").value = data.judul;
      if (document.getElementById("editDivisi")) document.getElementById("editDivisi").value = data.divisi;
      if (document.getElementById("editStatus")) document.getElementById("editStatus").value = data.status;
      if (document.getElementById("editTanggal")) document.getElementById("editTanggal").value = data.tanggal;
      if (document.getElementById("editLokasi")) document.getElementById("editLokasi").value = data.lokasi;
      if (document.getElementById("editTipe")) document.getElementById("editTipe").value = data.tipe;
      if (document.getElementById("editDeskripsi")) document.getElementById("editDeskripsi").value = data.deskripsi;
      if (document.getElementById("editTanggungJawab")) document.getElementById("editTanggungJawab").value = data.tanggungJawab;
      if (document.getElementById("editKualifikasi")) document.getElementById("editKualifikasi").value = data.kualifikasi;
    }
  }

  const formEditLowongan = document.getElementById("formEditLowongan");
  if (formEditLowongan) {
    formEditLowongan.addEventListener("submit", function (event) {
      event.preventDefault();
      
      if (!formEditLowongan.checkValidity()) {
        formEditLowongan.classList.add("was-validated");
        alert("Silakan masukkan data dengan lengkap terlebih dahulu!");
        return;
      }

      // Tampilkan modal konfirmasi dengan ID "modalKonfirmasi"
      const modalKonfirmasiEl = document.getElementById("modalKonfirmasi");
      if (modalKonfirmasiEl) {
        const modalKonfirmasi = new bootstrap.Modal(modalKonfirmasiEl);
        modalKonfirmasi.show();
      }
    });
  }

  // Aksi ketika tombol "Ya, simpan" diklik di dalam modal konfirmasi
  const btnYaSimpan = document.getElementById("btnYaSimpan");
  if (btnYaSimpan) {
    const newBtnYaSimpan = btnYaSimpan.cloneNode(true);
    btnYaSimpan.parentNode.replaceChild(newBtnYaSimpan, btnYaSimpan);

    newBtnYaSimpan.addEventListener("click", function () {
      if (indexLocal !== null) {
        let daftarLowongan = JSON.parse(localStorage.getItem("daftarLowongan")) || [];
        if (daftarLowongan[indexLocal]) {
          daftarLowongan[indexLocal].judul = document.getElementById("editNamaPosisi").value.trim();
          daftarLowongan[indexLocal].departemen = document.getElementById("editDivisi") ? document.getElementById("editDivisi").value.trim() : "";
          daftarLowongan[indexLocal].status = document.getElementById("editStatus") ? document.getElementById("editStatus").value : "Dibuka";
          daftarLowongan[indexLocal].lokasi = document.getElementById("editLokasi") ? document.getElementById("editLokasi").value.trim() : "";
          // Memperbarui tipe pekerjaan
          daftarLowongan[indexLocal].tipe = document.getElementById("editTipe") ? document.getElementById("editTipe").value : "Full-time";
          daftarLowongan[indexLocal].deskripsi = document.getElementById("editDeskripsi") ? document.getElementById("editDeskripsi").value.trim() : "";
          daftarLowongan[indexLocal].tanggungJawab = document.getElementById("editTanggungJawab") ? document.getElementById("editTanggungJawab").value.trim() : "";
          daftarLowongan[indexLocal].kualifikasi = document.getElementById("editKualifikasi") ? document.getElementById("editKualifikasi").value.trim() : "";
          daftarLowongan[indexLocal].tglTutup = document.getElementById("editTanggal") ? document.getElementById("editTanggal").value : "";

         // KODE BARU (MENYIMPAN SEMUA DOKUMEN DAN STATUS CENTANGNYA)
          const daftarDokumen = [];
          const itemDokumenEls = document.querySelectorAll("#listDokumenContainer .item-card-row, #listDokumenContainer .border");
          itemDokumenEls.forEach(row => {
            const checkbox = row.querySelector("input[type='checkbox']");
            const label = row.querySelector(".form-check-label");
            const select = row.querySelector("select");
            
            if (label) {
              daftarDokumen.push({
                nama: label.textContent.trim(),
                ketentuan: select ? select.value : "Wajib",
                checked: checkbox ? checkbox.checked : false // Menyimpan status true atau false sesuai kondisi checkbox
              });
            }
          });
          daftarLowongan[indexLocal].dokumen = daftarDokumen;

          // Ambil pembaruan tahap seleksi dari form edit
          const daftarTahap = [];
          const itemTahapEls = document.querySelectorAll("#listTahapContainer .item-card-row");
          itemTahapEls.forEach(row => {
            const namaTahap = row.querySelector(".nama-tahap");
            const durasiTahap = row.querySelector(".select-durasi-tahap span");
            if (namaTahap) {
              daftarTahap.push({
                nama: namaTahap.innerText.trim(),
                durasi: durasiTahap ? durasiTahap.innerText.trim() : "5 hari"
              });
            }
          });
          daftarLowongan[indexLocal].tahap = daftarTahap;

          localStorage.setItem("daftarLowongan", JSON.stringify(daftarLowongan));
        }
      }

      // Sembunyikan modal konfirmasi
      const modalKonfirmasiEl = document.getElementById("modalKonfirmasi");
      const modalKonfirmasiInstance = bootstrap.Modal.getInstance(modalKonfirmasiEl);
      if (modalKonfirmasiInstance) {
        modalKonfirmasiInstance.hide();
      }

      // Tampilkan modal sukses setelah jeda singkat
      setTimeout(() => {
        const modalSuksesEl = document.getElementById("modalSukses");
        if (modalSuksesEl) {
          const modalSukses = new bootstrap.Modal(modalSuksesEl);
          modalSukses.show();
        }
      }, 300);
    });
  }

  // Aksi tombol "Selesai" pada modal sukses untuk kembali ke halaman kelola lowongan
  const btnSelesaiEdit = document.getElementById("btnSelesaiEdit");
  if (btnSelesaiEdit) {
    const newBtnSelesaiEdit = btnSelesaiEdit.cloneNode(true);
    btnSelesaiEdit.parentNode.replaceChild(newBtnSelesaiEdit, btnSelesaiEdit);

    newBtnSelesaiEdit.addEventListener("click", function () {
      window.location.href = "kelola-lowongan.html";
    });
  }

}); 

// ==========================================
// VALIDASI & PUBLIKASI LOWONGAN (BERSIH & AMAN)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const semuaTombol = document.querySelectorAll("button");
  
  semuaTombol.forEach(function (btn) {
    if (btn.textContent.includes("Publikasikan")) {
      btn.type = "button";
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const inputJudul = document.getElementById("inputJudul");
        const inputDepartemen = document.getElementById("inputDepartemen");
        const inputLokasi = document.getElementById("inputLokasi");
        const inputJumlah = document.getElementById("inputJumlah");
        const inputDeskripsi = document.getElementById("inputDeskripsi");
        const inputTglMulai = document.getElementById("inputTglMulai");
        const inputTglTutup = document.getElementById("inputTglTutup");

        if (
          (inputJudul && inputJudul.value.trim() === "") ||
          (inputDepartemen && inputDepartemen.value.trim() === "") ||
          (inputLokasi && inputLokasi.value.trim() === "") ||
          (inputDeskripsi && inputDeskripsi.value.trim() === "") ||
          (inputTglMulai && inputTglMulai.value.trim() === "") ||
          (inputTglTutup && inputTglTutup.value.trim() === "")
        ) {
          const modalPeringatanEl = document.getElementById("modalPeringatanLowongan");
          if (modalPeringatanEl) {
            const myModal = new bootstrap.Modal(modalPeringatanEl);
            myModal.show();
          }
          return;
        }

        // Ambil data dokumen yang diminta dari pelamar (menyimpan status centang / checked)
        const daftarDokumen = [];
        const itemDokumenEls = document.querySelectorAll("#listDokumenContainer .item-card-row, #listDokumenContainer .border");
        itemDokumenEls.forEach(row => {
          const checkbox = row.querySelector("input[type='checkbox']");
          const label = row.querySelector(".form-check-label");
          const select = row.querySelector("select");
          if (label) {
            daftarDokumen.push({
              nama: label.textContent.trim(),
              ketentuan: select ? select.value : "Wajib",
              checked: checkbox ? checkbox.checked : false
            });
          }
        });

        // Ambil data tahap seleksi
        const daftarTahap = [];
        const itemTahapEls = document.querySelectorAll("#listTahapContainer .item-card-row");
        itemTahapEls.forEach(row => {
          const namaTahap = row.querySelector(".nama-tahap");
          const durasiTahap = row.querySelector(".select-durasi-tahap span");
          if (namaTahap) {
            daftarTahap.push({
              nama: namaTahap.innerText.trim(),
              durasi: durasiTahap ? durasiTahap.innerText.trim() : "5 hari"
            });
          }
        });

        const lowonganBaru = {
          judul: inputJudul.value.trim(),
          departemen: inputDepartemen.value.trim(),
          lokasi: inputLokasi.value.trim(),
          tipe: document.getElementById("inputTipe") ? document.getElementById("inputTipe").value : "Full-time",
          jumlah: inputJumlah ? inputJumlah.value.trim() : "",
          deskripsi: inputDeskripsi.value.trim(),
          gaji: (function() {
            const inputGajiEl = document.getElementById("inputGaji");
            const checkGajiEl = document.getElementById("checkGaji");
            
            const nilaiInput = inputGajiEl ? inputGajiEl.value.trim() : "";
            const isChecked = checkGajiEl ? checkGajiEl.checked : false;

            if (nilaiInput !== "" && isChecked) {
              return "Gaji: " + nilaiInput;
            } else {
              return "Gaji: Tidak diperlihatkan";
            }
          })(),
          status: "Dibuka", // Status default lowongan baru
          tanggungJawab: document.getElementById("inputTanggungJawab") ? document.getElementById("inputTanggungJawab").value.trim() : "",
          kualifikasi: document.getElementById("inputKualifikasi") ? document.getElementById("inputKualifikasi").value.trim() : "",
          tglMulai: inputTglMulai.value,
          tglTutup: inputTglTutup.value,
          dokumen: daftarDokumen,
          tahap: daftarTahap
        };

        let daftarLowongan = JSON.parse(localStorage.getItem("daftarLowongan")) || [];

          // Langsung masukkan lowongan baru tanpa pengecekan duplikasi nama
          daftarLowongan.push(lowonganBaru);
          localStorage.setItem("daftarLowongan", JSON.stringify(daftarLowongan));

        const modalSuksesEl = document.getElementById("modalSuksesPublikasi");
        if (modalSuksesEl) {
          const modalSuksesInstance = new bootstrap.Modal(modalSuksesEl);
          modalSuksesInstance.show();
        }
      });
    }
  });

  const btnSelesaiPublikasi = document.getElementById("btnSelesaiPublikasi");
  if (btnSelesaiPublikasi) {
    btnSelesaiPublikasi.addEventListener("click", function () {
      window.location.href = "kelola-lowongan.html";
    });
  }
});

function batalkanForm() {
  window.location.href = "kelola-lowongan.html";
}

// ==========================================
// RENDER LOWONGAN BARU DARI LOCALSTORAGE & FUNGSI HAPUS MENGGUNAKAN MODAL KUSTOM
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("kelola-lowongan")) {
    let daftarLowongan = JSON.parse(localStorage.getItem("daftarLowongan")) || [];
    
    if (daftarLowongan.length > 0) {
      const mainRow = document.querySelector(".kelola-lowongan");

      if (mainRow) {
        mainRow.innerHTML = ""; // Bersihkan elemen agar tidak terjadi duplikasi elemen statis
        daftarLowongan.forEach(function (item, index) {
          const colDiv = document.createElement("div");
          colDiv.className = "col-12 col-md-6";
          
          const statusBadgeText = item.status || "Dibuka";

          // Memasukkan parameter status ke dalam URL detail lowongan agar terbaca secara dinamis
          const detailUrl = `detail-lowongan.html?judul=${encodeURIComponent(item.judul)}&divisi=${encodeURIComponent(item.departemen)}&lokasi=${encodeURIComponent(item.lokasi)}&tipe=${encodeURIComponent(item.tipe || 'Full-time')}&jumlah=${encodeURIComponent(item.jumlah || '')}&deskripsi=${encodeURIComponent(item.deskripsi)}&gaji=${encodeURIComponent(item.gaji || '')}&tanggungJawab=${encodeURIComponent(item.tanggungJawab || '')}&kualifikasi=${encodeURIComponent(item.kualifikasi || '')}&status=${encodeURIComponent(statusBadgeText)}&tglMulai=${encodeURIComponent(item.tglMulai || '')}&tglTutup=${encodeURIComponent(item.tglTutup || '')}&dokumen=${encodeURIComponent(JSON.stringify(item.dokumen || []))}&tahap=${encodeURIComponent(JSON.stringify(item.tahap || []))}`;
          const editLocalUrl = `edit-lowongan.html?index=${index}`;

          let statusBadgeClass = "bg-success";
          if (statusBadgeText.toLowerCase() === "ditutup" || statusBadgeText.toLowerCase() === "tutup") statusBadgeClass = "bg-danger";
          else if (statusBadgeText.toLowerCase() === "akan ditutup") statusBadgeClass = "bg-warning text-dark";

          // Mengubah warna teks judul menjadi abu-abu jika statusnya ditutup
          const warnaJudul = (statusBadgeText.toLowerCase() === "ditutup" || statusBadgeText.toLowerCase() === "tutup") ? "color: #a9a9a9;" : "color: #212529;";

          colDiv.innerHTML = `
            <div class="card h-100 p-3 border-0 shadow-sm rounded-3 bg-white d-flex flex-column justify-content-between card-job-item" style="cursor: pointer;">
              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h2 class="fs-6 fw-bold mb-0 card-title" style="${warnaJudul}">${item.judul}</h2>
                  <span class="badge ${statusBadgeClass} rounded-pill px-3 py-1 fw-medium font-size-badge">${statusBadgeText}</span>
                </div>
                <div class="text-muted small mb-2" style="font-size: 12px;">${item.lokasi || 'Banjarmasin'} - ${item.tipe || 'Full-time'}</div>
                <p class="text-secondary small mb-0 lh-sm" style="font-size: 13px;">${item.deskripsi || 'Belum ada deskripsi.'}</p>
              </div>
              <div class="d-flex gap-2 align-items-center w-100 pt-2 border-top border-light-subtle">
                <a href="${detailUrl}" class="btn btn-primary flex-grow-1 fw-medium py-1-5 rounded-2 btn-sm text-decoration-none text-center">Lihat Lowongan</a>
                <button class="btn btn-warning text-white px-2-5 py-1-5 rounded-2 btn-sm btn-edit-lokal" title="Edit" onclick="window.location.href='${editLocalUrl}'"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-danger text-white px-2-5 py-1-5 rounded-2 btn-sm btn-hapus-custom" title="Hapus"><i class="bi bi-trash-fill"></i></button>
              </div>
            </div>
          `;

          const cardEl = colDiv.querySelector(".card");
          cardEl.addEventListener("click", function (e) {
            if (e.target.closest("button") || e.target.closest("a")) return;
            window.location.href = detailUrl;
          });

          const deleteBtn = colDiv.querySelector(".btn-hapus-custom");
          deleteBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const teksPesan = document.getElementById("pesanKonfirmasiHapusText");
            if (teksPesan) {
              teksPesan.innerHTML = `Apakah Anda yakin ingin menghapus lowongan <b>"${item.judul}"</b>?`;
            }

            const modalEl = document.getElementById("modalHapusLowonganCustom");
            if (modalEl) {
              const myModal = new bootstrap.Modal(modalEl);
              myModal.show();

              const btnYaHapus = document.getElementById("btnYaHapusLowongan");
              if (btnYaHapus) {
                const newBtnYaHapus = btnYaHapus.cloneNode(true);
                btnYaHapus.parentNode.replaceChild(newBtnYaHapus, btnYaHapus);

                newBtnYaHapus.addEventListener("click", function () {
                  let currentData = JSON.parse(localStorage.getItem("daftarLowongan")) || [];
                  currentData.splice(index, 1);
                  localStorage.setItem("daftarLowongan", JSON.stringify(currentData));

                  colDiv.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                  colDiv.style.opacity = "0";
                  colDiv.style.transform = "scale(0.95)";
                  setTimeout(() => colDiv.remove(), 300);

                  myModal.hide();
                });
              }
            }
          });

          mainRow.appendChild(colDiv);
        });
      }
    }
  }

  // ==========================================
  // BAGIAN DETAIL LOWONGAN
  // ==========================================
  if (window.location.pathname.includes("detail-lowongan")) {
    const urlParams = new URLSearchParams(window.location.search);
    const judulParam = urlParams.get("judul");
    const divisiParam = urlParams.get("divisi");
    const lokasiParam = urlParams.get("lokasi");
    const tipeParam = urlParams.get("tipe");
    const jumlahParam = urlParams.get("jumlah");
    const deskripsiParam = urlParams.get("deskripsi");
    const gajiParam = urlParams.get("gaji");
    const tanggungJawabParam = urlParams.get("tanggungJawab");
    const kualifikasiParam = urlParams.get("kualifikasi");
    const statusParam = urlParams.get("status"); // Parameter status lowongan
    const tglTutupParam = urlParams.get("tglTutup");
    
    // Menangkap parameter dokumen & tahap seleksi
    const dokumenParam = urlParams.get("dokumen");
    const tahapParam = urlParams.get("tahap");

    if (judulParam) {
      const judulEl = document.getElementById("detailJudulLowongan");
      if (judulEl) {
        judulEl.innerText = judulParam;
        // Jika status ditutup, warna judul menjadi abu-abu
        if (statusParam && (statusParam.toLowerCase() === "ditutup" || statusParam.toLowerCase() === "tutup")) {
          judulEl.style.color = "#a9a9a9";
        } else {
          judulEl.style.color = "#000000";
        }
      }

      const divisiEl = document.getElementById("detailDivisiLowongan");
      if (divisiEl) divisiEl.innerText = "Divisi: " + (divisiParam || "Umum") + (jumlahParam ? ` | Jumlah Dibutuhkan: ${jumlahParam}` : "");

      const lokasiBadge = document.getElementById("badgeLokasiLowongan");
      if (lokasiBadge) lokasiBadge.innerText = lokasiParam || "Banjarmasin";

      const tipeBadge = document.getElementById("badgeTipeLowongan");
      if (tipeBadge) tipeBadge.innerText = tipeParam || "Full-time";

      const deskripsiEl = document.getElementById("detailDeskripsiText");
      if (deskripsiEl) deskripsiEl.innerText = deskripsiParam || "Tidak ada deskripsi.";

      const badgeGaji = document.getElementById("badgeGajiLowongan");
      if (badgeGaji) {
        badgeGaji.innerText = gajiParam ? gajiParam : "Gaji: Kompetitif";
      }

      // Penyesuaian Dinamis untuk Badge Status Lowongan di Halaman Detail HRD
      const badgeStatus = document.getElementById("badgeStatusLowongan");
      if (badgeStatus) {
        const currentStatus = statusParam || "Dibuka";
        badgeStatus.innerText = currentStatus;
        
        let badgeColorClass = "bg-success text-white";
        if (currentStatus.toLowerCase() === "ditutup" || currentStatus.toLowerCase() === "tutup") {
          badgeColorClass = "bg-danger text-white";
        } else if (currentStatus.toLowerCase() === "akan ditutup") {
          badgeColorClass = "bg-warning text-dark";
        }
        badgeStatus.className = `detail text-wrapper-6 px-3 py-1 fw-medium font-size-badge ${badgeColorClass} rounded-pill`;
      }

      const sisaWaktuBadge = document.getElementById("badgeSisaWaktu");
      if (sisaWaktuBadge && tglTutupParam && tglTutupParam !== "undefined") {
        sisaWaktuBadge.innerText = "Ditutup: " + tglTutupParam;
      }

      const listTanggungJawab = document.getElementById("listTanggungJawab");
      if (listTanggungJawab) {
        if (tanggungJawabParam) {
          const arrTJ = tanggungJawabParam.split("\n");
          listTanggungJawab.innerHTML = arrTJ.map(item => `<li class="mb-1">${item}</li>`).join("");
        } else {
          listTanggungJawab.innerHTML = `<li class="mb-1">Bertanggung jawab penuh terhadap kelancaran operasional pada posisi ${judulParam}.</li>`;
        }
      }

      const listKualifikasi = document.getElementById("listKualifikasi");
      if (listKualifikasi) {
        if (kualifikasiParam) {
          const arrKual = kualifikasiParam.split("\n");
          listKualifikasi.innerHTML = arrKual.map(item => `<li class="mb-1">${item}</li>`).join("");
        } else {
          listKualifikasi.innerHTML = `<li class="mb-1">Memiliki kualifikasi dan keahlian yang relevan di bidang ${divisiParam || 'terkait'}.</li>`;
        }
      }

      // Merender Dokumen yang Diminta (Hanya menampilkan yang statusnya dicentang)
      const containerDetailDokumen = document.getElementById("detailDokumenContainer");
      if (containerDetailDokumen && dokumenParam) {
        try {
          const arrDokumen = JSON.parse(decodeURIComponent(dokumenParam));
          const arrAktif = arrDokumen.filter(doc => doc.checked !== false);
          
          if (arrAktif.length > 0) {
            containerDetailDokumen.className = "row g-3 ps-0 list-unstyled mt-2";
            containerDetailDokumen.innerHTML = arrAktif.map(doc => `
              <div class="col-12 col-md-6">
                <div class="d-flex align-items-center justify-content-between p-3 bg-white border rounded-3 shadow-sm h-100" style="font-size: 13.5px;">
                  <span class="fw-semibold text-dark">${doc.nama}</span>
                  <span class="badge ${doc.ketentuan === 'Wajib' ? 'bg-danger' : 'bg-secondary'} px-2.5 py-1 rounded-pill" style="font-size: 11px;">${doc.ketentuan}</span>
                </div>
              </div>
            `).join("");
          } else {
            containerDetailDokumen.innerHTML = `<li class="text-muted small">Tidak ada dokumen khusus yang diminta.</li>`;
          }
        } catch (e) { console.log(e); }
      }

      // Merender Tahap Seleksi
      const containerDetailTahap = document.getElementById("detailTahapContainer");
      if (containerDetailTahap && tahapParam) {
        try {
          const arrTahap = JSON.parse(decodeURIComponent(tahapParam));
          if (arrTahap.length > 0) {
            containerDetailTahap.className = "d-flex flex-column gap-3 ps-0 list-unstyled mt-2";
            containerDetailTahap.innerHTML = arrTahap.map((tahap, idx) => `
              <li class="d-flex align-items-center justify-content-between p-3 bg-white border rounded-3 shadow-sm" style="font-size: 13.5px;">
                <span class="fw-bold text-primary">Tahap ${idx + 1}: ${tahap.nama}</span>
              </li>
            `).join("");
          } else {
            containerDetailTahap.innerHTML = `<li class="text-muted small">Belum ada tahap seleksi yang diatur.</li>`;
          }
        } catch (e) { console.log(e); }
      }
    }
  }
});

// ==========================================
// LOGIKA HALAMAN BUAT JADWAL SELEKSI
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const formBuatJadwal = document.getElementById("formBuatJadwal");

  if (formBuatJadwal) {
    formBuatJadwal.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("inputNamaPelamar") ? document.getElementById("inputNamaPelamar").value.trim() : "";
      const posisi = document.getElementById("inputPosisiPelamar") ? document.getElementById("inputPosisiPelamar").value.trim() : "";
      const jenisSeleksi = document.getElementById("inputJenisSeleksi") ? document.getElementById("inputJenisSeleksi").value : "Seleksi CV";
      const tanggal = document.getElementById("inputTanggal") ? document.getElementById("inputTanggal").value : "";
      const jamMulai = document.getElementById("inputJamMulai") ? document.getElementById("inputJamMulai").value : "";
      const jamSelesai = document.getElementById("inputJamSelesai") ? document.getElementById("inputJamSelesai").value : "";
      const metode = document.getElementById("inputMetode") ? document.getElementById("inputMetode").value : "Offline";
      const lokasiDetail = document.getElementById("inputLokasiDetail") ? document.getElementById("inputLokasiDetail").value.trim() : "";
      const catatan = document.getElementById("inputCatatan") ? document.getElementById("inputCatatan").value.trim() : "";

      if (!nama || !posisi || !tanggal || !jamMulai) {
        alert("Silakan lengkapi data pelamar, tanggal, dan jam mulai terlebih dahulu!");
        return;
      }

      const randomIdNum = Math.floor(10000 + Math.random() * 90000);
      const idPelamar = `GPS-2026-${randomIdNum}`;

      let formattedTanggal = tanggal;
      if (tanggal) {
        const dateObj = new Date(tanggal);
        const day = dateObj.getDate();
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
        const month = months[dateObj.getMonth()];
        formattedTanggal = `${day} ${month}`;
      }

      const jadwalBaru = {
        id: idPelamar,
        nama: nama,
        keterangan: `${jenisSeleksi} - ${posisi}`,
        tanggal: formattedTanggal,
        jam: jamMulai,
        jamSelesai: jamSelesai,
        metode: metode,
        lokasi: lokasiDetail,
        catatan: catatan
      };

      let daftarJadwal = JSON.parse(localStorage.getItem("daftarJadwal")) || [];
      daftarJadwal.push(jadwalBaru);
      localStorage.setItem("daftarJadwal", JSON.stringify(daftarJadwal));

      alert("Jadwal seleksi berhasil dibuat dan disimpan!");
      window.location.href = "kelola-jadwal.html";
    });
  }
});

// ==========================================
// LOGIKA HALAMAN DETAIL KARYAWAN BARU (FINAL FIX)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    let defaultKaryawan = [
        { id: "GPS-2026-00842", nama: "Budi Hartono", posisi: "IT Support", tglPenerimaan: "1 Agustus 2026", tglMulai: "10 Agustus 2026", status: "Lengkap", email: "budihartono@gmail.com", telepon: "0812-3456-7890", alamat: "Banjarmasin" },
        { id: "GPS-2026-00843", nama: "Rizky Ananda", posisi: "Marketing", tglPenerimaan: "3 Agustus 2026", tglMulai: "11 Agustus 2026", status: "Lengkap", email: "rizky@gmail.com", telepon: "0812-3456-7891", alamat: "Banjarmasin" },
        { id: "GPS-2026-00844", nama: "Siti Rahmawati", posisi: "Pajak", tglPenerimaan: "5 Agustus 2026", tglMulai: "15 Agustus 2026", status: "Lengkap", email: "siti@gmail.com", telepon: "0812-3456-7892", alamat: "Banjarbaru" },
        { id: "GPS-2026-00845", nama: "Dimas Pratama", posisi: "HRGA", tglPenerimaan: "8 Agustus 2026", tglMulai: "18 Agustus 2026", status: "Lengkap", email: "dimas@gmail.com", telepon: "0812-3456-7893", alamat: "Martapura" },
        { id: "GPS-2026-00846", nama: "Nadia Wijaya", posisi: "Accounting", tglPenerimaan: "12 Agustus 2026", tglMulai: "22 Agustus 2026", status: "Lengkap", email: "nadia@gmail.com", telepon: "0812-3456-7894", alamat: "Banjarmasin" },
        { id: "GPS-2026-00847", nama: "Ahmad Fauzi", posisi: "Finance Officer", tglPenerimaan: "15 Agustus 2026", tglMulai: "25 Agustus 2026", status: "Lengkap", email: "fauzi@gmail.com", telepon: "0812-3456-7895", alamat: "Banjarmasin" }
    ];

    if (!localStorage.getItem("daftarKaryawan")) {
        localStorage.setItem("daftarKaryawan", JSON.stringify(defaultKaryawan));
    }

    const elNama = document.getElementById("detailNama");
    if (elNama) {
        let daftarKaryawan = JSON.parse(localStorage.getItem("daftarKaryawan")) || defaultKaryawan;
        let karyawanIndex = localStorage.getItem("detailKaryawanIndex");

        if (karyawanIndex === null || !daftarKaryawan[karyawanIndex]) {
            karyawanIndex = 0;
        }

        let dataAktif = daftarKaryawan[karyawanIndex];

        document.getElementById("detailNama").value = dataAktif.nama || "";
        document.getElementById("detailEmail").value = dataAktif.email || "";
        document.getElementById("detailTelepon").value = dataAktif.telepon || "";
        document.getElementById("detailAlamat").value = dataAktif.alamat || "";
        document.getElementById("detailNoLamaran").value = dataAktif.id || "";
        document.getElementById("detailPosisi").value = dataAktif.posisi || "";
        document.getElementById("detailTglPenerimaan").value = dataAktif.tglPenerimaan || "";
        document.getElementById("detailTglMulai").value = dataAktif.tglMulai || "";
    }

    const btnTransfer = document.getElementById("btnTransfer");
    if (btnTransfer) {
        btnTransfer.addEventListener("click", function () {
            alert("Data karyawan berhasil ditransfer ke sistem utama!");
        });
    }
});

function lihatDokumen(jenisDokumen) {
    alert("Membuka dokumen " + jenisDokumen + " pelamar.");
}