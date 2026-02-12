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

// ===== CUACA ASLI TANPA API KEY (Open-Meteo) =====
async function checkWeather() {
  const city = document.getElementById('city').value.trim();
  const result = document.getElementById('weatherResult');

  if (!city) {
    result.innerText = 'Masukkan kota dulu ya ☁️';
    return;
  }

  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      result.innerText = 'Kota tidak ditemukan 😢';
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherRes.json();

    const suhu = weatherData.current_weather.temperature;
    const angin = weatherData.current_weather.windspeed;
    const kode = weatherData.current_weather.weathercode;

    let cuaca = 'Cerah 🌞';
    if ([1,2,3].includes(kode)) cuaca = 'Berawan ☁️';
    if ([45,48].includes(kode)) cuaca = 'Berkabut 🌫️';
    if ([51,53,55,61,63,65,80,81,82].includes(kode)) cuaca = 'Hujan 🌧️';
    if ([71,73,75].includes(kode)) cuaca = 'Salju ❄️';

    result.innerHTML = `
      <b>${cuaca}</b><br>
      Lokasi: ${name}, ${country}<br>
      Suhu: ${suhu}°C<br>
      Kecepatan angin: ${angin} km/jam
    `;

  } catch (err) {
    result.innerText = 'Gagal ambil data cuaca 😭';
  }
}

// ===== CEK KESEHATAN (HIBURAN) =====
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
