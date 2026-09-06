//Clock
let clock = document.getElementById("clock");
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  clock.textContent = `${hours}:${minutes}`;
}
setInterval(updateTime, 1000);
updateTime();

// Wi-fi
let wifiIcon = document.querySelector(".connection-status i");
let wifiText = document.getElementById("connection-status");
function updateConnectionStatus() {
  if (navigator.onLine) {
    wifiIcon.style.color = "green";
    wifiText.textContent = "Online";
  } else {
    wifiIcon.style.color = "red";
    wifiText.textContent = "Offline";
  }
}
updateConnectionStatus();
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

// Ranges
const ranges = document.querySelectorAll(".form-range");
ranges.forEach((range) => {
  const output = range.nextElementSibling;
  output.textContent = range.value;
  range.addEventListener("input", function () {
    output.textContent = this.value;
  });
});

//Climate Lviv
const latitude = 49.84;
const longitude = 24.03;
const baseURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
let outTemp = document.getElementById("outTemp");
fetch(baseURL)
  .then((response) => response.json())
  .then((data) => {
    const temperature = data.current.temperature_2m;
    const weatherCode = data.current.weather_code;
    const weather = getWeatherIcon(weatherCode);
    outTemp.innerHTML = `<i class= " bi ${weather.icon}"></i> ${temperature} °C`;
  })
  .catch((error) => {
    console.log("Weather request failed", error);
    outTemp.innerHTML = ` <i class="bi bi-exclamation-triangle"></i>
            Weather unavailable`;
  });
function getWeatherIcon(code) {
  if (code === 0) {
    return {
      icon: "bi-sun",
      text: "Clear sky",
    };
  }
  if (code >= 1 && code <= 3) {
    return {
      icon: "bi-cloud",
      text: "Cloudy",
    };
  }
  if (code >= 51 && code <= 67) {
    return {
      icon: "bi-cloud-rain",
      text: "Rain",
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      icon: "bi-snow",
      text: "Snow",
    };
  }
  if (code >= 95) {
    return {
      icon: "bi-cloud-lightning-rain",
      text: "Storm",
    };
  }

  return {
    icon: "bi-cloud",
    text: "Unknown",
  };
}
