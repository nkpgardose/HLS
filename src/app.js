var GameLayer = cc.Layer.extend( {
  sprite : null,
  ctor : function () {
    // super init first.
    this._super();
    var size = cc.winSize;
    // Add your codes below...
    cc.log("Game start...");
    // Trying out cc.Sprite.
    var sprite = new cc.Sprite.create(res.playerShip);
    // Setting the default attribute of sprite. Initial position in center.
    sprite.attr({
        x: size.width * 0.5,
        y: size.height * 0.5,
    });

    // Add schedule on this layer
    this.schedule(this.update, 0);
    this.addChild(sprite, 0);
    return true;
  },
});

// Add your properties and methods of game layer here.
/* Update method rely on it declared schedule. 
		deltaTime - time between the last time span.
*/
GameLayer.prototype.update = function(deltaTime) {
	cc.log("This is updating...");
};

var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new GameLayer();
    this.addChild(layer);
  }
});

