var Projectile = cc.Sprite.extend({
	// Add your properties and methods below.
	damage: null,
	// For projectile angle purposes.
	radAngle: null,
	radX: null,
	radY: null,
	velocity: 15,
	isActive: true,
	hitTexture: null,
	ctor: function(filename) {
		this._super(filename);
		this.damage = 1;
		this.hitTexture = cc.textureCache.addImage(res.hitTexture);
	},
	launch: function(angle, position) {
		this.setRotation(angle);
		this.radAngle = angle * (Math.PI / 180);
		this.radX = Math.sin(this.radAngle);
		this.radY = Math.cos(this.radAngle);

		position.x +=  60 * this.radX;
		position.y +=  60 * this.radY;
		this.setPosition(position);
		this.scheduleUpdate();
	},
	explode: function() {
		this.isActive = false;
		this.setAnchorPoint(cc.p(0.5,	1));
		// Change texture and do an explosion action.
		cc.spriteFrameCache.addSpriteFrames(res.hitList);
		var hitImages = cc.SpriteBatchNode.create(this.hitTexture);
		var animFrames = [];
		var str = "";
		for (var i = 0; i < 2; i++) {
			str = "laserHit" + (i + 1) + ".png";
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
				var animFrame = new cc.AnimationFrame();
			 	animFrame.initWithSpriteFrame(spriteFrame, 1, null);
				animFrames.push(animFrame);
		}
		var animation = cc.Animation.create(animFrames, 0.08, 100);
		var animate   = cc.Animate.create(animation);
		this.runAction(animate);

		this.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),
			cc.CallFunc.create(function(node) {
				this.destroy();
			}, this)));
	},
	update: function(dt) {
		if(!this.isActive) return;
		this.x += this.velocity * this.radX;
		this.y += this.velocity * this.radY;

		if (this.x < -10 || this.x > cc.winSize.width + 10 ||
			  this.y < -10 || this.y > cc.winSize.height + 10) {
			this.isActive = false;
		}
	},
	destroy: function() {
		this.cleanup();
		this.removeFromParent();
	}
});