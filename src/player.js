var Player = cc.Sprite.extend({
	// Add your properties and methods below.
	life: 3,
	velocity: 3,
	isActive: true,
	isShield: true,
	bulletSpawnTime: 200,
	// Cocos constructor
	ctor: function (filename) {
		// Super init first.
		this._super(filename);
		// Add your codes below...

		// Add texture to the class
		return true;
	},

	gainLife: function(numLife) {
		this.life += numLife;
		this.life = this.life > 9 ? 9 : this.life;
		return this.life;
	},

	hurt: function(numLife) {
		this.life -= numLife;
		isActive = this.life <= 0 ? false : true;
		return this.life;
	},

	shoot: function(dt) {
		if (!isActive) return null;
		var bullet;
		return bullet;
	},

	update: function(dt) {
		if(!isActive) return;
	},

	destroy: function() {
		this.stopAllActions();
		this.unschedule();
		this.removeFromParent();
	}
});