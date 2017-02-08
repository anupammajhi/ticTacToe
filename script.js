$(function() {

})

// Create array of size 9 with blanks
arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
choice = "X"
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
        arr.splice(clickedBoxIndex, 1, choice)
        display();
    }
});

possibleMoves = []

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

function ticTacAI() {
    //possiblemove[1] = [[1,2,3],[4,5,6],WIN]


}
