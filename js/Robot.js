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

