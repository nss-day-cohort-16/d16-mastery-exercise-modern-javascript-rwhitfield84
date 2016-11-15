"use strict";

var robot = require('./Robot.js');

let robotOne;
let robotTwo;
let robotNameOne ;
let robotNameTwo;
let robotOneHealth;
let robotTwoHealth;


/*INITAL PAGE VIEW SETTING UP BATTLE*/
$("#player-setup").show();

$(".card__link").click(function(e) {
  let nextCard = $(this).attr("next");
  let moveAlong = false;

  if (nextCard === "card--battleground") {
    moveAlong = ($("#robot1-name").val() !== "" && $("#robot2-name").val() !== "");
    robotNameOne = $("#robot1-name").val();
    robotOne.setName(robotNameOne);
    robotNameTwo = $("#robot2-name").val();
    robotTwo.setName(robotNameTwo);
  }

  if (moveAlong) {
    $(".card").hide();
    $('body').attr('id', 'battleview');
    $("." + nextCard).show();
  }
});

/*CREATING ROBOT INSTANCES*/

$("#robotOneChooser").change(function () {
  robotOne = new robot[this.value]();
  robotNameOne = robotOne.name;
  robotOneHealth = robotOne.health;
});

$("#robotTwoChooser").change(function () {
  robotTwo = new robot[this.value]();
  robotTwo.name = robotNameTwo;
  robotTwoHealth = robotTwo.health;
});

/*RESTORING AND SETTING VALUES*/

$("#enterBtn").on("click", function() {
    $("#robotOneChooser").val("Robots");
    $("#robotTwoChooser").val("Robots");
    $("#robot1-name").val('');
    $("#robot2-name").val('');
    $("#victoryString").html('');
    $("#defeatString").html('');
    $("#robotOneName").find("h1").html('');
    $("#robotTwoName").find("h1").html('');
    $("#robotOneName").find("h1").append(`${robotNameOne}`);
    $("#robotTwoName").find("h1").append(`${robotNameTwo}`);
    $("#robotOneImg").attr("src", ` ${robotOne.image} `);
    $("#robotTwoImg").attr("src", ` ${robotTwo.image} `);
    updateStats();
});

/*UPDATING STATS*/

function updateStats() {
  let robotOneHealthPercent = Math.round((robotOne.health / robotOneHealth) * 100);
  let robotTwoHealthPercent = Math.round((robotTwo.health / robotTwoHealth) * 100);
    $("#robotOneBar").attr("style", `width:${robotOneHealthPercent}%`);
    $("#robotTwoBar").attr("style", `width:${robotTwoHealthPercent}%`);
    $("#robotOneBar").html(`${robotOneHealthPercent}%`);
    $("#robotTwoBar").html(`${robotTwoHealthPercent}%`);
}

/*BATTLEDOME FIGHT*/

function attack() {
  robotTwo.health -= Math.ceil(robotOne.damage * Math.random());
  robotOne.health -= Math.ceil(robotTwo.damage * Math.random());
  updateStats();

if (robotTwo.health <= 0) {
    $(".card").hide();
    $("#victoryPage").show();
    $("#victoryString").append(`<h1>${robotNameOne} playing as ${robotOne.alias}, a ${robotOne.type}, defeated ${robotNameTwo}, a ${robotTwo.type} ${robotTwo.alias} by weilding it's ${robotOne.weapon}</h1>`);

} else if (robotOne.health <= 0) {
    $(".card").hide();
    $("#defeatPage").show();
    $("#defeatString").append(`<h1>${robotNameTwo} playing as ${robotTwo.alias}, a ${robotTwo.type}, defeated ${robotNameOne}, a ${robotOne.type} ${robotOne.alias} by weilding it's ${robotTwo.weapon}</h1>`);
    }
}

$(document).on("click", "#attackbtn", attack);

/*SHOW FRESH START SCREEN*/

$(document).on("click", "#tryAgain", function () {
  $("#player-setup").show();
  $("#victoryPage").hide();
  $("#defeatPage").hide();
  $('body').removeAttr('id', 'battleview');
});



