"use strict";
var voraussetzung = "Es muss mindestens ein Verbündetes Minion auf dem Feld sein.";
var text = "Vernichtet ein Verletztes Minion.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Gnadenstoss extends spell {
	constructor ()
	{
		super();
	}
}
Gnadenstoss.voraussetzung = voraussetzung;
Gnadenstoss.nom = "Gnadenstoss"
Gnadenstoss.text = text;
Gnadenstoss.health = health;
Gnadenstoss.attack = attack;


module.exports = Gnadenstoss;