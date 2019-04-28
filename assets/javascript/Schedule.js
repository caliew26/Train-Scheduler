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
//variable that is specifically for the firebase database
var database = firebase.database();

//variables for the columns that I need
var trainName = "",
    destination = "",
    frequency = "",//in minutes (this is how often the train departs)
    nextDeparture = "",//military time HHmm (this is when the train will depart)
    minutesAway = ""

//getting the DOM loaded/rendered
$(document).ready(function() {
    // $("#trainInfoSubmit").attr("disabled", true)
   initializeEventHandlers();
});

    //submit button -- 
        //will need to be disabled on initial page load
        //once all field are populated then enable submit
        //function initializeEventHandlers(){
        //will need an keyup event listener that will set the button to active when data is input from user
function initializeEventHandlers () {
    $("#trainInfoSubmit").click(function(){
        event.preventDefault();
        // $("#trainInfoSubmit").attr("disabled", false);
        //create variables for the userinput from the form
        var trainName = $("#trainName-display").val().trim();
        var destination = $("#destination-display").val().trim();
        var frequency = $("#frequency-display").val().trim();
        var nextDeparture = $("#nextDepartureTime-display").val()

        if ($("#trainName-display").val().trim() === "" ||
            $("#destination-display").val().trim()  === "" ||
            $("#frequency-display").val().trim()  === "" ||
            $("#nextDepartureTime-display").val()  === "") {
                alert("All fields must be filled out to add a new train.")
                // $("#trainInfoSubmit").attr("disabled", true);
            } else {
                // $("#trainInfoSubmit").attr("disabled", false);
        //this will push the values into firebase database
                database.ref().push({
                    trainName: trainName,
                    destination: destination,
                    frequency: frequency,
                    nextDeparture: nextDeparture,
                    dateAdded: firebase.database.ServerValue.TIMESTAMP
                });
        };

        //clear the form so user can't create the same train over and over
        //NEED TO DISABLE BUTTON SO USER CAN'T UPLOAD A BLANK TRAIN
        $("#trainName-display").val("");
        $("#frequency-display").val("");
        $("#destination-display").val("");
        $("#nextDepartureTime-display").val("");
        // 
    });
};

database.ref().on("child_added", function(childSnapshot){
    //console.log(childsnapshot.val());
    //get the values from the firebase database only when new "child" is added (from the userinput form)
    //Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextDeparture);

    //create variables based on the input from the user on the form
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var frequency = parseInt(childSnapshot.val().frequency);
    var nextDeparture = childSnapshot.val().nextDeparture;
    // var minutesAway = newMinutes(minutesAway);

    var firstDepartureMoment = new moment((nextDeparture), "HHmm");
    var currentMoment = new moment();
    var duration = moment.duration(firstDepartureMoment.diff(currentMoment));
    // console.log(firstDepartureMoment);
    var minutesAway = parseInt(duration.asMinutes());
    // console.log("above");
    // console.log(minutesAway);
    //create a while loop that will take the minutesAway and countup until the minutes are no longer negative
    while (minutesAway < 0){
        firstDepartureMoment.add(parseInt(frequency), 'm');
        // minutesAway += frequency//another way of writing the next line
        minutesAway = minutesAway + parseInt(frequency);
        console.log(minutesAway);
    };

     //create a new row from the input from the user
     var newRow = $("<tr>").append(
        $("<td> ").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td class='first'>").text(firstDepartureMoment.format("HH:mm")),
        $("<td class='timeAway'>").text(minutesAway),
    );
    //add the new row just created onto the table
    $("#trainTable > tbody").append(newRow);
    // setInterval (function(){
    // updateTableRow(newRow)},  60000);
    setInterval("window.location.reload()", 60000);
});

function updateTableRow(tableRow) {
    var nextDepartureMoment = new moment(($(tableRow).find(".first").text()), "HH:mm");
    console.log(nextDepartureMoment)
    console.log($(tableRow).find(".first").text());
    var currentMoment = new moment();
    console.log(currentMoment);
    var duration = moment.duration(nextDepartureMoment.diff(currentMoment));
    console.log(duration);
    var nextMinutesAway = parseInt(duration.asMinutes());
    console.log(nextMinutesAway);
    $(tableRow).find(".timeAway").text(nextMinutesAway);
    // $(tableRow).find(".first").text(nextDepartureMoment, 'HH:mm');
}

// countdown until nextMinutesAway is 0; reset setInterval to frequency
//keep the countdown from going negative 
//update the departureMoment when the minutes are up
//searching google - found window.location.reload(), this refreshes the whole page - not idea at all.  I want to figure out how to use the function "updateTaleRow", it works until the counter is down to 0.. then it runs negative
//setInterval("window.location.reload()", 60000);


//pulled from TriviaGame - counter countdown
// function updateTimeRemaining(newTime){
//     $("#timeLeft").text(newTime);
// }

// function resetTimer(){
//     timerCountdown = RESET_TIMER_COUNTDOWN;
//     updateTimeRemaining(timerCountdown);
//     countdownRunner = setInterval(countdown, ONE_SECOND);
// }

    // var nextDepartureMoment = moment.unix(nextDeparture);
    // var diff = moment().diff(moment(nextDepartureMoment, 'HH:mm'), 'minutes')

    // if(diff >= 0){
    //     var minutesAway = frequency - diff % frequency
    //     var next = moment().add(minutesAway, 'minutes').format('hh:mm A')
    //     console.log('nim', next)
    // } else {
    //     minutesAway = nextDepartureMoment.format('HH:mm A')
    //     next = Math.abs(diff)
    //     console.log(next)
    // }

//look at the script tags they are a mess and I don't understand

//POSSIBLE STRETCH GOALS:

//make all columns sortable

//add update / remove buttons with functionality behind them

//user login with google username/password or github username/password

//search for train, highlight that train or remove all and display only that 1 search request

//add sound of train whistle or all aboard
//var snd = new Audio("steam-train-whistle-daniel_simon.wav");
// snd.play();
// snd.currentTime=0

//next arrival -- will be total minutes
    //input field
    //update the arrival time in realtime (screen refreshes every 1 minute, if frequency is 30 minutes, next arrival is the actual arrival time (say at 545pm) that is how many minutes from "now" - that is the countdown)
//I want to add functionality that will not allow the fields to be blank and the button to be submitted, need all values to activate button
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

// if ($("#trainName-display") != "" && $("#destination-display") != "" && $("#frequency-display" != "") && $("#nextDepartureTime-display" != "")) {
//     $("#trainInfoSubmit").attr("disabled", true);
// } else {
//     $("#trainInfoSubmit").attr("disabled", false);
// }    
//going to need to update the Next Departure column with nextDeparture + frequency and based off of current time.  The train leaves at 8am and trains depart every "frequency" (x min), update the departure time in realtime, a train that is leaving next; as long as the minutes to departure are positive it will be the "next" departure; when the minutes to departure are less than 0, the next departure time will have the frequency added to it.  ------- CALI THINK ON THIS NEXT