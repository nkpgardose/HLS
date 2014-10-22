var Background = cc.LayerColor.extend({
	// Add your properties and functions below.
	/* By default, two layer scrolls */
	bgNode: null,
	nextBGNode: null,
	layerSize: null,
	velocity: 1,
	ctor: function() {
		this._super();
		// Add extra space for shake posibility.
		this.layerSize = cc.winSize;
		this.layerSize.width += 20;
		this.layerSize.height += 20;
		this.bgNode = this.placeBackground();
		this.nextBGNode = this.placeBackground();
		cc.log(this.bgNode.getContentSize().height);
		this.nextBGNode.y = this.bgNode.getContentSize().height;
		return true;
	},

	/*
	 Generate background tiles onto the two node dependent on
	 general cc size.
	 */
	placeBackground: function() {
		var bgNode = new cc.Node();
		bgNode.x = -10;

		// Generate tiles accrd to layer size
		var sprite = new cc.Sprite(res.background),
				x = 0 , y = 0,
				spriteSize = sprite.getContentSize();
				layerSize = this.layerSize;
		for(var i = 0, j ; i * spriteSize.width < layerSize.width; i++) {
			for(j = 0; j * spriteSize.height < layerSize.height; j++) {
				sprite = new cc.Sprite(res.background);
				sprite.setAnchorPoint(0,0);
				sprite.setPosition(i * spriteSize.width, j * spriteSize.height);
				bgNode.addChild(sprite);
			}
			x++;
			y = j;
		}

		bgNode.setContentSize(x * spriteSize.width, y * spriteSize.height);
		this.addChild(bgNode);

		return bgNode;
	},
	/* 
		Update method simple validates and update behavior of background
			deltaTime - time between the last method execution.
	*/
	update : function(dt) {
		// Scroll the two nodess
		var bgNode = this.bgNode,
				nextBGNode = this.nextBGNode;
		bgNode.y -= this.velocity;
		nextBGNode.y -= this.velocity;

		// Condition on bgNode
		if(bgNode.getPositionY() < -(bgNode.getContentSize().height + 10)) {
			bgNode.y = nextBGNode.getPositionY() + nextBGNode.getContentSize().height;
		}

		if(nextBGNode.getPositionY() < -(nextBGNode.getContentSize().height + 10)) {
			nextBGNode.y = bgNode.getPositionY() + bgNode.getContentSize().height;	
		}
	},

	destroy: function() {
		this.bgNode.cleanup();
		this.bgNode.stoppAllActions();
		this.bgNode.removeAllChildren(true);
		this.bgNode.removeFromParent(true);
		this.bgNode = null;

		this.nextBGNode.cleanup();
		this.nextBGNode.stoppAllActions();
		this.nextBGNode.removeAllChildren(true);
		this.nextBGNode.removeFromParent(true);
		this.nextBGNode = null;		

		layerSize = null;
	}
});