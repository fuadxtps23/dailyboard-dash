// modul storage

// Simpan data apa pun ke localStorage (otomatis jadi teks JSON)
function simpanData(kunci, nilai) {
  localStorage.setItem(kunci, JSON.stringify(nilai));
}

// Baca data apa pun dari localStorage (teks JSON jadi array/objek lagi)
function bacaData(kunci) {
  const data = localStorage.getItem(kunci);
  if (data) return JSON.parse(data);
  return null;
}

// Data tugas
export function simpanTugas(data) {
  simpanData("daftarTugas", data);
}
export function bacaTugas() {
  return bacaData("daftarTugas");
}

// Data catatan
export function simpanCatatan(data) {
  simpanData("daftarCatatan", data);
}
export function bacaCatatan() {
  return bacaData("daftarCatatan");
}

// Tema (dark mode)
export function simpanTema(tema) {
  localStorage.setItem("tema", tema);
}
export function bacaTema() {
  return localStorage.getItem("tema");
}
