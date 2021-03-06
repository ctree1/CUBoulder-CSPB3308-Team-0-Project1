var feedEvent = new FeedEvent();
var feedPreferences = new Preferences();
var feedBtnLeftBreastElem = document.getElementById('btnLeftBreast');
var feedBtnRightBreastElem = document.getElementById('btnRightBreast');
var feedBtnLeftPumpElem = document.getElementById('btnLeftPump');
var feedBtnRightPumpElem = document.getElementById('btnRightPump');
var feedBtnBottleBreastElem = document.getElementById('btnBottleBreast');
var feedBtnBottleFormulaElem = document.getElementById('btnBottleFormula');
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
var feedDivDurationElem = document.getElementById('divDuration');
var feedDivQuantityElem = document.getElementById('divQuantity');
var feedLabelPrefLiquidElems = document.getElementsByClassName('labelPrefLiquid');
var feedLabelPrefWeightElems = document.getElementsByClassName('labelPrefWeight');
var feedLabelPrefHeightElems = document.getElementsByClassName('labelPrefHeight');
var feedActive = false;
var feedDurationId = 0;
var feedQuantityBegin = 0;
var feedQuantityEnd = 0;
feedInitialize();
function feedInitialize() {
    var today = new Date();
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
        (feedEvent.breastSide != FeedSideEnum.none || feedEvent.pumpSide != FeedSideEnum.none ||
            feedEvent.bottleType != FeedBottleTypeEnum.none)) {
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
function updateUnits(label, units) {
    var re = /.*\(.*\)/;
    var matchTest = label.search(re);
    if (matchTest != -1) {
        var newLabel = label.replace(/\(.*\)/, "(" + units + ")");
        return newLabel;
    }
    else {
        return units;
    }
}
function feedDefaults(babyId, prefs) {
    // Update last baby
    feedEvent.babyId = +babyId;
    feedSelectBabyElem.selectedIndex = babyId;
    feedUpdateSubmitBtns();
    // Update unit preferences
    feedPreferences.liquidUnits = prefs[0];
    feedPreferences.weightUnits = prefs[1];
    feedPreferences.heightUnits = prefs[2];
    var elems = Array.prototype.slice.call(feedLabelPrefLiquidElems);
    switch (feedPreferences.liquidUnits) {
        case LiquidUnitsEnum.ounces:
            elems.forEach(function (elem) {
                elem.innerText = updateUnits(elem.innerText, "oz");
            });
            break;
        case LiquidUnitsEnum.milliliters:
            elems.forEach(function (elem) {
                elem.innerText = updateUnits(elem.innerText, "ml");
            });
            break;
        default:
            elems.forEach(function (elem) {
                elem.innerText = "";
            });
            break;
    }
    var elems = Array.prototype.slice.call(feedLabelPrefWeightElems);
    switch (feedPreferences.weightUnits) {
        case WeightUnitsEnum.pounds:
            elems.forEach(function (elem) {
                elem.innerText = updateUnits(elem.innerText, "lb");
            });
            break;
        case WeightUnitsEnum.kilograms:
            elems.forEach(function (elem) {
                elem.innerText = updateUnits(elem.innerText, "kg");
            });
            break;
        default:
            elems.forEach(function (elem) {
                elem.innerText = "";
            });
            break;
    }
    var elems = Array.prototype.slice.call(feedLabelPrefHeightElems);
    switch (feedPreferences.heightUnits) {
        case HeightUnitsEnum.inches:
            elems.forEach(function (elem) {
                elem.innerText = updateUnits(elem.innerText, "in");
            });
            break;
        case HeightUnitsEnum.centimeters:
            elems.forEach(function (elem) {
                elem.innerText = updateUnits(elem.innerText, "cm");
            });
            break;
        default:
            elems.forEach(function (elem) {
                elem.innerText = "";
            });
            break;
    }
}
function feedUpdateBreastSide(side) {
    feedEvent.breastSide = feedEvent.breastSide == side ? FeedSideEnum.none : side;
    feedEvent.pumpSide = FeedSideEnum.none;
    feedEvent.bottleType = FeedBottleTypeEnum.none;
    feedUpdateType();
}
function feedUpdatePumpSide(side) {
    feedEvent.breastSide = FeedSideEnum.none;
    feedEvent.pumpSide = feedEvent.pumpSide == side ? FeedSideEnum.none : side;
    feedEvent.bottleType = FeedBottleTypeEnum.none;
    feedUpdateType();
}
function feedUpdateBottleType(bottle) {
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
    feedBtnBottleBreastElem.className = "btn btn-secondary";
    feedBtnBottleFormulaElem.className = "btn btn-secondary";
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
        switch (feedEvent.breastSide) {
            case FeedSideEnum.left:
                feedBtnLeftBreastElem.className = "btn btn-primary";
                break;
            case FeedSideEnum.right:
                feedBtnRightBreastElem.className = "btn btn-primary";
                break;
        }
    }
    else if (feedEvent.pumpSide != FeedSideEnum.none || feedEvent.bottleType != FeedBottleTypeEnum.none) {
        feedEvent.duration = 0;
        feedDurationStop();
        feedDivQuantityElem.style.display = "block";
        switch (feedEvent.pumpSide) {
            case FeedSideEnum.left:
                feedBtnLeftPumpElem.className = "btn btn-primary";
                break;
            case FeedSideEnum.right:
                feedBtnRightPumpElem.className = "btn btn-primary";
                break;
        }
        switch (feedEvent.bottleType) {
            case FeedBottleTypeEnum.breast:
                feedBtnBottleBreastElem.className = "btn btn-primary";
                break;
            case FeedBottleTypeEnum.formula:
                feedBtnBottleFormulaElem.className = "btn btn-primary";
                break;
        }
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
function feedDurationChange(duration) {
    feedEvent.duration = duration;
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
    feedDurationStop();
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