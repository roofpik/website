//Development DB

var config = {
    apiKey: "AIzaSyAapASzaLGFxHgbMpu9Cibfn97MSEheCcU",
    authDomain: "roofpik-f8f55.firebaseapp.com",
    databaseURL: "https://roofpik-f8f55.firebaseio.com",
    storageBucket: "roofpik-f8f55.appspot.com",
    messagingSenderId: "303104341936"
  };


// Production DB

// var config = {
//     apiKey: "AIzaSyD_4bPp5HKryXDzaQwfRhqAU5SsSAdDIJ0",
//     authDomain: "roofpik-948d0.firebaseapp.com",
//     databaseURL: "https://roofpik-948d0.firebaseio.com",
//     storageBucket: "roofpik-948d0.appspot.com",
// };


firebase.initializeApp(config);

var db = firebase.database();
