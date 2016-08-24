//backend
function Player (name, score, turnTotal) {
  this.name = name;
  this.score = score;
  this.turnTotal = turnTotal;
}
Player.prototype.diceRoll = function(){
  var randomNumber = 1 + Math.floor(Math.random() * 6);
  if (randomNumber >= 2 && randomNumber <=6){
    this.turnTotal += randomNumber;
  }
  else if (randomNumber = 1) {
    this.turnTotal = 0;
  }
  return this.turnTotal;
}
Player.prototype.hold = function(){
  this.score += this.turnTotal;
  this.turnTotal = 0;
  return this.score;
}

//frontend
$(document).ready(function(){
  var playerOne;
  var playerTwo;
  $("form").submit(function(event){
    event.preventDefault();
    var playerOneName = $("#player-name").val();
    var playerTwoName = $("#player-two-name").val();
    var playerOneAdvantage = parseInt($("#p1start").val());
    var playerTwoAdvantage = parseInt($("#p2start").val());
    var turnTotal = 0
    playerOne = new Player(playerOneName, playerOneAdvantage, turnTotal);
    playerTwo = new Player(playerTwoName, playerTwoAdvantage, turnTotal);
    $("#result-name").text(playerOne.name + "'s");
    $("#result-name2").text(playerTwo.name + "'s");
    $("#roll2").hide();
    $("#hold2").hide();
  });
  $("#roll1").click(function(){
    playerOne.diceRoll();
    console.log(playerOne.turnTotal);
    $("#p1total").text(playerOne.turnTotal);
  });
  $("#roll2").click(function(){
    playerTwo.diceRoll();
    console.log(playerTwo.turnTotal);
    $("#p2total").text(playerTwo.turnTotal);
  });
  $("#hold1").click(function(){
    playerOne.hold();
    $("#p1total").text(playerOne.turnTotal);
    $("#p1score").text(playerOne.score);
    $("#roll2").show();
    $("#hold2").show();
    $("#roll1").hide();
    $("#hold1").hide();
    if (playerOne.score >=100){
      $(".winner").show();
      $("#winner-name").text(playerOne.name);
    }
  });
  $("#hold2").click(function(){
    playerTwo.hold();
    $("#p2total").text(playerTwo.turnTotal);
    $("#p2score").text(playerTwo.score);
    $("#roll1").show();
    $("#hold1").show();
    $("#roll2").hide();
    $("#hold2").hide();
    if (playerTwo.score >=100){
      $(".winner").show();
      $("#winner-name").text(playerTwo.name);
    }
  });
});
