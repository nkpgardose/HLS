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
    // Add player with it's default properties set up.
    this.player = new Player(res.playerShip);
    this.player.attr({
      x: size.width * 0.5,
      y: size.height * 0.5
    });
    this.addChild(this.player, 0);

    // Setting up keyboard and touch capability
    this.gameControlSetup();
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
    // cc.log("Update has been called: " + dt);
  },
  /*
    Game control setup the keyboard and other inputs like touch
    and mouse.
  */
  gameControlSetup: function() {
    if(cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function(key, event) {
          cc.log("Key pressed: " + key.toString());
        }
      }, this);
    }
  }
});

var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new GameLayer();
    this.addChild(layer);
  }
});

