var bathroomEvent = new BathroomEvent();
var bathroomInputDateTimeElem = document.getElementById('inputDateTime');
var bathroomBtnLiquidElem = document.getElementById('btnLiquid');
var bathroomBtnSolidElem = document.getElementById('btnSolid');
var bathroomBtnBothElem = document.getElementById('btnBoth');
var bathroomBtnDoneElem = document.getElementById('btnDone');
var bathroomBtnOneMoreElem = document.getElementById('btnOneMore');
var bathroomTextCommentElem = document.getElementById('textComment');
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
        bathroomBtnDoneElem.disabled = false;
        bathroomBtnOneMoreElem.disabled = false;
    }
    else {
        bathroomBtnDoneElem.disabled = true;
        bathroomBtnOneMoreElem.disabled = true;
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
            bathroomBtnLiquidElem.className = "btn btn-primary";
            bathroomBtnSolidElem.className = "btn btn-secondary";
            bathroomBtnBothElem.className = "btn btn-secondary";
            break;
        case BathroomTypeEnum.solid:
            bathroomBtnLiquidElem.className = "btn btn-secondary";
            bathroomBtnSolidElem.className = "btn btn-primary";
            bathroomBtnBothElem.className = "btn btn-secondary";
            break;
        case BathroomTypeEnum.both:
            bathroomBtnLiquidElem.className = "btn btn-secondary";
            bathroomBtnSolidElem.className = "btn btn-secondary";
            bathroomBtnBothElem.className = "btn btn-primary";
            break;
        default:
            bathroomBtnLiquidElem.className = "btn btn-secondary";
            bathroomBtnSolidElem.className = "btn btn-secondary";
            bathroomBtnBothElem.className = "btn btn-secondary";
            break;
    }
    bathroomUpdateSubmitBtns();
}
function bathroomUpdateDateTime(dateTime) {
    bathroomEvent.dateTime = dateTime;
    bathroomInputDateTimeElem.value = dateTime;
}
function bathroomUpdateComment(comment) {
    bathroomEvent.comment = comment;
    bathroomTextCommentElem.value = comment;
}
function bathroomAddBathroomEvent(goHome) {
    var data = { "bathroomEvent": bathroomEvent };
    postDataToServer("/bathroom", data, goHome, bathroomInitialize);
}
//# sourceMappingURL=infanttracker-bathroom.js.map