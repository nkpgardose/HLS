
var GameOverLayer = cc.Layer.extend({
	background: undefined,
	mainMessage: undefined,
	subMessage: undefined,
	ctor:function () {
		this._super();
		var size = cc.winSize;

	  // Add background
		this.background = new Background();
		this.addChild(this.background, 0);
		
		// Add game over
    this.mainMessage = new cc.LabelBMFont("GAME OVER", res.font);
    this.mainMessage.setColor(cc.color(204, 0, 0));
    this.mainMessage.setPosition(size.width / 2, size.height / 2 + 200);
    this.mainMessage.setAnchorPoint(0.5, 0.5);
    this.addChild(this.mainMessage, 100);

    this.subMessage = new cc.LabelBMFont("You're dead!", res.font);
    this.subMessage.setPosition(size.width / 2, size.height / 2 + 150);
    this.subMessage.setAnchorPoint(0.5, 0.5);
    this.addChild(this.subMessage, 100);

    this.subMessage = new cc.LabelBMFont(glob.score +" Points", res.font);
    this.subMessage.setPosition(size.width / 2, size.height / 2 + 70);
    this.subMessage.setAnchorPoint(0.5, 0.5);
    this.addChild(this.subMessage, 100);  
    // Medal
    this.giveMedal();  
		// Add Menu
    this.retry = new cc.LabelBMFont("retry", res.font);
    this.retry.setPosition(size.width / 2 - 125, size.height / 2  - 200);
    this.retry.setAnchorPoint(0.5, 0.5);
    this.addChild(this.retry, 101);

    this.backToMenu = new cc.LabelBMFont("Menu", res.font);
    this.backToMenu.setPosition(size.width / 2 + 130, size.height / 2  - 200);
    this.backToMenu.setAnchorPoint(0.5, 0.5);
    this.addChild(this.backToMenu, 101);  
	  var retryGame = new cc.MenuItemImage(
	      res.proceed,
	      res.proceedPress,
	      function () {
	      	replaceToGame();
	      }, this);
	  retryGame.setScale(1.25);
	  var backToMenu = new cc.MenuItemImage(
	      res.back,
	      res.backPress,
	      function () {
       		// var scene = new GameOverScene();
			    // cc.director.pushScene(scene);
	      }, this);
	  backToMenu.setScale(1.25);
		var menu = new cc.Menu(retryGame, backToMenu);
		menu.alignItemsHorizontallyWithPadding(20);
		menu.y = menu.y - 200;
		this.addChild(menu, 100);
		this.scheduleUpdate();
		return true;
	},

	update: function(dt) {
    // Validate and update background
    this.background.update(dt);
	},

	giveMedal: function() {
		var score = glob.score;
		if(score < 400) { return; }
		var filename = res.bronzeMedal;
		if (score >= 1000 && score < 2000) {
			filename = res.silverMedal;
		} else if(score >= 2000) {
			filename = res.goldMedal;
		}

		var sprite = cc.Sprite.create(filename);
		sprite.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 55);
		sprite.setScale(3);
		this.addChild(sprite, 3);

		sprite.runAction(cc.Sequence.create(
			cc.Spawn.create(cc.FadeIn.create(0.2), cc.ScaleTo.create(0.5, 1)),
			cc.CallFunc.create(this.explode, sprite)
			));
	},

	explode: function() {
		// Set a particle explosion
		var signal = new cc.ParticleExplosion();
		signal.setPosition(this.getPosition());
		this.getParent().addChild(signal, 0);
		signal.texture = cc.textureCache.addImage(res.star);
		signal.setEmitterMode(cc.ParticleSystem.MODE_RADIUS);
		signal.setStartColor(cc.color(255,255,255));
		signal.setEndColor(cc.color(255,255,255, 0));
		signal.setAutoRemoveOnFinish(true);
		signal.setStartRadius(0);
		signal.setEndRadius(200);
		signal.setLife(0.1);
		signal.setBlendAdditive(true);
	}
});

var INIT_GAMEOVER = false;
var replaceToGame = function() {
	INIT_GAMEOVER = false;
  //load resources
  cc.director.runScene(new GameScene());
  cc.log(cc.director.isSendCleanupToScene());
};

var replaceToMenu = function() {
	INIT_MAINMENU = true;
  cc.director.runScene(new MainMenuScene());
  cc.log(cc.director.isSendCleanupToScene());
}

var GameOverScene = cc.Scene.extend({
  onEnter:function () {
      this._super();
      if(!INIT_GAMEOVER) {
      	INIT_GAMEOVER = true;
	      var layer = new GameOverLayer();
	      this.addChild(layer);
      }
  }
});

