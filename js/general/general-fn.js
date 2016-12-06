function setLocalStorage(name, value){
    var newField = name+'Version';

    var dataStored = {
        value: value,
        createdDate: new Date().getTime(),
         version: versions[newField]
    }

    localStorage.setItem(name+'Object' , JSON.stringify(dataStored));
}

function checkLocalStorage(val){
    var currentDate = new Date().getTime();
    var factor = 604800000;
    var checkingValue = val+'Version';
    if (localStorage.getItem(val+'Object') === null) {
        return false;
    } else if(JSON.parse(localStorage.getItem(val+'Object')).createdDate+ factor < currentDate || JSON.parse(localStorage.getItem(val+'Object')).version != versions[checkingValue]){
        deleteLocalStorage(val+'Object');
        return false;
    } else {
        return true;
    }
}

function deleteLocalStorage(val){
    localStorage.removeItem(val);
}

function getLocalStorage(val){
    // console.log(val);
    // console.log(JSON.parse(localStorage.getItem(val)));
    return JSON.parse(localStorage.getItem(val)).value;
}