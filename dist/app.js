(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function Robot () {
	this.name = null;
}

Robot.prototype.setName = (name) => {
	this.name = name;
};

/*ROBOT PROTOTYPES*/

function Droid ()  {
	this.type = "Droid";
	this.movement = "Limited";	
}

Droid.prototype = new Robot();

function Bipedal () {
	this.type = "Bipedal";
	this.movement = "Fluid";	
}

Bipedal.prototype = new Robot();

function ATV () {
	this.type = "ATV";
	this.movement = "Wheels";
}

ATV.prototype = new Robot();

/*TYPES OF ROBOT PROTOTYPES*/

function RockEm () {
	this.alias = "Rock'Em Sock'Em";
	this.health = Math.floor(Math.random() * 40 + 50);
	this.weapon = "Plastic Fist";
	this.damage = Math.floor(Math.random() * 15 + 1);
	this.image = "/images/rockem.jpg";
}

RockEm.prototype = new Droid();

function Energizer () {
	this.alias = "Energizer Bunny";
	this.health = Math.floor(Math.random() * 40 + 50);
	this.weapon = "Bass Drum";
	this.damage = Math.floor(Math.random() * 13 + 1);
	this.image = "/images/energizer.jpg";
}

Energizer.prototype = new Droid();

function AwesomeO () {
	this.alias = "Awesome-O";
	this.health = Math.floor(Math.random() * 40 + 50);
	this.weapon = "F-Bombs";
	this.damage = Math.floor(Math.random() * 17 + 1);
	this.image = "/images/awesomeo.jpg";
}

AwesomeO.prototype = new Bipedal();

function Terminator () {
	this.alias = "Terminator";
	this.health = Math.floor(Math.random() * 40 + 50);
	this.weapon = "Uzi";
	this.damage = Math.floor(Math.random() * 19 + 1);
	this.image = "/images/terminator.jpg";
}

Terminator.prototype = new Bipedal();

function Kitt () {
	this.alias = "Kitt";
	this.health = Math.floor(Math.random() * 40 + 50);
	this.weapon = "Annoying Robot Voice";
	this.damage = Math.floor(Math.random() * 12 + 1);
	this.image = "/images/kitt.jpg";
}

Kitt.prototype = new ATV();

function OptimusPrime () {
	this.alias = "Optimus Prime";
	this.health = Math.floor(Math.random() * 40 + 50);
	this.weapon = "Ion Blaster";
	this.damage = Math.floor(Math.random() * 22 + 1);
	this.image = "/images/optimus.jpg";
}

OptimusPrime.prototype = new ATV();

module.exports = {Robot, OptimusPrime, Kitt, Terminator, AwesomeO, Energizer, RockEm, ATV, Bipedal, Droid};


},{}],2:[function(require,module,exports){
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




},{"./Robot.js":1}]},{},[2]);
