var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30 px Courier', fill: "#00de45"});
		game.load.image('Ball', 'assets/soccer-ball.png')
		game.load.image('Background', 'assets/pixelBG.jpg')
		game.load.audio('Hit', 'assets/silencer.wav')
		game.load.audio('Bounce', 'assets/Bounce.wav')


	},

	create: function() {
		game.state.start('menu');
	}
}