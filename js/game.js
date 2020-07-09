var buttonColors = ["red", "blue", "green", "yellow"];
var gameSequence = [];
var userSequence = [];
var started = false;
var level = 0;

// Check for keypress to start the game
$(document).keypress(function() {

  if (!started) {

    $("h1").text("Level " + level);
    playGame();
    started = true;
  }
});

// Check for button press to track the user sequence
$(".btn").click(function() {

  var buttonID = $(this).attr("id");

  userSequence.push(buttonID);

  playSound(buttonID);
  animation(buttonID);

  checkAnswer(userSequence.length - 1);

});

// Play the game, generate random colors to track game's sequence
function playGame() {

  userSequence = [];

  level++;

  $("h1").text("Level " + level);

  var randomGameNumber = Math.floor(Math.random() * 4);

  var randomGameColor = buttonColors[randomGameNumber];

  gameSequence.push(randomGameColor);

  $("#" + randomGameColor).fadeOut(100).fadeIn(100);

  playSound(randomGameColor);
  animation(randomGameColor);

}

// Play the corresponding color sound
function playSound(colorName) {

  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();

}

// Set css class to corresponding color button id
function animation(colorName) {

  $("#" + colorName).addClass("pressed");
  setTimeout(function() {

    $("#" + colorName).removeClass("pressed");

  }, 100);
}

// Check if the user sequence = game sequence
function checkAnswer(lastAnswer) {

  if (gameSequence[lastAnswer] === userSequence[lastAnswer]) {

    if (userSequence.length === gameSequence.length) {
      setTimeout(function() {

        playGame();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game over bro! Press any key to restart");
    restart();
  }

}

// Restart all initial values to restart the game
function restart() {

  started = false;
  level = 0;
  gameSequence = [];
}
