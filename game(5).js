const gameState = {
	score: 0
};

function preload() {
  this.load.image('bug1', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_1.png');
  this.load.image('bug2', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_2.png');
  this.load.image('bug3', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png');
  this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
  this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
	this.load.image('star', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPtdFgR5Vl32UtzFAiPYhJOUAtbjmvrl8kJN4dwZ0aXPfVgL_1&usqp=CAU')
}


function create() {
  gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

  const platforms = this.physics.add.staticGroup();

  platforms.create(225, 500, 'platform').setScale(3, .3).refreshBody();

	platforms.create(550, 400, 'platform').setScale(2, .1).refreshBody();
	platforms.create(350, 300, 'platform').setScale(2, .1).refreshBody();
	platforms.create(550, 200, 'platform').setScale(2, .1).refreshBody();
	platforms.create(350, 100, 'platform').setScale(2, .1).refreshBody();

	gameState.baddie = this.physics.add.sprite(500, 470, 'bug1');
	this.physics.add.collider(gameState.baddie, platforms);
	this.physics.add.collider(gameState.baddie, gameState.player, function () {
		this.physics.pause();
		document.getElementById('txt').innerHTML = 'Oops, Reolad to Restart.';
	})

	gameState.baddie2 = this.physics.add.sprite(500, 380, 'bug1');
	this.physics.add.collider(gameState.baddie2, platforms);
	this.physics.add.collider(gameState.baddie2, gameState.player, function () {
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
	} else {
    gameState.player.setVelocityX(0);
  }

	if (gameState.baddie.body.x < gameState.player.body.x + 30) {
		gameState.baddie.setVelocityX(+100);
	} else if (gameState.baddie.body.x > gameState.player.body.x) {
		gameState.baddie.setVelocityX(-100);
	} else {
		gameState.baddie.setVelocityX(0);
	}

	if (gameState.baddie.body.y < gameState.player.body.y + 30) {
		gameState.baddie.setVelocityY(+100);
	} else if (gameState.baddie.body.y > gameState.player.body.y) {
		gameState.baddie.setVelocityY(-50);
	} else {
		gameState.baddie.setVelocityY(0);
	}

	if (gameState.baddie2.body.x < gameState.player.body.x + 30) {
		gameState.baddie2.setVelocityX(+100);
	} else if (gameState.baddie2.body.x > gameState.player.body.x) {
		gameState.baddie2.setVelocityX(-100);
	} else {
		gameState.baddie2.setVelocityX(0);
	}

	if (gameState.baddie2.body.y < gameState.player.body.y + 30) {
		gameState.baddie2.setVelocityY(+100);
	} else if (gameState.baddie2.body.y > gameState.player.body.y) {
		gameState.baddie2.setVelocityY(-50);
	} else {
		gameState.baddie2.setVelocityY(0);
	}

}


const config = {
	type: Phaser.AUTO,
	width: 900,
	height: 500,
	backgroundColor: "ffffff",
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
