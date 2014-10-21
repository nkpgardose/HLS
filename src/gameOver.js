
var GameOverLayer = cc.Layer.extend({
	background: null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

	  // Add background
		this.background = new Background();
		this.addChild(this.background, 0);
		
		// Add Menu
	  var backToMenu = new cc.MenuItemImage(
	      res.CloseNormal_png,
	      res.CloseSelected_png,
	      function () {
          var scene = new GameOverScene();
			    cc.director.pushScene(scene);
			    return true;
	      }, this);
		var menu = new cc.Menu(backToMenu);
		this.addChild(menu);
		this.scheduleUpdate();
		return true;
	},

	update: function(dt) {
    // Validate and update background
    this.background.update(dt);
	}
});

var GameOverScene = cc.Scene.extend({
  onEnter:function () {
      this._super();
      var layer = new GameOverLayer();
      this.addChild(layer);
  }
});

