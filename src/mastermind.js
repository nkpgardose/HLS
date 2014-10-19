var Mastermind = cc.Node.extend({
	// Add you properties and methods below.
	isActive: true,
	enemies: [],
	units: null,
	// This depend on delta time values.
	totalTime: 0,
	spawnChance: 2,
	ctor: function() {
		this._super();
		// this.scheduleUpdate();
	},

	update: function(dt) {
		if (!this.isActive) return;
		var randNum, index, temp;
		this.totalTime += dt;

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
			// Set position
			meteor.setPosition(getRandomArbitrary(10, cc.winSize.width - 10),
			 cc.winSize.height + 50);
			this.getParent().addChild(meteor);
			meteor.spin(getRandomInt(1, 3));
			meteor.fall(getRandomInt(3, 5));
			this.enemies.push(meteor);
		}

		return this.enemies;
	},

	setIsActive: function(value) {
		this.isActive = value;
	}
});