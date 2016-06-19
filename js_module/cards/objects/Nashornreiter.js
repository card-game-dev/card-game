"use strict";
var voraussetzung = "Es muss in diesem Zug mindestens 1 verbündetes Minion gestorben sein.";
var text = "Diese Soldaten kommen aus dem Fernen Osten und piksen nicht nur gerne mit ihrem Speer sondern spiessen dich auch gern mit dem Horn auf.";
var health = 2;
var attack = 5;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Nashornreiter extends MeleeMinion {
	constructor ()
	{
		super();
		this.attack = attack;
		this.health = health;
	}
	
	isPlayable(c)
	{
		if (super.isPlayable(c))
		{
			// YOUR CONDITIONS
			return true;
		}
		return false;
	}
}
Nashornreiter.voraussetzung = voraussetzung;
Nashornreiter.nom = "Nashornreiter"
Nashornreiter.text = text;
Nashornreiter.health = health;
Nashornreiter.attack = attack;


module.exports = Nashornreiter;