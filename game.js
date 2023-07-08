var userClickedPattern = [];

var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];

var gameStart = false;
var level = 0;

$(document).keydown(function() {
    if(gameStart == false){
        gameStart = true;
        setTimeout(function() {
            nextSequence();
        },500);
    }
});

$(document).on({'touchstart' :function() {
    if(gameStart == false){
        gameStart = true;
        setTimeout(function() {
            nextSequence();
        },500);
    }
}});


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern=[];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();
    level++;
}

function playSound(userChosenColour) {
    var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    console.log("here\n");
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(index) {
    if(userClickedPattern[index] == gamePattern[index]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern=[];
    gameStart = false;
}

