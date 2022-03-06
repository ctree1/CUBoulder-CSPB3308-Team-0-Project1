var bathroomEvent = new BathroomEvent();
var bathroomInputDateTimeElem = <HTMLInputElement>document.getElementById('inputDateTime');
var bathroomBtnLiquidElem = <HTMLInputElement>document.getElementById('btnLiquid');
var bathroomBtnSolidElem = <HTMLInputElement>document.getElementById('btnSolid');
var bathroomBtnBothElem = <HTMLInputElement>document.getElementById('btnBoth');
var bathroomBtnDoneElem = <HTMLInputElement>document.getElementById('btnDone');
var bathroomBtnOneMoreElem = <HTMLInputElement>document.getElementById('btnOneMore');
var bathroomTextCommentElem = <HTMLInputElement>document.getElementById('textComment');
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

