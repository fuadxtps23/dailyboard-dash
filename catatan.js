// ============================================
// MODUL CATATAN
// Semua fungsi untuk mengelola catatan cepat.
// Penyimpanan data memakai modul storage.js.
// ============================================

import { simpanCatatan, bacaCatatan } from "./storage.js";

let daftarCatatan = []; // semua catatan

// Membaca catatan dari localStorage
export function muatCatatanDariStorage() {
  const data = bacaCatatan();
  if (data) {
    daftarCatatan = data;
  } else {
    daftarCatatan = [];
  }
}

// Menambah catatan baru
export function tambahCatatan(isi) {
  daftarCatatan.push({
    id: Date.now(),
    isi,
    tanggal: new Date().toLocaleDateString("id-ID"),
  });
  simpanCatatan(daftarCatatan);
  renderCatatan();
}

// Mengubah isi catatan berdasarkan id
export function editCatatan(id, isiBaru) {
  daftarCatatan = daftarCatatan.map((c) =>
    Number(c.id) === Number(id) ? { ...c, isi: isiBaru } : c
  );
  simpanCatatan(daftarCatatan);
  renderCatatan();
}

// Menghapus catatan berdasarkan id
export function hapusCatatan(id) {
  daftarCatatan = daftarCatatan.filter((c) => Number(c.id) !== Number(id));
  simpanCatatan(daftarCatatan);
  renderCatatan();
}

// Menampilkan semua catatan ke halaman
export function renderCatatan() {
  const container = document.getElementById("daftar-catatan");
  if (!container) return;
  container.innerHTML = ""; // kosongkan dulu

  daftarCatatan.forEach((catatan) => {
    // Satu kartu untuk satu catatan
    const div = document.createElement("div");
    div.className = "catatan-item";

    // Isi catatan
    const p = document.createElement("p");
    p.textContent = catatan.isi;

    // Tanggal dibuat
    const kecil = document.createElement("small");
    kecil.textContent = catatan.tanggal;

    // Klik dua kali = edit isi catatan
    p.addEventListener("dblclick", () => {
      const ta = document.createElement("textarea");
      ta.value = catatan.isi;
      p.replaceWith(ta);
      ta.focus();
      ta.addEventListener("blur", () => {
        if (ta.value.trim() === "") return renderCatatan();
        editCatatan(catatan.id, ta.value);
      });
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Enter") ta.blur();
      });
    });

    // Tombol hapus
    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";
    hapus.addEventListener("click", (e) => {
      e.stopPropagation();
      hapusCatatan(catatan.id);
    });

    div.append(p, kecil, hapus);
    container.appendChild(div);
  });
}
