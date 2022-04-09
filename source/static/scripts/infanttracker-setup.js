var baby = new Baby();
var preferences = new Preferences();
var dateElem = document.getElementById('inputBirthDate');
var inputFirstNameElem = document.getElementById('inputFirstName');
var inputLastNameElem = document.getElementById('inputLastName');
var inputAbbrevElem = document.getElementById('inputAbbrev');
var inputBirthWeightElem = document.getElementById('inputBirthWeight');
var inputBirthHeightElem = document.getElementById('inputBirthHeight');
var btnLiquidOzElem = document.getElementById('btnLiquidOz');
var btnLiquidMlElem = document.getElementById('btnLiquidMl');
var btnWeightLbElem = document.getElementById('btnWeightLb');
var btnWeightKgElem = document.getElementById('btnWeightKg');
var btnHeightInElem = document.getElementById('btnHeightIn');
var btnHeightCmElem = document.getElementById('btnHeightCm');
var btnOneMoreElem = document.getElementById('btnOneMore');
var btnDoneElem = document.getElementById('btnDone');
var btnSaveElem = document.getElementById('btnSave');
setupInitialize();
function setupInitialize() {
    setupUpdateDate("");
    setupUpdateFirstName("");
    setupUpdateLastName("");
    setupUpdateAbbrev("");
    setupUpdateBirthWeight("");
    setupUpdateBirthHeight("");
}
function setupUpdateSubmitBtns() {
    if (baby.birthDate && baby.firstName.length != 0 && baby.lastName.length != 0) {
        btnDoneElem.disabled = false;
        btnOneMoreElem.disabled = false;
    }
    else {
        btnDoneElem.disabled = true;
        btnOneMoreElem.disabled = true;
    }
}
function setupUpdateSaveBtn() {
    if (preferences.weightUnits != WeightUnitsEnum.none &&
        preferences.liquidUnits != LiquidUnitsEnum.none &&
        preferences.heightUnits != HeightUnitsEnum.none) {
        btnSaveElem.disabled = false;
    }
    else {
        btnSaveElem.disabled = true;
    }
}
function setupUpdateLiquidUnits(units) {
    preferences.liquidUnits = units;
    switch (units) {
        case LiquidUnitsEnum.ounces:
            btnLiquidOzElem.className = "btn btn-primary";
            btnLiquidMlElem.className = "btn btn-secondary";
            break;
        case LiquidUnitsEnum.milliliters:
            btnLiquidOzElem.className = "btn btn-secondary";
            btnLiquidMlElem.className = "btn btn-primary";
            break;
        default:
            btnLiquidOzElem.className = "btn btn-secondary";
            btnLiquidMlElem.className = "btn btn-secondary";
            break;
    }
    setupUpdateSaveBtn();
}
function setupUpdateWeightUnits(units) {
    preferences.weightUnits = units;
    switch (units) {
        case WeightUnitsEnum.pounds:
            btnWeightLbElem.className = "btn btn-primary";
            btnWeightKgElem.className = "btn btn-secondary";
            break;
        case WeightUnitsEnum.kilograms:
            btnWeightLbElem.className = "btn btn-secondary";
            btnWeightKgElem.className = "btn btn-primary";
            break;
        default:
            btnWeightLbElem.className = "btn btn-secondary";
            btnWeightKgElem.className = "btn btn-secondary";
            break;
    }
    setupUpdateSaveBtn();
}
function setupUpdateHeightUnits(units) {
    preferences.heightUnits = units;
    switch (units) {
        case HeightUnitsEnum.inches:
            btnHeightInElem.className = "btn btn-primary";
            btnHeightCmElem.className = "btn btn-secondary";
            break;
        case HeightUnitsEnum.centimeters:
            btnHeightInElem.className = "btn btn-secondary";
            btnHeightCmElem.className = "btn btn-primary";
            break;
        default:
            btnHeightInElem.className = "btn btn-secondary";
            btnHeightCmElem.className = "btn btn-secondary";
            break;
    }
    setupUpdateSaveBtn();
}
function setupUpdateDate(date) {
    baby.birthDate = date;
    dateElem.value = date;
    setupUpdateSubmitBtns();
}
function setupUpdateFirstName(name) {
    baby.firstName = name;
    inputFirstNameElem.value = name;
    setupUpdateSubmitBtns();
}
function setupUpdateLastName(name) {
    baby.lastName = name;
    inputLastNameElem.value = name;
    setupUpdateSubmitBtns();
}
function setupUpdateAbbrev(abbrev) {
    baby.abbreviation = abbrev;
    inputAbbrevElem.value = abbrev;
    setupUpdateSubmitBtns();
}
function setupUpdateBirthWeight(weight) {
    baby.birthWeight = weight;
    inputBirthWeightElem.value = weight;
    setupUpdateSubmitBtns();
}
function setupUpdateBirthHeight(height) {
    baby.birthHeight = height;
    inputBirthHeightElem.value = height;
    setupUpdateSubmitBtns();
}
function setupAddBaby(goHome) {
    var data = { "baby": baby };
    postDataToServer("/setup", data, goHome, setupInitialize);
}
function setupSavePrefs() {
    var data = { "preferences": preferences };
    postDataToServer("/setup", data, false, null);
}
//# sourceMappingURL=infanttracker-setup.js.map