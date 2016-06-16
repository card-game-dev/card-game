"use strict";

var field = class Field {
	constructor ()
	{
		var playerMelee = [-1, -1, -1, -1, -1];
		var playerRange = [-1, -1, -1, -1, -1];
		var playerHand = new Array();
		
		var eMelee = [-1, -1, -1, -1, -1];
		var eRange = [-1, -1, -1, -1, -1];
		var eHand = new Array();
		
		this.field = {
			melee: playerMelee,
			range: playerRange,
			hand: playerHand,
			enemyMelee: eMelee,
			enemyHand: eHand,
			enemyRange: eRange
		};
	}
	
	addHand(cardsToAdd)
	{
		for ( var index = 0; index < cardsToAdd.length; index ++ )
		{
			this.field.hand.push( cardsToAdd[index] );
		}
	}
			
	translate(pos, maxIndex)
	{
		var newPos = {row: "NULL", index: -1};
		if (pos.row === 'PlayerHand')
			newPos.row = 'EnemyHand';
		if (pos.row === 'PlayerMelee')
			newPos.row = 'EnemyMelee';
		if (pos.row === 'PlayerRange')
			newPos.row = 'EnemyRange';
			
		if (pos.row === 'EnemyHand')
			newPos.row = 'PlayerHand';
		if (pos.row === 'EnemyMelee')
			newPos.row = 'PlayerMelee';
		if (pos.row === 'EnemyRange')
			newPos.row = 'PlayerRange';
		
		newPos.index = maxIndex - pos.index;
			
		if (pos.row === 'Players')
		{
			newPos.row = 'Players';
			if (pos.index == 0)
				newPos.index = 1;
			if (pos.index == 1)
				newPos.index = 0;
		}
		
		return newPos;
	}
	
	getCardOnPos(pos)
	{
		var row = pos.row,
			i = pos.index;
			
		if (row == 'PlayerMelee')
			return this.field.melee[i];
		if (row == 'PlayerRange')
			return this.field.range[i];
		if (row == 'EnemyMelee')
			return this.field.enemyMelee[i];
		if (row == 'EnemyRange')
			return this.field.enemyRange[i];
		
		if (row == 'Players') {
			return {row: "Players", index: i, type: "Player"};
		}
	}

	
	setCardPos(pos, card)
	{
		var row = pos.row,
			index = pos.index;
		
		if (row == 'PlayerMelee')
			this.field.melee[index] = card;
		if (row == 'PlayerRange')
			this.field.range[index] = card;
		
		if (row == 'EnemyMelee')
			this.field.enemyMelee[index] = card;
		if (row == 'EnemyRange')
			this.field.enemyRange[index] = card;
	}
	
	getCard(pos)
	{
		var card = -1;
		var row = pos.row,
			index = pos.index;
		if (row == 'PlayerMelee') 
		{
			card = this.field.melee[index];
		}
		if (row == 'PlayerRange')
		{
			card = this.field.range[index];
		}
		
		if (card == -1)
		{
			console.log('cheat?');
		}
		
		return card;
	}
	
	// The Hardcore kek code.....:'(
	getFieldsWithCards(friendly)
	{
		var fields = [];
		
		if (friendly)
		{
			for ( var i = 0; i < this.field.melee.length; i++)
			{
				if (this.field.melee[i] != -1)
					fields.push( {row: 'PlayerMelee', index: i} );
			}
			
			for ( var i2 = 0; i2 < this.field.range.length; i2++)
			{
				if (this.field.range[i2] != -1)
					fields.push( {row: 'PlayerRange', index: i2} );
			}
			
			return fields;
		}
		
		if (!friendly)
		{
			
			for ( var i = 0; i < this.field.melee.length; i++)
			{
				if (this.field.melee[i] != -1)
					fields.push( {row: 'EnemyMelee', index: i} );
			}
			
			for ( var i2 = 0; i2 < this.field.range.length; i2++)
			{
				if (this.field.range[i2] != -1)
					fields.push( {row: 'EnemyRange', index: i2} );
			}
			
			return fields;
		}
	}	
	
	getRow(row)
	{
		if (row == 'PlayerHand')
			return this.field.hand;
		if (row == 'PlayerMelee')
			return this.field.melee;
		if (row == 'PlayerRange')
			return this.field.range;
		if (row == 'EnemyMelee')
			return this.field.enemyMelee;
		if (row == 'EnemyRange')
			return this.field.enemyRange;
		if (row == 'EnemyHand')
			return this.field.enemyHand;
	}
	
	removeCard(pos)
	{
		switch (pos.row)
		{
			case 'PlayerHand':
				this.field.hand.splice(pos.index,1);
				break;
			case 'PlayerMelee':
				this.field.melee[pos.index] = -1;
				break;
			case 'PlayerRange':
				this.field.range[pos.index] = -1;
				break;
			case 'EnemyHand':
				this.field.enemyHand.splice(pos.index,1);
				break;
			case 'EnemyMelee':
				this.field.enemyMelee[pos.index] = -1;
				break;
			case 'EnemyRange':
				this.field.enemyRange[pos.index] = -1;
				break;			
		}
		return this;
	}
	
	
	getHand() {
		return this.field.hand;
	}
	
	getHandCard(index) {
		return this.field.hand[index];
	}
	
	getField() {
		return this.field;
	}
	
	getFriendlyMinions()
	{
		var melee = this.getRow('PlayerMelee').length;
		var range = this.getRow('PlayerRange').length;
		return melee + range;
	}
	
	getEnemyMinions()
	{
		var melee = this.getRow('EnemyMelee').length;
		var range = this.getRow('EnemyRange').length;
		return melee + range;
	}
	
	getMelee()
	{
		var friend = this.getRow('PlayerMelee').length;
		var enemy = this.getRow('EnemyMelee').length;
		return friend + enemy;
	}
	
	getRange()
	{
		var friend = this.getRow('PlayerRange').length;
		var enemy = this.getRow('EnemyRange').length;
		return friend + enemy;
	}
	
	getFriendlyMelee() {
		return this.getRow('PlayerMelee').length;
	}
	
	getEnemyMelee() {
		return this.getRow('EnemyMelee').length;
	}
	
	getFriendlyRange() {
		return this.getRow('PlayerRange').length;
	}
	
	getEnemyRange() {
		return this.getRow('EnemyRange').length;
	}
	
}

module.exports = field;