"use strict";

var Card = require(__dirname + '/Card.js');

class Spell extends Card {
	constructor ()
	{
		super();
	}
	
	isPlayable(field)
	{
		return true;
	}
	
	getPlayableFields(field)
	{
		return new Array();
	}
}


module.exports = Spell;