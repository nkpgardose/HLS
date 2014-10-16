var GameLayer = cc.Layer.extend({
  // Add your properties and methods of game layer here.
  player: null,
  // Cocos constructor.
  ctor : function () {
    // super init first.
    this._super();
    var size = cc.winSize;

    // Add your codes below...
    cc.log("Game initializing...");
    this.player = new Player(res.playerShip);
    this.player.attr({
      x: size.width * 0.5,
      y: size.height * 0.5
    });
    this.addChild(this.player, 0);
    // Add schedule on this layer, update method with delta time param.
    this.scheduleUpdate();

    cc.log("Game initialize complete!");
    return true;
  },
  /* 
    Update method rely on it declared schedule. 
      deltaTime - time between the last time span.
  */
  update : function(dt) {
    cc.log("Update has been called: " + dt);
  },
});

var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new GameLayer();
    this.addChild(layer);
  }
});

