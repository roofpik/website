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

function convertToHyphenSeparated(data){
    if (data == null || data == "") {
      return data;
    }

    data = data.trim();
    return data.split(" ").join("-").toLowerCase();
}

function convertHyphenSeparatedToNormal(str){
    str = str.trim();
   return str.split('-').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}


var pwdChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomString(length) {
    var result = '';
    for (var i = length; i > 0; --i) result += pwdChars[Math.round(Math.random() * (pwdChars.length - 1))];
    return result;
}


app.factory("UserTokenService", function($timeout){
   var service = {};
   var userToken;
   service.checkToken = checkToken;
   service.storeData = storeData;
   return service;

   function checkToken(urlInfo, timestamp, from){
        if(checkLocalStorage('userToken')){
            userToken = getLocalStorage('userToken');
        } else {
            userToken = randomString(16);
            localStorage.setItem('userToken', JSON.stringify(userToken));
        }
        if(from == 1){
            storeData(urlInfo, timestamp, userToken, 'pageVisit', 0);
        } else if(from ==2){
            storeData(urlInfo, timestamp, userToken, 'cityClicked', 0);
        } else if(from == 3){
            storeData(urlInfo, timestamp, userToken, 'searchItems', 0);
        } else if(from == 4) {
            storeData(urlInfo, timestamp, userToken, 'uid', true);
        } else if(from == 5) {
            storeData(urlInfo, timestamp, userToken, 'uid', false);
        }
    }

    function storeData(data, timestamp, id, path, val){
        var updates = {};
        if(path == 'uid'){
            var key;
            if(val){
                key = 'loginTime';
            } else {
                key = 'logoutTime';
            }
            updates['userWebsiteClicksInfo/-KYJONgh0P98xoyPPYm9/'+id+'/uid/'+data+'/'+key+'/'+timestamp] = val;
        } else {
            updates['userWebsiteClicksInfo/-KYJONgh0P98xoyPPYm9/'+id+'/'+path+'/'+timestamp] = data;
        }
        db.ref().update(updates);
    }
});


var log = {
    print: function (lineNo, val) {
        console.log("line: " + lineNo + ", Data:", val);
    }
};

function loading(status, timer) {
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

