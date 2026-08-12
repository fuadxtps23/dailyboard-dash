// ============================================
// script.js — MODUL UTAMA (entry point)
// Membangun seluruh tampilan halaman lewat JS
// dan menghubungkan semua modul.
// ============================================

// Mengambil fungsi yang dibutuhkan dari modul lain
import {
  muatDariStorage,
  tambahTugas,
  validasiInput,
  renderTugas,
  renderTugasDariList,
  urutkanTugas,
  cariTugas,
} from "./tugas.js";
import {
  muatCatatanDariStorage,
  tambahCatatan,
  renderCatatan,
} from "./catatan.js";
import { muatSemuaWidget, ambilCuaca } from "./api.js";
import { simpanTema, bacaTema } from "./storage.js";

const app = document.getElementById("app");

// ===== FASE 1, Minggu 2: Membuat elemen halaman lewat JS =====

// Teks status loading
const status = document.createElement("p");
status.id = "status";
status.textContent = "Memuat data...";
app.appendChild(status);

// Judul
const judul = document.createElement("h2");
judul.textContent = "Selamat datang di DailyBoard!";
app.appendChild(judul);

// 3 section utama: Tugas, Catatan, Cuaca
const tugasSection = document.createElement("section");
tugasSection.id = "tugas";
tugasSection.className = "surface-container-low large-round large-padding";

const catatanSection = document.createElement("section");
catatanSection.id = "catatan";
catatanSection.className = "surface-container-low large-round large-padding";

const cuacaSection = document.createElement("section");
cuacaSection.id = "cuaca";
cuacaSection.className = "surface-container-low large-round large-padding";

app.append(tugasSection, catatanSection, cuacaSection);

// ===== FASE 1, Minggu 3: Bagian input & tombol tambah tugas =====
const titleTugas = document.createElement("h3");
titleTugas.textContent = "Daftar Tugas";
tugasSection.appendChild(titleTugas);

const inputTugas = document.createElement("input");
inputTugas.type = "text";
inputTugas.placeholder = "Masukkan nama tugas...";

const tombolTambah = document.createElement("button");
tombolTambah.textContent = "Tambah Tugas";

tugasSection.append(inputTugas, tombolTambah);

// Saat tombol Tambah diklik: cek input, lalu tambah tugas
tombolTambah.addEventListener("click", () => {
  if (!validasiInput(inputTugas.value)) return;
  tambahTugas(inputTugas.value);
  inputTugas.value = ""; // kosongkan input lagi
});

// ===== FASE 5, Minggu 14: Pencarian tugas =====
const inputCari = document.createElement("input");
inputCari.type = "search";
inputCari.id = "cari-tugas";
inputCari.placeholder = "Cari tugas...";
tugasSection.appendChild(inputCari);

// FASE 6, Minggu 16: debounce agar tidak memproses setiap ketikan
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const cari = debounce((kata) => {
  renderTugasDariList(cariTugas(kata));
}, 300);

inputCari.addEventListener("input", (e) => {
  cari(e.target.value.trim().toLowerCase());
});

// ===== FASE 2, Minggu 6: Tombol filter =====
const filterContainer = document.createElement("div");
filterContainer.id = "filter-container";

const btnSemua = document.createElement("button");
btnSemua.textContent = "Semua";

const btnSelesai = document.createElement("button");
btnSelesai.textContent = "Selesai";

const btnBelum = document.createElement("button");
btnBelum.textContent = "Belum Selesai";

filterContainer.append(btnSemua, btnSelesai, btnBelum);

// Tempat daftar tugas akan dirender
const daftar_tugas = document.createElement("ul");
daftar_tugas.id = "daftar-tugas";
daftar_tugas.className = "list border";

tugasSection.append(filterContainer, daftar_tugas);

// Menandai tombol filter yang sedang aktif
function tampilFilterAktif(filter) {
  btnSemua.className = filter === "semua" ? "active" : "";
  btnSelesai.className = filter === "selesai" ? "active" : "";
  btnBelum.className = filter === "belum" ? "active" : "";
}

btnSemua.addEventListener("click", () => {
  renderTugas("semua");
  tampilFilterAktif("semua");
});

btnSelesai.addEventListener("click", () => {
  renderTugas("selesai");
  tampilFilterAktif("selesai");
});

btnBelum.addEventListener("click", () => {
  renderTugas("belum");
  tampilFilterAktif("belum");
});

// ===== FASE 5, Minggu 13: Drag & Drop untuk urutan tugas =====
// Saat drag lewat item lain, tandai item itu sebagai tujuan
daftar_tugas.addEventListener("dragover", (e) => {
  e.preventDefault();
  const item = e.target.closest(".tugas-item");
  if (!item) return;
  document
    .querySelectorAll(".tujuan-drop")
    .forEach((el) => el.classList.remove("tujuan-drop"));
  item.classList.add("tujuan-drop");
});

// Saat item dijatuhkan, ubah urutannya
daftar_tugas.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const item = e.target.closest(".tugas-item");
  document
    .querySelectorAll(".tujuan-drop")
    .forEach((el) => el.classList.remove("tujuan-drop"));
  if (item) urutkanTugas(id, item.dataset.id);
});

// ===== FASE 3, Minggu 8: Bagian catatan cepat =====
const titleCatatan = document.createElement("h3");
titleCatatan.textContent = "Catatan Cepat";
catatanSection.appendChild(titleCatatan);

const formCatatan = document.createElement("form");
formCatatan.id = "form-catatan";

const inputCatatan = document.createElement("textarea");
inputCatatan.id = "input-catatan";
inputCatatan.placeholder = "Tulis catatan...";

const btnSimpanCatatan = document.createElement("button");
btnSimpanCatatan.type = "submit";
btnSimpanCatatan.textContent = "Simpan Catatan";

formCatatan.append(inputCatatan, btnSimpanCatatan);

const daftarCatatanContainer = document.createElement("div");
daftarCatatanContainer.id = "daftar-catatan";

catatanSection.append(formCatatan, daftarCatatanContainer);

// Saat form catatan dikirim: cek input, lalu tambah catatan
formCatatan.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validasiInput(inputCatatan.value)) return;
  tambahCatatan(inputCatatan.value);
  inputCatatan.value = "";
});

// ===== FASE 4, Minggu 10: Widget kutipan hari ini =====
const kutipanContainer = document.createElement("div");
kutipanContainer.id = "kutipan-container";
kutipanContainer.className = "surface-container-low large-round large-padding";

const titleKutipan = document.createElement("h3");
titleKutipan.textContent = "Kutipan Hari Ini";

const textKutipan = document.createElement("blockquote");
textKutipan.id = "kutipan-harian";
textKutipan.textContent = "Sedang mengambil kutipan...";

kutipanContainer.append(titleKutipan, textKutipan);
app.insertBefore(kutipanContainer, tugasSection);

// ===== FASE 4, Minggu 11: Widget cuaca =====
const titleCuaca = document.createElement("h3");
titleCuaca.textContent = "Informasi Cuaca";

const inputKota = document.createElement("input");
inputKota.type = "text";
inputKota.id = "input-kota";
inputKota.placeholder = "Masukkan nama kota (misal: Jakarta)...";

const btnCariCuaca = document.createElement("button");
btnCariCuaca.textContent = "Cari Cuaca";

const infoCuaca = document.createElement("div");
infoCuaca.id = "info-cuaca";

cuacaSection.append(titleCuaca, inputKota, btnCariCuaca, infoCuaca);

btnCariCuaca.addEventListener("click", () => {
  const kota = inputKota.value.trim();
  if (kota !== "") ambilCuaca(kota);
});

// ===== FASE 5, Minggu 14: Dark mode =====
function terapkanTema(tema) {
  if (tema === "gelap") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  const btn = document.getElementById("toggle-tema");
  if (tema === "gelap") {
    btn.textContent = "☀️ Mode Terang";
  } else {
    btn.textContent = "🌙 Mode Gelap";
  }
}

document.getElementById("toggle-tema").addEventListener("click", () => {
  const gelap = document.body.classList.contains("dark");
  if (gelap) {
    simpanTema("terang");
    terapkanTema("terang");
  } else {
    simpanTema("gelap");
    terapkanTema("gelap");
  }
});

// ===== Menjalankan aplikasi saat halaman selesai dimuat =====
window.addEventListener("DOMContentLoaded", () => {
  muatDariStorage(); // baca tugas dari localStorage
  muatCatatanDariStorage(); // baca catatan dari localStorage
  renderTugas("semua"); // tampilkan daftar tugas
  tampilFilterAktif("semua");
  renderCatatan(); // tampilkan catatan
  muatSemuaWidget(); // muat kutipan + cuaca
  // Terapkan tema yang tersimpan (default terang)
  const temaTersimpan = bacaTema();
  terapkanTema(temaTersimpan === "gelap" ? "gelap" : "terang");
});
