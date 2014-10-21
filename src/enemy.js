var Enemy = cc.Sprite.extend({
	// Add your properties and methods below.
	health: 10, // Default
	objValue: 10, // Default is 1, 10 is the highest and 1 is lowest
	isActive: true,
	isDestroy: false,
	deltaPosition: null,
	ctor: function(filename) {
		this._super(filename);
		return true;
	},

	setHealth: function(value) {
		this.objValue = value;
		this.health = value;
	},

	hurt: function(damage) {
		this.health -= damage;
		if( this.health < 0 ){ this.isActive = false; this.isDestroy = true; }
	},

	spin: function(duration) {
		var spinValue = 180;
		if(getRandomInt(0,1) === 0) {
			spinValue *= -1;
		}

		this.runAction(cc.RepeatForever.create(
			cc.RotateBy.create(duration, spinValue)));
	},

	fall: function(duration) {		
		this.runAction(cc.MoveTo.create(duration, this.x, -100));
	},

	update: function(dt) {
		if(!this.isActive) return;

		this.checkObjectPosition();
	},

	checkObjectPosition: function() {
		if(this.x < -90 || this.x > cc.winSize.width + 90,
			 this.y < -90 || this.y > cc.winSize.height + 90) {
			this.isActive = false;
		}
	},

	destroy: function() {
		this.cleanup();
		this.removeFromParent();
	}
});