  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9b7_1gUE-bNTw-Jbp7Q5R9SZEFnjfgps",
    authDomain: "train-scheduler-7a612.firebaseapp.com",
    databaseURL: "https://train-scheduler-7a612.firebaseio.com",
    projectId: "train-scheduler-7a612",
    storageBucket: "",
    messagingSenderId: "483637166189"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Button response
  $("#addTrain").on("click", function(event) {
    event.preventDefault();
    
    var trainName = $("#trainNameInput").val().trim();
    var dest = $("#destInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
    var freq = $("#freqInput").val().trim();
    
    var newTrain = {
        train: trainName,
        destination: dest,
        first: firstTrain,
        frequency: freq
    };

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    // $("#trainNameInput").val("");
    // $("#destInput").val("");
    // $("#firstTrainInput").val("");
    // $("#freqInput").val("");


});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var dest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var freq = childSnapshot.val().frequency;

    console.log(trainName, dest, freq);

    // var firstTrainStyled = firstTrain.format("HH:mm");
    // console.log(firstTrainStyled);
    // var sinceFirstTrain = moment().diff(firstTrain, "minutes");
    // console.log(sinceFirstTrain);


    var diffTime = moment().diff(moment.unix(firstTrain), "minutes");
    var timeRemain = moment().diff(moment.unix(firstTrain), "minutes") % freq ;
    var minutes = freq - timeRemain;
    var nextTrain = moment().add(minutes, "m").format("hh:mm A"); 
    


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(nextTrain),
        $("<td>").text(minutes),

    );


    $(".table > tbody").append(newRow);

});