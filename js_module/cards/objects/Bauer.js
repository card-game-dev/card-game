"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var bauer = class Bauer extends MeleeMinion {
	constructor (cardType, id)
	{
		super();
	}
	
	static get name() {
		return "Bauer";
	}
}

module.exports = bauer;