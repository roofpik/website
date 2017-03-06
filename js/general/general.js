function loading(status, timer) {
    console.log('called');
    if (!timer) {
        timer = 10000;
    };
    if (status) {
        $('.loader-modal').fadeIn();
        setTimeout(function() {
            $('.loader-modal').fadeOut();
        }, timer);
    } else {
        $('.loader-modal').fadeOut();
    };
};

function checkLocalStorage(name) {
    if (localStorage.getItem(name) === null) {
        return false;
    } else {
        return true;
    }
}

function setLocalStorage(value, name, v) {
    var dataObject = {
        value: value,
        version: v
    }
    localStorage.setItem(name, JSON.stringify(dataObject));
}

function deleteLocalStorage(name) {
    localStorage.removeItem(name);
}

function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}


// encode parameters to base64
function encodeParams(param) {
    var parameter = '';
    for (key in param) {
        if (typeof(param[key]) == 'string') {
            param[key] = encodeURIComponent(param[key]);
        }
        if (parameter.length != 0) {
            parameter += '&';
        }
        parameter += key + '=' + param[key];
        // console.log(parameter);
    }
    return btoa(parameter);
}

// decode parameters from base64
function decodeParams(param) {
    var parameter = {};
    param = atob(param);
    param = param.split('&');
    for (key in param) {
        var field = param[key].split('=');
        parameter[field[0]] = decodeURIComponent(field[1]);
    }
    return parameter;
}

function convertToHyphenSeparated(data) {
    if (data == null || data == "") {
        return data;
    }

    data = data.trim();
    return data.split(" ").join("-").toLowerCase();
}


// Search variable

var searchObject = {
    'residential': [{
        icon: 'images/homeicon/CGHS.png',
        name: 'CGHS',
        id: 1,
        from:'local'
    }, {
        icon: 'images/homeicon/Apartment.png',
        name: 'Apartments',
        id: 2,
        from:'local'
    }, {
        icon: 'images/homeicon/Villa-penthouse.png',
        name: 'Penthouse / Villas',
        id: 3,
        from:'local'
    }, {
        icon: 'images/homeicon/Lowrise.png',
        name: 'Low Rise / Independent Floors',
        id: 4,
        from:'local'
    }],
    'commercial': [{
        icon: 'images/homeicon/Malls.png',
        name: 'Malls',
        id: 1,
        from:'local'
    }, {
        icon: 'images/homeicon/OpenMarkets.png',
        name: 'Open Markets',
        id: 2,
        from:'local'
    }, {
        icon: 'images/homeicon/Business Center.png',
        name: 'Business Centers',
        id: 3,
        from:'local'
    }, {
        icon: 'images/homeicon/ITParks.png',
        name: 'IT Parks',
        id: 3,
        from:'local'
    }, {
        icon: 'images/homeicon/Commercial.png',
        name: 'Co-work',
        id: 3,
        from:'local'
    }],
    'pg': [{
        icon: 'images/homeicon/Commercial.png',
        name: 'Girls Hostels',
        id: 1,
        from:'local'
    }, {
        icon: 'images/homeicon/Commercial.png',
        name: 'Boys Hostels',
        id: 2,
        from:'local'
    }, {
        icon: 'images/homeicon/Commercial.png',
        name: 'Co-host',
        id: 3,
        from:'local'
    }]
};
