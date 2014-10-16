var Player = cc.Sprite.extend({
	// Add your properties and methods below.
	life: 3,
	velocity: 5,
	isActive: true,
	isShield: true,
	bulletSpawnTime: 200,
	roamArea: null,
	origSize: null,
	// Cocos constructor
	ctor: function (filename) {
		// Super init first.
		this._super(filename);
		// Add your codes below...
		this.origSize = this.getContentSize();
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
		this.isActive = this.life <= 0 ? false : true;
		return this.life;
	},

	shoot: function(dt) {
		if (!this.isActive) return null;
		var bullet;
		return bullet;
	},

	updateRotation : function(cursorPosition) {
		if (!this.isActive) return;
		var angle = Math.atan2(cursorPosition.x - this.getPositionX(),
													 cursorPosition.y - this.getPositionY());
		angle = angle * (180 / Math.PI);
		this.setRotation(angle);
	},

	update: function(dt) {
		if (!this.isActive) return;
		// Restrict roam capability of player.
		var currentPosition = this.getPosition(),
				origSize = this.origSize,
				scaleX = this.getScaleX(),
				scaleY = this.getScaleY();

		if ( currentPosition.x - (origSize.width * scaleX) * 0.5 < 0 )
			this.x = (origSize.width * scaleX) * 0.5;

		if (currentPosition.x + (origSize.width * scaleX) * 0.5 > this.roamArea.width )
			this.x = this.roamArea.width - (origSize.width * scaleX) * 0.5;

    if (currentPosition.y - (origSize.height * scaleY) * 0.5 < 0 )
    	this.y = (origSize.height * scaleY) * 0.5;

		if (currentPosition.y + (origSize.height * scaleY) * 0.5 > this.roamArea.height )
			this.y = this.roamArea.height - (origSize.height * scaleY) * 0.5;
	},

	destroy: function() {
		this.stopAllActions();
		this.unschedule();
		this.removeFromParent();
	},

	setRoamArea: function(size) {
		this.roamArea = size || cc.winSize;
	}
});