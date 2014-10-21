var UFO = Enemy.extend({
	slideIn: function(delay, destination) {
		var delayTime = cc.DelayTime.create(delay),
				moveTo    = cc.EaseQuarticActionOut.create(cc.MoveTo.create(1, destination));

		this.runAction(cc.Sequence.create(delayTime, moveTo));
	},

	roam: function(duration) {
		var moveBy = cc.MoveBy.create(duration * 0.5,-5, 0),
				moveBy2 = cc.MoveBy.create(duration * 0.5,5, 0);
		this.runAction(cc.RepeatForever.create(cc.Sequence.create(moveBy, moveBy2)));
	},

	chargeIn: function(delayTime) {
		this.runAction(cc.Sequence.create(cc.DelayTime.create(delayTime),
			cc.CallFunc.create(function() {
				var playerPosition = this.getParent().getChildByTag(100).getPosition();
				this.runAction(cc.EaseBackIn.create(cc.MoveTo.create(1.5, playerPosition)));
			}, this),
			cc.DelayTime.create(1.5),
			cc.CallFunc.create(this.blink, this)
			));
	},

	blink: function(node) {
		var spawnForBlink = cc.Spawn.create(cc.TintTo.create(0.05, 0, 255, 255),
			cc.EaseQuadraticActionIn.create(cc.ScaleTo.create(0.1, 3, 0)));
		this.runAction(cc.Sequence.create(spawnForBlink,
			cc.CallFunc.create(function() {
				this.isActive = false;
			}, this)));

		cc.log("Come from UFO : " + this.isActive);
	}
});