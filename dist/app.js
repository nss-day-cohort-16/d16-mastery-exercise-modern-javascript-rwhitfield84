(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let robotOne;
let robotTwo;
let robotNameOne ;
let robotNameTwo;
let robotOneHealth;
let robotTwoHealth;



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

$("#robotOneChooser").change(function () {
  robotOne = new window[this.value]();
  robotNameOne = robotOne.name;
  robotOneHealth = robotOne.health;
});

$("#robotTwoChooser").change(function () {
  robotTwo = new window[this.value]();
  robotTwo.name = robotNameTwo;
  robotTwoHealth = robotTwo.health;
});


$("#enterBtn").on("click", function() {
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

function updateStats() {
  let robotOneHealthPercent = Math.round((robotOne.health / robotOneHealth) * 100);
  let robotTwoHealthPercent = Math.round((robotTwo.health / robotTwoHealth) * 100);
    $("#robotOneBar").attr("style", `width:${robotOneHealthPercent}%`);
    $("#robotTwoBar").attr("style", `width:${robotTwoHealthPercent}%`);
    $("#robotOneBar").html(`${robotOneHealthPercent}%`);
    $("#robotTwoBar").html(`${robotTwoHealthPercent}%`);
}

/*BattleDome*/

function attack() {
  robotTwo.health -= Math.ceil(robotOne.damage * Math.random());
  robotOne.health -= Math.ceil(robotTwo.damage * Math.random());
  updateStats();

if (robotTwo.health <= 0) {
    $(".card").hide();
    $("#victoryPage").show();
    $("#victoryString").append(`<h3>${robotNameOne} playing as ${robotOne.alias}, a ${robotOne.type}, defeated ${robotNameTwo}, a ${robotTwo.type} ${robotTwo.alias} by weilding it's ${robotOne.weapon}</h3>`);

} else if (robotOne.health <= 0) {
    $(".card").hide();
    $("#defeatPage").show();
    $("#defeatString").append(`<h3>${robotNameTwo} playing as ${robotTwo.alias}, a ${robotTwo.type}, defeated ${robotNameOne}, a ${robotOne.type} ${robotOne.alias} by weilding it's ${robotTwo.weapon}</h3>`);
    }
}

$(document).on("click", "#attackbtn", attack);


$(document).on("click", "#tryAgain", function () {
  $("#player-setup").show();
  $("#victoryPage").hide();
  $("#defeatPage").hide();
  $('body').removeAttr('id', 'battleview');
});




},{}]},{},[1]);
