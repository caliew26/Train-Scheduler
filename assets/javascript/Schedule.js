//Initialize Firebase that will hold all of the date for the table - this is directly from firebase
var config = {
    apiKey: "AIzaSyA24J-G9aubKEFthqjQMFLMt0u21dH8X44",
    authDomain: "trainschedule-11381.firebaseapp.com",
    databaseURL: "https://trainschedule-11381.firebaseio.com",
    projectId: "trainschedule-11381",
    storageBucket: "trainschedule-11381.appspot.com",
    messagingSenderId: "781781193914"
};

firebase.initializeApp(config);

//setting my variables
//variable that is for specifically the firebase
var database = firebase.database();

//variables for the columns that I need, not sure I need any info in them because I want to be able to "reset" the fields
var trainName = "",
    destination = "",
    frequency = "",
    nextArrival = "",
    minutesAway = 0

//getting the DOM loaded/rendered
$(document).ready(function() {
    initializeEventHandlers();
});

//need an onclick event - do I need to put this in initializeEventHandler() in the document.ready? this is the click of the submit button
//create variables for the userinput from the form
function initializeEventHandlers(){
    $("#trainInfoSubmit").click(function(){
        event.preventDefault();
        // console.log("I was clicked");
        var trainName = $("#trainName-display").val().trim();
        var destination = $("#destination-display").val().trim();
        var frequency = $("#frequency-display").val().trim();
        var nextArrival = $("#nextArrivalTime-display").val()


        //this will push the values into firebase database
        database.ref().push({
            //temp object to hold traininfosubmit input data from user
            // var trainStation = {
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            nextArrival: nextArrival,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        //console.log(trainName = $("#trainName-display").val().trim());
        //console.log(frequency = $("#frequency-display").val().trim());
        //console.log(destination = $("#destination-display").val().trim());
        //console.log(nextArrival = $("#nextArrivalTime-display").val().trim());

        //clear the form so user can't create the same train
        $("#trainName-display").val("");
        $("#frequency-display").val("");
        $("#destination-display").val("");
        $("#nextArrivalTime-display").val("");
    });
};

//I want to add functionality that will not allow the fields to be blank and the button to be submitted, need all values to activate button
//going to work on this as a "stretch" goal after all functionality is done
// function newButtonValid(trainStation){
//     if (trainStation != ""){
//         alert("please provide all fields")
//     } else {
//         alert("all aboard")
//     }
// }
// var table = $("#trainTable");
// var row = $("#trainSchedule");
//     for (let i = 0; i < row.length; i++) {
//        console.log(table); 
// }

database.ref().on("child_added", function(childSnapshot){
    // console.log(childsnapshot.val());

    //I want to add the values to the firebase database
    // database.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
  
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextArrival);

    //create variables based on the input from the user on the form
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextArrival;

  //create a new row from the input from the user
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
    );
    //add the new row just created onto the table
    $("#train-table > tbody").append(newRow);
    //want to add the values to the HTML page --- CALI THINK ON THIS
    // $("#trainName-display").text(trainName).val().trim();
    // $("#destination-display").text(destination).val().trim();
    // $("#frequency-display").text(frequency).val().trim();
    // $("#nextArrivalTime-display").text(nextArrival).val().trim();

});

// function(errorObject){
//     console.log("Errors handled: " + errorObject.code);
// };

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


//POSSIBLE STRETCH GOALS:
//adding a train to the table
    // Train name
    //max number of characters is 50 (includes spaces but cannot be just spaces)
    //input field

//destination
    //max number of characters is 25
    //input field

//add update / remove buttons with functionality behind them

//user login with google username/password or github username/password

//search for train, highlight that train or remove all and display only that 1 search request

//add sound of train whistle or all aboard
//var snd = new Audio("steam-train-whistle-daniel_simon.wav");
// snd.play();
// snd.currentTime=0

//add disney railway style theme