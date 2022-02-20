enum BathroomTypeEnum {
    none = 0,
    liquid = 1,
    solid = 2,
    both = 3
}

class BathroomEvent {
    babyId: number = null;
    type: BathroomTypeEnum = 0;
    dateTime: string;
    comment: string = ""
}

var bathroomEvent = new BathroomEvent();
var timeElem = <HTMLInputElement>document.getElementById('inputTime');
var btnLiquidElem = <HTMLInputElement>document.getElementById('btnLiquid');
var btnSolidElem = <HTMLInputElement>document.getElementById('btnSolid');
var btnBothElem = <HTMLInputElement>document.getElementById('btnBoth');
var btnDoneElem = <HTMLInputElement>document.getElementById('btnBoth');
var btnOneMoreElem = <HTMLInputElement>document.getElementById('btnBoth');
var btnDoneElem = <HTMLInputElement>document.getElementById('btnDone');
var btnOneMoreElem = <HTMLInputElement>document.getElementById('btnOneMore');
var today: Date = new Date();
var dateTime = toISOLocal(today);
timeElem.value = dateTime;
bathroomEvent.dateTime = dateTime;

function updateSubmitBtns() {
    if (bathroomEvent.babyId && bathroomEvent.babyId != 0 && bathroomEvent.type != BathroomTypeEnum.none) {
        btnDoneElem.disabled = false;
        btnOneMoreElem.disabled = false;
    } else {
        btnDoneElem.disabled = true;
        btnOneMoreElem.disabled = true;
    }
}

function selectBaby(babyId: number) {
    bathroomEvent.babyId = +babyId;
    updateSubmitBtns();
}

function updateBathroomType(type: BathroomTypeEnum) {

    bathroomEvent.type = bathroomEvent.type == type ? BathroomTypeEnum.none : type;
    switch (bathroomEvent.type){
        case BathroomTypeEnum.liquid:
            btnLiquidElem.className = "btn btn-primary"
            btnSolidElem.className = "btn btn-secondary"
            btnBothElem.className = "btn btn-secondary"
            break;
        case BathroomTypeEnum.solid:
            btnLiquidElem.className = "btn btn-secondary"
            btnSolidElem.className = "btn btn-primary"
            btnBothElem.className = "btn btn-secondary"
            break;
        case BathroomTypeEnum.both:
            btnLiquidElem.className = "btn btn-secondary"
            btnSolidElem.className = "btn btn-secondary"
            btnBothElem.className = "btn btn-primary"
            break;
        default:
            btnLiquidElem.className = "btn btn-secondary"
            btnSolidElem.className = "btn btn-secondary"
            btnBothElem.className = "btn btn-secondary"
            break;
    }
    updateSubmitBtns();
}

function updateTime(time: string) {
    bathroomEvent.dateTime = time;
}

function updateComment(comment: string) {
    bathroomEvent.comment = comment;
}

function addBathroomEvent() {
    let xhr = new XMLHttpRequest();
    let url = "/bathroom";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = this.responseText;
            window.location.reload();
        }
    };
    var data = JSON.stringify({ "bathroomEvent": bathroomEvent });
    xhr.send(data);
} 

function toISOLocal(d: Date) {
var z  = n =>  ('0' + n).slice(-2);
var zz = n => ('00' + n).slice(-3);

return d.getFullYear() + '-'
        + z(d.getMonth()+1) + '-' +
        z(d.getDate()) + 'T' +
        z(d.getHours()) + ':'  + 
        z(d.getMinutes()) + ':' +
        z(d.getSeconds()); 
}