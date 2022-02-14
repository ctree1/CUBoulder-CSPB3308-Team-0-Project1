class BathroomEvent {
    babyId: number;
    bathroomType: string;
    time: string
    comment: string;
}

var bathroomEvent = new BathroomEvent();

function selectBaby(babyId: number) {
    bathroomEvent.babyId = +babyId;
}

function updateComment(comment: string) {
    bathroomEvent.comment = comment;
}

function addBathroomEvent(event: BathroomEvent) {
    let xhr = new XMLHttpRequest();
    let url = "/bathroom";
    xhr.open("POST", url, true);
    event.babyId = bathroomEvent.babyId ? bathroomEvent.babyId : event.babyId
    event.bathroomType = bathroomEvent.bathroomType ? bathroomEvent.bathroomType : event.bathroomType
    event.time = bathroomEvent.time ? bathroomEvent.time : event.time
    event.comment = bathroomEvent.comment ? bathroomEvent.comment : event.comment
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