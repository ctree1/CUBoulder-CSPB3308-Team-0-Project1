var feedEvent = new FeedEvent();

var feedBtnLeftBreastElem = <HTMLButtonElement>document.getElementById('btnLeftBreast');
var feedBtnRightBreastElem = <HTMLButtonElement>document.getElementById('btnRightBreast');
var feedBtnLeftPumpElem = <HTMLButtonElement>document.getElementById('btnLeftPump');
var feedBtnRightPumpElem = <HTMLButtonElement>document.getElementById('btnRightPump');
var feedBtnBottleElem = <HTMLButtonElement>document.getElementById('btnBottle');
var feedBtnFormulaElem = <HTMLButtonElement>document.getElementById('btnFormula');
var feedBtnDurationStartElem = <HTMLButtonElement>document.getElementById('btnDurationStart');
var feedBtnDurationStopElem = <HTMLButtonElement>document.getElementById('btnDurationStop');
var feedTextDurationEntryElem = <HTMLInputElement>document.getElementById('textDurationEntry');
var feedTextQuantityBeginEntryElem = <HTMLInputElement>document.getElementById('textQuantityBeginEntry');
var feedTextQuantityEndEntryElem = <HTMLInputElement>document.getElementById('textQuantityEndEntry');
var feedTextQuantityDiffEntryElem = <HTMLInputElement>document.getElementById('textQuantityDiffEntry');
var feedInputDateTimeElem = <HTMLInputElement>document.getElementById('inputDateTime');
var feedBtnDoneElem = <HTMLButtonElement>document.getElementById('btnDone');
var feedBtnOneMoreElem = <HTMLButtonElement>document.getElementById('btnOneMore');
var feedTextCommentElem = <HTMLInputElement>document.getElementById('textComment');
var feedSelectBabyElem = <HTMLSelectElement>document.getElementById('selectBaby');
var feedActive = false;
var feedDuration = 0;
var feedDurationId = 0;
var feedQuantityBegin = 120;
var feedQuantityEnd = 0;

feedInitialize()

function feedInitialize() {
    var today: Date = new Date();
    var dateTime = toISOLocal(today);
    feedUpdateDateTime(dateTime);
    feedUpdateBreastSide(FeedSideEnum.none);
    feedUpdatePumpSide(FeedSideEnum.none);
    feedUpdateBottleFormula(FeedBottleFormulaEnum.none);
    feedUpdateDurationStartStop();
    feedUpdateQuantityDiff();
    feedUpdateComment("");
    feedQuantityDiffChange(feedQuantityBegin - feedQuantityEnd);
    feedTextDurationEntryElem.value = feedDuration.toString();
    feedTextQuantityBeginEntryElem.value = feedQuantityBegin.toString();
    feedTextQuantityEndEntryElem.value = feedQuantityEnd.toString();
    feedTextQuantityDiffEntryElem.value = feedEvent.quantity.toString();
}

function feedUpdateSubmitBtns() {
    if (feedEvent.babyId && feedEvent.babyId != 0 &&
        (feedEvent.breastSide != FeedSideEnum.none || feedEvent.pumpSide != FeedSideEnum.none) &&
        feedEvent.bottleFormula != FeedBottleFormulaEnum.none) {
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

function feedUpdateBreastSide(side: FeedSideEnum) {
    feedEvent.breastSide = feedEvent.breastSide == side ? FeedSideEnum.none : side;
    switch (feedEvent.breastSide){
        case FeedSideEnum.left:
            feedBtnLeftBreastElem.className = "btn btn-primary"
            feedBtnRightBreastElem.className = "btn btn-secondary"
            break;
        case FeedSideEnum.right:
            feedBtnLeftBreastElem.className = "btn btn-secondary"
            feedBtnRightBreastElem.className = "btn btn-primary"
            break;
        default:
            feedBtnLeftBreastElem.className = "btn btn-secondary"
            feedBtnRightBreastElem.className = "btn btn-secondary"
            break;
    }
    feedUpdateSubmitBtns();
}

function feedUpdatePumpSide(side: FeedSideEnum) {
    feedEvent.pumpSide = feedEvent.pumpSide == side ? FeedSideEnum.none : side;
    switch (feedEvent.pumpSide){
        case FeedSideEnum.left:
            feedBtnLeftPumpElem.className = "btn btn-primary"
            feedBtnRightPumpElem.className = "btn btn-secondary"
            break;
        case FeedSideEnum.right:
            feedBtnLeftPumpElem.className = "btn btn-secondary"
            feedBtnRightPumpElem.className = "btn btn-primary"
            break;
        default:
            feedBtnLeftPumpElem.className = "btn btn-secondary"
            feedBtnRightPumpElem.className = "btn btn-secondary"
            break;
    }
    feedUpdateSubmitBtns();
}

function feedUpdateBottleFormula(bottleFormula: FeedBottleFormulaEnum) {
    feedEvent.bottleFormula = feedEvent.bottleFormula == bottleFormula ? FeedBottleFormulaEnum.none : bottleFormula;
    switch (feedEvent.bottleFormula){
        case FeedBottleFormulaEnum.bottle:
            feedBtnBottleElem.className = "btn btn-primary"
            feedBtnFormulaElem.className = "btn btn-secondary"
            break;
        case FeedBottleFormulaEnum.formula:
            feedBtnBottleElem.className = "btn btn-secondary"
            feedBtnFormulaElem.className = "btn btn-primary"
            break;
        default:
            feedBtnBottleElem.className = "btn btn-secondary"
            feedBtnFormulaElem.className = "btn btn-secondary"
            break;
    }
    feedUpdateSubmitBtns();
}

function feedUpdateDurationStartStop() {
    if (feedActive) {
        feedBtnDurationStartElem.className = "btn btn-primary"
        feedBtnDurationStopElem.className = "btn btn-secondary"
    } else {
        feedBtnDurationStartElem.className = "btn btn-secondary"
        feedBtnDurationStopElem.className = "btn btn-primary"
    }
    feedUpdateSubmitBtns();
}

function feedDurationStart() {
    feedActive = true;
    feedEvent.duration = 0;
    feedDurationId = setInterval(() => {
        feedEvent.duration += 1;
        feedTextDurationEntryElem.value = feedEvent.duration.toString();
    }, 1000);
    feedUpdateDurationStartStop();
}

function feedDurationStop() {
    feedActive = false;
    clearInterval(feedDurationId);
    feedTextDurationEntryElem.value = feedEvent.duration.toString();
    feedUpdateDurationStartStop();
}

function feedUpdateQuantityDiff() {
    feedTextQuantityDiffEntryElem.value = feedEvent.quantity.toString();
}

function feedQuantityBeginChange(qty: number) {
    feedQuantityBegin = qty;
    feedEvent.quantity = feedQuantityBegin - feedQuantityEnd;
    feedUpdateQuantityDiff();
}

function feedQuantityEndChange(qty: number) {
    feedQuantityEnd = qty;
    feedEvent.quantity = feedQuantityBegin - feedQuantityEnd;
    feedUpdateQuantityDiff();
}

function feedQuantityDiffChange(qty: number) {
    feedEvent.quantity = qty;
}

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
    //event.type = recentEvent[3];
    event.comment = recentEvent[4];
    var data = { "feedEvent": event }
    postDataToServer("/feed", data, false, feedInitialize);
} 
