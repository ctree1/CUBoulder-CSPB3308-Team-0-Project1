var BathroomTypeEnum;
(function (BathroomTypeEnum) {
    BathroomTypeEnum[BathroomTypeEnum["none"] = 0] = "none";
    BathroomTypeEnum[BathroomTypeEnum["liquid"] = 1] = "liquid";
    BathroomTypeEnum[BathroomTypeEnum["solid"] = 2] = "solid";
    BathroomTypeEnum[BathroomTypeEnum["both"] = 3] = "both";
})(BathroomTypeEnum || (BathroomTypeEnum = {}));
var BathroomEvent = /** @class */ (function () {
    function BathroomEvent() {
        this.babyId = null;
        this.type = 0;
        this.comment = "";
    }
    return BathroomEvent;
}());
var bathroomEvent = new BathroomEvent();
var timeElem = document.getElementById('inputTime');
var btnLiquidElem = document.getElementById('btnLiquid');
var btnSolidElem = document.getElementById('btnSolid');
var btnBothElem = document.getElementById('btnBoth');
var btnDoneElem = document.getElementById('btnBoth');
var btnOneMoreElem = document.getElementById('btnBoth');
var btnDoneElem = document.getElementById('btnDone');
var btnOneMoreElem = document.getElementById('btnOneMore');
var today = new Date();
var dateTime = toISOLocal(today);
timeElem.value = dateTime;
bathroomEvent.dateTime = dateTime;
function updateSubmitBtns() {
    if (bathroomEvent.babyId && bathroomEvent.babyId != 0 && bathroomEvent.type != BathroomTypeEnum.none) {
        btnDoneElem.disabled = false;
        btnOneMoreElem.disabled = false;
    }
    else {
        btnDoneElem.disabled = true;
        btnOneMoreElem.disabled = true;
    }
}
function selectBaby(babyId) {
    bathroomEvent.babyId = +babyId;
    updateSubmitBtns();
}
function updateBathroomType(type) {
    bathroomEvent.type = bathroomEvent.type == type ? BathroomTypeEnum.none : type;
    switch (bathroomEvent.type) {
        case BathroomTypeEnum.liquid:
            btnLiquidElem.className = "btn btn-primary";
            btnSolidElem.className = "btn btn-secondary";
            btnBothElem.className = "btn btn-secondary";
            break;
        case BathroomTypeEnum.solid:
            btnLiquidElem.className = "btn btn-secondary";
            btnSolidElem.className = "btn btn-primary";
            btnBothElem.className = "btn btn-secondary";
            break;
        case BathroomTypeEnum.both:
            btnLiquidElem.className = "btn btn-secondary";
            btnSolidElem.className = "btn btn-secondary";
            btnBothElem.className = "btn btn-primary";
            break;
        default:
            btnLiquidElem.className = "btn btn-secondary";
            btnSolidElem.className = "btn btn-secondary";
            btnBothElem.className = "btn btn-secondary";
            break;
    }
    updateSubmitBtns();
}
function updateTime(time) {
    bathroomEvent.dateTime = time;
}
function updateComment(comment) {
    bathroomEvent.comment = comment;
}
function addBathroomEvent() {
    var xhr = new XMLHttpRequest();
    var url = "/bathroom";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = this.responseText;
            window.location.reload();
        }
    };
    var data = JSON.stringify({ "bathroomEvent": bathroomEvent });
    xhr.send(data);
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
//# sourceMappingURL=infanttracker.js.map