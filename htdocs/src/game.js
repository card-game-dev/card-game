/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var previewCard = null;
var boardCenterX = (640 - largeCardDimensions.width - containerBorder.left - containerBorder.right) / 2 +
	largeCardDimensions.width + containerBorder.left + containerBorder.right;

function playerDrawCards(cards) {
	cards.forEach(function(card) {
		playerDrawCard(card);
	});
}

function playerDrawCard(cardName) {
	rows.PlayerHand.forEach (function(field) {
		field.x -= (smallCardDimensions.width + gap) / 2;
	});

	var x =  boardCenterX + (rows.PlayerHand.length - 2 + 1) * (smallCardDimensions.width / 2)
		+ (rows.PlayerHand.length - 1 + 1) * (gap / 2);
	var y = 480 - smallCardDimensions.height;

	var field = new CardField(x, y, cardName);

	rows.PlayerHand.push(field);
}

function enemyDrawCards(amount) {
	for(var i = 0; i < amount; i ++) {
		enemyDrawCard();
	}
}

function enemyDrawCard() {
	rows.EnemyHand.forEach (function(field) {
		field.x -= (smallCardDimensions.width + gap) / 2;
	});

	var x =  boardCenterX + (rows.EnemyHand.length - 2 + 1) * (smallCardDimensions.width / 2)
		+ (rows.EnemyHand.length - 1 + 1) * (gap / 2);
	var y = 0;

	var field = new CardField(x, y);

	rows.EnemyHand.push(field);
}



function setPlayOptions(options) {

	for(var option of options) {
		var field = getField(option.pos);
		field.showBorder(option.color);

		field.container.on("click", (function(row, index) {
			removeAllActionOptions();

			window.sendCommand({
				command: "select_option",
				pos: {row: row, index: index}
			});
		}).bind(this, option.pos.row, option.pos.index));
	}
}


function playCard(from, to, cardName, callback) {
	if(from.row !== "PlayerHand" && from.row !== "EnemyHand") {
		throw "a card can only played from a hand";
	}

	from.field = getField(from);
	to.field = getField(to);

	if(from.row === "EnemyHand") {
		from.field.setCard(cardName);

	}
	
	rows[from.row].splice(from.index, 1);
	from.field.backup = to.field;
	rows[to.row][to.index] = from.field;

	from.field.goToField(to.field, function() {		
		for(var i = 0; i < from.index; i ++) {
			rows[from.row][i].x += (smallCardDimensions.width + gap) / 2;
		}
		
		for(var i = from.index; i < rows[from.row].length; i ++) {
			rows[from.row][i].x -= (smallCardDimensions.width + gap) / 2;
		}

		callback();
	});
}

function removeAllActionOptions() {
	for(var name in rows) {
		for(var field of rows[name]) {
			field.removeBorder();
			field.container.removeAllEventListeners("click");
		}
	}
}

function setPreviewCard(card) {
	if(previewCard) {
		stage.removeChild(previewCard.largeCard);
	}

	stage.addChild(card.largeCard);
	previewCard = card;
}

function setAttack(field, attack) {
	getField(field).card.attack = attack;
}

function setHealth(field, health) {
	getField(field).health = health;
}

function kill(field) {
	stage.removeChild(getField(field).container);
	rows[field.row][field.index] = getField(field).backup;
}

function attack(attacker, target, callback) {
	attacker = getField(attacker);
	target = getField(target);

	var sword = new createjs.Bitmap(queue.getResult("schwert.png"));

	sword.scaleX = 2;
	sword.scaleY = 2;

	sword.regX = sword.getBounds().height / 2;
	sword.regY = sword.getBounds().width / 2;


	sword.x = attacker.x + smallCardDimensions.width / 2;
	sword.y = attacker.y + smallCardDimensions.height / 2;

	stage.addChild(sword);

	// TODO: redo
	sword.rotation = Math.atan((target.x - attacker.x) / (attacker.y - target.y)) / Math.PI * 180;

	if(target.y - attacker.y > 0) {
		sword.rotation += 180;
	}

	createjs.Tween.get(sword)
		.to({
			x: target.x + smallCardDimensions.width / 2, 
			y: target.y + smallCardDimensions.height / 2
		}, 1000)
		.call(function() {
			stage.removeChild(sword);
			callback();
		});
}

function glow(target, color, callback) {
	target = getField(target);

	target.glow(color, callback);
}

function startTurn() {
	changeTurnButton.container.on("click", endTurn, this, true);
	changeTurnButton.container.getChildByName("player_turn").visible = true;
	changeTurnButton.container.getChildByName("enemy_turn").visible = false;
}

function endTurn() {
	removeAllActionOptions();
	changeTurnButton.container.getChildByName("enemy_turn").visible = true;
	changeTurnButton.container.getChildByName("player_turn").visible = false;
	sendCommand({command: "end_turn"});
}
