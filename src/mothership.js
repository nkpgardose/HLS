var Mothership = Enemy.extend({
	slideIn: function(delay, duration, destination) {
		this.runAction(cc.Sequence.create(
			cc.DelayTime.create(delay),
			cc.EaseCircleActionOut.create(cc.MoveTo.create(duration, destination))
			));
	},

	releaseBabies : function(delay, duration) {
		var children = [],
			  child,
			  childFileName = "res/Enemies/child"+getRandomInt(1,3)+".png",
			  totalLength = cc.winSize.width,
			  distanceX = totalLength / 20;

		this.runAction(cc.Sequence.create(
			cc.DelayTime.create(delay),
			cc.EaseBounceIn.create(cc.ScaleTo.create(1, 1.5)),
			cc.ScaleTo.create(0.3, 1),
			cc.CallFunc.create(this.signalParticle, this),
			cc.CallFunc.create(this.chargeAway, this)
			));

		for (var i = 0; i < 20; i++) {
			// On top
			child = new Enemy(childFileName);
			child.setHealth(5);
			child.attr({
				x: 10 + (distanceX * i),
				y: cc.winSize.height + 50
			});
			this.getParent().addChild(child);

			// Action going down
			child.runAction(cc.Sequence.create(
				cc.DelayTime.create(delay + 3),
				cc.MoveTo.create(duration, child.x, -150)));
			children.push(child);
		}

		return children;
	},

	chargeAway: function() {
		this.runAction(cc.EaseBackIn.create(cc.MoveTo.create(10, this.x, -150)));
	},

	signalParticle: function() {
		// Set a particle explosion
		var signal = new cc.ParticleExplosion();
		this.getParent().addChild(signal, 0);
		signal.texture = cc.textureCache.addImage(res.star);
		signal.setEmitterMode(cc.ParticleSystem.MODE_RADIUS);
		signal.setPosition(this.getPosition());
		signal.setAutoRemoveOnFinish(true);
		signal.setStartRadius(30);
		signal.setEndRadius(1000);
		signal.setBlendAdditive(true);
	},

	destroy: function() {
		this.stopAllActions();
		this.cleanup();
		this.removeFromParent();
	},
});