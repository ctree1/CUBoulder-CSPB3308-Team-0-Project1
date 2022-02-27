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
initializeBathroom();
function initializeBathroom() {
    var today = new Date();
    var dateTime = toISOLocal(today);
    updateDateTime(dateTime);
    updateBathroomType(BathroomTypeEnum.none);
    updateComment("");
}
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
function updateDateTime(dateTime) {
    bathroomEvent.dateTime = dateTime;
    inputDateTimeElem.value = dateTime;
}
function updateComment(comment) {
    bathroomEvent.comment = comment;
    textCommentElem.value = comment;
}
function addBathroomEvent(goHome) {
    var data = { "bathroomEvent": bathroomEvent };
    postDataToServer("/bathroom", data, goHome);
}
//# sourceMappingURL=infanttracker-bathroom.js.map