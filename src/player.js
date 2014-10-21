var Player = cc.Sprite.extend({
	// Add your properties and methods below.
	shield: null,	
	life: 3,
	velocity: 5,
	projectileLevel: 1,
	bulletSpawnTime: 0.10,
	isActive: true,
	isShield: false,
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

	gainPowerUp: function() {
		this.projectileLevel += 1;
		this.projectileLevel = this.projectileLevel > 4 ? 4 : this.projectileLevel;
	},

	gainLife: function(numLife) {
		this.life += numLife;
		this.life = this.life > 9 ? 9 : this.life;
		return this.life;
	},

	hurt: function(numLife) {
		// Reset power to 1
		this.projectileLevel = 1;
		this.life -= numLife;
		this.isActive = this.life <= 0 ? false : true;
		// Make player fade in and out
		this.runAction(cc.Sequence.create(
			cc.FadeOut.create(0.1),
			cc.FadeIn.create(0.2),
			cc.FadeOut.create(0.3),
			cc.FadeIn.create(0.6)));
		this.activateShield(3);
		return this.life;
	},

	shoot: function(dt) {
		if (!this.isActive) return;
		var bullets = [],
				projectileLevel = this.projectileLevel,
				bullet = new Projectile("res/Lasers/laser"+ projectileLevel +".png");
		bullet.damage = projectileLevel == 1 ? 1 : projectileLevel * 0.75;
		this.getParent().addChild(bullet, 0);
		bullet.launch(this.getRotation(), this.getPosition());
		bullets.push(bullet);

		if (projectileLevel >= 2) {
			var x, y, r = 50, 
					radAngle = this.getRotation() * ( Math.PI / 180);

			x = r * Math.cos(radAngle);
			y =	r * Math.sin(-radAngle);

			bullet = new Projectile("res/Lasers/laserSide"+ projectileLevel +".png");
			bullet.damage = projectileLevel * 0.2;
			this.getParent().addChild(bullet, 0);

			bullet.launch(this.getRotation(), cc.p(this.x + x, this.y + y));
			bullets.push(bullet);

			bullet = new Projectile("res/Lasers/laserSide"+ projectileLevel +".png");
			bullet.damage = projectileLevel * 0.15;
			cc.log(bullet.damage);
			this.getParent().addChild(bullet, 0);

			bullet.launch(this.getRotation(), cc.p(this.x - x, this.y - y));
			bullets.push(bullet);
		};

		return bullets;
	},

	activateShield : function(duration) {
		// Create sprite following current rotation and position player
		var shield = new cc.Sprite(res.shield);
		shield.setPosition(this.getPosition());
		shield.setRotation(this.getRotation());
		// shield.setAnchorPoint(cc.p(0.5,0));
		this.getParent().addChild(shield);
		this.shield = shield;
		this.isShield = true;

		var action = cc.RepeatForever.create(cc.Sequence.create(
							cc.ScaleTo.create(0.1, 1.15), 
							cc.ScaleTo.create(0.3, 1) ));
		this.shield.runAction(action);
		var action2 = cc.Sequence.create(cc.DelayTime.create(duration),
								cc.FadeIn.create(0.3), cc.FadeOut.create(0.3),
								cc.FadeIn.create(0.3), cc.FadeOut.create(0.3),
								cc.FadeIn.create(0.5), cc.FadeOut.create(0.5),
								cc.CallFunc.create(this.deactivateShield, this));
		this.shield.runAction(action2);
	},

	deactivateShield : function(node) {
		node.stopAllActions();
		node.removeFromParent();
		this.shield = null;
		this.isShield = false;
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

		if (this.shield !== null) {
			this.shield.setPosition(this.getPosition());
			this.shield.setRotation(this.getRotation());
		}
	},

	destroy: function() {
		this.cleanup();
		this.removeFromParent();
	},

	explode: function() {
		this.shield.cleanup();
		this.shield.removeFromParent();
		this.shield = null;
		this.stopAllActions();


		// Explode player
		this.explodeParticle();
		this.runAction(cc.FadeOut.create(1), cc.CallFunc.create(this.destroy, this));
	},

	explodeParticle: function() {
		// Set a particle explosion
		var signal = new cc.ParticleExplosion();
		signal.setPosition(this.getPosition());
		this.getParent().addChild(signal, 0);
		signal.texture = cc.textureCache.addImage(res.star);
		signal.setEmitterMode(cc.ParticleSystem.MODE_RADIUS);
		signal.setStartColor(cc.color(255,255,255));
		signal.setEndColor(cc.color(255,0,0));
		signal.setAutoRemoveOnFinish(true);
		signal.setStartRadius(30);
		signal.setEndRadius(1000);
		signal.setBlendAdditive(true);
	},

	setRoamArea: function(size) {
		this.roamArea = size || cc.winSize;
	}
});