// modul API buat cuaca

// API KEY OpenWeatherMap untuk widget cuaca
const API_KUNCI = "APIKEY_OPENWEATHER"; // dont steal pls

// Mengambil kutipan acak dari API dummyjson
export async function ambilKutipan() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error("Gagal mengambil data kutipan");
    const data = await res.json();
    const el = document.getElementById("kutipan-harian");
    if (el) el.textContent = `"${data.quote}" — ${data.author}`;
  } catch (error) {
    console.error("Error kutipan:", error);
    const el = document.getElementById("kutipan-harian");
    if (el) el.textContent = "Gagal memuat kutipan harian.";
  }
}

// Mengambil cuaca suatu kota dari OpenWeatherMap
export async function ambilCuaca(kota) {
  const display = document.getElementById("info-cuaca");
  if (!display) return;
  display.textContent = "Memuat data cuaca...";

  try {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      kota +
      "&units=metric&appid=" +
      API_KUNCI;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kota tidak ditemukan atau API Key belum valid.");
    const data = await res.json();

    display.innerHTML = "";
    const nama = document.createElement("p");
    nama.innerHTML = `<strong>${data.name}</strong>: ${data.main.temp}°C`;
    const desk = document.createElement("p");
    desk.textContent = data.weather[0].description;
    display.append(nama, desk);
  } catch (error) {
    display.textContent = error.message;
  }
}

// Memuat semua widget sekaligus (kutipan + cuaca Jakarta) dengan Promise.all
export async function muatSemuaWidget() {
  const status = document.getElementById("status");
  if (!status) return;
  status.textContent = "Memuat data widget...";

  try {
    await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);
    status.textContent = "Data berhasil dimuat sepenuhnya!";
  } catch (error) {
    status.textContent = "Beberapa data widget gagal dimuat.";
  }
}
