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
            if (game[0].length == 0) {
                calculatePossibleMoves();
            }
            computerPlay();
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
game = [
    [],
    []
]

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
    displayChance();
}

function display2() {
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
        game[1].push(clickedBoxIndex)
        chance == 0 ? chance = 1 : chance = 0;
        display();
        console.log(game)
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

    console.log(game)
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

        game[0].push(randomVal);
        display2();
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


function computerPlay() {
    console.log("Computer Playing")
    console.log("Start game :"+game);
    setTimeout(function(){console.log("Sleeping")},1000)
    if(game[0].length == 1 && game[1].length == 0)
    {
              arr.splice(game[0][0], 1, choice)
              chance == 0 ? chance = 1 : chance = 0;
              display()
    }
    else if ((game[0].length == 0 && game[1].length == 1) || game[0].length >= 1) {

        playIndex = game[0].length

        filterWin = possibleMovesWins.filter(function(arrEle) {
            return game[0].every(function(ele, index) {
                return arrEle[0][index] == ele;
            }) && game[1].every(function(ele, index) {
                return arrEle[1][index] == ele;
            })
        })

        if (filterWin.length > 0) {
            //Found data in Win Matrix, continue further
        } else {
            //No data in Win Matrix, hence try Draw Matrix
            filterWin = possibleMovesDraw.filter(function(arrEle) {
                return game[0].every(function(ele, index) {
                    return arrEle[0][index] == ele;
                }) && game[1].every(function(ele, index) {
                    return arrEle[1][index] == ele;
                })
            })
        }

        filterPlay = filterWin.sort(function(a, b) {
            //Sort by minimum number of moves by computer
            return a[0].length - b[0].length
        })

        filterPlayBestMoves = filterPlay.filter(function(ele) {
            //filter by minimum number of moves only
            return ele[0].length == filterPlay[0][0].length
        })

        filterPlayBestMovesStrategic = filterPlayBestMoves.filter(function(ele) {
            //Filter even digit places as they are best strategic moves with double threatening etc
            return ele[0][playIndex] % 2 == 0
        })

        if (filterPlayBestMovesStrategic.length != 0) {
            filterPlayBestMoves = filterPlayBestMovesStrategic;
        }

        //Choose one of the move matrix randomly

        chooseMatrixIndex = Math.round((Math.random()) * (filterPlayBestMoves.length - 1))

        console.log(filterPlayBestMoves)

        choosePlace = filterPlayBestMoves[chooseMatrixIndex][0][playIndex]
        console.log(choosePlace)

        arr.splice(choosePlace, 1, choice)
        game[0].push(choosePlace)
        chance == 0 ? chance = 1 : chance = 0;

        display();
    }
    console.log("End game :"+game);
}






// possibleMovesWins.filter(function(arrEle){
//   return game[0].every(function(ele,index){
//     return arrEle[0][index] == ele;
//   }) && game[1].every(function(ele,index){
//     return arrEle[1][index] == ele;
//   })
// })
