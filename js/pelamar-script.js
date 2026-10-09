// ==========================================
// SCRIPT UTAMA HALAMAN PELAMAR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Portal Pelamar PT Gagah Putera Satria siap dijalankan.");

    // Logika Formulir Pendaftaran Lamaran (Terhubung ke Backend Node.js)
    const formLamaran = document.getElementById("formPendaftaranPelamar");
    if (formLamaran) {
        formLamaran.addEventListener("submit", async function (e) {
            e.preventDefault();

            let namaPelamar = document.getElementById("inputNama") ? document.getElementById("inputNama").value : "Budi Hartono";
            let emailPelamar = document.getElementById("inputEmail") ? document.getElementById("inputEmail").value : "budi@example.com";
            let posisiDilamar = document.getElementById("selectPosisi") ? document.getElementById("selectPosisi").value : "IT Support";

            let lamaranBaru = {
                id: "GPS-2026-" + Math.floor(10000 + Math.random() * 90000),
                nama: namaPelamar,
                email: emailPelamar,
                posisi: posisiDilamar,
                tanggal: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
                status: "Menunggu Seleksi"
            };

            try {
                // Mengirim data ke backend Node.js (Port 3000)
                const response = await fetch('http://localhost:3000/api/lamar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(lamaranBaru)
                });

                const hasil = await response.json();

                if (hasil.sukses) {
                    console.log("Lamaran berhasil dikirim ke Server Node.js!");
                } else {
                    console.warn("Gagal menyimpan lamaran di server.");
                }
            } catch (error) {
                console.error("Kesalahan koneksi ke server backend:", error);
            }
        });
    }

    // Tangkap parameter posisi jika ada
    const urlParams = new URLSearchParams(window.location.search);
    const posisi = urlParams.get("posisi");

    if (posisi) {
        const titleElement = document.getElementById("detailJudulLowongan");
        if (titleElement) {
            titleElement.textContent = posisi;
        }

        const btnLamar = document.getElementById("btnLamarSekarang");
        if (btnLamar) {
            btnLamar.href = `form-lamaran-1.html?posisi=${encodeURIComponent(posisi)}`;
        }
    }

    // ==========================================
    // LOGIKA DINAMIS HALAMAN DETAIL LOWONGAN PELAMAR
    // ==========================================
    if (window.location.pathname.includes("detail-lowongan-pelamar")) {
        let judulParam = urlParams.get("judul");
        let divisiParam = urlParams.get("divisi");
        let lokasiParam = urlParams.get("lokasi");
        let tipeParam = urlParams.get("tipe");
        let jumlahParam = urlParams.get("jumlah");
        let deskripsiParam = urlParams.get("deskripsi");
        let gajiParam = urlParams.get("gaji");
        let tanggungJawabParam = urlParams.get("tanggungJawab");
        let kualifikasiParam = urlParams.get("kualifikasi");
        let statusParam = urlParams.get("status");
        let tglTutupParam = urlParams.get("tglTutup");
        let dokumenParam = urlParams.get("dokumen");
        let tahapParam = urlParams.get("tahap");

        // Ambil elemen target di DOM
        const headerTitleEl = document.getElementById("detailJudulLowongan");
        const divisiEl = document.getElementById("detailDivisiLowongan");
        const statusBadgeEl = document.getElementById("badgeStatusLowongan");
        const lokasiBadgeEl = document.getElementById("badgeLokasiLowongan");
        const tipeBadgeEl = document.getElementById("badgeTipeLowongan");
        const sisaWaktuEl = document.getElementById("badgeSisaWaktu");
        const gajiBadgeEl = document.getElementById("badgeGajiLowongan");
        const descEl = document.getElementById("detailDeskripsiText");
        const tjEl = document.getElementById("listTanggungJawab");
        const kualEl = document.getElementById("listKualifikasi");
        const listDokEl = document.getElementById("detailDokumenContainer");
        const listTahapEl = document.getElementById("detailTahapContainer");

        if (!judulParam) {
            judulParam = "Accounting & Finance";
            divisiParam = "Accounting";
            deskripsiParam = "Mengelola laporan keuangan seluruh unit bisnis.";
        }

        const finalStatus = statusParam || "Dibuka";

        if (headerTitleEl) {
            headerTitleEl.innerText = judulParam;
            if (finalStatus.toLowerCase() === "ditutup" || finalStatus.toLowerCase() === "tutup") {
                headerTitleEl.style.color = "#a9a9a9";
            } else {
                headerTitleEl.style.color = "#000000";
            }
        }

        if (divisiEl) {
            const divBersih = divisiParam ? divisiParam.replace("Divisi: ", "") : "Umum";
            divisiEl.innerText = `Divisi: ${divBersih} | Jumlah Dibutuhkan: ${jumlahParam || '1 orang'}`;
        }

        if (statusBadgeEl) {
            statusBadgeEl.innerText = finalStatus;
            statusBadgeEl.className = "badge px-3 py-1.5 rounded-pill fw-medium " + 
                (finalStatus.toLowerCase() === "ditutup" || finalStatus.toLowerCase() === "tutup" ? "bg-danger text-white" :
                 finalStatus.toLowerCase() === "akan ditutup" ? "bg-warning text-dark" : "bg-success text-white");
        }
        if (lokasiBadgeEl) lokasiBadgeEl.innerText = lokasiParam || "Banjarmasin";
        if (tipeBadgeEl) tipeBadgeEl.innerText = tipeParam || "Full-time";
        if (sisaWaktuEl) {
            sisaWaktuEl.innerText = tglTutupParam ? (tglTutupParam.startsWith("Tersisa") || tglTutupParam.startsWith("Ditutup") ? tglTutupParam : "Ditutup: " + tglTutupParam) : "Segera";
        }
        if (gajiBadgeEl) gajiBadgeEl.innerText = gajiParam || "Gaji: Kompetitif";

        if (descEl) descEl.innerText = deskripsiParam;

        if (tjEl) {
            const textTJ = tanggungJawabParam || "Menyusun dan mengelola pencatatan transaksi keuangan.\nMembuat laporan keuangan berkala secara akurat.";
            tjEl.innerHTML = textTJ.split("\n").map(item => `<li>${item}</li>`).join("");
        }

        if (kualEl) {
            const textKual = kualifikasiParam || "Pendidikan minimal S1 Jurusan Akuntansi/Keuangan.\nPengalaman minimal 1 tahun di bidangnya.\nMenguasai Microsoft Excel dan sistem akuntansi.";
            kualEl.innerHTML = textKual.split("\n").map(item => `<li>${item}</li>`).join("");
        }

        if (listDokEl) {
            let parsedDokumen = [];
            try {
                if (dokumenParam) {
                    parsedDokumen = typeof dokumenParam === 'string' ? JSON.parse(decodeURIComponent(dokumenParam)) : dokumenParam;
                }
            } catch (e) { parsedDokumen = []; }

            if (parsedDokumen.length === 0) {
                parsedDokumen = [
                    { nama: "CV / Resume", ketentuan: "Wajib" },
                    { nama: "Surat Lamaran", ketentuan: "Wajib" },
                    { nama: "Transkrip Nilai", ketentuan: "Wajib" },
                    { nama: "Pas Foto", ketentuan: "Opsional" }
                ];
            }

            listDokEl.innerHTML = parsedDokumen.map(doc => `
                <div class="col-12 col-md-6">
                    <div class="d-flex align-items-center justify-content-between p-3 bg-white border rounded-3 shadow-sm h-100" style="font-size: 13.5px;">
                        <span class="fw-semibold text-dark">${doc.nama}</span>
                        <span class="badge ${doc.ketentuan === 'Wajib' ? 'bg-danger' : 'bg-secondary'} px-2.5 py-1 rounded-pill" style="font-size: 11px; ${doc.ketentuan === 'Wajib' ? 'background-color: #ff3b30 !important;' : ''}">${doc.ketentuan}</span>
                    </div>
                </div>
            `).join("");
        }

        if (listTahapEl) {
            let parsedTahap = [];
            try {
                if (tahapParam) {
                    parsedTahap = typeof tahapParam === 'string' ? JSON.parse(decodeURIComponent(tahapParam)) : tahapParam;
                }
            } catch (e) { parsedTahap = []; }

            if (parsedTahap.length === 0) {
                parsedTahap = [
                    { nama: "Seleksi CV" },
                    { nama: "HR Call" },
                    { nama: "Interview I" }
                ];
            }

            listTahapEl.innerHTML = parsedTahap.map((tahap, idx) => `
                <div class="d-flex align-items-center justify-content-between p-3 bg-white border rounded-3 shadow-sm" style="font-size: 13.5px;">
                    <span class="fw-bold text-primary" style="color: #1677ff !important;">Tahap ${idx + 1}: ${tahap.nama}</span>
                </div>
            `).join("");
        }
    }

    // ==========================================
    // RENDER OTOMATIS LOWONGAN DI HALAMAN UTAMA
    // ==========================================
    const modalEl = document.getElementById('modalLowonganTutupPelamar');
    const modalInstance = modalEl ? new bootstrap.Modal(modalEl) : null;

    function bindCardTutupEvents() {
        document.querySelectorAll('.card-tutup').forEach(card => {
            card.style.cursor = "pointer";
            card.onclick = function(e) {
                e.preventDefault();
                if (modalInstance) {
                    modalInstance.show();
                }
            };
        });
    }

    bindCardTutupEvents();

    let daftarLowongan = JSON.parse(localStorage.getItem("daftarLowongan")) || [];

    if (daftarLowongan.length > 0) {
        const rowGrid = document.getElementById('pelamarLowonganContainer');
        if (rowGrid) {
            rowGrid.innerHTML = daftarLowongan.map(item => {
                const rawStatus = item.status || "Dibuka";
                const statusLower = rawStatus.toLowerCase();
                let badgeClass = "badge-dibuka";
                let badgeText = rawStatus;

                if (statusLower.includes("akan")) {
                    badgeClass = "badge-akan-tutup";
                    badgeText = "Akan ditutup";
                } else if (statusLower.includes("tutup") || statusLower.includes("ditutup")) {
                    badgeClass = "badge-tutup";
                    badgeText = "Tutup";
                } else {
                    badgeClass = "badge-dibuka";
                    badgeText = "Dibuka";
                }

                const detailUrl = `detail-lowongan-pelamar.html?judul=${encodeURIComponent(item.judul)}&divisi=${encodeURIComponent(item.departemen || item.divisi || 'Umum')}&lokasi=${encodeURIComponent(item.lokasi || 'Banjarmasin')}&tipe=${encodeURIComponent(item.tipe || 'Full-time')}&jumlah=${encodeURIComponent(item.jumlah || '1 orang')}&deskripsi=${encodeURIComponent(item.deskripsi || '')}&gaji=${encodeURIComponent(item.gaji || 'Gaji: Kompetitif')}&tanggungJawab=${encodeURIComponent(item.tanggungJawab || '')}&kualifikasi=${encodeURIComponent(item.kualifikasi || '')}&status=${encodeURIComponent(badgeText)}&tglTutup=${encodeURIComponent(item.tglTutup || '')}&dokumen=${encodeURIComponent(JSON.stringify(item.dokumen || []))}&tahap=${encodeURIComponent(JSON.stringify(item.tahap || []))}`;
                const lamarUrl = `form-lamaran-1.html?posisi=${encodeURIComponent(item.judul)}`;

                if (badgeText === "Tutup") {
                    return `
                        <div class="col-12 col-md-6">
                            <div class="card card-lowongan h-100 p-3 border-0 shadow-sm rounded-3 bg-white d-flex flex-column justify-content-between card-tutup" style="cursor: pointer;">
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <h3 class="fs-6 fw-bold mb-0" style="color: #a9a9a9;">${item.judul}</h3>
                                        <span class="badge ${badgeClass} rounded-pill px-3 py-1 fw-medium">${badgeText}</span>
                                    </div>
                                    <div class="text-muted small mb-2" style="font-size: 12px;">${item.lokasi || 'Banjarmasin'} - ${item.tipe || 'Full time'}</div>
                                    <p class="text-secondary small mb-0 lh-sm" style="font-size: 13px;">${item.deskripsi || ''}</p>
                                </div>
                                <div class="d-flex gap-2 align-items-center w-100 pt-2 border-top border-light-subtle">
                                    <button class="btn btn-secondary flex-grow-1 py-2 rounded-2 btn-sm text-secondary bg-secondary-subtle border-0 disabled" style="font-size: 13px;">Lamar sekarang</button>
                                    <button class="btn btn-secondary flex-grow-1 py-2 rounded-2 btn-sm text-secondary bg-secondary-subtle border-0 disabled" style="font-size: 13px;">Detail</button>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="col-12 col-md-6">
                            <div class="card card-lowongan h-100 p-3 border-0 shadow-sm rounded-3 bg-white d-flex flex-column justify-content-between">
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <h3 class="fs-6 fw-bold text-dark mb-0">${item.judul}</h3>
                                        <span class="badge ${badgeClass} rounded-pill px-3 py-1 fw-medium">${badgeText}</span>
                                    </div>
                                    <div class="text-muted small mb-2" style="font-size: 12px;">${item.lokasi || 'Banjarmasin'} - ${item.tipe || 'Full time'}</div>
                                    <p class="text-secondary small mb-0 lh-sm" style="font-size: 13px;">${item.deskripsi || ''}</p>
                                </div>
                                <div class="d-flex gap-2 align-items-center w-100 pt-2 border-top border-light-subtle">
                                    <a href="${lamarUrl}" class="btn btn-primary flex-grow-1 py-2 rounded-2 btn-sm text-decoration-none text-center text-white" style="font-size: 13px; background-color: #1677ff; border: none;">Lamar sekarang</a>
                                    <a href="${detailUrl}" class="btn btn-primary flex-grow-1 py-2 rounded-2 btn-sm text-decoration-none text-center text-white" style="font-size: 13px; background-color: #1677ff; border: none;">Detail</a>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }).join("");
            
            // Panggil ulang fungsi bind event untuk data lokal
            bindCardTutupEvents();
        }
    }

    // ==========================================
    // TAMBAHAN: DELEGASI GLOBAL KARTU TUTUP (MENANGKAP KARTU STATIS & DINAMIS)
    // ==========================================
    document.addEventListener("click", function (e) {
        const targetCard = e.target.closest('.card-tutup');
        if (targetCard) {
            e.preventDefault();
            const modalTarget = document.getElementById('modalLowonganTutupPelamar');
            if (modalTarget) {
                const bootstrapModal = new bootstrap.Modal(modalTarget);
                bootstrapModal.show();
            } else {
                alert("Maaf, lowongan ini sudah ditutup dan tidak dapat menerima lamaran baru.");
            }
        }
    });

    // Logika Formulir Keluarga (Step 2)
    const formKeluarga = document.getElementById("formKeluarga");
    if (formKeluarga) {
        formKeluarga.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!formKeluarga.checkValidity()) {
                e.stopPropagation();
                formKeluarga.classList.add('was-validated');
                return;
            }
            window.location.href = "form-lamaran-3.html";
        });
    }

    // Navigasi form submit ke step berikutnya (Step 4 dari Step 3)
    const formPendidikan = document.getElementById("formPendidikan");
    if (formPendidikan) {
        formPendidikan.addEventListener("submit", function (e) {
            e.preventDefault(); 
            window.location.href = "form-lamaran-4.html";
        });
    }

    // Logika Pengiriman Akhir di Step 5 (Kirim ke Backend Node.js)
    document.addEventListener("click", async function (e) {
        if (e.target && e.target.textContent.includes("Ya, Kirim Sekarang")) {
            let lamaranAkhir = {
                id: "GPS-2026-" + Math.floor(10000 + Math.random() * 90000),
                nama: "Budi Hartono",
                posisi: "IT Support",
                tanggal: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
                status: "Menunggu Seleksi"
            };

            try {
                await fetch('http://localhost:3000/api/lamar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(lamaranAkhir)
                });
                console.log("Data lamaran step 5 berhasil terkirim ke server Node.js!");
            } catch (err) {
                console.error("Gagal mengirim ke server:", err);
            }
        }
    });
});

// ==========================================
// FUNGSI GLOBAL DINAMIS (Opsional Step 3)
// ==========================================
window.tambahFieldPendidikan = function(containerId, placeholderText) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const itemWrapper = document.createElement('div');
    itemWrapper.className = 'p-3 bg-light rounded-2 border position-relative mt-2 shadow-sm';
    
    itemWrapper.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-semibold text-primary" style="font-size: 11.5px;">Entri Baru</span>
            <button type="button" class="btn btn-outline-danger btn-sm py-0 px-2 rounded-2" onclick="this.closest('.p-3').remove()" style="font-size: 11px;">
                <i class="bi bi-trash"></i> Hapus
            </button>
        </div>
        <div class="vstack gap-2">
            <div>
                <label class="form-label text-dark mb-1" style="font-size: 11.5px;">${placeholderText}</label>
                <input type="text" class="form-control form-control-sm rounded-2" placeholder="Masukkan ${placeholderText.toLowerCase()}" required />
            </div>
            <div>
                <label class="form-label text-dark mb-1" style="font-size: 11.5px;">Tahun / Periode</label>
                <input type="text" class="form-control form-control-sm rounded-2" placeholder="Contoh: 2022 - 2025" />
            </div>
        </div>
    `;
    
    container.appendChild(itemWrapper);
};

document.addEventListener("DOMContentLoaded", function () {
    const btnTambah = document.getElementById("btnTambahPekerjaan");
    const container = document.getElementById("dynamicPekerjaanContainer");

    if (btnTambah && container) {
        btnTambah.addEventListener("click", function () {
            const wrapper = document.createElement("div");
            wrapper.className = "card border bg-white p-3 rounded-3 shadow-sm mb-3 position-relative";
            
            wrapper.innerHTML = `
                <button type="button" class="btn-close position-absolute top-0 end-0 m-3 remove-field" aria-label="Close"></button>
                <h6 class="fw-bold text-primary mb-3">Riwayat Pekerjaan Tambahan</h6>
                <div class="mb-2">
                    <label class="form-label small fw-medium">Nama Perusahaan</label>
                    <input type="text" class="form-control form-control-sm" placeholder="Nama perusahaan sebelumnya">
                </div>
                <div class="mb-2">
                    <label class="form-label small fw-medium">Jabatan</label>
                    <input type="text" class="form-control form-control-sm" placeholder="Posisi / Jabatan">
                </div>
                <div class="mb-2">
                    <label class="form-label small fw-medium">Periode (Dari - Sampai)</label>
                    <input type="text" class="form-control form-control-sm" placeholder="Contoh: 2021 - 2022">
                </div>
            `;

            wrapper.querySelector(".remove-field").addEventListener("click", function () {
                wrapper.remove();
            });

            container.appendChild(wrapper);
        });
    }
});