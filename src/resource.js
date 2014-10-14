var folder = "";
if (!cc.sys.isNative) {
	// Detect that this is a website support.
	folder = "res/";
};

var res = {
    HelloWorld_png : folder + "HelloWorld.png",
    CloseNormal_png : folder + "CloseNormal.png",
    CloseSelected_png : folder + "CloseSelected.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}