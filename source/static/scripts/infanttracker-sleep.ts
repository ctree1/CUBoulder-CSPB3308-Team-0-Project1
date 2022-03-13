var sleepEvent = new SleepEvent();
var sleepInputDateTimeElem = <HTMLInputElement>document.getElementById('inputDateTime');
var sleepBtnAwakeElem = <HTMLButtonElement>document.getElementById('btnAwake');
var sleepBtnAsleepElem = <HTMLButtonElement>document.getElementById('btnAsleep');
var sleepBtnDoneElem = <HTMLButtonElement>document.getElementById('btnDone');
var sleepBtnOneMoreElem = <HTMLButtonElement>document.getElementById('btnOneMore');
var sleepTextCommentElem = <HTMLInputElement>document.getElementById('textComment');
var sleepSelectBabyElem = <HTMLSelectElement>document.getElementById('selectBaby');
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
    sleepSelectBabyElem.selectedIndex = babyId;
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
    window.location.reload();
}

function sleepDeleteSleepEvent(eventId: number) {
    var event = new SleepEvent();
    event.eventId = eventId;
    event.deleteFlag = true;
    var data = { "sleepEvent": event }
    postDataToServer("/sleep", data, false, sleepInitialize);
    window.location.reload();
} 

function sleepSaveSleepEvent(recentEvent: any[]) {
    var event = new SleepEvent();
    event.eventId = recentEvent[0];
    event.dateTime = recentEvent[2];
    event.type = recentEvent[3];
    event.comment = recentEvent[4];
    var data = { "sleepEvent": event }
    postDataToServer("/sleep", data, false, sleepInitialize);
    window.location.reload();
} 
