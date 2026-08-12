# DailyBoard

**DailyBoard — Dashboard Produktivitas Harian**

Proyek akhir JavaScript satu semester (16 minggu) yang dibangun dengan JavaScript murni (vanilla JS) tanpa framework, dipadukan dengan HTML dan CSS.

Fitur utama: **daftar tugas (to-do list)**, **catatan cepat (notes)**, **kutipan harian**, **widget cuaca**, **dark mode**, **pencarian** dan **drag & drop**.

## Fitur

| Fase | Minggu | Fitur |
| ---- | ------ | ----- |
| 1 | 1–3 | Setup proyek, seleksi & manipulasi DOM, event handling |
| 2 | 4–6 | To-do list interaktif: tambah, hapus, tandai selesai, filter |
| 3 | 7–9 | Penyimpanan ke `localStorage`, catatan cepat, edit & validasi input |
| 4 | 10–12 | Integrasi API (`fetch`, `async/await`, `Promise.all`): kutipan & cuaca |
| 5 | 13–14 | Drag & drop urutan tugas, dark mode, pencarian real-time |
| 6 | 15–16 | Refactoring ES Modules, debounce, responsivitas, deployment |

### Detail fitur

- **Daftar tugas**
  - Tambah tugas lewat input + tombol **Tambah Tugas**
  - Klik satu kali nama tugas → tandai selesai (coret)
  - Klik dua kali nama tugas → edit nama
  - Tombol **Hapus** di setiap item
  - Filter: **Semua**, **Selesai**, **Belum Selesai**
  - **Drag & drop** untuk mengubah urutan prioritas, tersimpan ke `localStorage`
  - **Pencarian** tugas secara real-time (dengan `debounce` 300 ms)
- **Catatan cepat**
  - Textarea untuk menambah catatan + tombol **Simpan Catatan**
  - Klik dua kali isi catatan → edit
  - Tombol **Hapus** per kartu catatan
- **Kutipan Hari Ini** — diambil dari `https://dummyjson.com/quotes/random`
- **Informasi Cuaca** — diambil dari OpenWeatherMap (`q=<kota>&units=metric`)
- **Dark mode** — tombol di header, preferensi tersimpan di `localStorage` (kunci `tema`)
- **Responsif** — media query di `style.css` untuk tablet & desktop

## Cara Pakai

1. Karena proyek ini menggunakan **ES Modules** dan `fetch` ke API eksternal, jalankan lewat server lokal (tidak bisa langsung dengan membuka file `file://`):

   ```bash
   # di folder proyek
   python3 -m http.server 8080
   ```

2. Buka `http://localhost:8080` di browser (versi online: GitHub Pages — lihat bagian Deployment).
3. Tambahkan tugas/catatan, coba filter, edit, hapus, seret-urutan tugas, dan nyalakan dark mode.

## Struktur File

```
dailyboard/
├── index.html      # Halaman utama (header, main#app, footer, toggle tema)
├── matdesign3.css  # Tema Material Design 3 (diunduh/disalin)
├── style.css       # Penyesuaian layout, drag & drop, dark mode, responsivitas
├── script.js       # Entry point (membangun UI, event, Fase 5/6)
├── tugas.js        # Modul manajemen tugas (CRUD, filter, drag-drop)
├── catatan.js      # Modul catatan cepat (CRUD)
├── api.js          # Modul API (kutipan, cuaca, Promise.all)
├── storage.js      # Modul penyimpanan localStorage (tugas, catatan, tema)
└── README.md       # Dokumentasi ini
```

## Teknologi

- HTML5 + CSS3 (Material Design 3 via `matdesign3.css`)
- JavaScript murni/vanilla (ES Modules: `script.js`, `tugas.js`, `catatan.js`, `api.js`, `storage.js`)
- `localStorage` untuk persistensi data tugas, catatan, dan tema
- `fetch` + `async/await` + `Promise.all` untuk integrasi API

## Test Manual (Fase 6, Minggu 15)

Checklist pengujian:

- [ ] Tambah tugas → muncul di daftar
- [ ] Hapus tugas → hilang dari daftar
- [ ] Edit tugas (klik dua kali) → nama berubah
- [ ] Klik nama tugas → status selesai (coret)
- [ ] Filter Semua/Selesai/Belum → daftar berubah sesuai status
- [ ] Drag & drop → urutan berubah & tersimpan setelah reload
- [ ] Pencarian mengetik → hasil tersaring real-time
- [ ] Dark mode → berubah & tetap aktif setelah reload
- [ ] Catatan: tambah, edit, hapus
- [ ] Kutipan & cuaca tampil (atau pesan error jika gagal)
- [ ] Tidak ada error di console browser

## Deployment

### GitHub Pages

1. Buat repository di GitHub (contoh nama: `dailyboard`).
2. Ubah nama branch menjadi `main` dan push:

   ```bash
   git branch -m main
   git remote add origin https://github.com/<username>/<nama-repo>.git
   git push -u origin main
   ```

3. Aktifkan GitHub Pages: **Settings → Pages → Source → Deploy from a branch → main** (folder `/root`).
4. Aplikasi bisa diakses di `https://<username>.github.io/<nama-repo>/`.

### Netlify

Drag-and-drop folder proyek ke https://app.netlify.com/drop.