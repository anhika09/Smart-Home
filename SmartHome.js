class SmartHome {
    constructor(rooms) {
        this.rooms = rooms;
        this.modes = [];    }

    getRooms() {
        return this.rooms;
    }

    // LIGHT
    turnOnAllLights() {
        this.getAllLights().forEach(light => {
            light.turnOn();
        });
    }

    turnOffAllLights() {
        this.getAllLights().forEach(light => {
            light.turnOff();
        });
    }

    setAllLightsBrightness(level) {
        this.getAllLights().forEach(light => {
            light.setBrightness(level);
        });
    }

    setAllLightsColor(color) {
        this.getAllLights().forEach(light => {
            light.setColor(color);
        });
    }

    // CLIMATE
    setAllRadiators(level) {
        this.getAllRadiators().forEach(radiator => {
            radiator.setHeatLevel(level);
        });
    }

    setAllBlindsPosition(percent) {
        this.getAllBlinds().forEach(blinds => {
            blinds.setPosition(percent);
        });
    }

    //  SECURITY 
    lockFrontDoor() {
        const frontDoor = this.rooms.flatMap(room => room.getDevices())
            .find(device => device instanceof FrontDoor);

        if (frontDoor) {
            frontDoor.lock();
        } else {
            console.log("Error: Front Door not found in the system.");
        }
    }

    unlockFrontDoor() {
        const frontDoor = this.rooms.flatMap(room => room.getDevices())
            .find(device => device instanceof FrontDoor);

        if (frontDoor) {
            frontDoor.unlock();
        } else {
            console.log("Error: Front Door not found in the system.");
        }
    }

    // HELPERS 
    getAllDevices() {
        return this.rooms.flatMap(room => room.getDevices());
    }

     getAllLights() {
        return this.getAllDevices()
            .filter(device => device instanceof Light);
    }

    getAllRadiators() {
        return this.getAllDevices()
            .filter(device => device instanceof Radiator);
    }

    getAllBlinds() {
        return this.getAllDevices()
            .filter(device => device instanceof Blinds);
    }
    getAllTaps() {
    return this.getAllDevices()
        .filter(device => device instanceof Tap);
    }

    getAllGasValves() {
    return this.getAllDevices()
        .filter(device => device instanceof Gas);
    }

    closeAllTaps() {
        this.getAllTaps().forEach(tap => {
            tap.closeTap();
        });
    }

    closeAllGasValves() {
        this.getAllGasValves().forEach(gas => {
            gas.closeValve();
        });
    }
}

// SMART HOME 
const smartHome = new SmartHome([livingRoom, bedroom, bathroom, kitchen, securityDevices]);

class Mode{
    constructor(name, actions = []){
        this.name = name;
        this.actions = actions;
    }
    apply(){
        this.actions.forEach(action =>
            action());
    }
}
const nightMode = new Mode("Night", [
    () => smartHome.turnOffAllLights(),
    () => smartHome.setAllBlindsPosition(100),
    () => smartHome.lockFrontDoor(),
    () => smartHome.setAllRadiators(2)
]);

const awayMode = new Mode("Away", [
    () => smartHome.turnOffAllLights(),
    () => smartHome.setAllBlindsPosition(100),
    () => smartHome.lockFrontDoor(),
    () => smartHome.closeAllTaps(),
    () => smartHome.closeAllGasValves()
]);
smartHome.modes.push(nightMode);
smartHome.modes.push(awayMode);


