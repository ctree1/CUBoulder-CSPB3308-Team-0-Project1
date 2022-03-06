var sleepEvent = new SleepEvent();
var sleepInputDateTimeElem = <HTMLInputElement>document.getElementById('inputDateTime');
var sleepBtnAwakeElem = <HTMLInputElement>document.getElementById('btnAwake');
var sleepBtnAsleepElem = <HTMLInputElement>document.getElementById('btnAsleep');
var sleepBtnDoneElem = <HTMLInputElement>document.getElementById('btnDone');
var sleepBtnOneMoreElem = <HTMLInputElement>document.getElementById('btnOneMore');
var sleepTextCommentElem = <HTMLInputElement>document.getElementById('textComment');
sleepInitialize()

function sleepInitialize() {
    var today: Date = new Date();
    var dateTime = toISOLocal(today);
    sleepUpdateDateTime(dateTime);
    sleepUpdateSleepType(SleepTypeEnum.none);
    sleepUpdateComment("");
}

function sleepUpdateSubmitBtns() {
    if (sleepEvent.babyId && sleepEvent.babyId != 0 && sleepEvent.type != SleepTypeEnum.none) {
        sleepBtnDoneElem.disabled = false;
        sleepBtnOneMoreElem.disabled = false;
    } else {
        sleepBtnDoneElem.disabled = true;
        sleepBtnOneMoreElem.disabled = true;
    }
}

function sleepSelectBaby(babyId: number) {
    sleepEvent.babyId = +babyId;
    sleepUpdateSubmitBtns();
}

function sleepUpdateSleepType(type: SleepTypeEnum) {
    sleepEvent.type = sleepEvent.type == type ? SleepTypeEnum.none : type;
    switch (sleepEvent.type){
        case SleepTypeEnum.awake:
            sleepBtnAwakeElem.className = "btn btn-primary"
            sleepBtnAsleepElem.className = "btn btn-secondary"
            break;
        case SleepTypeEnum.asleep:
            sleepBtnAwakeElem.className = "btn btn-secondary"
            sleepBtnAsleepElem.className = "btn btn-primary"
            break;
        default:
            sleepBtnAwakeElem.className = "btn btn-secondary"
            sleepBtnAsleepElem.className = "btn btn-secondary"
            break;
    }
    sleepUpdateSubmitBtns();
}

function sleepUpdateDateTime(dateTime: string) {
    sleepEvent.dateTime = dateTime;
    sleepInputDateTimeElem.value = dateTime;
}

function sleepUpdateComment(comment: string) {
    sleepEvent.comment = comment;
    sleepTextCommentElem.value = comment;
}

function sleepAddSleepEvent(goHome: boolean) {
    var data = { "sleepEvent": sleepEvent }
    postDataToServer("/sleep", data, goHome, sleepInitialize);
} 

