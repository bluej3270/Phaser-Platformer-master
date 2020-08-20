const gameState = {
	score: 0
};

function preload() {
	this.load.image('bug1', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_1.png');
	this.load.image('bug2', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_2.png');
	this.load.image('bug3', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png');
	this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
	this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
	this.load.image('star', "assets/star.png");
}

function create() {
  gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

  const platforms = this.physics.add.staticGroup();	platforms.create(200, 200, 'platform').setScale(.15, .1).refreshBody();

  platforms.create(225, 500, 'platform').setScale(3, .3).refreshBody();	platforms.create(200, 200, 'platform').setScale(.15, .1).refreshBody();

	platforms.create(100, 400, 'platform').setScale(.5, .1).refreshBody();
	platforms.create(300, 300, 'platform').setScale(.5, .1).refreshBody();
	platforms.create(500, 200, 'platform').setScale(.25, .1).refreshBody();
	platforms.create(800, 300, 'platform').setScale(.5, .1).refreshBody();
	platforms.create(100, 100, 'platform').setScale(.15, .1).refreshBody();
	platforms.create(200, 200, 'platform').setScale(.15, .1).refreshBody();
	platforms.create(880, 500, 'platform').setScale(.05, .5).refreshBody();

	platforms.create(20, 500, 'platform').setScale(.05, .5).refreshBody();
	gameState.baddie = this.physics.add.sprite(500, 50, 'bug1');
	this.physics.add.collider(gameState.baddie, platforms);
	this.physics.add.collider(gameState.baddie, gameState.player, function () {
		this.physics.pause();
		document.getElementById('txt').innerHTML = 'Oops, Reolad to Restart.';
	})

	gameState.starOne = this.physics.add.sprite(100, 50, 'star').setScale(.15);
	this.physics.add.collider(gameState.starOne, gameState.player);
	this.physics.add.collider(gameState.starOne, platforms);

	gameState.starTwo = this.physics.add.sprite(800, 50, 'star').setScale(.15);
	this.physics.add.collider(gameState.starTwo, gameState.player);
	this.physics.add.collider(gameState.starTwo, platforms);

	this.physics.add.collider(gameState.starOne, gameState.starTwo, function () {
		document.getElementById('next').disabled = false;
		document.getElementById('txt').innerHTML = 'Good Job! Click to continue.';
	});

  gameState.player.setCollideWorldBounds(true);
	gameState.starOne.setCollideWorldBounds(true);
	gameState.starTwo.setCollideWorldBounds(true);

  this.physics.add.collider(gameState.player, platforms, function () {
  		gameState.canJump = true;
  });

  gameState.cursors = this.input.keyboard.createCursorKeys();

}

function update() {
  if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-160);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(160);
  } else if (gameState.cursors.up.isDown) {
		if (gameState.canJump === true) {
			gameState.player.setVelocityY(-200);
			gameState.canJump = false;
		}
	}else {
    gameState.player.setVelocityX(0);
  }
}


const config = {
	type: Phaser.AUTO,
	width: 900,
	height: 500,
	backgroundColor: "000000",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},
	scene: { preload, create, update }
};

const game = new Phaser.Game(config);
