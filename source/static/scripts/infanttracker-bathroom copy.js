var BathroomTypeEnum;
(function (BathroomTypeEnum) {
    BathroomTypeEnum[BathroomTypeEnum["none"] = 0] = "none";
    BathroomTypeEnum[BathroomTypeEnum["liquid"] = 1] = "liquid";
    BathroomTypeEnum[BathroomTypeEnum["solid"] = 2] = "solid";
    BathroomTypeEnum[BathroomTypeEnum["both"] = 3] = "both";
})(BathroomTypeEnum || (BathroomTypeEnum = {}));
var Baby = /** @class */ (function () {
    function Baby() {
        this.babyId = null;
        this.type = 0;
        this.comment = "";
    }
    return Baby;
}());
var baby = new Baby();
var dateElem = document.getElementById('inputTime');
var btnLiquidElem = document.getElementById('btnLiquid');
var btnSolidElem = document.getElementById('btnSolid');
var btnBothElem = document.getElementById('btnBoth');
var btnDoneElem = document.getElementById('btnBoth');
var btnOneMoreElem = document.getElementById('btnBoth');
var btnDoneElem = document.getElementById('btnDone');
var btnOneMoreElem = document.getElementById('btnOneMore');
var textCommentElem = document.getElementById('textComment');
initialize();
function initialize() {
    var today = new Date();
    var dateTime = toISOLocal(today);
    updateDate(dateTime);
    updateBathroomType(BathroomTypeEnum.none);
    updateComment("");
}
function updateSubmitBtns() {
    if (baby.babyId && baby.babyId != 0 && baby.type != BathroomTypeEnum.none) {
        btnDoneElem.disabled = false;
        btnOneMoreElem.disabled = false;
    }
    else {
        btnDoneElem.disabled = true;
        btnOneMoreElem.disabled = true;
    }
}
function selectBaby(babyId) {
    baby.babyId = +babyId;
    updateSubmitBtns();
}
function updateBathroomType(type) {
    baby.type = baby.type == type ? BathroomTypeEnum.none : type;
    switch (baby.type) {
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
function updateDate(dateTime) {
    baby.dateTime = dateTime;
    dateElem.value = dateTime;
}
function updateComment(comment) {
    baby.comment = comment;
    textCommentElem.value = comment;
}
function addBathroomEvent(goHome) {
    var xhr = new XMLHttpRequest();
    var url = "/bathroom";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = this.responseText;
            if (goHome) {
                window.open("/home", '_self');
                //window.location.replace('https://www.example.com/');
            }
            else {
                initialize();
            }
        }
    };
    var data = JSON.stringify({ "bathroomEvent": baby });
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
//# sourceMappingURL=infanttracker-bathroom%20copy.js.map