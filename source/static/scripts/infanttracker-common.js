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
var FeedSideEnum;
(function (FeedSideEnum) {
    FeedSideEnum[FeedSideEnum["none"] = 0] = "none";
    FeedSideEnum[FeedSideEnum["left"] = 1] = "left";
    FeedSideEnum[FeedSideEnum["right"] = 2] = "right";
})(FeedSideEnum || (FeedSideEnum = {}));
var FeedBottleTypeEnum;
(function (FeedBottleTypeEnum) {
    FeedBottleTypeEnum[FeedBottleTypeEnum["none"] = 0] = "none";
    FeedBottleTypeEnum[FeedBottleTypeEnum["breast"] = 1] = "breast";
    FeedBottleTypeEnum[FeedBottleTypeEnum["formula"] = 2] = "formula";
})(FeedBottleTypeEnum || (FeedBottleTypeEnum = {}));
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
var FeedEvent = /** @class */ (function () {
    function FeedEvent() {
        this.eventId = null;
        this.babyId = null;
        this.breastSide = 0;
        this.pumpSide = 0;
        this.bottleType = 0;
        this.duration = 0;
        this.quantity = 0;
        this.comment = "";
        this.deleteFlag = false;
    }
    return FeedEvent;
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