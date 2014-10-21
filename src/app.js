
var GameLayer = cc.Layer.extend({
  // Add your properties and methods of game layer here.
  score: 0,
  lifeSprite: [],
  player: null,
  mastermind: null,
  background: null,
  bullets: [],
  enemies: [],
  coins:[],
  powerup:[],
  cursorPosition: cc.p(0,0),
  spawnBulletCounter: 0,
  control: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
  isActive: true,
  // Cocos constructor.
  ctor : function () {
    // super init first.
    this._super();

    var size = cc.winSize;

    // Add your codes below...
    cc.log("Game initializing...");

    // Add background
    this.background = new Background();
    this.addChild(this.background, 0);

    // Add player with it's default properties set up.
    this.player = new Player(res.playerShip);
    this.player.setRoamArea();
    this.player.attr({
      x: size.width * 0.5,
      y: size.height * 0.5
    });
    this.player.setTag(100);
    this.addChild(this.player, 1);

    // Activate shield of player
    this.player.activateShield(3);

    // Mastermind for enemies command.
    this.mastermind = new Mastermind();
    this.addChild(this.mastermind);

    // Setting up keyboard and touch capability
    this.gameControlSetup();

    // Add schedule on this layer, update method with delta time param.
    this.scheduleUpdate();

    this.scoreBMLabel = new cc.LabelBMFont("Score: "+ this.score, res.font);
    this.scoreBMLabel.setPosition(10, size.height - 100);
    this.scoreBMLabel.setAnchorPoint(0, 0);
    // this.scoreBMLabel.setSkewX(30);
    // this.scoreBMLabel.setSkewY(5);
    this.addChild(this.scoreBMLabel, 100);

    for (var i = 0, life; i < this.player.life; i++) {
      life = new cc.Sprite(res.life);
      life.setAnchorPoint(0, 1);
      life.setPosition((i * ( life.getContentSize().width+ 15 )) + this.scoreBMLabel.x,
                      this.scoreBMLabel.y - 15);
      this.addChild(life);
      this.lifeSprite.push(life, 100);
    };


    cc.log("Game initialize complete!");
    return true;
  },
  /* 
    Update method rely on it's declared schedule. 
      deltaTime - time between the last method execution.
  */
  update : function(dt) {
    if (!this.isActive) return;
    var playerPosition = this.player.getPosition(),
        velocity = this.player.velocity,
        bullets = this.bullets,
        temp,
        i = bullets.length - 1;

    // Check player if life is 0, spawn game over.
    if (!this.player.isActive) {
      // Game over
      this.isActive = false;
      this.unschedule();
      this.player.explode();
      this.player = null;
      return;
    };

    // Updating controls
    if (this.control.up) this.player.y = playerPosition.y + velocity;
    if (this.control.down) this.player.y = playerPosition.y - velocity;
    if (this.control.left) this.player.x = playerPosition.x - velocity;
    if (this.control.right) this.player.x = playerPosition.x + velocity;

    // Validate and update background
    this.background.update(dt);

    // Validate and update player behavior
    this.player.update(dt);
    this.spawnBulletCounter += dt;
    if (this.spawnBulletCounter > this.player.bulletSpawnTime) {
      Array.prototype.push.apply(bullets, this.player.shoot(dt));
      this.spawnBulletCounter = 0;
    }

    // Update bullets.
    while(i >= 0) {
      if (!bullets[i].isActive) {
        temp = bullets[i];
        bullets.splice(i, 1);
        temp.destroy();
      }
      i--;
    }

    // Checking collisions between active objects.
    this.enemies = this.mastermind.update(dt);
    for (var i = this.enemies.length - 1, j, enemies = this.enemies; 
             i >= 0; i--) {
      // Check enemy and player collision.
      if(cc.rectIntersectsRect(this.player.getBoundingBox(), enemies[i].getBoundingBox())
        && !this.player.isShield) {
        this.player.hurt(1);
        var life = this.lifeSprite.pop();
        life.cleanupo
        life.removeFromParent();
      }

      for(j = bullets.length - 1; j >= 0; j--) {
        temp = bullets[j];

        // Check enemy and bullet collisions.
        if (cc.rectIntersectsRect(bullets[j].getBoundingBox(), enemies[i].getBoundingBox())) {
          enemies[i].hurt(bullets[j].damage);
          bullets.splice(j, 1);
          // Animate bullet on hit
          temp.explode();
        }
      }
    }

    for(var i = this.coins.length - 1; i >= 0; i--) {
      // Check coins and player collision
      temp = this.coins[i];
      if(!temp.isActive) {
        this.coins.splice(i, 1);
        temp.destroy();
        continue;
      }

      if (cc.rectIntersectsRect(temp.getBoundingBox(), this.player.getBoundingBox())) {
        // Score update
        // cc.log("Scoore!");
        this.score += temp.coinValue;
        this.scoreBMLabel.runAction(cc.MoveBy.create(0.1, cc.p(0, 5)));
        this.scoreBMLabel.setString("Score: "+ this.score);
        this.scoreBMLabel.runAction(cc.MoveBy.create(0.1, cc.p(0, -5)));
        this.coins.splice(i, 1);
        if (temp.isImproveWeapon) {
          // Power up plus one!
          this.player.gainPowerUp();
        };
        temp.caught();
      }
    }
  },
  /*
    Game control setup the keyboard and other inputs like touch
    and mouse.
  */
  gameControlSetup: function() {
    var control = this.control,
        player = this.player;

    if(cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function(key, event) { 
          if(key === 87) control.up = true;
          if(key === 83) control.down = true;
          if(key === 65) control.left = true;
          if(key === 68) control.right = true;
        },
        onKeyReleased: function(key, event) {
          if(key === 87) control.up = false;
          if(key === 83) control.down = false;
          if(key === 65) control.left = false;
          if(key === 68) control.right = false;
        }
      }, this);
    }

    if(cc.sys.capabilities.hasOwnProperty('mouse')) {
      cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseMove: function(event){
            // var str = "MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY();
            cursorPosition = event.getLocation();
            if(cursorPosition !== null) {
              player.updateRotation(cursorPosition);
            }
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

