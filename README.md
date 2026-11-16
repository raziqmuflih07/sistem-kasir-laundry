# 🧺 Sistem Kasir Laundry (POS Pro)

Aplikasi web manajemen operasional kasir dan pelacakan cucian laundry berbasis **React (Vite)** yang dirancang dengan antarmuka modern, responsif, dan alur kerja bisnis riil. Proyek ini dilengkapi persistensi data lokal, validasi transaksi ketat, notifikasi interaktif, serta pelacakan pesanan berbasis *visual stepper*.

---

## 🚀 Fitur Utama

### 1. 📊 Dashboard & Metrik KPI Real-Time
- **Kartu Ringkasan Operasional:** Menghitung otomatis metrik bisnis secara dinamis:
  - **Pesanan Aktif:** Jumlah cucian yang sedang diproses (Dicuci, Disetrika, atau Siap Diambil).
  - **Siap Diambil:** Jumlah pesanan yang sudah selesai dikerjakan dan siap diserahkan ke pelanggan.
  - **Total Pendapatan (Lunas):** Akumulasi pendapatan kasir terverifikasi dari transaksi yang berstatus **LUNAS**.
- **Filter Status Cepat:** Filter pesanan berjalan berdasarkan kategori (*Semua*, *Dicuci*, *Disetrika*, *Siap Diambil*).
- **Pencarian Instan:** Mencari pesanan berjalan secara *real-time* berdasarkan Nama Pelanggan atau Kode Transaksi (`#TRX-XXXX`).

### 2. 🔄 Alur Kerja Pengerjaan 4 Tahap & Validasi Bisnis Ketat
Alur proses cucian dirancang berurutan sesuai SOP bisnis laundry sesungguhnya:
$$\text{Dicuci} \longrightarrow \text{Disetrika} \longrightarrow \text{Siap Diambil} \longrightarrow \text{Selesai}$$

- **Validasi Pelunasan & Pengambilan:**
  - Status pesanan **tidak dapat diubah langsung ke "Selesai"** jika belum mencapai status **"Siap Diambil"**.
  - Pesanan yang sudah siap diambil **wajib dilunasi terlebih dahulu** (`LUNAS`) sebelum kasir dapat menekan tombol **"Selesaikan Pesanan"**.
  - Jika pesanan belum lunas, sistem akan memunculkan peringatan proteksi kasir agar cucian tidak terbawa sebelum dibayar.
- **Konfirmasi Pembayaran Terpadu:** Tombol *Konfirmasi Lunas* langsung di kartu pesanan untuk mengubah status pembayaran pelanggan secara instan.

### 3. ➕ Form Tambah Pesanan & Live Receipt Preview
- **Pilihan Paket Layanan Berbasis Kartu:**
  - **Reguler** (Rp6.000/Kg — Estimasi 2 Hari)
  - **Ekspres** (Rp10.000/Kg — Estimasi 6 Jam)
  - **Kilat** (Rp15.000/Kg — Estimasi 3 Jam)
  - **Cuci Lipat** (Rp4.500/Kg — Estimasi 1 Hari)
- **Validasi Berat Cucian:** Input dibatasi minimal **0.1 Kg** dan maksimal **100 Kg** dengan pemisahan visual badge satuan (`Kg`) yang rapi agar tidak bertabrakan dengan panah *stepper* browser.
- **Pilihan Pembayaran Awal:** Toggle fleksibel antara *Belum Lunas* atau *Lunas Sekarang*.
- **Kolom Catatan Khusus:** Menyimpan instruksi penanganan cucian khusus (misal: "Pisahkan pakaian putih", "Parfum lavender ekstra").
- **Live Receipt Preview:** Ringkasan nota digital di sisi kanan yang mengalkulasi rincian biaya, tarif per kilogram, dan total tagihan secara langsung saat kasir mengisi formulir.

### 4. 🔍 Pelacakan Status Multi-Hasil & Visual Stepper
- **Pencarian Fleksibel Multi-Pesanan:** Menampilkan **seluruh transaksi** yang memiliki kecocokan nama pelanggan atau kode resi (tidak terbatas hanya 1 hasil).
- **Visual Stepper 4 Tahap:** Visualisasi progres pengerjaan cucian bertingkat dengan penanda centang pada tahap yang telah dilalui.
- **Rincian Transaksi Lengkap:** Menampilkan informasi layanan, berat cucian, tanggal masuk, total biaya, status pembayaran, dan kotak catatan khusus pelanggan.

### 5. 📜 Riwayat Transaksi Selesai
- Mengarsipkan seluruh pesanan yang telah selesai dan diambil oleh pelanggan ke dalam tabel terstruktur.
- Memuat rincian ID transaksi, nama pelanggan, tanggal transaksi, catatan khusus, jenis layanan & berat, total biaya, dan status pelunasan.

### 6. 🎨 Pengalaman Pengguna (UX) Modern
- **Persistensi LocalStorage:** Semua transaksi tersimpan otomatis di `localStorage` peramban, memastikan data aman dan tidak hilang saat halaman di-*refresh*.
- **Modal Dialog Pembatalan Kustom:** Pengganti konfirmasi bawaan browser dengan modal *backdrop blur* transparan dan tombol aksi yang jelas.
- **Toast Notification:** Notifikasi *slide-up* animasi otomatis saat transaksi baru berhasil dibuat, status diperbarui, pembayaran dikonfirmasi, atau pesanan dibatalkan.
- **Halaman Not Found (404 Error Page):** Halaman penanganan rute tidak terdaftar dengan desain *dark minimalist*, keterangan status kode, dan tombol kembali ke halaman sebelumnya.

---

## 📁 Struktur Direktori Proyek

```text
sistem-kasir-laundry/
├── public/
│   └── laundry_icon.svg           # Favicon & icon aplikasi
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Navigasi sticky, brand logo, badge count aktif
│   │   └── OrderCard.jsx          # Kartu pesanan berjalan, alur status, catatan
│   ├── pages/
│   │   ├── AddOrder.jsx           # Halaman pembuatan pesanan & nota live
│   │   ├── History.jsx            # Halaman tabel arsip transaksi selesai
│   │   ├── Home.jsx               # Dashboard utama, KPI summary, filter pesanan
│   │   ├── NotFound.jsx           # Halaman error 404 (dark theme)
│   │   └── TrackOrder.jsx         # Pelacakan multi-pesanan & visual stepper
│   ├── utils/
│   │   ├── formatters.js          # Utilitas format mata uang Rupiah aman
│   │   └── validators.js          # Utilitas validasi regex nama & batas berat
│   ├── App.jsx                    # State pusat, localStorage, modal, toast & routing
│   ├── index.css                  # Desain CSS kustom modern (Inter typography, grid/flex)
│   └── main.jsx                   # Entry point aplikasi React
├── index.html                     # Dokumen HTML utama
├── package.json                   # Dependensi & script proyek
├── vite.config.js                 # Konfigurasi Vite server & React plugin
└── README.md                      # Dokumentasi resmi proyek
```

---

## 🛠️ Tech Stack & Dependensi

| Kategori | Teknologi | Deskripsi |
|---|---|---|
| **Core Framework** | React 19 | Library utama antarmuka pengguna berbasis komponen |
| **Build Tool** | Vite 8 | Build tool modern dengan Hot Module Replacement (HMR) super cepat |
| **Routing** | React Router DOM v7 | Manajemen navigasi halaman SPA tanpa reload |
| **Icons** | Lucide React | Koleksi ikon SVG modern dan konsisten |
| **Styling** | Custom Modern CSS | Tipografi Inter, CSS Grid & Flexbox, gradients, micro-interactions |
| **Storage** | Web Storage API | `localStorage` untuk persistensi data transaksi di peramban |

---

## 💻 Panduan Instalasi & Menjalankan Proyek

### 1. Masuk ke Direktori Proyek
Buka terminal dan arahkan ke folder proyek:
```bash
cd C:\Praktikum-DPW\Web_Sistem_Kasir_Laundry\sistem-kasir-laundry
```

### 2. Instal Dependensi
Pastikan Node.js telah terpasang di komputer Anda, lalu jalankan:
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```

Server lokal akan berjalan dan dapat diakses melalui browser pada:
- **`http://localhost:5173`** atau **`http://127.0.0.1:5173`**

### 4. Build untuk Lingkungan Produksi
Untuk mengompilasi dan mengoptimasi aplikasi:
```bash
npm run build
```
Hasil kompilasi akan tersimpan di dalam folder `dist/`.

---

## 📋 Aturan Bisnis & Validasi Data

1. **Batas Berat Cucian:** Minimal 0.1 Kg dan Maksimal 100 Kg.
2. **Keteraturan Alur Status:** Transaksi harus berpindah secara runtut: `Dicuci` ➔ `Disetrika` ➔ `Siap Diambil` ➔ `Selesai`.
3. **Syarat Penyelesaian Pesanan:**
   - Status proses harus sudah mencapai `Siap Diambil`.
   - Status pembayaran wajib `LUNAS`.
4. **Pencegahan Error Data:** Input angka diformat dengan pengaman `Intl.NumberFormat` agar tahan terhadap nilai `undefined` maupun `NaN`.
