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

function checkLocalStorage(name){
    if (localStorage.getItem(name) === null) {
        return false;
    } else {
        return true;
    }
}

function setLocalStorage(value, name, v){
    var dataObject = {
        value: value,
        version: v
    }
    localStorage.setItem(name, JSON.stringify(dataObject));
}

function deleteLocalStorage(name){
    localStorage.removeItem(name);
}

function getLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
}




// Search variable

var searchObject = {
    'residential': [
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'CGHS',
            id: 1
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Apartment',
            id: 2
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Penthouse / Villas',
            id: 3
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Low Rise / Independent Floors',
            id: 4
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Explore Locality',
            id: 5
        } 
    ],
    'commercial':[
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Malls',
            id: 1
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Open Markets',
            id: 2
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Business Centers',
            id: 3
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'IT Parks',
            id: 3
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Co-work',
            id: 3
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Explore Locality',
            id: 6
        } 
    ],
    'pg': [
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Girls Hostels',
            id: 1
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Boys Hostels',
            id: 2
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Co-host',
            id: 3
        },
        {
            icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/128/home-icon.png',
            name: 'Explore Locality',
            id: 4
        }
    ]
};

