# DailyBoard

**DailyBoard — Dashboard Produktivitas Harian**

Proyek akhir JavaScript satu semester (16 minggu) yang dibangun dengan HTML dan CSS.

Fitur nya: **daftar tugas (to-do list)**, **catatan cepat (notes)**, **kutipan harian**, **widget cuaca**, **dark mode**, **pencarian** dan **drag & drop**.

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
  - Klik satu kali nama tugas → tandai selesai (strikethrough atau coret lah)
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

Tinggal buka saja github page repo ini

## Struktur File

```
dailyboard/
├── index.html      # Halaman utama (header, main#app, footer, toggle tema)
├── matdesign3.css  # Tema Material Design 3 (referensi ajah)
├── style.css       # Penyesuaian layout, drag & drop, dark mode, responsivitas
├── script.js       # Entry point (membangun UI, event, Fase 5/6)
├── tugas.js        # Modul manajemen tugas (CRUD, filter, drag-drop)
├── catatan.js      # Modul catatan cepat (CRUD)
├── api.js          # Modul API (kutipan, cuaca, Promise.all)
├── storage.js      # Modul penyimpanan localStorage (tugas, catatan, tema)
└── README.md       # Dokumentasi ini
```

## Teknologi (techonologia!)

- HTML + CSS
- JavaScript murni (ES Modules: `script.js`, `tugas.js`, `catatan.js`, `api.js`, `storage.js`)
- `localStorage` untuk ketetapan data tugas, catatan, dan tema
- `fetch` + `async/await` + `Promise.all` untuk integrasi API

## Deployment

### GitHub Pages

1. Buat repository di GitHub (contoh nama: `dailyboard`).
2. Ubah nama branch menjadi `main` dan push:

   ```bash
   git init
   git add .
   git branch -m main
   git remote add origin https://github.com/username/nama-repo.git
   git push -u origin main
   ```

3. Aktifkan GitHub Pages: **Settings → Pages → Source → Deploy from a branch → main** (folder `/root`).
4. Aplikasi bisa diakses di `https://<username>.github.io/<nama-repo>/`.
