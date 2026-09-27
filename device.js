class Device {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.status = "off";
    }
    turnOn() {
        this.status = "on";
        console.log(`${this.name} ${this.type} is now turned on.`);
    }
    turnOff() {
        this.status = "off";
        console.log(`${this.name} ${this.type} is now turned off.`)
    }
    updateStatus(newStatus) {
        this.status = newStatus;
        console.log(`${this.name}'s status updated to: ${this.status}`);
    }
}
class Light extends Device {
    constructor(name, type = "light") { 
        super(name, type);
        this.brightness = 100;
        this.color = "warm";
    }
    setBrightness(level) {
        this.brightness = level;
        console.log(`Brightness : ${level}`);
    }
    setColor(temp) {
        this.color = temp;
        console.log(`Color : ${temp}`);
    }
}

class Blinds extends Device {
    constructor(name) {
        super(name, "blinds");
        this.position = 0;
        this.angle = 0;
    }
    setPosition(percent) {
        if (percent >= 0 && percent <= 100) {
            this.position = percent;
            console.log(`${this.name} open for : ${percent}`);
        } else {
            console.log(`Error: Out of range`)
        }
    }
    setAngle(angle) {
        this.angle = angle;
        console.log(`Angle changed to : ${angle}`)
    }
}

class AirCondition extends Device {
    constructor(name) {
        super(name, "air_condition");
        this.temperature = 22;
    }
    setTemperature(temp) {
        if (temp >= 16 && temp <= 30) {
            this.temperature = temp;
            console.log(`${this.name} : ${temp}°C`)
        } else {
            console.log("Error: Temperature out of range");
        }
    }
}

class Radiator extends Device {
    constructor(name) {
        super(name, "radiator");
        this.heatLevel = 0;
    }
    setHeatLevel(level) {
        if (level >= 0 && level <= 5) {
            this.heatLevel = level;
            console.log(`${this.name} : has ${level} heat level`);
        } else {
            console.log("Error: Out of radiator's range");
        }
    }
}

class Lamp extends Light {
    constructor(name) {
        super(name, "lamp");
    }
}

class FrontDoor extends Device {
    constructor(name) {
        super(name, "front_door");
        this.status = "locked";
    }
    lock() {
        this.status = "locked";
        console.log(`${this.name}: is locked`);
    }
    
    unlock() {
        this.status = "unlocked";
        console.log(`${this.name}: is unlocked`);
    }
}

class DoorBell extends Device {
    constructor(name) {
        super(name, "door_bell");
        this.isRinging = false;
    }
    ring() {
        this.isRinging = true;
        console.log(`${this.name}: Camera is turned on...`);
    }
    
    stopRinging() {
        this.isRinging = false;
        console.log(`${this.name}: Camera is turned off`);
    }
}

class TV extends Device {
    constructor(name) {
        super(name, "TV");
        this.currentChannel = 1;
        this.volume = 20;
        this.channelList = ["1+1", "ICTV", "Novy Kanal", "Suspilne", "Megogo Sport"];
    }
    changeChannel(channelNumber) {
        if (channelNumber >= 1 && channelNumber <= this.channelList.length) {
            this.currentChannel = channelNumber;
            console.log(`TV channel : ${this.channelList[this.currentChannel - 1]}`);
        } else {
            console.log("Error: Channel selection error");
        }
    }
    searchChannels() {
        console.log(`${this.name} is scanning for channels... Found ${this.channelList.length} channels.`);
    }
    setVolume(level) {
        if (level >= 0 && level <= 100) {
            this.volume = level;
            console.log(`Volume : ${level}`);
        }else{
            console.log("Error: Volume level out of range");
        }
    }
    getChannelList() {
        console.log(`Available channels: ${this.channelList.join(", ")}`);
        return this.channelList;
    }
}
class Tap extends Device {
    constructor(name) {
        super(name, "tap");
        this.status = "closed";
    }
    openTap() {
        this.status = "open";
        console.log(`${this.name}: is turned on`);
    }
    closeTap() {
        this.status = "closed";
        console.log(`${this.name}: is turned off`);
    }
}

class Gas extends Device {
    constructor(name) {
        super(name, "gas");
        this.status = "closed";
    }
    openValve() {
        this.status = "open";
        console.log(`${this.name}: is turned on`);
    }
    closeValve() {
        this.status = "closed";
        console.log(`${this.name}: is turned off`);
    }
}
