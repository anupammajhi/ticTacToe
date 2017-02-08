$(function(){

})

// Create array of size 9 with blanks
arr = ["0","1","2","3","4","5","6","7","8"]
winArr = []
choice = "X"

console.log("Test Line");
arr[3] = "X" //ONLY FOR TESTING
arr[6] = "AnupamW"

function checkWins(letter){
  if( arr[0] == letter && arr[1] == letter && arr[2] == letter ){
    return true;
  }
  if( arr[3] == letter && arr[4] == letter && arr[5] == letter ){
    return true;
  }
  if( arr[6] == letter && arr[7] == letter && arr[8] == letter ){
    return true;
  }
  if( arr[0] == letter && arr[3] == letter && arr[6] == letter ){
    return true;
  }
  if( arr[1] == letter && arr[4] == letter && arr[7] == letter ){
    return true;
  }
  if( arr[2] == letter && arr[5] == letter && arr[8] == letter ){
    return true;
  }
  if( arr[0] == letter && arr[4] == letter && arr[8] == letter ){
    return true;
  }
  if( arr[2] == letter && arr[4] == letter && arr[6] == letter ){
    return true;
  }
  return false;
}

function buildWinArray(){
  winArr = arr.slice();
  holeArr = winArr.filter(function(ele){
    // That doesn't have a X or O or a prediction ending with W
     return !(ele.slice(-1) == "X" || ele.slice(-1) == "O" || ele.slice(-1) == "W")
  });
  holeArr.forEach(function(possiblePath){
    possiblePath.split("").forEach(function(){

    });
  });
}

// AI here

function ticTacAI(){


  // Filter Empty Boxes into an array Arr
  // check worst

}
