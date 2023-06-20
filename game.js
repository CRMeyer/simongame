gamePattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
userClickedPattern = [];
var level = 0;

var redAudio = new Audio("./sounds/red.mp3");
var blueAudio = new Audio("./sounds/blue.mp3");
var greenAudio = new Audio("./sounds/green.mp3");
var yellowAudio = new Audio("./sounds/yellow.mp3");
var gameOver = new Audio("./sounds/wrong.mp3");

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    $("." + userChosenColor).fadeOut(100).fadeIn(100);
    $("." + userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("." + userChosenColor).removeClass("pressed");}, 100);
        checkAnswer(userClickedPattern.length-1);
    if (userChosenColor === "red"){
        redAudio.play();
    }else if (userChosenColor === "blue"){
        blueAudio.play();
    }else if (userChosenColor === "green"){
        greenAudio.play();
    }else if (userChosenColor === "yellow"){
        yellowAudio.play();
    }
    //console.log(userChosenColor);
});
var start = false;

$(document).on("keypress", function(){
    if(!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    $(document).off("keypress");
    started = true;
};
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    if (randomChosenColor === "red"){
        redAudio.play();
    }else if (randomChosenColor === "blue"){
        blueAudio.play();
    }else if (randomChosenColor === "green"){
        greenAudio.play();
    }else if (randomChosenColor === "yellow"){
        yellowAudio.play();
    }

}



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else {
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press any key to Restart");
        gameOver.play();
        $(document).on("keypress", function(){
            setTimeout(function(){
            location.reload();
        }, 500);
    });
}
}
