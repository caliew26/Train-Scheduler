// Initialize Firebase
var config = {
    apiKey: "AIzaSyA24J-G9aubKEFthqjQMFLMt0u21dH8X44",
    authDomain: "trainschedule-11381.firebaseapp.com",
    databaseURL: "https://trainschedule-11381.firebaseio.com",
    projectId: "trainschedule-11381",
    storageBucket: "trainschedule-11381.appspot.com",
    messagingSenderId: "781781193914"
};

firebase.initializeApp(config);

//getting the DOM loaded/rendered
$(document).ready(function() {
    // initializeEventHandlers();
});

//setting my variables
//variable that is for specifically the firebase
var database = firebase.database();

//variables for the columns that I need
var trainName = "",
    destination = "",
    frequency = "",
    nextArrival = "",
    minutesAway = 0

//need an onclick event - do I need to put this in initializeEventHandler(){}? this is the click of the submit button
//create variables for the userinput from the form
$("#trainInfoSubmit").click(function(){
    event.preventDefault();
    // console.log("I was clicked");
    //console.log(trainName = $("#trainName-display").val().trim());
    var trainName = $("#trainName-display").val().trim();
    //console.log(destination = $("#destination-display").val().trim());
    var destination = $("#destination-display").val().trim();
    //console.log(frequency = $("#frequency-display").val().trim());
    var frequency = $("#frequency-display").val().trim();
    //console.log(nextArrival = $("#nextArrivalTime-display").val().trim());
    var nextArrival = $("#nextArrivalTime-display").val().trim();
    // minutesAway = $("#minutesAway").val().trim();

    var trainStation = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
    };
    //this will push the values into firebase database
    database.ref().push(trainStation);
    //    firebase.database.ServerValue.TIMESTAMP
    console.log(trainName = $("#trainName-display").val().trim());
    console.log(frequency = $("#frequency-display").val().trim());
    console.log(destination = $("#destination-display").val().trim());
    console.log(nextArrival = $("#nextArrivalTime-display").val().trim());

    alert("train successfully added");

    $("#trainName-display").val("");
    $("#frequency-display").val("");
    $("#destination-display").val("");
    $("#nextArrivalTime-display").val("");
});



database.ref().on("value", function(snapshot) {
    // console.log(snapshot.val());
    $("#trainName-display").text(trainName).val().trim();
    $("#destination-display").text(destination).val().trim();
    $("#frequency-display").text(frequency).val().trim();
    $("#nextArrivalTime-display").text(nextArrival).val().trim();

});
// dataRef.ref().on("child_added", function(childSnapshot) {

//     // Log everything that's coming out of snapshot
  
//     console.log(childSnapshot.val().trainName);
//     console.log(childSnapshot.val().destination);
//     console.log(childSnapshot.val().frequency);
//     console.log(childSnapshot.val().nextArrival);
// });

// var table = $("#trainTable");
// var row = $("#trainSchedule");
//     for (let i = 0; i < row.length; i++) {
//        console.log(table); 
// }

// $("#trainSchedule").append("<div class=")

function errorObject(){
    console.log("Errors handled: " + errorObject.code);
};

// //I want to capture the last input I added to firebase and filter by dateadded
// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#trainName-display").text(snapshot.val().trainName);
//     $("#destionation-display").text(snapshot.val().destination);
//     $("#frequency-display").text(snapshot.val().frequency);
//     $("#nextArrivalTime-display").text(snapshot.val().nextArrival);
//   });
// // $("#trainName").keyup(function(event){
// //     if(event.keyCode === 13) {
// //         $("#trainName").click();
// //         console.log("this is trainName");
// //     }
// // });
//adding a train to the table
    // Train name
    //max number of characters is 50 (includes spaces but cannot be just spaces)
    //input field

//destination
    //max number of characters is 25
    //input field

//?--First train time -- military time HH:mm (this is when the first train will depart)
    //input field

// frequency -- in minutes (this is how often the train departs)
    //input field

//next arrival -- will be total minutes
    //input field
    //update the arrival time in realtime (screen refreshes every 1 minute, if frequency is 30 minutes, next arrival is the actual arrival time (say at 545pm) that is how many minutes from "now" - that is the countdown)

//submit button -- 
    //will need to be disabled on initial page load
    //once all field are populated then enable
        //all fields are required prior to submit



//display div
    //columns
        // train name
        // destination
        // frequency
        // next arrival
        // minutes away

    //make all columns sortable

// calculate when the train will arrive 
    //this will be current time plus the frequency

//add update / remove buttons with functionality behind them

// user login with google username/password or github username/password

//search for train, highlight that train or remove all and display only that 1 search request

//add sound of train whistle or all aboard
//var snd = new Audio("steam-train-whistle-daniel_simon.wav");
// snd.play();
// snd.currentTime=0

//add disney railway style theme