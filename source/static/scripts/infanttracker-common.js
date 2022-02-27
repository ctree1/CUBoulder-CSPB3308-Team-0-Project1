var BathroomTypeEnum;
(function (BathroomTypeEnum) {
    BathroomTypeEnum[BathroomTypeEnum["none"] = 0] = "none";
    BathroomTypeEnum[BathroomTypeEnum["liquid"] = 1] = "liquid";
    BathroomTypeEnum[BathroomTypeEnum["solid"] = 2] = "solid";
    BathroomTypeEnum[BathroomTypeEnum["both"] = 3] = "both";
})(BathroomTypeEnum || (BathroomTypeEnum = {}));
var LiquidUnits;
(function (LiquidUnits) {
    LiquidUnits[LiquidUnits["none"] = 0] = "none";
    LiquidUnits[LiquidUnits["oz"] = 1] = "oz";
    LiquidUnits[LiquidUnits["ml"] = 2] = "ml";
})(LiquidUnits || (LiquidUnits = {}));
var WeightUnits;
(function (WeightUnits) {
    WeightUnits[WeightUnits["none"] = 0] = "none";
    WeightUnits[WeightUnits["oz"] = 1] = "oz";
    WeightUnits[WeightUnits["ml"] = 2] = "ml";
})(WeightUnits || (WeightUnits = {}));
var Baby = /** @class */ (function () {
    function Baby() {
        this.birthDate = null;
        this.firstName = "";
        this.lastName = "";
        this.birthWeight = "";
        this.birthHeight = "";
    }
    return Baby;
}());
var BathroomEvent = /** @class */ (function () {
    function BathroomEvent() {
        this.babyId = null;
        this.type = 0;
        this.comment = "";
    }
    return BathroomEvent;
}());
function postDataToServer(url, data, goHome) {
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
                initialize();
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