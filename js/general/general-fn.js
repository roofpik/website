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
    console.log(data);
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

// function checkUserToken(){
//     var userToken = '';
//     if(checkLocalStorage('userToken')){
//         userToken = getLocalStorage('userToken');
//     } else {
//         userToken = randomString(16);
//         localStorage.setItem('userToken', JSON.stringify(userToken));
//     }
// }


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
            storeData(urlInfo,timestamp,userToken, 'pageVisit');
        } else if(from ==2){
            storeData(urlInfo,timestamp,userToken, 'cityClicked');
        } else if(from == 3){
            storeData(urlInfo, timestamp, userToken, 'searchItems');
        } else {
            storeData(urlInfo, timestamp, userToken, 'uid');
        }
    }

    function storeData(data, timestamp, id, path){
        var updates = {};
        if(path == 'uid'){
            updates['userWebsiteClicksInfo/-KYJONgh0P98xoyPPYm9/'+id+'/uid'] = data;
        } else {
            updates['userWebsiteClicksInfo/-KYJONgh0P98xoyPPYm9/'+id+'/'+path+'/'+timestamp] = data;
        }
        db.ref().update(updates);
    }
});

