var started = false;
var userSquence = [];
var sequence = [];
var level = 1;
var colors = ["green", "red", "yellow", "blue"]

$(document).on("keypress",function (){
    if(!started){
        addToSequence();
    }
    started = true;
});

function playSound(audio){
    var sound = new Audio("sounds/"+audio+".mp3");
    sound.play();
}

function addToSequence(){
    increaseLevel();
    userSquence = [];
    var random = Math.floor(Math.random() * 4);
    sequence.push(colors[random]);
    animate(colors[random]);
}

function increaseLevel(){
    $("h1").text("Level-"+level);
    level = level + 1;
}

$("button").on("click",function (){
    var buttonClicked = $(this).attr("id");
    userSquence.push(buttonClicked);
    animate(buttonClicked);
    checkSequence(userSquence.length-1);
});

function animate(s){
    $("#"+s).addClass("pressed");
    playSound(s);
    setTimeout(function (){
        $("#"+s).removeClass("pressed");
    },100);
}

function checkSequence(index){
    if(userSquence[index] === sequence[index]){
        if(userSquence.length === sequence.length){
            setTimeout(function(){
                addToSequence()
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("h1").text("Game-Over!!, Press a Key to Restart");
        $("body").addClass("over");
        setTimeout(function (){
            $("body").removeClass("over");
        },300);
        startOver();
    }
}

function startOver(){
    sequence = [];
    level = 1;
    started = false;
}