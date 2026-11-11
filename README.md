# 🧺 WashFlow - Sistem Manajemen & Kasir Laundry Digital

**WashFlow** adalah aplikasi web manajemen kasir dan pelacakan status laundry berbasis React yang dirancang dengan arsitektur *Clean Code*, antarmuka modern, dan alur kerja bisnis riil.

Aplikasi ini memisahkan logika utilitas, komponen UI, dan data awal untuk memastikan keterbacaan serta pemeliharaan kode yang optimal.

---

## 🚀 Fitur Utama

- **Dashboard & Statistik Real-Time:** Menampilkan ringkasan pesanan aktif, pesanan siap diambil, dan total pendapatan otomatis (hanya menghitung transaksi yang telah *Selesai* dan *Lunas*).
- **Manajemen Status Ganda:**
  - **Status Pengerjaan:** *Dicuci* ➔ *Disetrika* ➔ *Selesai*.
  - **Status Pembayaran:** *Belum Lunas* vs *Lunas* (dengan validasi konfirmasi pembayaran).
- **Sistem Soft-Delete (Arsip Riwayat):** Pesanan yang dibatalkan akan dihapus permanen, sedangkan pesanan yang telah selesai dan lunas diarsipkan ke halaman **Riwayat** tanpa merusak laporan keuangan.
- **Pencarian Fleksibel (Lacak Resi/Nama):** Fitur pencarian multi-parameter yang memungkinkan pelacakan berdasarkan Nomor Resi (`TRX-XXXX`) maupun Nama Pelanggan.
- **Validasi Input Ketat (Regex):**
  - Input nama pelanggan dibatasi hanya huruf dan spasi.
  - Batas maksimum berat cucian sebesar 100 Kg untuk mencegah *human error*.
- **Routing Modular:** Navigasi antarhalaman tanpa *reload* memanfaatkan `react-router-dom`.

---

## 🛠️ Tech Stack & Utilities

- **Framework & Core:** React (Vite)
- **Routing:** `react-router-dom`
- **UI & Iconography:** CSS Modern (Plus Jakarta Sans, Flexbox/Grid, Animations), `lucide-react`
- **Architecture:** 
  - `src/utils/formatters.js` - Helper format mata uang Rupiah (`Intl.NumberFormat`).
  - `src/utils/validators.js` - Fungsi validasi input form menggunakan Regex.
  - `src/utils/initialData.js` - Pemisahan state data awal.

---

## 📁 Struktur Proyek

```text
sistem-kasir-laundry/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── OrderCard.jsx
│   ├── pages/
│   │   ├── AddOrder.jsx
│   │   ├── History.jsx
│   │   ├── Home.jsx
│   │   └── TrackOrder.jsx
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── initialData.js
│   │   └── validators.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
