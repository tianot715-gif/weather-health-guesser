function guessWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const output = document.getElementById("weatherOutput");

  if (!city) {
    output.textContent = "Tolong isi nama kota dulu ya 😊";
    return;
  }

  // Tebakan sederhana
  const weathers = ["Cerah 🌞", "Berawan ☁️", "Hujan ☔️", "Angin Kencang 🌬"];
  const guess = weathers[Math.floor(Math.random() * weathers.length)];

  output.textContent = `Di ${city}, cuacanya kira-kira: ${guess}!`;
}

function guessIllness() {
  const symptom = document.getElementById("symptomInput").value.toLowerCase().trim();
  const output = document.getElementById("illnessOutput");

  if (!symptom) {
    output.textContent = "Masukkan gejala dulu ya 💭";
    return;
  }

  let guess = "Hmm... belum tahu nih 😅";

  if (symptom.includes("batuk")) guess = "Bisa jadi batuk biasa 🤧 atau alergi";
  if (symptom.includes("demam")) guess = "Demam mungkin karena kurang istirahat 😴";
  if (symptom.includes("sakit kepala")) guess = "Bisa jadi tegang atau kurang minum 💦";
  
  output.textContent = `Kalau gejalanya '${symptom}', tebakan sakitnya: ${guess}`;
}
