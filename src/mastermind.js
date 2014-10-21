var Mastermind = cc.Node.extend({
	// Add you properties and methods below.
	isActive: true,
	enemies: [],
	units: null,
	// This depend on delta time values.
	totalCounter: 1, // Starts with one on mothership conditional spawning
	ufoSpawnTime: null,
	ufoCounter: 0,
	ufoInitPosition: null,
	spawnChance: 2,
	ctor: function() {
		this._super();
		this.ufoSpawnTime = getRandomInt(20, 30);
		var size = cc.winSize;
		cc.log(size);
		this.ufoInitPosition = [[-60, size.height * 0.75], 
		[size.width + 60, size.height * 0.75 - 100], 
		[-60, size.height * 0.5], 
		[size.width + 60, size.height * 0.5 - 100]];
	},

	update: function(dt) {
		if (!this.isActive) return;
		var randNum, index, temp;
		this.totalCounter += dt;

		// Check status of the enemies
		index = this.enemies.length - 1;
		while(index >= 0) {
			temp = this.enemies[index];
			temp.update(dt);
			if(!temp.isActive) {
				this.enemies.splice(index, 1);
				if( temp.isDestroy ) {
					// TODO: Release coins plus with chance of power ups
					var coins = [], coin, spawnCoins, powerUpChance;
					if (temp.objValue < 3) {
						spawnCoins = 1;
						powerUpChance = 5;
					} else if(temp.objValue >= 3 && temp.objValue < 10) {
						spawnCoins = 3;
						powerUpChance = 7;
					} else if(temp.objValue >= 10 && temp.objValue < 40) {
						spawnCoins = 7;
						powerUpChance = 10;
					} else if(temp.objValue >= 40) {
						spawnCoins = 10;
						powerUpChance = 15;
					}

					while(spawnCoins >= 0) {
						coin = new Coin(res.coin);
						coin.setPosition(temp.getPosition());
						this.getParent().addChild(coin, 5);
						coin.fall();
						coins.push(coin);
						spawnCoins--;
					}

					randNum = getRandomArbitrary(0, 100);
					if(randNum <= powerUpChance) {
						coin = new Coin(res.powerup);
						coin.setScale(2);
						coin.isImproveWeapon = true;
						coin.setPosition(temp.getPosition());
						this.getParent().addChild(coin, 6);
						coin.fall();
						coins.push(coin);
					}
					Array.prototype.push.apply( this.getParent().coins, coins);
				}

				temp.destroy();
			}
			index--;
		}

		// Always spawn enemy but halt when doing formations
		randNum = getRandomArbitrary(0, 100); 
		if(randNum <= this.spawnChance) {
			// Spawn meteors randNum for choosing which meteor
			randNum = getRandomInt(1, 10);
			var meteor = new Enemy("res/Meteors/meteor"+randNum+".png");
			meteor.setHealth(randNum);
			// Set position
			meteor.setPosition(getRandomArbitrary(10, cc.winSize.width - 10),
			 cc.winSize.height + 50);
			this.getParent().addChild(meteor);
			meteor.spin(getRandomInt(1, 3));
			meteor.fall(getRandomInt(3, 5));
			this.enemies.push(meteor);
		}

		if(this.ufoCounter >= this.ufoSpawnTime) {
			var totalCounter = this.totalCounter,
					ufoColor		 = res.ufoBlue,
					healthValue  = 15,
					ufo;

			this.ufoSpawnTime = getRandomInt(20, 30);
			this.ufoCounter = 0;

	    if(totalCounter > 60 && totalCounter < 150)	{
	    	ufoColor = res.ufoGreen;
	    	healthValue += 10;
	    } else if(totalCounter >= 150 && totalCounter < 300) {
	    	ufoColor = res.ufoRed;
	    	healthValue += 20;
	    } else if(totalCounter >= 300) {
	    	ufoColor = res.ufoYellow;
	    	healthValue += 35;
	    }

	    // Create 4 spawning ufos side to side
	    for (var i = 0; i < 4; i++) {
	    	ufo = new UFO(ufoColor);
	    	ufo.setHealth(healthValue);
	    	ufo.setPosition(this.ufoInitPosition[i][0], this.ufoInitPosition[i][1]);
	    	this.getParent().addChild(ufo);
	    	this.enemies.push(ufo);

	    	var x = ufo.x < 0 ? 200 : -200;
	    	ufo.roam(1);
	    	ufo.slideIn(2, cc.p(ufo.x + x, ufo.y - 50));
	    	ufo.chargeIn(getRandomArbitrary(4, 10));
	    };
		}
		this.ufoCounter += dt;

		// Mothership
		if (Math.floor(this.totalCounter) % 100 === 0) {
			this.totalCounter += 1;
			// Always spawn enemy but halt when doing formations
			var randNum = getRandomArbitrary(0, 100),
					size = cc.winSize;

			var mothership = new Mothership(res.mothership);
	    mothership.attr({
	      x: size.width * 0.5,
	      y: size.height + 50
	    });
	    mothership.setHealth(120);
	    this.addChild(mothership, 1);
	    this.enemies.push(mothership);
	    mothership.slideIn(1, 5, cc.p(size.width * 0.5, size.height * 0.5));
	    Array.prototype.push.apply(this.enemies, mothership.releaseBabies(5, 4, this.enemies));
		};

		return this.enemies;
	},

	setIsActive: function(value) {
		this.isActive = value;
	}
});