$(function(){

})

function checkWins(letter){
  if( $(".row1 .col1").text() == letter && $(".row1 .col2").text() == letter && $(".row1 .col3").text() == letter ){
    return true;
  }
  if( $(".row2 .col1").text() == letter && $(".row2 .col2").text() == letter && $(".row2 .col3").text() == letter ){
    return true;
  }
  if( $(".row3 .col1").text() == letter && $(".row3 .col2").text() == letter && $(".row3 .col3").text() == letter ){
    return true;
  }
  if( $(".row1 .col1").text() == letter && $(".row2 .col1").text() == letter && $(".row3 .col1").text() == letter ){
    return true;
  }
  if( $(".row1 .col2").text() == letter && $(".row2 .col2").text() == letter && $(".row3 .col2").text() == letter ){
    return true;
  }
  if( $(".row1 .col3").text() == letter && $(".row2 .col3").text() == letter && $(".row3 .col3").text() == letter ){
    return true;
  }
  if( $(".row1 .col1").text() == letter && $(".row2 .col2").text() == letter && $(".row3 .col3").text() == letter ){
    return true;
  }
  if( $(".row3 .col1").text() == letter && $(".row2 .col2").text() == letter && $(".row1 .col3").text() == letter ){
    return true;
  }
  return false;
}
