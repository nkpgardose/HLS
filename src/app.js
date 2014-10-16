
var GameLayer = cc.Layer.extend({
  // Add your properties and methods of game layer here.
  player: null,
  control: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
  // Cocos constructor.
  ctor : function () {
    // super init first.
    this._super();
    var size = cc.winSize;

    // Add your codes below...
    cc.log("Game initializing...");
    // Add player with it's default properties set up.
    this.player = new Player(res.playerShip);
    this.player.setRoamArea();
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
    var playerPosition = this.player.getPosition(),
        velocity = this.player.velocity;
    // Updating controls
    if (this.control.up) this.player.y = playerPosition.y + velocity;
    if (this.control.down) this.player.y = playerPosition.y - velocity;
    if (this.control.left) this.player.x = playerPosition.x - velocity;
    if (this.control.right) this.player.x = playerPosition.x + velocity;

    // Validate and update player behavior
    this.player.update(dt);
  },
  /*
    Game control setup the keyboard and other inputs like touch
    and mouse.
  */
  gameControlSetup: function() {
    var control = this.control;
    if(cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function(key, event) { 
          if(key == 87) control.up = true;
          if(key == 83) control.down = true;
          if(key == 65) control.left = true;
          if(key == 68) control.right = true;
        },
        onKeyReleased: function(key, event) {
          if(key == 87) control.up = false;
          if(key == 83) control.down = false;
          if(key == 65) control.left = false;
          if(key == 68) control.right = false;
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

