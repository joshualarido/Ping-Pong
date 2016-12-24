var menuState = {
	create: function() {
		var nameLabel = game.add.text(80, 80, 'Pong', {font: '50px Arial', fill: '#dd0099'});		
		var nameLabel = game.add.text(80, game.world.height-80, 'press w to start', {font: '25px Arial', fill: '#dd9900'});

		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.start, this);

	},

	start: function() {
		game.state.start('play');
	}
}