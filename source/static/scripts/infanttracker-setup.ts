var baby = new Baby();
var dateElem = <HTMLInputElement>document.getElementById('inputBirthDate');
var inputFirstNameElem = <HTMLInputElement>document.getElementById('inputFirstName');
var inputLastNameElem = <HTMLInputElement>document.getElementById('inputLastName');
var inputBirthWeightElem = <HTMLInputElement>document.getElementById('inputBirthWeight');
var inputBirthHeightElem = <HTMLInputElement>document.getElementById('inputBirthHeight');

var btnLiquidOzElem = <HTMLInputElement>document.getElementById('btnLiquidOz');
var btnLiquidMlElem = <HTMLInputElement>document.getElementById('btnLiquidMl');
var btnWeightLbElem = <HTMLInputElement>document.getElementById('btnWeightLb');
var btnWeightKgElem = <HTMLInputElement>document.getElementById('btnWeightKg');
initializeSetup()

function initializeSetup() {
    var today: Date = new Date();
    var dateTime = toISOLocal(today);
    //updateTime(dateTime);
    updateBathroomType(BathroomTypeEnum.none);
    updateComment("");
}

// function updateSubmitBtns() {
//     if (baby.babyId && baby.babyId != 0 && baby.type != BathroomTypeEnum.none) {
//         btnDoneElem.disabled = false;
//         btnOneMoreElem.disabled = false;
//     } else {
//         btnDoneElem.disabled = true;
//         btnOneMoreElem.disabled = true;
//     }
// }

// function selectBaby(babyId: number) {
//     baby.babyId = +babyId;
//     updateSubmitBtns();
// }

// function updateBathroomType(type: BathroomTypeEnum) {

//     baby.type = baby.type == type ? BathroomTypeEnum.none : type;
//     switch (baby.type){
//         case BathroomTypeEnum.liquid:
//             btnLiquidElem.className = "btn btn-primary"
//             btnSolidElem.className = "btn btn-secondary"
//             btnBothElem.className = "btn btn-secondary"
//             break;
//         case BathroomTypeEnum.solid:
//             btnLiquidElem.className = "btn btn-secondary"
//             btnSolidElem.className = "btn btn-primary"
//             btnBothElem.className = "btn btn-secondary"
//             break;
//         case BathroomTypeEnum.both:
//             btnLiquidElem.className = "btn btn-secondary"
//             btnSolidElem.className = "btn btn-secondary"
//             btnBothElem.className = "btn btn-primary"
//             break;
//         default:
//             btnLiquidElem.className = "btn btn-secondary"
//             btnSolidElem.className = "btn btn-secondary"
//             btnBothElem.className = "btn btn-secondary"
//             break;
//     }
//     updateSubmitBtns();
// }

// function updateTime(dateTime: string) {
//     baby.dateTime = dateTime;
//     dateElem.value = dateTime;
// }

// function updateComment(comment: string) {
//     baby.comment = comment;
//     textCommentElem.value = comment;
// }

// function addBathroomEvent(goHome: boolean) {
//     let xhr = new XMLHttpRequest();
//     let url = "/bathroom";
//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             var result = this.responseText;
//             if (goHome) {
//                 window.open("/home",'_self');
//                 //window.location.replace('https://www.example.com/');
//             } else {
//                 initialize();
//             }
//         }
//     };
//     var data = JSON.stringify({ "bathroomEvent": baby });
//     xhr.send(data);
// } 