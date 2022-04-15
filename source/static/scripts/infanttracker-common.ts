enum BathroomTypeEnum {
    none = 0,
    liquid = 1,
    solid = 2,
    both = 3
}

enum SleepTypeEnum {
    none = 0,
    awake = 1,
    asleep = 2
}

enum FeedSideEnum {
    none = 0,
    left = 1,
    right = 2
}

enum FeedBottleTypeEnum {
    none = 0,
    breast  = 1,
    formula = 2
}

enum LiquidUnitsEnum {
    none = 0,
    ounces = 1,
    milliliters = 2
}

enum WeightUnitsEnum {
    none = 0,
    pounds = 1,
    kilograms = 2
}

enum HeightUnitsEnum {
    none = 0,
    inches = 1,
    centimeters = 2
}

class Preferences {
    liquidUnits: LiquidUnitsEnum = 0;
    weightUnits: WeightUnitsEnum = 0;
    heightUnits: HeightUnitsEnum = 0;
}

class Baby {
    birthDate: string;
    firstName: string = "";
    lastName: string = "";
    birthWeight: string = "";
    birthHeight: string = "";
    abbreviation: string = "";
}

class BathroomEvent {
    eventId: number = null;
    babyId: number = null;
    type: BathroomTypeEnum = 0;
    dateTime: string;
    comment: string = ""
    deleteFlag: boolean = false;
}

class SleepEvent {
    eventId: number = null;
    babyId: number = null;
    type: SleepTypeEnum = 0;
    dateTime: string;
    comment: string = ""
    deleteFlag: boolean = false;
}

class FeedEvent {
    eventId: number = null;
    babyId: number = null;
    breastSide: FeedSideEnum = 0;
    pumpSide: FeedSideEnum = 0;
    bottleType: FeedBottleTypeEnum = 0;
    duration: number = 0;
    quantity: number = 0;
    dateTime: string;
    comment: string = ""
    deleteFlag: boolean = false;
}

function postDataToServer(url: string, data: any, goHome: boolean, callback: Function ) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = this.responseText;
            if (goHome) {
                window.open("/home",'_self');
            } else {
                if (callback) {
                    callback();
                }
                window.location.reload();
            }
        }
    };
    xhr.send(JSON.stringify(data));
} 

function toISOLocal(d: Date) {
    var z = n => ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    return d.getFullYear() + '-'
        + z(d.getMonth() + 1) + '-' +
        z(d.getDate()) + 'T' +
        z(d.getHours()) + ':' +
        z(d.getMinutes()) + ':' +
        z(d.getSeconds());
}