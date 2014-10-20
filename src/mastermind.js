var Mastermind = cc.Node.extend({
	// Add you properties and methods below.
	isActive: true,
	enemies: [],
	units: null,
	// This depend on delta time values.
	totalCounter: 0,
	ufoSpawnTime: null,
	ufoCounter: 0,
	ufoInitPosition: null,
	spawnChance: 2,
	ctor: function() {
		this._super();
		this.ufoSpawnTime = getRandomInt(20, 30);
		var size = cc.winSize;
		cc.log(size);
		this.ufoInitPosition = [[-60, size.height * 0.75], [size.width + 60, size.height * 0.75], [-60, size.height * 0.5], [size.width + 60, size.height * 0.5]];
	},

	update: function(dt) {
		if (!this.isActive) return;
		var randNum, index, temp;
		this.totalCounter += dt;

		// Check status of the enemies
		index = this.enemies.length - 1;
		while(index >= 0) {
			this.enemies[index].update(dt);
			if(!this.enemies[index].isActive) {
				temp = this.enemies[index];
				this.enemies.splice(index, 1);
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
					healthValue  = 5,
					ufo;

			this.ufoSpawnTime = getRandomInt(20, 30);
			this.ufoCounter = 0;

	    if(totalCounter > 60 && totalCounter < 150)	{
	    	ufoColor = res.ufoGreen;
	    	healthValue += 5;
	    } else if(totalCounter >= 150 && totalCounter < 300) {
	    	ufoColor = res.ufoRed;
	    	healthValue += 10;
	    } else if(totalCounter >= 300) {
	    	ufoColor = res.ufoYellow;
	    	healthValue += 15;
	    }

	    // Create 4 spawning ufos side to side
	    for (var i = 0; i < 4; i++) {
	    	ufo = new UFO(ufoColor);
	    	ufo.setHealth(healthValue);
	    	ufo.setPosition(this.ufoInitPosition[i][0], this.ufoInitPosition[i][1]);
	    	this.getParent().addChild(ufo);
	    	this.enemies.push(ufo);

	    	var x = ufo.x < 0 ? 200 : -200;
	    	Array.prototype.push.apply(this.enemies, ufo.spawnParticles());
	    	ufo.roam(1);
	    	ufo.slideIn(2, cc.p(ufo.x + x, ufo.y - 50));
	    	ufo.shootParticles(4, 1);
	    	ufo = null;
	    };
		}
		this.ufoCounter += dt;

		return this.enemies;
	},

	setIsActive: function(value) {
		this.isActive = value;
	}
});