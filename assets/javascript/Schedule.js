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
// var audio = new Audio("All_aboard.mp3");
var trainName = "",
    destination = "",
    frequency = "",//in minutes (this is how often the train departs)
    nextDeparture = "",//military time HHmm (this is when the train will depart)
    minutesAway = "",
    RESET_TIMER_COUNTDOWN = frequency

//getting the DOM loaded/rendered
$(document).ready(function() {
    // $("#trainInfoSubmit").attr("disabled", true)
   initializeEventHandlers();
//    audio.play();
});

    //submit button -- 
        //will need to be disabled on initial page load
        //once all field are populated then enable submit
        //function initializeEventHandlers(){
        //will need an keyup event listener that will set the button to active when data is input from user
function initializeEventHandlers () {
    //onclick of trainInfoSubmit I need to do stuff
    $("#trainInfoSubmit").click(function(){
        event.preventDefault();
        // $("#trainInfoSubmit").attr("disabled", false);
        //create variables for the userinput from the form
        var trainName = $("#trainName-display").val().trim();
        var destination = $("#destination-display").val().trim();
        var frequency = $("#frequency-display").val().trim();
        var nextDeparture = $("#nextDepartureTime-display").val()

        //if the fields are blank, I want to stop the user from being able to click submit
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

    var firstDepartureMoment = new moment((nextDeparture), "HHmm").subtract(1, 'd');
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
        $("<td class='freq'>").text(frequency),
        $("<td class='first'>").text(firstDepartureMoment.format("HH:mm")),
        $("<td class='timeAway'>").text(minutesAway),
    );
    //add the new row just created onto the table
    $("#trainTable > tbody").append(newRow);
    //I want to update the "row" in the train table so I need a function that will update the screen every x amount of time
    setInterval (function(){
    updateTableRow(newRow)}, 4000);
});

//create a row from the table created in the database
function updateTableRow(tableRow) {
    //set variable to update the frequency
    var nextFreq = parseInt($(tableRow).find(".freq").text());
    //set variable getting the firstDepartureMoment and set the response to be understood as HH:mm
    var nextDepartureMoment = new moment(($(tableRow).find(".first").text()), "HH:mm");
    console.log(nextDepartureMoment)
    console.log($(tableRow).find(".first").text());
    //creating a variable for right now
    var currentMoment = new moment();
    console.log(currentMoment);
    //create a variable with the difference between the nextDepartureMoment and the current moment
    var duration = moment.duration(nextDepartureMoment.diff(currentMoment));
    console.log(duration);
    //change the duration into minutes
    var nextMinutesAway = parseInt(duration.asMinutes());
    //change the minutesaway into seconds
    var nextSecondsAway = parseInt(duration.asSeconds());
    console.log(nextMinutesAway);
    //update the screen with the minutesaway
    $(tableRow).find(".timeAway").text(nextMinutesAway);
    if(nextSecondsAway < 0){
        //when the minutesaway is down to zero (zero seconds and minutes) then update the nextDepartureMoment by the amount of frequency
        nextDepartureMoment.add(nextFreq,'m');
        //update the table on the screen with the nextdeparture time
        $(tableRow).find(".first").text(nextDepartureMoment.format("HH:mm"));
        $(tableRow).find(".timeAway").text(nextFreq);
    }
};

//the next section is from DR, I didn't understand it so I kept with what I knew and will revisit the codeblock because i'm sure it's more efficient
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



//POSSIBLE STRETCH GOALS:

//make all columns sortable

//add update / remove buttons with functionality behind them

//user login with google username/password or github username/password

//search for train, highlight that train or remove all and display only that 1 search request

//add sound of train whistle or all aboard
//var snd = new Audio("steam-train-whistle-daniel_simon.wav");
// snd.play();
// snd.currentTime=0