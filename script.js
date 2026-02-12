 const API_KEY = "APIKEY_KAMU_YANG_ASLI"; 

function login() {
  const user = document.getElementById('username').value.trim();
  if (!user) return alert('Isi nama dulu yaa 😊');

  document.getElementById('welcomeText').innerText = `Halo ${user} 💕`;
  showPage('menuPage');
}

function showWeather() { showPage('weatherPage'); }
function showHealth() { showPage('healthPage'); }
function backMenu() { showPage('menuPage'); }

function showPage(id) {
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

async function checkWeather() {
  const city = document.getElementById('city').value.trim();
  const result = document.getElementById('weatherResult');

  if (!city) {
    result.innerText = 'Masukkan kota dulu ya ☁️';
    return;
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${API_KEY}`);
    const data = await res.json();

    if (data.cod !== 200) {
      result.innerText = 'Kota tidak ditemukan 😢';
      return;
    }

    const cuaca = data.weather[0].description;
    const suhu = data.main.temp;
    const terasa = data.main.feels_like;
    const kelembapan = data.main.humidity;

    let alasan = "Cuaca dipengaruhi kondisi atmosfer dan suhu udara.";

    if (cuaca.includes("hujan")) alasan = "Karena awan tebal membawa banyak uap air yang turun jadi hujan.";
    if (cuaca.includes("cerah")) alasan = "Karena sinar matahari tidak tertutup awan.";

    result.innerHTML = `
      <b>${cuaca.toUpperCase()} 🌸</b><br>
      Suhu: ${suhu}°C (terasa ${terasa}°C)<br>
      Kelembapan: ${kelembapan}%<br><br>
      Penjelasan: ${alasan}
    `;

  } catch (err) {
    result.innerText = 'Gagal ambil data cuaca 😭';
  }
}

function checkHealth() {
  const nama = document.getElementById('nama').value.trim();
  const kota = document.getElementById('kota').value.trim();
  const gejala = document.getElementById('gejala').value.toLowerCase();
  const result = document.getElementById('healthResult');

  if (!nama || !kota || !gejala) {
    result.innerText = 'Isi semua dulu yaa 💕';
    return;
  }

  let sakit = 'Kurang istirahat 😴';
  let obat = 'Tidur cukup, minum air putih, dan makan teratur.';

  if (gejala.includes('batuk')) {
    sakit = 'Batuk ringan 🤧';
    obat = 'Minum air hangat, madu, dan istirahat cukup.';
  }
  if (gejala.includes('demam')) {
    sakit = 'Demam ringan 🌡️';
    obat = 'Perbanyak minum, kompres hangat, dan istirahat.';
  }
  if (gejala.includes('pusing')) {
    sakit = 'Pusing karena lelah 💫';
    obat = 'Tidur cukup dan kurangi lihat layar.';
  }

  result.innerHTML = `Halo <b>${nama}</b> dari ${kota} 💖<br>
  Kemungkinan kamu mengalami: <b>${sakit}</b><br>
  Saran: ${obat}<br><br>
  <i>Ini hanya hiburan ya, bukan diagnosis dokter 🌸</i>`;
}
