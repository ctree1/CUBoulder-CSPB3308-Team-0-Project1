var sleepEvent = new SleepEvent();
var sleepInputDateTimeElem = document.getElementById('inputDateTime');
var sleepBtnAwakeElem = document.getElementById('btnAwake');
var sleepBtnAsleepElem = document.getElementById('btnAsleep');
var sleepBtnDoneElem = document.getElementById('btnDone');
var sleepBtnOneMoreElem = document.getElementById('btnOneMore');
var sleepTextCommentElem = document.getElementById('textComment');
var sleepSelectBabyElem = document.getElementById('selectBaby');
sleepInitialize();
function sleepInitialize() {
    var today = new Date();
    var dateTime = toISOLocal(today);
    sleepUpdateDateTime(dateTime);
    sleepUpdateSleepType(SleepTypeEnum.none);
    sleepUpdateComment("");
}
function sleepUpdateSubmitBtns() {
    if (sleepEvent.babyId && sleepEvent.babyId != 0 && sleepEvent.type != SleepTypeEnum.none) {
        sleepBtnDoneElem.disabled = false;
        sleepBtnOneMoreElem.disabled = false;
    }
    else {
        sleepBtnDoneElem.disabled = true;
        sleepBtnOneMoreElem.disabled = true;
    }
}
function sleepSelectBaby(babyId) {
    sleepEvent.babyId = +babyId;
    sleepSelectBabyElem.selectedIndex = babyId;
    sleepUpdateSubmitBtns();
}
function sleepUpdateSleepType(type) {
    sleepEvent.type = sleepEvent.type == type ? SleepTypeEnum.none : type;
    switch (sleepEvent.type) {
        case SleepTypeEnum.awake:
            sleepBtnAwakeElem.className = "btn btn-primary";
            sleepBtnAsleepElem.className = "btn btn-secondary";
            break;
        case SleepTypeEnum.asleep:
            sleepBtnAwakeElem.className = "btn btn-secondary";
            sleepBtnAsleepElem.className = "btn btn-primary";
            break;
        default:
            sleepBtnAwakeElem.className = "btn btn-secondary";
            sleepBtnAsleepElem.className = "btn btn-secondary";
            break;
    }
    sleepUpdateSubmitBtns();
}
function sleepUpdateDateTime(dateTime) {
    sleepEvent.dateTime = dateTime;
    sleepInputDateTimeElem.value = dateTime;
}
function sleepUpdateComment(comment) {
    sleepEvent.comment = comment;
    sleepTextCommentElem.value = comment;
}
function sleepAddSleepEvent(goHome) {
    var data = { "sleepEvent": sleepEvent };
    postDataToServer("/sleep", data, goHome, sleepInitialize);
    window.location.reload();
}
function sleepDeleteSleepEvent(eventId) {
    var event = new SleepEvent();
    event.eventId = eventId;
    event.deleteFlag = true;
    var data = { "sleepEvent": event };
    postDataToServer("/sleep", data, false, sleepInitialize);
    window.location.reload();
}
function sleepSaveSleepEvent(recentEvent) {
    var event = new SleepEvent();
    event.eventId = recentEvent[0];
    event.dateTime = recentEvent[2];
    event.type = recentEvent[3];
    event.comment = recentEvent[4];
    var data = { "sleepEvent": event };
    postDataToServer("/sleep", data, false, sleepInitialize);
    window.location.reload();
}
//# sourceMappingURL=infanttracker-sleep.js.map