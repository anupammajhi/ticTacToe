$(function() {
    $(".gamePlay").css("transition-duration", "1s");
    $(".chooseWeapon").css("transition-duration", "1s");
    $(".tictactoe").css("transition-duration", "1s");

    $(".gamePlay").css("display", "block");
});

var gameplay = "";
var playerChoice = "";
var concluded = false;
chance = Math.round((Math.random()));

function displayChance() {
    if (!concluded) {
        if (gameplay == "2 Player" && chance == 0) {
            text = "Player 1's Chance"
        }
        if (gameplay == "2 Player" && chance == 1) {
            text = "Player 2's Chance"
        }
        if (gameplay == "1 Player" && chance == 0) {
            text = "Computer's Chance"
        }
        if (gameplay == "1 Player" && chance == 1) {
            text = "Your Chance"
        }
        $(".chance").text(text);
    }
}


$(".singleplayer, .doubleplayer").click(function() {
    gameplay = $(this).text();
    $(".gamePlay").css("display", "none");
    $(".chooseWeapon").css("display", "block");
    if (gameplay == "2 Player") {
        $(".weaponText span").text("Player 1")
    }
})

$(".weaponX, .weaponO").click(function() {
    playerChoice = $(this).text();
    $(".chooseWeapon").css("display", "none");
    $(".tictactoe").css("display", "block");
    displayChance()
})

// Create array of size 9 with blanks
arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]

playerChoice == "O" ? choice = "X" : choice = "O"
//Display X or O in the tic tac toe squares
function display() {
    box = 0
    arr.forEach(function(ele) {
        if (ele == "X" || ele == "O") {
            boxID = "#box" + box
            $(boxID).text(ele);
        }
        box += 1;
    });
}

// On click on box
$(".col1, .col2, .col3").click(function() {
    clickedBoxIndex = $(".box").index($(this))
    if (arr[clickedBoxIndex] != "X" && arr[clickedBoxIndex] != "O") {
        arr.splice(clickedBoxIndex, 1, playerChoice)
        chance == 0 ? chance = 1 : chance = 0;
        displayChance();
        display();
    }
});

possibleMovesAI = []
possibleMovesPlayer = []
possibleMovesWins = []
possibleMovesDraw = []
MovesLeft = true;
statusArr = []

//WinArr possible Win Cases
winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



// AI here

function checkWin(checkArr) {
    return winArr.reduce(function(acc, ele) {
        winTrue = ele.every(function(num) {
            return checkArr.indexOf(num) > -1
        })

        return acc || winTrue

    }, false)
}

function calculatePossibleMoves() {
    // If human player plays first
    if (arr.indexOf(playerChoice) >= 0 && possibleMovesPlayer.length == 0) {
        possibleMovesPlayer.push([
            [],
            [arr.indexOf(playerChoice)], "LIVE"
        ])
    }

    //Start prediction of AI Move
    if (possibleMovesPlayer.length > 0 && MovesLeft) {
        possibleMovesAI = []
        console.log("AI Moves");
        possibleMovesPlayer.forEach(function(moveArray) {
            emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(function(ele) {
                if (moveArray[0].concat(moveArray[1]).indexOf(ele) == -1) {
                    return true;
                }
            });

            // console.log(emptyBoxes);
            if (emptyBoxes.length == 1) {
                MovesLeft = false;
            }

            emptyBoxes.forEach(function(ele) {

              if(ele == 0){console.error(emptyBoxes)}

                if (checkWin(moveArray[0].concat([ele]))) {
                    status = "WON"
                } else if (((moveArray[0].concat([ele])).concat(moveArray[1])).length == 9) {
                    status = "DRAW"
                    // console.log(((moveArray[0].concat([ele])).concat(moveArray[1])));
                } else {
                    status = "LIVE"
                }

                if (status == "WON") {
                    possibleMovesWins.push([moveArray[0].concat([ele]), moveArray[1], status])
                } else if (status == "LIVE") {
                    possibleMovesAI.push([moveArray[0].concat([ele]), moveArray[1], status])
                    // console.log(moveArray[0].concat([ele]), moveArray[1], status);
                } else if (status == "DRAW") {
                    possibleMovesDraw.push([moveArray[0].concat([ele]), moveArray[1], status])
                }

                statusArr.push(status)

            })
        });
    } else {
        randomVal = Math.floor((Math.random() * 8));
        console.log("AI Moves");
        console.log([randomVal], [], "LIVE");
        possibleMovesAI.push([
            [randomVal],
            [], "LIVE"
        ])
    }


    // Start Prediction of Player Move
    //Start prediction
    if (possibleMovesAI.length > 0 && MovesLeft) {
        possibleMovesPlayer = []
        console.log("Player Moves");
        possibleMovesAI.forEach(function(moveArray) {
            emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(function(ele) {
                if (moveArray[0].concat(moveArray[1]).indexOf(ele) == -1) {
                    return true;
                }
            });

            if (emptyBoxes.length == 1) {
                MovesLeft = false;
            }

            emptyBoxes.forEach(function(ele) {

              if(ele == 0){console.error(emptyBoxes)}

                if (checkWin(moveArray[1].concat([ele]))) {
                    status = "LOST"
                } else if (((moveArray[0].concat([ele])).concat(moveArray[1])).length == 9) {
                    status = "DRAW"
                } else {
                    status = "LIVE"
                }

                if (status == "LIVE") {
                    // console.log(moveArray[0], moveArray[1].concat([ele]), status)
                    possibleMovesPlayer.push([moveArray[0], moveArray[1].concat([ele]), status])
                } else if (status == "DRAW") {
                    possibleMovesDraw.push([moveArray[0], moveArray[1].concat([ele]), status])
                }
                statusArr.push(status)
            })
        });

        calculatePossibleMoves()

    } else {
        console.log("Completed Prediction");
    }

}









// possibleMovesWins.filter(function(arrEle){
//   return game[0].every(function(ele,index){
//     return arrEle[0][index] == ele;
//   }) && game[1].every(function(ele,index){
//     return arrEle[1][index] == ele;
//   })
// })
