var feedEvent = new FeedEvent();
var feedInputDateTimeElem = <HTMLInputElement>document.getElementById('inputDateTime');
var feedBtnAwakeElem = <HTMLButtonElement>document.getElementById('btnAwake');
var feedBtnAsleepElem = <HTMLButtonElement>document.getElementById('btnAsleep');
var feedBtnDoneElem = <HTMLButtonElement>document.getElementById('btnDone');
var feedBtnOneMoreElem = <HTMLButtonElement>document.getElementById('btnOneMore');
var feedTextCommentElem = <HTMLInputElement>document.getElementById('textComment');
var feedSelectBabyElem = <HTMLSelectElement>document.getElementById('selectBaby');
feedInitialize()

function feedInitialize() {
    var today: Date = new Date();
    var dateTime = toISOLocal(today);
    feedUpdateDateTime(dateTime);
    // feedUpdateFeedType(FeedTypeEnum.none);

    // breastSide: FeedSideEnum = 0;
    // pumpSide: FeedSideEnum = 0;

    feedUpdateComment("");
}

function feedUpdateSubmitBtns() {
    if (feedEvent.babyId && feedEvent.babyId != 0 && feedEvent.type != FeedTypeEnum.none) {
        feedBtnDoneElem.disabled = false;
        feedBtnOneMoreElem.disabled = false;
    } else {
        feedBtnDoneElem.disabled = true;
        feedBtnOneMoreElem.disabled = true;
    }
}

function feedSelectBaby(babyId: number) {
    feedEvent.babyId = +babyId;
    feedSelectBabyElem.selectedIndex = babyId;
    feedUpdateSubmitBtns();
}

// function feedUpdateFeedType(type: FeedTypeEnum) {
//     feedEvent.type = feedEvent.type == type ? FeedTypeEnum.none : type;
//     switch (feedEvent.type){
//         case FeedTypeEnum.awake:
//             feedBtnAwakeElem.className = "btn btn-primary"
//             feedBtnAsleepElem.className = "btn btn-secondary"
//             break;
//         case FeedTypeEnum.asleep:
//             feedBtnAwakeElem.className = "btn btn-secondary"
//             feedBtnAsleepElem.className = "btn btn-primary"
//             break;
//         default:
//             feedBtnAwakeElem.className = "btn btn-secondary"
//             feedBtnAsleepElem.className = "btn btn-secondary"
//             break;
//     }
//     feedUpdateSubmitBtns();
// }

function feedUpdateDateTime(dateTime: string) {
    feedEvent.dateTime = dateTime;
    feedInputDateTimeElem.value = dateTime;
}

function feedUpdateComment(comment: string) {
    feedEvent.comment = comment;
    feedTextCommentElem.value = comment;
}

function feedAddFeedEvent(goHome: boolean) {
    var data = { "feedEvent": feedEvent }
    postDataToServer("/feed", data, goHome, feedInitialize);
}

function feedDeleteFeedEvent(eventId: number) {
    var event = new FeedEvent();
    event.eventId = eventId;
    event.deleteFlag = true;
    var data = { "feedEvent": event }
    postDataToServer("/feed", data, false, feedInitialize);
} 

function feedSaveFeedEvent(recentEvent: any[]) {
    var event = new FeedEvent();
    event.eventId = recentEvent[0];
    event.dateTime = recentEvent[2];
    event.type = recentEvent[3];
    event.comment = recentEvent[4];
    var data = { "feedEvent": event }
    postDataToServer("/feed", data, false, feedInitialize);
} 
