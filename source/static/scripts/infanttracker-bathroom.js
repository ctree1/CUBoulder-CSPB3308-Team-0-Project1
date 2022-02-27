var bathroomEvent = new BathroomEvent();
var inputDateTimeElem = document.getElementById('inputDateTime');
var btnLiquidElem = document.getElementById('btnLiquid');
var btnSolidElem = document.getElementById('btnSolid');
var btnBothElem = document.getElementById('btnBoth');
var btnDoneElem = document.getElementById('btnBoth');
var btnOneMoreElem = document.getElementById('btnBoth');
var btnDoneElem = document.getElementById('btnDone');
var btnOneMoreElem = document.getElementById('btnOneMore');
var textCommentElem = document.getElementById('textComment');
bathroomInitialize();
function bathroomInitialize() {
    var today = new Date();
    var dateTime = toISOLocal(today);
    bathroomUpdateDateTime(dateTime);
    bathroomUpdateBathroomType(BathroomTypeEnum.none);
    bathroomUpdateComment("");
}
function bathroomUpdateSubmitBtns() {
    if (bathroomEvent.babyId && bathroomEvent.babyId != 0 && bathroomEvent.type != BathroomTypeEnum.none) {
        btnDoneElem.disabled = false;
        btnOneMoreElem.disabled = false;
    }
    else {
        btnDoneElem.disabled = true;
        btnOneMoreElem.disabled = true;
    }
}
function bathroomSelectBaby(babyId) {
    bathroomEvent.babyId = +babyId;
    bathroomUpdateSubmitBtns();
}
function bathroomUpdateBathroomType(type) {
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
    bathroomUpdateSubmitBtns();
}
function bathroomUpdateDateTime(dateTime) {
    bathroomEvent.dateTime = dateTime;
    inputDateTimeElem.value = dateTime;
}
function bathroomUpdateComment(comment) {
    bathroomEvent.comment = comment;
    textCommentElem.value = comment;
}
function bathroomAddBathroomEvent(goHome) {
    var data = { "bathroomEvent": bathroomEvent };
    postDataToServer("/bathroom", data, goHome, bathroomInitialize);
}
//# sourceMappingURL=infanttracker-bathroom.js.map