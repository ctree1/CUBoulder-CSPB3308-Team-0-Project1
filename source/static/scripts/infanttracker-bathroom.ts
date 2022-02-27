var bathroomEvent = new BathroomEvent();
var inputDateTimeElem = <HTMLInputElement>document.getElementById('inputDateTime');
var btnLiquidElem = <HTMLInputElement>document.getElementById('btnLiquid');
var btnSolidElem = <HTMLInputElement>document.getElementById('btnSolid');
var btnBothElem = <HTMLInputElement>document.getElementById('btnBoth');
var btnDoneElem = <HTMLInputElement>document.getElementById('btnBoth');
var btnOneMoreElem = <HTMLInputElement>document.getElementById('btnBoth');
var btnDoneElem = <HTMLInputElement>document.getElementById('btnDone');
var btnOneMoreElem = <HTMLInputElement>document.getElementById('btnOneMore');
var textCommentElem = <HTMLInputElement>document.getElementById('textComment');
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
        btnDoneElem.disabled = false;
        btnOneMoreElem.disabled = false;
    } else {
        btnDoneElem.disabled = true;
        btnOneMoreElem.disabled = true;
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
            btnLiquidElem.className = "btn btn-primary"
            btnSolidElem.className = "btn btn-secondary"
            btnBothElem.className = "btn btn-secondary"
            break;
        case BathroomTypeEnum.solid:
            btnLiquidElem.className = "btn btn-secondary"
            btnSolidElem.className = "btn btn-primary"
            btnBothElem.className = "btn btn-secondary"
            break;
        case BathroomTypeEnum.both:
            btnLiquidElem.className = "btn btn-secondary"
            btnSolidElem.className = "btn btn-secondary"
            btnBothElem.className = "btn btn-primary"
            break;
        default:
            btnLiquidElem.className = "btn btn-secondary"
            btnSolidElem.className = "btn btn-secondary"
            btnBothElem.className = "btn btn-secondary"
            break;
    }
    bathroomUpdateSubmitBtns();
}

function bathroomUpdateDateTime(dateTime: string) {
    bathroomEvent.dateTime = dateTime;
    inputDateTimeElem.value = dateTime;
}

function bathroomUpdateComment(comment: string) {
    bathroomEvent.comment = comment;
    textCommentElem.value = comment;
}

function bathroomAddBathroomEvent(goHome: boolean) {
    var data = { "bathroomEvent": bathroomEvent }
    postDataToServer("/bathroom", data, goHome, bathroomInitialize);
} 

