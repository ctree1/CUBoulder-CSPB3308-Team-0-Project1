var feedEvent = new FeedEvent();
var preferences = new Preferences();

var feedBtnLeftBreastElem = <HTMLButtonElement>document.getElementById('btnLeftBreast');
var feedBtnRightBreastElem = <HTMLButtonElement>document.getElementById('btnRightBreast');
var feedBtnLeftPumpElem = <HTMLButtonElement>document.getElementById('btnLeftPump');
var feedBtnRightPumpElem = <HTMLButtonElement>document.getElementById('btnRightPump');
var feedBtnBottleBreastElem = <HTMLButtonElement>document.getElementById('btnBottleBreast');
var feedBtnBottleFormulaElem = <HTMLButtonElement>document.getElementById('btnBottleFormula');
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
var feedDivDurationElem = <HTMLDivElement>document.getElementById('divDuration');
var feedDivQuantityElem = <HTMLDivElement>document.getElementById('divQuantity');
var feedActive = false;
var feedDurationId = 0;
var feedQuantityBegin = 0;
var feedQuantityEnd = 0;

feedInitialize()

function feedInitialize() {
    var today: Date = new Date();
    var dateTime = toISOLocal(today);
    feedUpdateDateTime(dateTime);
    feedUpdateBreastSide(FeedSideEnum.none);
    feedUpdatePumpSide(FeedSideEnum.none);
    feedUpdateBottleType(FeedBottleTypeEnum.none);
    feedUpdateDurationStartStop();
    feedUpdateQuantityDiff();
    feedUpdateComment("");
    feedQuantityDiffChange(feedQuantityBegin - feedQuantityEnd);
    feedTextDurationEntryElem.value = feedEvent.duration.toString();
    feedTextQuantityBeginEntryElem.value = feedQuantityBegin.toString();
    feedTextQuantityEndEntryElem.value = feedQuantityEnd.toString();
    feedTextQuantityDiffEntryElem.value = feedEvent.quantity.toString();
    feedDivDurationElem.style.display = "none";
    feedDivQuantityElem.style.display = "none";
}

function feedUpdateSubmitBtns() {
    if (feedEvent.babyId && feedEvent.babyId != 0 &&
        (feedEvent.breastSide != FeedSideEnum.none || feedEvent.pumpSide != FeedSideEnum.none) &&
        feedEvent.bottleType != FeedBottleTypeEnum.none) {
        feedBtnDoneElem.disabled = false;
        feedBtnOneMoreElem.disabled = false;
    } else {
        feedBtnDoneElem.disabled = true;
        feedBtnOneMoreElem.disabled = true;
    }
}

function feedDefaults(babyId: number, [liquidUnits, weightUnits, heightUnits]) {
    feedEvent.babyId = +babyId;
    feedSelectBabyElem.selectedIndex = babyId;
    feedUpdateSubmitBtns();

    preferences.liquidUnits = liquidUnits;
    preferences.weightUnits = weightUnits;
    preferences.heightUnits = heightUnits;
    // Now updates labels
}

function feedUpdateBreastSide(side: FeedSideEnum) {
    feedEvent.breastSide = feedEvent.breastSide == side ? FeedSideEnum.none : side;
    feedEvent.pumpSide = FeedSideEnum.none;
    feedEvent.bottleType = FeedBottleTypeEnum.none
    feedUpdateType();
}

function feedUpdatePumpSide(side: FeedSideEnum) {
    feedEvent.breastSide = FeedSideEnum.none;
    feedEvent.pumpSide = feedEvent.pumpSide == side ? FeedSideEnum.none : side;
    feedEvent.bottleType = FeedBottleTypeEnum.none
    feedUpdateType();
}

function feedUpdateBottleType(bottle: FeedBottleTypeEnum) {
    feedEvent.breastSide = FeedSideEnum.none;
    feedEvent.pumpSide = FeedSideEnum.none;
    feedEvent.bottleType = feedEvent.bottleType == bottle ? FeedBottleTypeEnum.none : bottle;
    feedUpdateType();
}

function feedUpdateType() {
    feedBtnLeftBreastElem.className = "btn btn-secondary";
    feedBtnRightBreastElem.className = "btn btn-secondary";
    feedBtnLeftPumpElem.className = "btn btn-secondary";
    feedBtnRightPumpElem.className = "btn btn-secondary";
    feedBtnBottleBreastElem.className = "btn btn-secondary"
    feedBtnBottleFormulaElem.className = "btn btn-secondary"
    feedDivDurationElem.style.display = "none";
    feedDivQuantityElem.style.display = "none";
    if (feedEvent.breastSide != FeedSideEnum.none) {
        feedQuantityBegin = 0;
        feedQuantityEnd = 0;
        feedQuantityDiffChange(feedQuantityBegin - feedQuantityEnd);
        feedTextQuantityBeginEntryElem.value = feedQuantityBegin.toString();
        feedTextQuantityEndEntryElem.value = feedQuantityEnd.toString();
        feedUpdateQuantityDiff();
        feedDivDurationElem.style.display = "block";
        switch (feedEvent.breastSide){
            case FeedSideEnum.left:
                feedBtnLeftBreastElem.className = "btn btn-primary";
                break;
            case FeedSideEnum.right:
                feedBtnRightBreastElem.className = "btn btn-primary";
                break;
        }
    } else if (feedEvent.pumpSide != FeedSideEnum.none || feedEvent.bottleType != FeedBottleTypeEnum.none) {
        feedEvent.duration = 0;
        feedDurationStop();
        feedDivQuantityElem.style.display = "block";
        switch (feedEvent.pumpSide){
            case FeedSideEnum.left:
                feedBtnLeftPumpElem.className = "btn btn-primary";
                break;
            case FeedSideEnum.right:
                feedBtnRightPumpElem.className = "btn btn-primary";
                break;
        }
        switch (feedEvent.bottleType){
            case FeedBottleTypeEnum.breast:
                feedBtnBottleBreastElem.className = "btn btn-primary"
                break;
            case FeedBottleTypeEnum.formula:
                feedBtnBottleFormulaElem.className = "btn btn-primary"
                break;
        }
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
