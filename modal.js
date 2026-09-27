const roomsMap = {
  livingRoom: livingRoom,
  bedroom: bedroom,
  kitchen: kitchen,
  bathroom: bathroom,
};
function renderDeviceControls(device, uid) {
  if (device instanceof Light) {
    return `
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" role="switch" id="${uid}-power"
          ${device.status === "on" ? "checked" : ""}
          onchange="onDevicePower('${uid}', this.checked)">
        <label class="form-check-label" for="${uid}-power">Power</label>
      </div>
      <label class="form-label small mb-1">Brightness (<span id="${uid}-bval">${device.brightness}</span>%)</label>
      <input type="range" class="form-range mb-3" min="0" max="100" value="${device.brightness}"
        id="${uid}-brightness"
        oninput="document.getElementById('${uid}-bval').textContent=this.value; onDeviceParam('${uid}', 'brightness', this.value)">
      <label class="form-label small mb-1">Color</label>
      <select class="form-select form-select-sm" id="${uid}-color"
        onchange="onDeviceParam('${uid}', 'color', this.value)">
        <option value="warm" ${device.color === "warm" ? "selected" : ""}>Warm</option>
        <option value="neutral" ${device.color === "neutral" ? "selected" : ""}>Neutral</option>
        <option value="cool" ${device.color === "cool" ? "selected" : ""}>Cool</option>
      </select>`;
  }

  if (device instanceof TV) {
    const options = device.channelList
      .map((ch, i) => `<option value="${i + 1}" ${device.currentChannel === i + 1 ? "selected" : ""}>${ch}</option>`)
      .join("");
    return `
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" role="switch" id="${uid}-power"
          ${device.status === "on" ? "checked" : ""}
          onchange="onDevicePower('${uid}', this.checked)">
        <label class="form-check-label" for="${uid}-power">Power</label>
      </div>
      <label class="form-label small mb-1">Channel</label>
      <select class="form-select form-select-sm mb-3" id="${uid}-channel"
        onchange="onDeviceParam('${uid}', 'channel', this.value)">${options}</select>
      <label class="form-label small mb-1">Volume (<span id="${uid}-vval">${device.volume}</span>)</label>
      <input type="range" class="form-range" min="0" max="100" value="${device.volume}"
        oninput="document.getElementById('${uid}-vval').textContent=this.value; onDeviceParam('${uid}', 'volume', this.value)">`;
  }

  if (device instanceof Blinds) {
    return `
      <label class="form-label small mb-1">Position (<span id="${uid}-pval">${device.position}</span>%)</label>
      <input type="range" class="form-range mb-3" min="0" max="100" value="${device.position}"
        oninput="document.getElementById('${uid}-pval').textContent=this.value; onDeviceParam('${uid}', 'position', this.value)">
      <label class="form-label small mb-1">Angle (<span id="${uid}-aval">${device.angle}</span>°)</label>
      <input type="range" class="form-range" min="0" max="90" value="${device.angle}"
        oninput="document.getElementById('${uid}-aval').textContent=this.value; onDeviceParam('${uid}', 'angle', this.value)">`;
  }

  if (device instanceof AirCondition) {
    return `
      <label class="form-label small mb-1">Temperature (<span id="${uid}-tval">${device.temperature}</span>°C)</label>
      <input type="range" class="form-range" min="16" max="30" value="${device.temperature}"
        oninput="document.getElementById('${uid}-tval').textContent=this.value; onDeviceParam('${uid}', 'temperature', this.value)">`;
  }

  if (device instanceof Radiator) {
    return `
      <label class="form-label small mb-1">Heat level (<span id="${uid}-hval">${device.heatLevel}</span>/5)</label>
      <input type="range" class="form-range" min="0" max="5" value="${device.heatLevel}"
        oninput="document.getElementById('${uid}-hval').textContent=this.value; onDeviceParam('${uid}', 'heatLevel', this.value)">`;
  }

  if (device instanceof FrontDoor) {
    return `
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-outline-primary ${device.status === "locked" ? "active" : ""}"
          onclick="onDoorAction('${uid}', 'lock')"><i class="bi bi-lock"></i> Lock</button>
        <button type="button" class="btn btn-outline-primary ${device.status === "unlocked" ? "active" : ""}"
          onclick="onDoorAction('${uid}', 'unlock')"><i class="bi bi-unlock"></i> Unlock</button>
      </div>`;
  }

  if (device instanceof DoorBell) {
    return `
      <button type="button" class="btn btn-outline-secondary" onclick="onBellAction('${uid}')">
        <i class="bi bi-camera-video"></i> ${device.isRinging ? "Stop camera" : "Turn on camera"}
      </button>`;
  }

  if (device instanceof Tap) {
    return `
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="${uid}-power"
          ${device.status === "open" ? "checked" : ""}
          onchange="onTapAction('${uid}', this.checked)">
        <label class="form-check-label" for="${uid}-power">${device.status === "open" ? "Open" : "Closed"}</label>
      </div>`;
  }

  if (device instanceof Gas) {
    return `
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="${uid}-power"
          ${device.status === "open" ? "checked" : ""}
          onchange="onGasAction('${uid}', this.checked)">
        <label class="form-check-label" for="${uid}-power">${device.status === "open" ? "Open" : "Closed"}</label>
      </div>`;
  }
  return `<p class="text-secondary small mb-0">Status: ${device.status}</p>`;
}
const deviceRegistry = {};

function renderRoomDevices(room) {
  const container = document.getElementById("roomModalBody");
  container.innerHTML = "";

  room.getDevices().forEach((device, index) => {
    const uid = `${room.name.replace(/\s+/g, "")}-${index}`;
    deviceRegistry[uid] = device;

    const wrapper = document.createElement("div");
    wrapper.className = "device-item mb-3 p-3 border rounded";
    wrapper.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong>${device.name}</strong>
        <span class="badge bg-secondary">${device.type}</span>
      </div>
      ${renderDeviceControls(device, uid)}
    `;
    container.appendChild(wrapper);
  });
}

document.getElementById("roomModal").addEventListener("show.bs.modal", (event) => {
  const trigger = event.relatedTarget;
  const roomKey = trigger.getAttribute("data-room");
  const room = roomsMap[roomKey];

  document.getElementById("roomModalTitle").textContent = room.name;
  renderRoomDevices(room);
});

function onDevicePower(uid, isOn) {
  const device = deviceRegistry[uid];
  isOn ? device.turnOn() : device.turnOff();
}

function onDeviceParam(uid, param, rawValue) {
  const device = deviceRegistry[uid];
  const value = Number(rawValue);

  switch (param) {
    case "brightness":
      device.setBrightness(value);
      break;
    case "color":
      device.setColor(rawValue);
      break;
    case "position":
      device.setPosition(value);
      break;
    case "angle":
      device.setAngle(value);
      break;
    case "temperature":
      device.setTemperature(value);
      break;
    case "heatLevel":
      device.setHeatLevel(value);
      break;
    case "channel":
      device.changeChannel(value);
      break;
    case "volume":
      device.setVolume(value);
      break;
  }
}

function onDoorAction(uid, action) {
  const device = deviceRegistry[uid];
  action === "lock" ? device.lock() : device.unlock();
  renderRoomDevices(document.getElementById("roomModal")._currentRoom || getRoomOfDevice(device));
}

function onBellAction(uid) {
  const device = deviceRegistry[uid];
  device.isRinging ? device.stopRinging() : device.ring();
  renderRoomDevices(getRoomOfDevice(device));
}

function onTapAction(uid, isOpen) {
  const device = deviceRegistry[uid];
  isOpen ? device.openTap() : device.closeTap();
}

function onGasAction(uid, isOpen) {
  const device = deviceRegistry[uid];
  isOpen ? device.openValve() : device.closeValve();
}

function getRoomOfDevice(device) {
  return Object.values(roomsMap).find((room) => room.getDevices().includes(device));
}

const builtInModes = {
  away: { title: "Away Mode", mode: awayMode, description: "Turns off lights, closes blinds, locks the door, shuts taps and gas." },
  night: { title: "Night Mode", mode: nightMode, description: "Turns off lights, closes blinds, locks the door, lowers heating." },
};

let modeToApply = null;

document.getElementById("modeApplyModal").addEventListener("show.bs.modal", (event) => {
  const trigger = event.relatedTarget;
  const modeKey = trigger.getAttribute("data-mode");
  const info = builtInModes[modeKey];

  document.getElementById("modeApplyTitle").textContent = info.title;
  document.getElementById("modeApplyBody").innerHTML = `<p>${info.description}</p>`;
  modeToApply = info.mode;
});

document.getElementById("modeApplyConfirm").addEventListener("click", () => {
  if (modeToApply) {
    modeToApply.apply();
  }
  bootstrap.Modal.getInstance(document.getElementById("modeApplyModal")).hide();
});

document.getElementById("createModeModal").addEventListener("show.bs.modal", () => {
  const container = document.getElementById("modeDevices");
  container.innerHTML = "";

  smartHome.getAllDevices().forEach((device, index) => {
    const id = `mode-device-${index}`;
    const row = document.createElement("div");
    row.className = "form-check";
    row.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${index}" id="${id}">
      <label class="form-check-label" for="${id}">${device.name}</label>`;
    container.appendChild(row);
  });
});

document.getElementById("saveMode").addEventListener("click", () => {
  const name = document.getElementById("modeName").value.trim() || "Custom Mode";
  const checked = Array.from(document.querySelectorAll("#modeDevices input:checked"));

  if (checked.length === 0) {
    alert("Select at least one device for this mode.");
    return;
  }

  const allDevices = smartHome.getAllDevices();
  const selectedDevices = checked.map((el) => allDevices[Number(el.value)]);

  const newMode = new Mode(name, selectedDevices.map((device) => () => device.turnOn()));
  smartHome.modes.push(newMode);

  addModeButton(newMode);

  document.getElementById("modeName").value = "";
  bootstrap.Modal.getInstance(document.getElementById("createModeModal")).hide();
});

function addModeButton(mode) {
  const button = document.createElement("button");
  button.innerHTML = `<i class="bi bi-bookmark-star"></i><p>${mode.name}</p>`;
  button.addEventListener("click", () => mode.apply());

  const createButton = document.getElementById("create-mode");
  createButton.parentNode.insertBefore(button, createButton);
}
