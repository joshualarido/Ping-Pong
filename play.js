var playState = {
	create: function() {
		game.physics.arcade.checkCollision.right = false
		game.physics.arcade.checkCollision.left = false


		this.keyboard = game.input.keyboard;

		var player1Graph = game.add.bitmapData(16, 16);
		player1Graph.ctx.rect(0, 0, 16, 16);
		player1Graph.ctx.fillStyle = "#FF0000";
		player1Graph.ctx.fill();

		var ballGraph = game.add.bitmapData(16, 16);
		ballGraph.ctx.rect(0, 0, 16, 16);
		ballGraph.ctx.fillStyle = "#FFAE00";
		ballGraph.ctx.fill();

		var player2Graph = game.add.bitmapData(16, 16);
		player2Graph.ctx.rect(0, 0, 16, 16);
		player2Graph.ctx.fillStyle = "#FFD000";
		player2Graph.ctx.fill();

		var wallGraph = game.add.bitmapData(16, 16);
		wallGraph.ctx.rect(0, 0, 16, 16)
		wallGraph.ctx.fillstyle = "#FFAE00"
		wallGraph.ctx.fill();

		this.p1Score = 0

		this.p2Score = 0

		this.background = game.add.sprite(0, 0, 'Background')
		this.background.scale.setTo(1.65, 1.5)


		this.player1 = game.add.sprite(60, 60, player1Graph);
		game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		this.player1.scale.setTo(1, 7)
		this.player1.body.immovable = true
		this.player1.body.collideWorldBounds = true

		this.player2 = game.add.sprite(560, 60, player2Graph);
		game.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.scale.setTo(1, 7)
		this.player2.body.immovable =true
		this.player2.body.collideWorldBounds = true

		this.ball = game.add.sprite(310, 200, 'Ball');
		game.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.scale.setTo(0.1, 0.1)

		this.wall = game.add.sprite(280, 60, wallGraph);
		game.physics.enable(this.wall, Phaser.Physics.ARCADE);
		this.wall.scale.setTo(2, 2)
		this.wall.body.immovable =true

		this.wall2 = game.add.sprite(380, 160, wallGraph);
		game.physics.enable(this.wall2, Phaser.Physics.ARCADE);
		this.wall2.scale.setTo(2, 2)
		this.wall2.body.immovable =true

		this.wall3 = game.add.sprite(360, 300, wallGraph);
		game.physics.enable(this.wall3, Phaser.Physics.ARCADE);
		this.wall3.scale.setTo(2, 2)
		this.wall3.body.immovable =true

		this.wall4 = game.add.sprite(100, 260, wallGraph);
		game.physics.enable(this.wall4, Phaser.Physics.ARCADE);
		this.wall4.scale.setTo(2, 2)
		this.wall4.body.immovable =true

		
		
		


		this.BounceSound = game.add.audio('Bounce')

		this.HitSound = game.add.audio('Hit')


		this.scoreText = game.add.text(16, 16, 'p1Score: 0 | p2Score: 0', {fontSize: '20px', fill: '#000'})

		this.moveBall(200, 160)

		this.resetBall = false
		this.p1Win = false
		this.p2Win = false



	},

	update: function() {

		game.physics.arcade.collide(this.player1, this.ball, this.playSound, null, this)
		game.physics.arcade.collide(this.player2, this.ball, this.playSound, null, this )
		game.physics.arcade.collide(this.ball, this.wall, this.playAudio, null, this )
		game.physics.arcade.collide(this.ball, this.wall2, this.playAudio, null, this )
		game.physics.arcade.collide(this.ball, this.wall3, this.playAudio, null, this )
		game.physics.arcade.collide(this.ball, this.wall4, this.playAudio, null, this )
		
		
		

		if (this.keyboard.isDown(Phaser.Keyboard.W)) {
			this.player1.body.velocity.y = -500;
		} else if (this.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player1.body.velocity.y = 500;
		} else {
			this.player1.body.velocity.y = 0;
		}

		if (this.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player2.body.velocity.y = -500;
		} else if (this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player2.body.velocity.y = 500;
		} else {
			this.player2.body.velocity.y = 0;
		}

		if (this.ball.body.x > game.world.width) { 
			this.resetBall = true;
			this.p1Win = true
			this.p2Win = false
			this.p1Score++
			console.log("p1: " + this.p1Score + " p2: " + this.p2Score)
			this.scoreText.text = 'p1Score: ' + this.p1Score + '|' + ' p2Score: ' + this.p2Score
		}

		if (this.ball.body.x < 0) {
			this.resetBall = true;
			this.p2Win = true
			this.p1Win = false
			this.p2Score++
			console.log("p1: " + this.p1Score + " p2: " + this.p2Score)
			this.scoreText.text = 'p1Score: ' + this.p1Score  + '|' + ' p2Score: ' + this.p2Score
		}

		if (this.resetBall === true ){
			if (this.p1Score === 6) {
				this.Win()

				} else if (this.p2Score === 6) {
				this.Win2()
			} else {
				this.restartBall()

				if (this.keyboard.isDown(Phaser.Keyboard.E)) {
				if (this.p1Win) {
					this.moveBall(200, 100)
				} else if (this.p2Win) {
					this.moveBall(-200, 100)
				}

				this.resetBall = false;

			}
			}
			
			
		}
	},

	moveBall: function(x, y) {

		this.ball.body.velocity.setTo(x, y)
		this.ball.body.collideWorldBounds = true
		this.ball.body.bounce.setTo(1, 1)
	},

	restartBall: function() {
		this.ball.body.x = 310
		this.ball.body.y = 200
		this.ball.body.velocity.setTo(0, 0)
		
	},

	playAudio: function() {
		this.BounceSound.play()
	},

	playSound: function() {
		this.HitSound.play()
	},



	Win: function() {
		game.state.start('winp1');
	},

	Win2: function() {
		game.state.start('winp2')
	}

}













