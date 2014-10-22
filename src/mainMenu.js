var MainMenuLayer = cc.Layer.extend({
	background: undefined,
	mainMessage: undefined,
	start: undefined,
	ctor:function () {
		this._super();
		var size = cc.winSize;
	  // Add background
		this.background = new Background();
		this.addChild(this.background, 0);
		this.scheduleUpdate();

		this.mainMessage = new cc.LabelBMFont("humans last ship", res.font);
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

    this.start = new cc.LabelBMFont("start", res.font);
    this.start.setPosition(size.width / 2 + 5, size.height / 2);
    this.start.setAnchorPoint(0.5, 0.5);
    this.addChild(this.start, 101);


		this.controlMessage = new cc.LabelBMFont("controls: A.S.W.D", res.font);
		this.controlMessage.setScale(0.5);
		this.controlMessage.setPosition(size.width / 2 - 450, size.height / 2 - 100);
    this.controlMessage.setAnchorPoint(0, 0.5);
    this.addChild(this.controlMessage, 100);

		this.aimMessage = new cc.LabelBMFont("to aim: mouse move", res.font);
		this.aimMessage.setScale(0.5);
		this.aimMessage.setPosition(size.width / 2 - 450, size.height / 2 - 150);
    this.aimMessage.setAnchorPoint(0, 0.5);
    this.addChild(this.aimMessage, 100);


	  var startButton = new cc.MenuItemImage(
	      res.proceed,
	      res.proceedPress,
	      function () {
	      	menuToGame();
	      }, this);
	  startButton.setScale(1.25);
		var menu = new cc.Menu(startButton);
		menu.alignItemsHorizontally();
		menu.y = menu.y;
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
	// window.twttr=(
	// 	function(d,s,id){
	// 		var t,js,fjs=d.getElementsByTagName(s)[0];
	// 		if(d.getElementById(id)){return}
	// 			js=d.createElement(s);
	// 			js.id=id;
	// 			js.src="https://platform.twitter.com/widgets.js";
	// 			fjs.parentNode.insertBefore(js,fjs);
	// 			return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs"));
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

