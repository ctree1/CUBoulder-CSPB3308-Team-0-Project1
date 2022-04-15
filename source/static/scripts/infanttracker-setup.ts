var setupBaby = new Baby();
var setupPreferences  = new Preferences();
var setupLastPreferences  = new Preferences();
var setupDateElem = <HTMLInputElement>document.getElementById('inputBirthDate');
var setupInputFirstNameElem = <HTMLInputElement>document.getElementById('inputFirstName');
var setupInputLastNameElem = <HTMLInputElement>document.getElementById('inputLastName');
var setupInputAbbrevElem = <HTMLInputElement>document.getElementById('inputAbbrev');
var setupInputBirthWeightElem = <HTMLInputElement>document.getElementById('inputBirthWeight');
var setupInputBirthHeightElem = <HTMLInputElement>document.getElementById('inputBirthHeight');
var setupBtnLiquidOzElem = <HTMLInputElement>document.getElementById('btnLiquidOz');
var setupBtnLiquidMlElem = <HTMLInputElement>document.getElementById('btnLiquidMl');
var setupBtnWeightLbElem = <HTMLInputElement>document.getElementById('btnWeightLb');
var setupBtnWeightKgElem = <HTMLInputElement>document.getElementById('btnWeightKg');
var setupBtnHeightInElem = <HTMLInputElement>document.getElementById('btnHeightIn');
var setupBtnHeightCmElem = <HTMLInputElement>document.getElementById('btnHeightCm');
var setupBtnOneMoreElem = <HTMLInputElement>document.getElementById('btnOneMore');
var setupBtnDoneElem = <HTMLInputElement>document.getElementById('btnDone');
var setupBtnSaveElem = <HTMLInputElement>document.getElementById('btnSave');
var setupLabelPrefLiquidElems = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('labelPrefLiquid');
var setupLabelPrefWeightElems = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('labelPrefWeight');
var setupLabelPrefHeightElems = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('labelPrefHeight');
setupInitialize()

function setupInitialize() {
    setupUpdateDate("");
    setupUpdateFirstName("");
    setupUpdateLastName("");
    setupUpdateAbbrev("");
    setupUpdateBirthWeight("");
    setupUpdateBirthHeight("");
}

function setupUpdateSubmitBtns() {
    if (setupBaby.birthDate && setupBaby.firstName.length != 0 && setupBaby.lastName.length != 0) {
        setupBtnDoneElem.disabled = false;
        setupBtnOneMoreElem.disabled = false;
    } else {
        setupBtnDoneElem.disabled = true;
        setupBtnOneMoreElem.disabled = true;
    }
}

function setupUpdateSaveBtn() {
    if ((setupPreferences.liquidUnits != LiquidUnitsEnum.none &&
        setupPreferences.weightUnits !=  WeightUnitsEnum.none &&
        setupPreferences.heightUnits != HeightUnitsEnum.none) &&
        setupLastPreferences.liquidUnits != setupPreferences.liquidUnits ||
        setupLastPreferences.weightUnits != setupPreferences.weightUnits ||
        setupLastPreferences.heightUnits != setupPreferences.heightUnits) {
        setupBtnSaveElem.disabled = false;
    } else {
        setupBtnSaveElem.disabled = true;
    }
}

function setupDefaults(prefs : number[]) {
    setupLastPreferences.liquidUnits = prefs[0];
    setupLastPreferences.weightUnits = prefs[1];
    setupLastPreferences.heightUnits = prefs[2];
    var elems = Array.prototype.slice.call(setupLabelPrefLiquidElems)
    switch (setupLastPreferences.liquidUnits) {
        case LiquidUnitsEnum.ounces:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "oz";
            });
            break;
        case LiquidUnitsEnum.milliliters:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "ml";
            });
            break;
        default:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "";
            });
            break;
    }
    var elems = Array.prototype.slice.call(setupLabelPrefWeightElems)
    switch (setupLastPreferences.weightUnits) {
        case WeightUnitsEnum.pounds:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "lb";
            });
            break;
        case WeightUnitsEnum.kilograms:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "kg";
            });
            break;
        default:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "";
            });
            break;
    }
    var elems = Array.prototype.slice.call(setupLabelPrefHeightElems)
    switch (setupLastPreferences.heightUnits) {
        case HeightUnitsEnum.inches:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "in";
            });
            break;
        case HeightUnitsEnum.centimeters:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "cm";
            });
            break;
        default:
            elems.forEach((elem: HTMLElement) => {
                elem.innerText = "";
            });
            break;
    }
    setupUpdateLiquidUnits(prefs[0]);
    setupUpdateWeightUnits(prefs[1]);
    setupUpdateHeightUnits(prefs[2]);
}

function setupUpdateLiquidUnits(units: LiquidUnitsEnum) {
    setupPreferences.liquidUnits = units;
    switch (units){
        case LiquidUnitsEnum.ounces:
            setupBtnLiquidOzElem.className = "btn btn-primary"
            setupBtnLiquidMlElem.className = "btn btn-secondary"
            break;
        case LiquidUnitsEnum.milliliters:
            setupBtnLiquidOzElem.className = "btn btn-secondary"
            setupBtnLiquidMlElem.className = "btn btn-primary"
            break;
        default:
            setupBtnLiquidOzElem.className = "btn btn-secondary"
            setupBtnLiquidMlElem.className = "btn btn-secondary"
            break;
    }
    setupUpdateSaveBtn();
}

function setupUpdateWeightUnits(units: WeightUnitsEnum) {
    setupPreferences.weightUnits = units;
    switch (units){
        case WeightUnitsEnum.pounds:
            setupBtnWeightLbElem.className = "btn btn-primary"
            setupBtnWeightKgElem.className = "btn btn-secondary"
            break;
        case WeightUnitsEnum.kilograms:
            setupBtnWeightLbElem.className = "btn btn-secondary"
            setupBtnWeightKgElem.className = "btn btn-primary"
            break;
        default:
            setupBtnWeightLbElem.className = "btn btn-secondary"
            setupBtnWeightKgElem.className = "btn btn-secondary"
            break;
    }
    setupUpdateSaveBtn();
}

function setupUpdateHeightUnits(units: HeightUnitsEnum) {
    setupPreferences.heightUnits = units;
    switch (units){
        case HeightUnitsEnum.inches:
            setupBtnHeightInElem.className = "btn btn-primary"
            setupBtnHeightCmElem.className = "btn btn-secondary"
            break;
        case HeightUnitsEnum.centimeters:
            setupBtnHeightInElem.className = "btn btn-secondary"
            setupBtnHeightCmElem.className = "btn btn-primary"
            break;
        default:
            setupBtnHeightInElem.className = "btn btn-secondary"
            setupBtnHeightCmElem.className = "btn btn-secondary"
            break;
    }
    setupUpdateSaveBtn();
}

function setupUpdateDate(date: string) {
    setupBaby.birthDate = date;
    setupDateElem.value = date;
    setupUpdateSubmitBtns();
}

function setupUpdateFirstName(name: string) {
    setupBaby.firstName = name;
    setupInputFirstNameElem.value = name;
    setupUpdateSubmitBtns();
}

function setupUpdateLastName(name: string) {
    setupBaby.lastName = name;
    setupInputLastNameElem.value = name;
    setupUpdateSubmitBtns();
}

function setupUpdateAbbrev(abbrev: string) {
    setupBaby.abbreviation = abbrev;
    setupInputAbbrevElem.value = abbrev;
    setupUpdateSubmitBtns();
}

function setupUpdateBirthWeight(weight: string) {
    setupBaby.birthWeight = weight;
    setupInputBirthWeightElem.value = weight;
    setupUpdateSubmitBtns();
}

function setupUpdateBirthHeight(height: string) {
    setupBaby.birthHeight = height;
    setupInputBirthHeightElem.value = height;
    setupUpdateSubmitBtns();
}

function setupAddBaby(goHome: boolean) {
    var data = { "baby": setupBaby }
    postDataToServer("/setup", data, goHome, setupInitialize);
} 

function setupSavePrefs() {
    var data = { "preferences": setupPreferences }
    postDataToServer("/setup", data, false, null);
}