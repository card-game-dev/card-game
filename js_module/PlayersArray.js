/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

 "use strict";
var game = require('../js_module/Game.js');


class Players {
	constructor ()
	{
		this.players = new Array();
	}
	
	add(client)
	{
		this.players.push(client);
	}
	
	rdy()
	{
		if ( this.players.length >= 2 )
		{
			var g = game();
			g.setP1(this.players[0]);
			g.setP2(this.players[1]);
			this.players.splice( 0,2 );
			return g;
		}
		return false;
	}
	
	remove(client)
	{
		this.players.splice(this.getIndex(client), 1);
	}
	
	getIndex(client) {
		return this.players.indexOf(client);
	}
}

module.exports = new Players();