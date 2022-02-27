enum BathroomTypeEnum {
    none = 0,
    liquid = 1,
    solid = 2,
    both = 3
}

enum LiquidUnits {
    none = 0,
    oz = 1,
    ml = 2
}

enum WeightUnits {
    none = 0,
    oz = 1,
    ml = 2
}

class Baby {
    birthDate: Date = null;
    firstName: string = "";
    lastName: string = "";
    birthWeight: string = "";
    birthHeight: string = "";
}

class BathroomEvent {
    babyId: number = null;
    type: BathroomTypeEnum = 0;
    dateTime: string;
    comment: string = ""
}

function postDataToServer(url: string, data: any, goHome: boolean) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = this.responseText;
            if (goHome) {
                window.open("/home",'_self');
            } else {
                initialize();
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