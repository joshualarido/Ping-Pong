var winP2State = {
	create: function() {
		var winLabel = game.add.text(80, 80, 'P2 WON!', {font: '50px Arial', fill: '#009900'})
		var winLabel = game.add.text(80, game.world.height - 80, 'press "W" to restart', {font: '25px Arial', fill: '#999900'})

		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.restart, this);
	},

	restart: function() {
		game.state.start('play');
	}

}