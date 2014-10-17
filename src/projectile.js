var Projectile = cc.Sprite.extend({
	// Add your properties and methods below.
	damage: null,
	// For projectile angle purposes.
	radAngle: null,
	radX: null,
	radY: null,
	velocity: 15,
	isActive: true,
	ctor: function(filename, damage) {
		this._super(filename);
		this.damage = damage || 1;
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
	update: function(dt) {
		if(!this.isActive) return;
		this.x += this.velocity * this.radX;
		this.y += this.velocity * this.radY;

		if (this.x < -10 || this.x > cc.winSize.width + 10 ||
			  this.y < -10 || this.y > cc.winSize.height + 10) {
			this.isActive = false;
		}
	},
	destroy: function(dt) {
		this.stopAllActions();
		this.unschedule();
		this.removeFromParent();
	}
});