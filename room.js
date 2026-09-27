class Room{
    constructor(name){
        this.name = name;
        this.devices = [];
    }
    addDevice(...devices){
        this.devices.push(...devices);
        const deviceNames = devices.map(device => device.name).join(', ');
        console.log(`Added to ${this.name}: ${deviceNames}`);
    }
    getDevices(){
        return this.devices;
    }    
}
const livingRoom = new Room("Living Room");
const bedroom = new Room("Bedroom");
const bathroom = new Room("Bathroom");
const kitchen = new Room("Kitchen");
//Lights
const livingRoomLight = new Light("Living Room Light");
const bedroomLight = new Light("Bedroom Light");
const kitchenLight = new Light("Kitchen Light");
const bathroomLight = new Light("Bathroom Light");

const tv = new TV("Living Room TV");

const bedroomLamp = new Lamp("Bedroom Lamp");
//Climate
const livingRoomBlinds = new Blinds("Living Room Blinds");
const bedroomBlinds = new Blinds("Bedroom Blinds");
const kitchenBlinds = new Blinds("Kitchen Blinds");

const livingRoomAirCondition = new AirCondition("Living Room Condition");

const livingRoomRadiator = new Radiator("Living Room Heating");
const bedroomRadiator = new Radiator("Bedroom Heating");
const kitchenRadiator = new Radiator("Kitchen Heating");
const bathroomRadiator = new Radiator("Bathroom Heating");
// Security
const frontDoor = new FrontDoor("Front Door");
const doorBell = new DoorBell("Camera Door Bell");

const kitchenTap = new Tap("Kitchen Tap");
const bathroomTap = new Tap("Bathroom Tap");

const mainGasValve = new Gas("Main Gas Valve");

livingRoom.addDevice(livingRoomLight, livingRoomBlinds, livingRoomRadiator, livingRoomAirCondition, tv );
bedroom.addDevice(bedroomLight, bedroomBlinds, bedroomRadiator, bedroomLamp );
bathroom.addDevice(bathroomRadiator, bathroomLight, bathroomTap);
kitchen.addDevice(kitchenLight, kitchenBlinds, kitchenRadiator, kitchenTap, mainGasValve);

const securityDevices = new Room("Security Part");
securityDevices.addDevice(frontDoor, doorBell);
