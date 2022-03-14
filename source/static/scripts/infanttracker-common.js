var BathroomTypeEnum;
(function (BathroomTypeEnum) {
    BathroomTypeEnum[BathroomTypeEnum["none"] = 0] = "none";
    BathroomTypeEnum[BathroomTypeEnum["liquid"] = 1] = "liquid";
    BathroomTypeEnum[BathroomTypeEnum["solid"] = 2] = "solid";
    BathroomTypeEnum[BathroomTypeEnum["both"] = 3] = "both";
})(BathroomTypeEnum || (BathroomTypeEnum = {}));
var SleepTypeEnum;
(function (SleepTypeEnum) {
    SleepTypeEnum[SleepTypeEnum["none"] = 0] = "none";
    SleepTypeEnum[SleepTypeEnum["awake"] = 1] = "awake";
    SleepTypeEnum[SleepTypeEnum["asleep"] = 2] = "asleep";
})(SleepTypeEnum || (SleepTypeEnum = {}));
var LiquidUnitsEnum;
(function (LiquidUnitsEnum) {
    LiquidUnitsEnum[LiquidUnitsEnum["none"] = 0] = "none";
    LiquidUnitsEnum[LiquidUnitsEnum["ounces"] = 1] = "ounces";
    LiquidUnitsEnum[LiquidUnitsEnum["milliliters"] = 2] = "milliliters";
})(LiquidUnitsEnum || (LiquidUnitsEnum = {}));
var WeightUnitsEnum;
(function (WeightUnitsEnum) {
    WeightUnitsEnum[WeightUnitsEnum["none"] = 0] = "none";
    WeightUnitsEnum[WeightUnitsEnum["pounds"] = 1] = "pounds";
    WeightUnitsEnum[WeightUnitsEnum["kilograms"] = 2] = "kilograms";
})(WeightUnitsEnum || (WeightUnitsEnum = {}));
var HeightUnitsEnum;
(function (HeightUnitsEnum) {
    HeightUnitsEnum[HeightUnitsEnum["none"] = 0] = "none";
    HeightUnitsEnum[HeightUnitsEnum["inches"] = 1] = "inches";
    HeightUnitsEnum[HeightUnitsEnum["centimeters"] = 2] = "centimeters";
})(HeightUnitsEnum || (HeightUnitsEnum = {}));
var Preferences = /** @class */ (function () {
    function Preferences() {
        this.liquidUnits = 0;
        this.weightUnits = 0;
        this.heightUnits = 0;
    }
    return Preferences;
}());
var Baby = /** @class */ (function () {
    function Baby() {
        this.firstName = "";
        this.lastName = "";
        this.birthWeight = "";
        this.birthHeight = "";
        this.abbreviation = "";
    }
    return Baby;
}());
var BathroomEvent = /** @class */ (function () {
    function BathroomEvent() {
        this.eventId = null;
        this.babyId = null;
        this.type = 0;
        this.comment = "";
        this.deleteFlag = false;
    }
    return BathroomEvent;
}());
var SleepEvent = /** @class */ (function () {
    function SleepEvent() {
        this.eventId = null;
        this.babyId = null;
        this.type = 0;
        this.comment = "";
        this.deleteFlag = false;
    }
    return SleepEvent;
}());
function postDataToServer(url, data, goHome, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = this.responseText;
            if (goHome) {
                window.open("/home", '_self');
            }
            else {
                callback();
                window.location.reload();
                tsc;
            }
        }
    };
    xhr.send(JSON.stringify(data));
}
function toISOLocal(d) {
    var z = function (n) { return ('0' + n).slice(-2); };
    var zz = function (n) { return ('00' + n).slice(-3); };
    return d.getFullYear() + '-'
        + z(d.getMonth() + 1) + '-' +
        z(d.getDate()) + 'T' +
        z(d.getHours()) + ':' +
        z(d.getMinutes()) + ':' +
        z(d.getSeconds());
}
//# sourceMappingURL=infanttracker-common.js.map