//backend
function Player (name, initialScore){
    this.name = name;
    this.initialScore = initialScore;
}





//frontend
$(document).ready(function(){
  $("form").submit(function(event){
  event.preventDefault();
  var playerOneName = $("#player-name").val();
  var playerTwoName = $("#player-two-name").val();
  var playerOneAdvantage = $("#p1start").val();
  var playerTwoAdvantage = $("#p2start").val();
  var playerOne = new Player(playerOneName, playerOneAdvantage);
  var playerTwo = new Player(playerTwoName, playerTwoAdvantage);
  console.log(playerOne);
  console.log(playerTwo);
  });
});
