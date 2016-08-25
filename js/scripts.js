//backend
function Player (name, score, turnTotal) {
  this.name = name;
  this.score = score;
  this.turnTotal = turnTotal;
}
Player.prototype.diceRoll = function(){
  dice1 = 1 + Math.floor(Math.random() * 6);
  dice2 = 1 + Math.floor(Math.random() * 6);
  console.log(dice1);
  console.log(dice2);
  if (dice1 != 1 && dice2 != 1){
    this.turnTotal += (dice1 + dice2);
  } else if (dice1 === 1 || dice2 === 1) {
  this.turnTotal = 0;
  } else if (dice1 === 1 && dice2 === 1) {
  this.turnTotal = 0;
  this.score = 0;
  }
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
    if (isNaN(playerOneAdvantage)){
      playerOneAdvantage = 0
    }
    var playerTwoAdvantage = parseInt($("#p2start").val());
    if (isNaN(playerTwoAdvantage)){
      playerTwoAdvantage = 0
    }
    if (playerOneName === ""){
      playerOneName = "Player One"
    }
    if (playerTwoName === ""){
      playerTwoName = "Player Two"
    }
    var turnTotal = 0
    playerOne = new Player(playerOneName, playerOneAdvantage, turnTotal);
    playerTwo = new Player(playerTwoName, playerTwoAdvantage, turnTotal);
    $("#result-name").text(playerOne.name + "'s");
    $("#result-name2").text(playerTwo.name + "'s");
    $(".scores").show();
    $("#p1score").text(playerOne.score);
    $("#p2score").text(playerTwo.score);
    $("#submitbutton").hide();
  });

  $("#roll1").click(function(){
    var lastRoll = playerOne.diceRoll();
    if (lastRoll === 1){
      $("#roll2").show();
      $("#hold2").show();
      $("#roll1").hide();
      $("#hold1").hide();
    }
    $("#p1total").text(playerOne.turnTotal);
    $("#p1dice1").text(dice1+ "+");
    $("#p1dice2").text(dice2);
  });

  $("#roll2").click(function(){
    var lastRoll = playerTwo.diceRoll();
    if (lastRoll === 1){
      $("#roll2").hide();
      $("#hold2").hide();
      $("#roll1").show();
      $("#hold1").show();
    }
    $("#p2total").text(playerTwo.turnTotal);
    $("#p2dice1").text(dice1 + "+");
    $("#p2dice2").text(dice2);
  });

  $("#hold1").click(function(){
    playerOne.hold();
    $("#p1total").text(playerOne.turnTotal);
    $("#p1score").text(playerOne.score);
    $("#roll2").show();
    $("#hold2").show();
    $("#roll1").hide();
    $("#hold1").hide();
    $("#p1current").text("0");
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
    $("#p2current").text("0");
    if (playerTwo.score >=100){
      $(".winner").show();
      $("#winner-name").text(playerTwo.name);
    }
  });

  $("#reset").click(function(){
    location.reload();
  });
});
