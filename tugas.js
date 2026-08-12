// ============================================
// MODUL TUGAS
// Semua fungsi untuk mengelola daftar tugas.
// Penyimpanan data memakai modul storage.js.
// ============================================

import { simpanTugas, bacaTugas } from "./storage.js";

// Tugas awal yang muncul jika localStorage masih kosong
const dataAwal = [
  { id: 1, nama: "Belajar JavaScript", selesai: false },
  { id: 2, nama: "Olahraga Pagi", selesai: false },
];

// Data utama modul ini
let daftarTugas = []; // semua tugas
let filterAktif = "semua"; // filter yang sedang dipilih

// Membaca daftar tugas dari localStorage saat aplikasi dibuka
export function muatDariStorage() {
  const data = bacaTugas();
  if (data) {
    daftarTugas = data;
  } else {
    daftarTugas = [...dataAwal]; // kalau kosong, pakai data awal
    simpanTugas(daftarTugas);
  }
}

// Memeriksa input: tidak boleh kosong dan maksimal 100 huruf
export function validasiInput(nilai) {
  if (nilai.trim() === "") {
    alert("Input tidak boleh kosong!");
    return false;
  }
  if (nilai.length > 100) {
    alert("Input maksimal 100 karakter!");
    return false;
  }
  return true;
}

// Menambah tugas baru
export function tambahTugas(nama) {
  daftarTugas.push({ id: Date.now(), nama, selesai: false });
  simpanTugas(daftarTugas);
  renderTugas();
}

// Menghapus tugas berdasarkan id
export function hapusTugas(id) {
  daftarTugas = daftarTugas.filter((t) => Number(t.id) !== Number(id));
  simpanTugas(daftarTugas);
  renderTugas();
}

// Mengubah nama tugas berdasarkan id
export function editTugas(id, namaBaru) {
  daftarTugas = daftarTugas.map((t) =>
    Number(t.id) === Number(id) ? { ...t, nama: namaBaru } : t
  );
  simpanTugas(daftarTugas);
  renderTugas();
}

// Membalik status selesai (selesai jadi belum, dan sebaliknya)
export function toggleSelesai(id) {
  daftarTugas = daftarTugas.map((t) =>
    Number(t.id) === Number(id) ? { ...t, selesai: !t.selesai } : t
  );
  simpanTugas(daftarTugas);
  renderTugas();
}

// Mengambil daftar tugas sesuai filter yang sedang aktif
function filterTugas() {
  if (filterAktif === "selesai") return daftarTugas.filter((t) => t.selesai);
  if (filterAktif === "belum") return daftarTugas.filter((t) => !t.selesai);
  return daftarTugas;
}

// Mencari tugas berdasarkan kata kunci (untuk fitur pencarian)
export function cariTugas(kata) {
  return filterTugas().filter((t) => t.nama.toLowerCase().includes(kata));
}

// Mengubah urutan tugas setelah drag & drop
export function urutkanTugas(idPindah, idTujuan) {
  const a = daftarTugas.findIndex((t) => Number(t.id) === Number(idPindah));
  const b = daftarTugas.findIndex((t) => Number(t.id) === Number(idTujuan));
  if (a === -1 || b === -1 || a === b) return;
  const item = daftarTugas.splice(a, 1)[0]; // ambil tugas yang dipindah
  daftarTugas.splice(b, 0, item); // letakkan di posisi tujuan
  simpanTugas(daftarTugas);
  renderTugas();
}

// Fungsi inti: menampilkan sebuah daftar tugas ke halaman
function tampilkan(listTugas) {
  const list = document.getElementById("daftar-tugas");
  if (!list) return;
  list.innerHTML = ""; // kosongkan daftar dulu

  listTugas.forEach((tugas) => {
    // Satu baris <li> untuk satu tugas
    const li = document.createElement("li");
    li.className = "tugas-item";
    li.dataset.id = tugas.id;
    li.draggable = true; // supaya bisa di-drag

    // Tanda "≡" sebagai pegangan drag
    const grip = document.createElement("span");
    grip.className = "drag-handle";
    grip.textContent = "≡";

    // Teks nama tugas
    const span = document.createElement("span");
    span.className = "max";
    span.textContent = tugas.nama;
    span.style.textDecoration = tugas.selesai ? "line-through" : "none";

    // Klik sekali = tandai selesai
    span.addEventListener("click", () => toggleSelesai(tugas.id));

    // Klik dua kali = edit nama tugas
    span.addEventListener("dblclick", () => {
      const inp = document.createElement("input");
      inp.type = "text";
      inp.value = tugas.nama;
      span.replaceWith(inp);
      inp.focus();
      inp.addEventListener("blur", () => {
        if (!validasiInput(inp.value)) return renderTugas();
        editTugas(tugas.id, inp.value);
      });
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") inp.blur();
      });
    });

    // Tombol hapus
    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";
    hapus.addEventListener("click", (e) => {
      e.stopPropagation();
      hapusTugas(tugas.id);
    });

    // Efek saat item sedang di-drag
    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", String(tugas.id));
      li.classList.add("menyeret");
    });
    li.addEventListener("dragend", () => li.classList.remove("menyeret"));

    li.append(grip, span, hapus);
    list.appendChild(li);
  });
}

// Menampilkan tugas sesuai filter aktif (dipanggil CRUD & tombol filter)
export function renderTugas(filter = filterAktif) {
  filterAktif = filter;
  tampilkan(filterTugas());
}

// Menampilkan hasil pencarian (list dari cariTugas)
export function renderTugasDariList(listTugas) {
  tampilkan(listTugas);
}
