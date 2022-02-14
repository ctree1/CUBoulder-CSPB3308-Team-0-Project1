var BathroomEvent = /** @class */ (function () {
    function BathroomEvent() {
    }
    return BathroomEvent;
}());
var bathroomEvent = new BathroomEvent();
function selectBaby(babyId) {
    bathroomEvent.babyId = +babyId;
}
function updateComment(comment) {
    bathroomEvent.comment = comment;
}
function addBathroomEvent(event) {
    var xhr = new XMLHttpRequest();
    var url = "/bathroom";
    xhr.open("POST", url, true);
    event.babyId = bathroomEvent.babyId ? bathroomEvent.babyId : event.babyId;
    event.bathroomType = bathroomEvent.bathroomType ? bathroomEvent.bathroomType : event.bathroomType;
    event.time = bathroomEvent.time ? bathroomEvent.time : event.time;
    event.comment = bathroomEvent.comment ? bathroomEvent.comment : event.comment;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = this.responseText;
            window.location.reload();
        }
    };
    var data = JSON.stringify({ "bathroomEvent": event });
    xhr.send(data);
}
//# sourceMappingURL=infanttracker.js.map