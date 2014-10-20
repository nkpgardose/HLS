var UFO = Enemy.extend({
	isTargetingPlayer: false,
	particles: [],
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

	spawnParticles : function() {
		// TODO: make a four particle surrounding ufo and 
		// attack the player thru its current position
		var colorString = "Yellow";
		if(this.health >= 15) {
			colorString = "Red"
		}

		var particle = new Enemy("res/Enemies/dot"+colorString+".png");
		particle.setHealth(this.health);
		particle.deltaPosition = cc.p(-(this.width * 0.5 + 40), 0);
		particle.setPosition(this.x + particle.deltaPosition.x, this.y);
		this.getParent().addChild(particle);
		this.particles.push(particle);

		particle = new Enemy("res/Enemies/dot"+colorString+".png");
		particle.setHealth(this.health);
		particle.deltaPosition = cc.p(this.width * 0.5 + 40, 0);
		particle.setPosition(this.x + particle.deltaPosition.x, this.y);
		this.getParent().addChild(particle);
		this.particles.push(particle);

		particle = new Enemy("res/Enemies/dot"+colorString+".png");
		particle.setHealth(this.health);
		particle.deltaPosition = cc.p(0, -(this.height * 0.5 + 40));
		particle.setPosition(this.x, this.y + particle.deltaPosition.y);
		this.getParent().addChild(particle);
		this.particles.push(particle);

		return this.particles;
	},

	shootParticles: function(startDelayTime, delay) {
		// This stinks.
		this.runAction(cc.Sequence.create(
			cc.DelayTime.create(startDelayTime),
			cc.CallFunc.create(function() {
					this.isTargetingPlayer = true;
					for (var i = 0; i < this.particles.length; i++) {
						this.particles[i].runAction(cc.Sequence.create(
							cc.DelayTime.create(i * delay),
							cc.CallFunc.create(function(){
								var player = this.getParent().getChildByTag(100);
								this.runAction(cc.EaseBackIn.create(
									cc.MoveTo.create(1.5, player.getPosition())
									))
							}, this.particles[i])
							));
					}
				}, this)));
	},

	update: function(dt) {
		if(!this.isActive) return;

		if (!this.isTargetingPlayer) {
			cc.log(this.particles);
			cc.log("Position x and y: "+ this.x + " " +this.y);
			for (var i = 0, temp; i < this.particles.length; i++) {
				temp = this.particles[i].deltaPosition;
				this.particles[i].setPosition(this.x +  temp.x, this.y + temp.y);
			}
		}
		this.checkObjectPosition();
	},

	destroy: function() {
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].isActive = false;
		}

		this.cleanup();
		this.removeFromParent();
	}
});