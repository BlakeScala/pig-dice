//backend
function Player (name, score, turnTotal, double) {
  this.name = name;
  this.score = score;
  this.turnTotal = turnTotal;
  this.double = false;
}
Player.prototype.diceRoll = function(){
  dice1 = 1 + Math.floor(Math.random() * 6);
  dice2 = 1 + Math.floor(Math.random() * 6);
  if (dice1 != 1 && dice2 != 1 && dice1 != dice2){
    this.turnTotal += (dice1 + dice2);
    this.double = false;
    return this.double;
  } else if (dice1 === 1 && dice2 === 1) {
    this.turnTotal = 0;
    this.score = 0;
    this.double = false;
    return this.double;
  } else if (dice1 === 1 && dice2 != 1 || dice2 === 1 && dice1 != 1) {
    this.turnTotal = 0;
    this.double = false;
    return this.double;
  } else if (dice1 === dice2 && dice1 != 1) {
    this.turnTotal += (dice1 + dice2);
    this.double = true;
    return this.double;
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
    var double = false;
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
    playerOne = new Player(playerOneName, playerOneAdvantage, turnTotal, double);
    playerTwo = new Player(playerTwoName, playerTwoAdvantage, turnTotal, double);
    $("#result-name").text(playerOne.name + "'s");
    $("#result-name2").text(playerTwo.name + "'s");
    $(".scores").show();
    $("#p1score").text(playerOne.score);
    $("#p2score").text(playerTwo.score);
    $("#submitbutton").hide();
  });

  $("#roll1").click(function(){
    if (playerOne.double === true) {
      $("#hold1").show();
    }
    var lastRoll = playerOne.diceRoll();
    if (playerOne.turnTotal === 0){
      $("#roll2").show();
      $("#hold2").show();
      $("#roll1").hide();
      $("#hold1").hide();
    }
    $("#p1total").text(playerOne.turnTotal);
    $("#p1dice1").text(dice1+ "+");
    $("#p1dice2").text(dice2);
    $("#p1score").text(playerOne.score);
    if (playerOne.double === true) {
      $("#hold1").hide();
    }
  });

  $("#roll2").click(function(){
    if (playerTwo.double === true) {
      $("#hold2").show();
    }
    var lastRoll = playerTwo.diceRoll();
    if (playerTwo.turnTotal === 0){
      $("#roll2").hide();
      $("#hold2").hide();
      $("#roll1").show();
      $("#hold1").show();
    }
    $("#p2total").text(playerTwo.turnTotal);
    $("#p2dice1").text(dice1 + "+");
    $("#p2dice2").text(dice2);
    $("#p2score").text(playerTwo.score);
    if (playerTwo.double === true) {
      $("#hold2").hide();
    }
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
