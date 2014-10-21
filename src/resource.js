var folder = "";
if (!cc.sys.isNative) {
	// Detect that this is a website support.
	folder = "res/";
};

var res = {
    HelloWorld_png : folder + "HelloWorld.png",
    proceed : folder + "green_button09.png",
    proceedPress : folder + "green_button10.png",
    back : folder + "red_button06.png",
    backPress : folder + "red_button07.png",
    playerShip : folder + "Player/player-ship.png",
    background : folder + "Backgrounds/black.png",
    shield: folder + "Effects/shield3.png",
    hitList: folder + "Lasers/hitList.plist",
    hitTexture: folder + "Lasers/hitList.png",
    ufoBlue: folder + "Enemies/ufoBlue.png",
    ufoRed: folder + "Enemies/ufoRed.png",
    ufoGreen: folder + "Enemies/ufoGreen.png",
    ufoYellow: folder + "Enemies/ufoYellow.png",
    mothership: folder + "Enemies/mothership.png",
    star: folder + "Effects/star3.png",
    coin: folder + "coin.png",
    font: folder + "fonts/game-font.fnt",
    life: folder + "playerLife2_orange.png",
    powerup: folder + "bold_silver.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}