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
    constructor(name) {
        super(name, "light");
        this.brightnees = 100;
        this.color = "warm";
    }
    setBrightnees(level) {
        this.brightnees = level;
        console.log(`Brightnees : ${this.level}`);
    }
    setColor(temp) {
        this.color = temp;
        console.log(`Color : ${this.temp}`);
    }
}
let livingRoomLight = new Light("Living Room Light");
let bedroomLight = new Light("Bedroom Light");
let kitchenLight = new Light("Kitchen Light");
let bathroomLight = new Light("Bathroom Light");

class Blinds extends Device {
    constructor(name) {
        super(name, "blinds");
        this.position = 0;
        this.angle = 0;
    }
    SetPosition(persent) {
        if (persent >= 0 && persent <= 100) {
            this.position = persent;
            console.log(`${this.name} open for : ${persent}`);
        } else {
            console.log(`Error: Out of range`)
        }
    }
    SetAngle(angle) {
        this.angle = angle;
        console.log(`Angle changed to : ${angle}`)
    }
}
let livingRoomBlinds = new Blinds("Living Room Blinds");
let bedroomBlinds = new Blinds("Bedroom Blinds");
let kitchenBlinds = new Blinds("Kitchen Blinds");

class AirCondition extends Device {
    constructor(name) {
        super(name, "air_condition");
        this.temperature = 22;
    }
    SetTemperature(temp) {
        if (temp >= 16 && temp <= 30) {
            this.temperature = temp;
            console.log(`${this.name} : ${temp}°C`)
        } else {
            console.log("Error: Temperature out of range");
        }
    }
}
let livingRoomCondition = new AirCondition("Living Room Condition");

class Radiator extends Device {
    constructor(name) {
        super(name, "hitter");
        this.HitLevel = 0;
    }
    SetHitLevel(level) {
        if (level >= 0 && level <= 5) {
            this.HitLevel = level;
            console.log(`${this.name} : has ${level} heating level`);
        } else {
            console.log("Error: Out of radiator's range");
        }
    }
}
let livingRoomClimate = new Radiator("Living Room Heating");
let bedroomClimate = new Radiator("Bedroom Heating");
let kitchenClimate = new Radiator("Kitchen Heating");
let bathroomClimate = new Radiator("Bathroom Heating");

class Lamp extends Light {
    constructor(namme) {
        super(name);
        this.type = "lamp";
    }
}
let bedroomLamp = new Lamp("Bedroom Lamp");
class FrontDoor extends Device {
    constructor(name) {
        super(name, "front_door", "close");
    }
}
let frontDoor = new FrontDoor("Front Door");
class DoorBell extends Device {
    constructor(name) {
        super(name, "door_bell");
    }
}
let doorBell = new DoorBell("Door Bell");
class TV extends Device {
    constructor(name) {
        super(name, "TV");
        this.currentChannel = 1;
        this.volume = 20;
        this.chanelList = ["1+1", "ICTV", "Novy Kanal", "Suspilne", "Megogo Sport"];
    }
    changeChannel(channelNumber) {
        if (channelNumber >= 1 && channelNumber <= this.chanelList.length) {
            this.currentChannel = channelNumber;
            console.log(`TV channel : ${this.chanelList[this.currentChannel - 1]}`);
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
let kitchenTap = new Tap("Kitchen Tap");
let bathroomTap = new Tap("Bathroom Tap");

class Gas extends Device {
    constructor(name) {
        super(name, "gas");
        this.status = "closed";
    }
    openValue() {
        this.status = "open";
        console.log(`${this.name}: is turned on`);
    }
    closeValue() {
        this.status = "closed";
        console.log(`${this.name}: is turned off`);
    }
}
let mainGasValue = new Gas("Main Gas Value");