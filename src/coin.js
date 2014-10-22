var Coin = cc.Sprite.extend({
	// Default coin value to score
	coinValue: 5,
	isImproveWeapon: false,
	isActive: true,
	hasCaught: false,
	ctor: function(filename) {
		this._super(filename);
		this.setScale(0.5);
		this.scheduleUpdate();
	},

	caught: function() {
		this.isCaught = true;
		this.isActive = false;
		this.stopAllActions();
		this.runAction(cc.Sequence.create(
			cc.Sequence.create(cc.FadeOut.create(0.1), cc.ScaleTo.create(0.1, 1)),
			cc.CallFunc.create( this.destroy, this)
			));
	},

	fall: function() {
		// Jump to but duration may differ based on height
		var randX = getRandomArbitrary(-150, 150),
				jumpHeight = getRandomArbitrary(500, 700),
				jump = cc.JumpTo.create(2.5, this.x + randX, -160, jumpHeight, 1),
				spinValue;
		spinValue = randX < 0 ? -180 : 180;
		this.runAction(cc.RepeatForever.create(
			cc.RotateBy.create(getRandomInt(1,3), spinValue)));
		this.runAction(jump);
	},

	update: function() {
		if(!this.isActive || this.hasCaught) return;
		// Restrict roam capability of player.
		var currentPosition = this.getPosition(),
				origSize = this.getContentSize(),
				scaleX = this.getScaleX(),
				scaleY = this.getScaleY();

		if ( currentPosition.x - (origSize.width * scaleX) * 0.5 < 0 )
			this.x = (origSize.width * scaleX) * 0.5;

		if (currentPosition.x + (origSize.width * scaleX) * 0.5 > cc.winSize.width )
			this.x = cc.winSize.width - (origSize.width * scaleX) * 0.5;

		if(this.y < -90 ) {
			this.isActive = false;
		}
	},

	destroy: function() {
		this.cleanup();
		this.removeFromParent(true);
	}
});