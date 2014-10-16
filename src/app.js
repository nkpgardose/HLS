
var GameLayer = cc.Layer.extend({
  // Add your properties and methods of game layer here.
  player: null,
  pressKey: 0,
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
    var playerPosition = this.player.getPosition();
    var velocity = this.player.velocity;

    // Updating controls
    switch(this.pressKey) {
      case 87:
        this.player.y = playerPosition.y + velocity;
        break;
      case 83:
        this.player.y = playerPosition.y - velocity;
        break;
      case 65:
        this.player.x = playerPosition.x - velocity;
        break;
      case 68:
        this.player.x = playerPosition.x + velocity;
      default:
        break;
    }

  },
  /*
    Game control setup the keyboard and other inputs like touch
    and mouse.
  */
  gameControlSetup: function() {
    var game = this;
    if(cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function(key, event) {
          // Check press keys
          if (key == 87 || key == 83 || key == 65 || key == 68 ) {
            game.pressKey = key;
          };
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

