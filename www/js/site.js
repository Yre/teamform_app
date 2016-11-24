function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initalizeFirebase() {
	
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdq3FVBy0zM8nAb5olfoLfevUWOfBcztI",
    authDomain: "lab-1dd51.firebaseapp.com",
    databaseURL: "https://lab-1dd51.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "743797076627"
  };
  firebase.initializeApp(config);

}    


function retrieveOnceFirebase(firebase, refPath, callbackFunc) {
	firebase.database().ref(refPath).once("value").then(callbackFunc);
}
