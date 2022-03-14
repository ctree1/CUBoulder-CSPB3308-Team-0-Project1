var bathroomEvent = new BathroomEvent();
var bathroomInputDateTimeElem = <HTMLInputElement>document.getElementById('inputDateTime');
var bathroomBtnLiquidElem = <HTMLButtonElement>document.getElementById('btnLiquid');
var bathroomBtnSolidElem = <HTMLButtonElement>document.getElementById('btnSolid');
var bathroomBtnBothElem = <HTMLButtonElement>document.getElementById('btnBoth');
var bathroomBtnDoneElem = <HTMLButtonElement>document.getElementById('btnDone');
var bathroomBtnOneMoreElem = <HTMLButtonElement>document.getElementById('btnOneMore');
var bathroomTextCommentElem = <HTMLInputElement>document.getElementById('textComment');
var bathroomSelectBabyElem = <HTMLSelectElement>document.getElementById('selectBaby');
bathroomInitialize()

function bathroomInitialize() {
    var today: Date = new Date();
    var dateTime = toISOLocal(today);
    bathroomUpdateDateTime(dateTime);
    bathroomUpdateBathroomType(BathroomTypeEnum.none);
    bathroomUpdateComment("");
}

function bathroomUpdateSubmitBtns() {
    if (bathroomEvent.babyId && bathroomEvent.babyId != 0 && bathroomEvent.type != BathroomTypeEnum.none) {
        bathroomBtnDoneElem.disabled = false;
        bathroomBtnOneMoreElem.disabled = false;
    } else {
        bathroomBtnDoneElem.disabled = true;
        bathroomBtnOneMoreElem.disabled = true;
    }
}

function bathroomSelectBaby(babyId: number) {
    bathroomEvent.babyId = +babyId;
    bathroomSelectBabyElem.selectedIndex = babyId;
    bathroomUpdateSubmitBtns();
}

function bathroomUpdateBathroomType(type: BathroomTypeEnum) {
    bathroomEvent.type = bathroomEvent.type == type ? BathroomTypeEnum.none : type;
    switch (bathroomEvent.type){
        case BathroomTypeEnum.liquid:
            bathroomBtnLiquidElem.className = "btn btn-primary"
            bathroomBtnSolidElem.className = "btn btn-secondary"
            bathroomBtnBothElem.className = "btn btn-secondary"
            break;
        case BathroomTypeEnum.solid:
            bathroomBtnLiquidElem.className = "btn btn-secondary"
            bathroomBtnSolidElem.className = "btn btn-primary"
            bathroomBtnBothElem.className = "btn btn-secondary"
            break;
        case BathroomTypeEnum.both:
            bathroomBtnLiquidElem.className = "btn btn-secondary"
            bathroomBtnSolidElem.className = "btn btn-secondary"
            bathroomBtnBothElem.className = "btn btn-primary"
            break;
        default:
            bathroomBtnLiquidElem.className = "btn btn-secondary"
            bathroomBtnSolidElem.className = "btn btn-secondary"
            bathroomBtnBothElem.className = "btn btn-secondary"
            break;
    }
    bathroomUpdateSubmitBtns();
}

function bathroomUpdateDateTime(dateTime: string) {
    bathroomEvent.dateTime = dateTime;
    bathroomInputDateTimeElem.value = dateTime;
}

function bathroomUpdateComment(comment: string) {
    bathroomEvent.comment = comment;
    bathroomTextCommentElem.value = comment;
}

function bathroomAddBathroomEvent(goHome: boolean) {
    var data = { "bathroomEvent": bathroomEvent }
    postDataToServer("/bathroom", data, goHome, bathroomInitialize);
} 

function bathroomDeleteBathroomEvent(eventId: number) {
    var event = new BathroomEvent();
    event.eventId = eventId;
    event.deleteFlag = true;
    var data = { "bathroomEvent": event }
    postDataToServer("/bathroom", data, false, bathroomInitialize);
} 

function bathroomSaveBathroomEvent(recentEvent: any[]) {
    var event = new BathroomEvent();
    event.eventId = recentEvent[0];
    event.dateTime = recentEvent[2];
    event.type = recentEvent[3];
    event.comment = recentEvent[4];
    var data = { "bathroomEvent": event }
    postDataToServer("/bathroom", data, false, bathroomInitialize);
} 

