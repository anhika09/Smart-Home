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
//Global Light
document.getElementById("TurnOffbutton").addEventListener("click", () => {
  smartHome.turnOffAllLights();
});
document.getElementById("rangeBright").addEventListener("input", (event) => {
  const value = event.target.value;
  document.getElementById("rangeValueBright").textContent = value; 
  smartHome.setAllLightsBrightness(Number(value));
});
document.getElementById("global-light-color").addEventListener("change", (event) => {
  smartHome.setAllLightsColor(event.target.value);
});

//Global Climate
document.getElementById("rangeRadiator")?.addEventListener("input", (event) => {
  const heatLevel = event.target.value;
  document.getElementById("rangeValueRadiator").textContent = `Level ${heatLevel}`;
  smartHome.setAllRadiators(Number(heatLevel));
});

// Global Security ---
document.getElementById("btnClose")?.addEventListener("change", (event) => {
  if (event.target.checked) {
    smartHome.lockFrontDoor();
  }
});
document.getElementById("btnOpen")?.addEventListener("change", (event) => {
  if (event.target.checked) {
    smartHome.unlockFrontDoor();
  }
});
document.getElementById("videoDoorbellButton")?.addEventListener("click", () => {
  console.log("Video doorbell UI clicked!");
});

// Settings
document.getElementById("settingsModal")?.addEventListener("show.bs.modal", () => {
  const container = document.getElementById("settingsModalBody");
  container.innerHTML = "";

  smartHome.getRooms().forEach(room => {
    const roomHeader = document.createElement("h5");
    roomHeader.className = "mt-4 mb-2 text-primary border-bottom pb-1";
    roomHeader.innerHTML = `<i class="bi bi-house-door"></i> ${room.name}`;
    container.appendChild(roomHeader);

    const listGroup = document.createElement("ul");
    listGroup.className = "list-group mb-3";
    room.getDevices().forEach(device => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between align-items-center bg-light";

      const isActive = ["on", "open", "unlocked"].includes(device.status);
      const badgeClass = isActive ? "bg-success" : "bg-secondary";
      let extraInfo = "";
      if (device.brightness !== undefined) extraInfo = ` <small class="text-muted">(${device.brightness}%)</small>`;
      if (device.temperature !== undefined) extraInfo = ` <small class="text-muted">(${device.temperature}°C)</small>`;

      listItem.innerHTML = `
        <div>
          <strong>${device.name}</strong> 
          <span class="text-secondary small ms-2">${device.type}</span>
          ${extraInfo}
        </div>
        <span class="badge ${badgeClass}">${device.status.toUpperCase()}</span>
      `;
      
      listGroup.appendChild(listItem);
    });

    container.appendChild(listGroup);
  });
});