var folder = "";
if (!cc.sys.isNative) {
	// Detect that this is a website support.
	folder = "res/";
};

var res = {
    HelloWorld_png : folder + "HelloWorld.png",
    CloseNormal_png : folder + "CloseNormal.png",
    CloseSelected_png : folder + "CloseSelected.png",
    playerShip : folder + "Player/player-ship.png",
    background : folder + "Backgrounds/black.png",
    shield: folder + "Effects/shield3.png",
    hitList: folder + "Lasers/hitList.plist",
    hitTexture: folder + "Lasers/hitList.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}