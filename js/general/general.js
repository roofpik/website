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
           icon: 'images/homeicon/CGHS.png',
           name: 'CGHS',
           id: 1
       },
       {
           icon: 'images/homeicon/Apartment.png',
           name: 'Apartment',
           id: 2
       },
       {
           icon: 'images/homeicon/Villa-penthouse.png',
           name: 'Penthouse / Villas',
           id: 3
       },
       {
           icon: 'images/homeicon/Lowrise.png',
           name: 'Low Rise / Independent Floors',
           id: 4
       },
       {
           icon: 'images/homeicon/Commercial.png',
           name: 'Explore Locality',
           id: 5
       }
   ],
   'commercial':[
       {
           icon: 'images/homeicon/Malls.png',
           name: 'Malls',
           id: 1
       },
       {
           icon: 'images/homeicon/OpenMarkets.png',
           name: 'Open Markets',
           id: 2
       },
       {
           icon: 'images/homeicon/Business Center.png',
           name: 'Business Centers',
           id: 3
       },
       {
           icon: 'images/homeicon/ITParks.png',
           name: 'IT Parks',
           id: 3
       },
       {
           icon: 'images/homeicon/Commercial.png',
           name: 'Co-work',
           id: 3
       },
       {
           icon: 'images/homeicon/Commercial.png',
           name: 'Explore Locality',
           id: 6
       }
   ],
   'pg': [
       {
           icon: 'images/homeicon/Commercial.png',
           name: 'Girls Hostels',
           id: 1
       },
       {
           icon: 'images/homeicon/Commercial.png',
           name: 'Boys Hostels',
           id: 2
       },
       {
           icon: 'images/homeicon/Commercial.png',
           name: 'Co-host',
           id: 3
       },
       {
           icon: 'images/homeicon/Commercial.png',
           name: 'Explore Locality',
           id: 4
       }
   ]
};
