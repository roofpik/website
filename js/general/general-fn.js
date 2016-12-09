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
