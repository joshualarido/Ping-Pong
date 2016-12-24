var game = new Phaser.Game(640, 400, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('restart', restartState);
game.state.add('winp1', winP1State);
game.state.add('winp2', winP2State)

game.state.start('boot');