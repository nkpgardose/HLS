var Background = cc.LayerColor.extend({
	// Add your properties and methods below.
	/* By default, two layer scrolls */
	bgNode: null,
	nextBGNode: null,
	layerSize: null,
	ctor: function() {
		this._super();
		// Add extra space for shake posibility.
		this.layerSize = cc.winSize;
		this.layerSize.width += 20;
		this.layerSize.height += 20;
		this.placeBackground(this.bgNode);
	},

	/*
	 Generate background tiles onto the two node dependent on
	 general cc size.
	 */
	placeBackground: function(bgNode) {
		bgNode = new cc.Node();
		bgNode.x = -10;

		// Generate tiles accrd to layer size
		var sprite = new cc.Sprite(res.background),
				spriteSize = sprite.getContentSize();
				layerSize = this.layerSize;
		for(var i = 0, j ; i * spriteSize.width < layerSize.width; i++) {
			for(j = 0; j * spriteSize.height < layerSize.height; j++) {
				sprite = new cc.Sprite(res.background);
				sprite.setAnchorPoint(0,0);
				sprite.setPosition(i * spriteSize.width, j * spriteSize.height);
				bgNode.addChild(sprite);
			}
		}

		this.addChild(bgNode);
	},

});