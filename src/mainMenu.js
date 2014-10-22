var MainMenuLayer = cc.Layer.extend({
	background: undefined,
	mainMessage: undefined,
	ctor:function () {
		this._super();
		var size = cc.winSize;
	  // Add background
		this.background = new Background();
		this.addChild(this.background, 0);
		this.scheduleUpdate();

		this.mainMessage = new cc.LabelBMFont("The last human ship!", res.font);
		var sequence = cc.Sequence.create(
					cc.TintTo.create(0.5, 255,255,0),
					cc.TintTo.create(0.5, 236,122,0),
					cc.TintTo.create(0.5, 199,0,0),
					cc.TintTo.create(0.5, 198,0,207),
					cc.TintTo.create(0.5, 0,134,255),
					cc.TintTo.create(0.5, 0,255,201),
					cc.TintTo.create(0.5, 0,215,166) );
		this.mainMessage.setScale(1.25);
		this.mainMessage.runAction(cc.RepeatForever.create(sequence));
		this.mainMessage.setPosition(size.width / 2, size.height / 2 + 200);
    this.mainMessage.setAnchorPoint(0.5, 0.5);
    this.addChild(this.mainMessage, 100);
	  var startButton = new cc.MenuItemImage(
	      res.proceed,
	      res.proceedPress,
	      function () {
	      	menuToGame();
	      }, this);
	  startButton.setScale(1.25);
		var menu = new cc.Menu(startButton);
		menu.alignItemsHorizontally();
		menu.y = menu.y - 200;
		this.addChild(menu, 100);
		return true;
	},
	/*

	*/
	update: function(dt) {
    // Validate and update background
    this.background.update(dt);
	},
	/*
	
	*/
	destroy: function() {
		this.cleanup();
		this.background.destroy();
		this.background = undefined;
	}
});

var INIT_MAINMENU = false;

var menuToGame = function() {
	INIT_MAINMENU = false
  cc.director.runScene(new cc.TransitionFade(1.0, new GameScene()));
  cc.log(cc.director.isSendCleanupToScene());
};

var MainMenuScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		if(!INIT_MAINMENU) {
			INIT_MAINMENU = true;
			var layer = new MainMenuLayer();
			this.addChild(layer);
		}
	}
});

