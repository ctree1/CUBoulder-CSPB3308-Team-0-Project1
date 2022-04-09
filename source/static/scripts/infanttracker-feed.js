var feedEvent = new FeedEvent();
var feedBtnLeftBreastElem = document.getElementById('btnLeftBreast');
var feedBtnRightBreastElem = document.getElementById('btnRightBreast');
var feedBtnLeftPumpElem = document.getElementById('btnLeftPump');
var feedBtnRightPumpElem = document.getElementById('btnRightPump');
var feedBtnBottleElem = document.getElementById('btnBottle');
var feedBtnFormulaElem = document.getElementById('btnFormula');
var feedBtnDurationStartElem = document.getElementById('btnDurationStart');
var feedBtnDurationStopElem = document.getElementById('btnDurationStop');
var feedTextDurationEntryElem = document.getElementById('textDurationEntry');
var feedTextQuantityBeginEntryElem = document.getElementById('textQuantityBeginEntry');
var feedTextQuantityEndEntryElem = document.getElementById('textQuantityEndEntry');
var feedTextQuantityDiffEntryElem = document.getElementById('textQuantityDiffEntry');
var feedInputDateTimeElem = document.getElementById('inputDateTime');
var feedBtnDoneElem = document.getElementById('btnDone');
var feedBtnOneMoreElem = document.getElementById('btnOneMore');
var feedTextCommentElem = document.getElementById('textComment');
var feedSelectBabyElem = document.getElementById('selectBaby');
var feedActive = false;
var feedDuration = 0;
var feedDurationId = 0;
var feedQuantityBegin = 120;
var feedQuantityEnd = 0;
feedInitialize();
function feedInitialize() {
    var today = new Date();
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
    }
    else {
        feedBtnDoneElem.disabled = true;
        feedBtnOneMoreElem.disabled = true;
    }
}
function feedSelectBaby(babyId) {
    feedEvent.babyId = +babyId;
    feedSelectBabyElem.selectedIndex = babyId;
    feedUpdateSubmitBtns();
}
function feedUpdateBreastSide(side) {
    feedEvent.breastSide = feedEvent.breastSide == side ? FeedSideEnum.none : side;
    switch (feedEvent.breastSide) {
        case FeedSideEnum.left:
            feedBtnLeftBreastElem.className = "btn btn-primary";
            feedBtnRightBreastElem.className = "btn btn-secondary";
            break;
        case FeedSideEnum.right:
            feedBtnLeftBreastElem.className = "btn btn-secondary";
            feedBtnRightBreastElem.className = "btn btn-primary";
            break;
        default:
            feedBtnLeftBreastElem.className = "btn btn-secondary";
            feedBtnRightBreastElem.className = "btn btn-secondary";
            break;
    }
    feedUpdateSubmitBtns();
}
function feedUpdatePumpSide(side) {
    feedEvent.pumpSide = feedEvent.pumpSide == side ? FeedSideEnum.none : side;
    switch (feedEvent.pumpSide) {
        case FeedSideEnum.left:
            feedBtnLeftPumpElem.className = "btn btn-primary";
            feedBtnRightPumpElem.className = "btn btn-secondary";
            break;
        case FeedSideEnum.right:
            feedBtnLeftPumpElem.className = "btn btn-secondary";
            feedBtnRightPumpElem.className = "btn btn-primary";
            break;
        default:
            feedBtnLeftPumpElem.className = "btn btn-secondary";
            feedBtnRightPumpElem.className = "btn btn-secondary";
            break;
    }
    feedUpdateSubmitBtns();
}
function feedUpdateBottleFormula(bottleFormula) {
    feedEvent.bottleFormula = feedEvent.bottleFormula == bottleFormula ? FeedBottleFormulaEnum.none : bottleFormula;
    switch (feedEvent.bottleFormula) {
        case FeedBottleFormulaEnum.bottle:
            feedBtnBottleElem.className = "btn btn-primary";
            feedBtnFormulaElem.className = "btn btn-secondary";
            break;
        case FeedBottleFormulaEnum.formula:
            feedBtnBottleElem.className = "btn btn-secondary";
            feedBtnFormulaElem.className = "btn btn-primary";
            break;
        default:
            feedBtnBottleElem.className = "btn btn-secondary";
            feedBtnFormulaElem.className = "btn btn-secondary";
            break;
    }
    feedUpdateSubmitBtns();
}
function feedUpdateDurationStartStop() {
    if (feedActive) {
        feedBtnDurationStartElem.className = "btn btn-primary";
        feedBtnDurationStopElem.className = "btn btn-secondary";
    }
    else {
        feedBtnDurationStartElem.className = "btn btn-secondary";
        feedBtnDurationStopElem.className = "btn btn-primary";
    }
    feedUpdateSubmitBtns();
}
function feedDurationStart() {
    feedActive = true;
    feedEvent.duration = 0;
    feedDurationId = setInterval(function () {
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
function feedQuantityBeginChange(qty) {
    feedQuantityBegin = qty;
    feedEvent.quantity = feedQuantityBegin - feedQuantityEnd;
    feedUpdateQuantityDiff();
}
function feedQuantityEndChange(qty) {
    feedQuantityEnd = qty;
    feedEvent.quantity = feedQuantityBegin - feedQuantityEnd;
    feedUpdateQuantityDiff();
}
function feedQuantityDiffChange(qty) {
    feedEvent.quantity = qty;
}
function feedUpdateDateTime(dateTime) {
    feedEvent.dateTime = dateTime;
    feedInputDateTimeElem.value = dateTime;
}
function feedUpdateComment(comment) {
    feedEvent.comment = comment;
    feedTextCommentElem.value = comment;
}
function feedAddFeedEvent(goHome) {
    var data = { "feedEvent": feedEvent };
    postDataToServer("/feed", data, goHome, feedInitialize);
}
function feedDeleteFeedEvent(eventId) {
    var event = new FeedEvent();
    event.eventId = eventId;
    event.deleteFlag = true;
    var data = { "feedEvent": event };
    postDataToServer("/feed", data, false, feedInitialize);
}
function feedSaveFeedEvent(recentEvent) {
    var event = new FeedEvent();
    event.eventId = recentEvent[0];
    event.dateTime = recentEvent[2];
    //event.type = recentEvent[3];
    event.comment = recentEvent[4];
    var data = { "feedEvent": event };
    postDataToServer("/feed", data, false, feedInitialize);
}
//# sourceMappingURL=infanttracker-feed.js.map