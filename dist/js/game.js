(function (cjs, an) {

	var p; // shortcut to reference prototypes
	var lib = {}; var ss = {}; var img = {};
	lib.ssMetadata = [
		{ name: "game_atlas_", frames: [[0, 0, 1920, 1080]] },
		{ name: "game_atlas_2", frames: [[0, 0, 1920, 1080]] },
		{ name: "game_atlas_3", frames: [[0, 1082, 884, 903], [886, 1082, 732, 958], [0, 0, 1920, 1080]] },
		{ name: "game_atlas_4", frames: [[1326, 0, 669, 683], [0, 926, 652, 887], [654, 926, 670, 855], [0, 0, 747, 924], [1326, 685, 470, 821], [749, 0, 558, 901]] },
		{ name: "game_atlas_5", frames: [[510, 0, 450, 787], [0, 789, 618, 482], [962, 634, 519, 632], [962, 0, 520, 632], [0, 0, 508, 750]] }
	];


	// symbols:



	(lib.cap = function () {
		this.initialize(ss["game_atlas_3"]);
		this.gotoAndStop(0);
	}).prototype = p = new cjs.Sprite();



	(lib.cup = function () {
		this.initialize(ss["game_atlas_5"]);
		this.gotoAndStop(0);
	}).prototype = p = new cjs.Sprite();



	(lib.Falls = function () {
		this.initialize(ss["game_atlas_"]);
		this.gotoAndStop(0);
	}).prototype = p = new cjs.Sprite();



	(lib.Mug = function () {
		this.initialize(ss["game_atlas_5"]);
		this.gotoAndStop(1);
	}).prototype = p = new cjs.Sprite();



	(lib.pearl1 = function () {
		this.initialize(ss["game_atlas_5"]);
		this.gotoAndStop(2);
	}).prototype = p = new cjs.Sprite();



	(lib.pearl2 = function () {
		this.initialize(ss["game_atlas_5"]);
		this.gotoAndStop(3);
	}).prototype = p = new cjs.Sprite();



	(lib.pearlSingle = function () {
		this.initialize(ss["game_atlas_4"]);
		this.gotoAndStop(0);
	}).prototype = p = new cjs.Sprite();



	(lib.pearlStop = function () {
		this.initialize(ss["game_atlas_3"]);
		this.gotoAndStop(1);
	}).prototype = p = new cjs.Sprite();



	(lib.Rains = function () {
		this.initialize(ss["game_atlas_3"]);
		this.gotoAndStop(2);
	}).prototype = p = new cjs.Sprite();



	(lib.redbeans1 = function () {
		this.initialize(ss["game_atlas_4"]);
		this.gotoAndStop(1);
	}).prototype = p = new cjs.Sprite();



	(lib.redbeans2 = function () {
		this.initialize(ss["game_atlas_4"]);
		this.gotoAndStop(2);
	}).prototype = p = new cjs.Sprite();



	(lib.redbeansStop = function () {
		this.initialize(ss["game_atlas_4"]);
		this.gotoAndStop(3);
	}).prototype = p = new cjs.Sprite();



	(lib.Snows = function () {
		this.initialize(ss["game_atlas_2"]);
		this.gotoAndStop(0);
	}).prototype = p = new cjs.Sprite();



	(lib.tangyuan1 = function () {
		this.initialize(ss["game_atlas_4"]);
		this.gotoAndStop(4);
	}).prototype = p = new cjs.Sprite();



	(lib.tangyuan2 = function () {
		this.initialize(ss["game_atlas_5"]);
		this.gotoAndStop(4);
	}).prototype = p = new cjs.Sprite();



	(lib.tangyuanStop = function () {
		this.initialize(ss["game_atlas_4"]);
		this.gotoAndStop(5);
	}).prototype = p = new cjs.Sprite();
	// helper functions:

	function mc_symbol_clone() {
		var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
		clone.gotoAndStop(this.currentFrame);
		clone.paused = this.paused;
		clone.framerate = this.framerate;
		return clone;
	}

	function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
		var prototype = cjs.extend(symbol, cjs.MovieClip);
		prototype.clone = mc_symbol_clone;
		prototype.nominalBounds = nominalBounds;
		prototype.frameBounds = frameBounds;
		return prototype;
	}


	(lib.tangyuanMug_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.Mug();
		this.instance.parent = this;
		this.instance.setTransform(-35, -90, 0.0971, 0.083);

		this.instance_1 = new lib.tangyuanStop();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-50, -54, 0.1792, 0.1332);

		this.instance_2 = new lib.tangyuan1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-50, -56, 0.2128, 0.1462);

		this.instance_3 = new lib.tangyuan2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-50, -55, 0.1968, 0.16);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance, p: { x: -35 } }] }).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -25 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -26 } }] }, 1).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -25 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -26 } }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.tangyuanCup_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.cup();
		this.instance.parent = this;
		this.instance.setTransform(-25, -90, 0.0889, 0.0762);

		this.instance_1 = new lib.tangyuanStop();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-50, -35, 0.1792, 0.1332);

		this.instance_2 = new lib.tangyuan1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-50, -35, 0.2128, 0.1462);

		this.instance_3 = new lib.tangyuan2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-50, -38, 0.1968, 0.16);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance, p: { x: -25 } }] }).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -14 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -20 } }] }, 1).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -14 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -20 } }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.tangyuanCap_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.tangyuanStop();
		this.instance.parent = this;
		this.instance.setTransform(-50, -46, 0.1792, 0.1332);

		this.instance_1 = new lib.cap();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-35, -90, 0.0679, 0.0554);

		this.instance_2 = new lib.tangyuan1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-53, -48, 0.2128, 0.1462);

		this.instance_3 = new lib.tangyuan2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-51, -47, 0.1968, 0.16);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1, p: { x: -35 } }, { t: this.instance }] }).to({ state: [{ t: this.instance_1, p: { x: -29 } }, { t: this.instance_2 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -29 } }, { t: this.instance_3 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -29 } }, { t: this.instance_2 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -29 } }, { t: this.instance_3 }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.redbeansMug_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.Mug();
		this.instance.parent = this;
		this.instance.setTransform(-37, -81, 0.0971, 0.083);

		this.instance_1 = new lib.redbeansStop();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-50, -50, 0.1339, 0.1082);

		this.instance_2 = new lib.redbeans1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-50, -53, 0.1534, 0.1127);

		this.instance_3 = new lib.redbeans2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-50, -54, 0.1492, 0.117);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance, p: { x: -37 } }] }).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -35 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -42 } }] }, 1).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -35 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -42 } }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.redbeansCup_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.cup();
		this.instance.parent = this;
		this.instance.setTransform(-29, -105, 0.0889, 0.0762);

		this.instance_1 = new lib.redbeansStop();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-50, -50, 0.1339, 0.1082);

		this.instance_2 = new lib.redbeans1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-50, -51, 0.1534, 0.1127);

		this.instance_3 = new lib.redbeans2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-50, -51, 0.1492, 0.117);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance, p: { x: -29 } }] }).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -23 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -29 } }] }, 1).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -23 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -29 } }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.redbeansCap_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.redbeansStop();
		this.instance.parent = this;
		this.instance.setTransform(-55, -46, 0.1339, 0.1082);

		this.instance_1 = new lib.cap();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-46, -88, 0.0679, 0.0554);

		this.instance_2 = new lib.redbeans1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-55, -45, 0.1534, 0.1127);

		this.instance_3 = new lib.redbeans2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-56, -46, 0.1492, 0.117);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1, p: { x: -46 } }, { t: this.instance }] }).to({ state: [{ t: this.instance_1, p: { x: -38 } }, { t: this.instance_2 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -46 } }, { t: this.instance_3 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -38 } }, { t: this.instance_2 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -46 } }, { t: this.instance_3 }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.pearlMug_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.Mug();
		this.instance.parent = this;
		this.instance.setTransform(-32, -81, 0.0971, 0.083);

		this.instance_1 = new lib.pearlStop();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-40, -46, 0.1093, 0.0835);

		this.instance_2 = new lib.pearl1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-40, -48, 0.1541, 0.1266);

		this.instance_3 = new lib.pearl2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-40, -46, 0.1538, 0.1266);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance, p: { x: -32 } }] }).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -30 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -31 } }] }, 1).to({ state: [{ t: this.instance_2 }, { t: this.instance, p: { x: -30 } }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance, p: { x: -31 } }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.pearlCup_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.cup();
		this.instance.parent = this;
		this.instance.setTransform(-20, -115, 0.0889, 0.1017);

		this.instance_1 = new lib.pearlStop();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-40, -40, 0.1093, 0.0835);

		this.instance_2 = new lib.pearl1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-42, -38, 0.1541, 0.1266);

		this.instance_3 = new lib.pearl2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-40, -40, 0.1538, 0.1266);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance }] }).to({ state: [{ t: this.instance_2 }, { t: this.instance }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance }] }, 1).to({ state: [{ t: this.instance_2 }, { t: this.instance }] }, 1).to({ state: [{ t: this.instance_3 }, { t: this.instance }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.pearlCap_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.pearlStop();
		this.instance.parent = this;
		this.instance.setTransform(-43, -45, 0.1093, 0.0835);

		this.instance_1 = new lib.cap();
		this.instance_1.parent = this;
		this.instance_1.setTransform(-32, -88, 0.0679, 0.0554);

		this.instance_2 = new lib.pearl1();
		this.instance_2.parent = this;
		this.instance_2.setTransform(-43, -45, 0.1541, 0.1266);

		this.instance_3 = new lib.pearl2();
		this.instance_3.parent = this;
		this.instance_3.setTransform(-42, -45, 0.1538, 0.1266);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1, p: { x: -32, y: -88 } }, { t: this.instance }] }).to({ state: [{ t: this.instance_1, p: { x: -35, y: -88 } }, { t: this.instance_2 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -33, y: -88 } }, { t: this.instance_3, p: { y: -45 } }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -35, y: -88 } }, { t: this.instance_2 }] }, 1).to({ state: [{ t: this.instance_1, p: { x: -33, y: -86 } }, { t: this.instance_3, p: { y: -43 } }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.pearl_圖層_1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1
		this.instance = new lib.pearlSingle();
		this.instance.parent = this;
		this.instance.setTransform(-20, -20, 0.0598, 0.0586);

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	}).prototype = getMCSymbolPrototype(lib.pearl_圖層_1, null, null);


	(lib.場景_1_banner1 = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// banner1
		this.instance = new lib.Falls();
		this.instance.parent = this;
		this.instance.setTransform(0, 0, 0.5, 0.5555);

		this.instance_1 = new lib.Snows();
		this.instance_1.parent = this;
		this.instance_1.setTransform(0, 0, 0.5, 0.5555);

		this.instance_2 = new lib.Rains();
		this.instance_2.parent = this;
		this.instance_2.setTransform(0, 0, 0.5, 0.5555);

		this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance }] }).to({ state: [{ t: this.instance_1 }] }, 1).to({ state: [{ t: this.instance_2 }] }, 1).wait(1));

	}).prototype = p = new cjs.MovieClip();


	(lib.tanMug = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { stop: 0, run: 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.tangyuanMug_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(0, -12, 1, 1, 0, 0, 0, 0, -12);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-50, -90, 100, 156);


	(lib.tanCup = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.tangyuanCup_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(0, -2.5, 1, 1, 0, 0, 0, 0, -2.5);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-50, -90, 100, 175);


	(lib.tanCap = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.tangyuanCap_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(0, -8, 1, 1, 0, 0, 0, 0, -8);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-53, -90, 103, 164);


	(lib.redMug = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.redbeansMug_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(0, -15.5, 1, 1, 0, 0, 0, 0, -15.5);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-50, -81, 100, 131);


	(lib.redCup = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.redbeansCup_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(0, -27.5, 1, 1, 0, 0, 0, 0, -27.5);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-50, -105, 100, 155);


	(lib.redCap = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.redbeansCap_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(-5, -17, 1, 1, 0, 0, 0, -5, -17);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-56, -88, 101, 143);


	(lib.peaMug = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.pearlMug_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(0, -23.5, 1, 1, 0, 0, 0, 0, -23.5);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-40, -81, 80, 115);


	(lib.peaCup = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.pearlCup_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(0, -37.5, 1, 1, 0, 0, 0, 0, -37.5);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-42, -115, 82, 157);


	(lib.peaCap = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { "stop": 0, "run": 1 });

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_4 = function () {
			this.___loopingOver___ = true;
			this.gotoAndPlay("run");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

		// 圖層_1_obj_
		this.圖層_1 = new lib.pearlCap_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.setTransform(-3, -26.5, 1, 1, 0, 0, 0, -3, -26.5);
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(5));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(-43, -88, 81, 125);


	(lib.pearlGO = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// 圖層_1_obj_
		this.圖層_1 = new lib.pearl_圖層_1();
		this.圖層_1.name = "圖層_1";
		this.圖層_1.parent = this;
		this.圖層_1.depth = 0;
		this.圖層_1.isAttachedToCamera = 0
		this.圖層_1.isAttachedToMask = 0
		this.圖層_1.layerDepth = 0
		this.圖層_1.layerIndex = 0
		this.圖層_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(1));

	}).prototype = getMCSymbolPrototype(lib.pearlGO, new cjs.Rectangle(-20, -20, 40, 40), null);


	// stage content:
	(lib.pearl_HTML5Canvas = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, { Fall: 0, Snow: 1, Rain: 2 });

		this.___GetDepth___ = function (obj) {
			var depth = obj.depth;
			var cameraObj = this.___camera___instance;
			if (cameraObj && cameraObj.depth && obj.isAttachedToCamera) {
				depth += depth + cameraObj.depth;
			}
			return depth;
		}
		this.___needSorting___ = function () {
			for (var i = 0; i < this.getNumChildren() - 1; i++) {
				var prevDepth = this.___GetDepth___(this.getChildAt(i));
				var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
				if (prevDepth < nextDepth)
					return true;
			}
			return false;
		}
		this.___sortFunction___ = function (obj1, obj2) {
			return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
		}
		this.on('tick', function (event) {
			var curTimeline = event.currentTarget;
			if (curTimeline.___needSorting___()) {
				this.sortChildren(curTimeline.___sortFunction___);
			}
		});

		// timeline functions:
		this.frame_0 = function () {
			this.stop();
		}
		this.frame_1 = function () {
			this.stop();
		}
		this.frame_2 = function () {
			this.___loopingOver___ = true;
			this.stop();
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

		// banner1_obj_
		this.banner1 = new lib.場景_1_banner1();
		this.banner1.name = "banner1";
		this.banner1.parent = this;
		this.banner1.setTransform(480, 300, 1, 1, 0, 0, 0, 480, 300);
		this.banner1.depth = 0;
		this.banner1.isAttachedToCamera = 0
		this.banner1.isAttachedToMask = 0
		this.banner1.layerDepth = 0
		this.banner1.layerIndex = 0
		this.banner1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.banner1).wait(3));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(480, 300, 480, 300);
	// library properties:
	lib.properties = {
		id: '61563E067C7ED448B80682DC16ADB97A',
		width: 960,
		height: 600,
		fps: 24,
		color: "#FFFFFF",
		opacity: 1.00,
		manifest: [
			{ src: "Images/game_atlas_.png", id: "game_atlas_" },
			{ src: "Images/game_atlas_2.png", id: "game_atlas_2" },
			{ src: "Images/game_atlas_3.png", id: "game_atlas_3" },
			{ src: "Images/game_atlas_4.png", id: "game_atlas_4" },
			{ src: "Images/game_atlas_5.png", id: "game_atlas_5" }
		],
		preloads: []
	};



	// bootstrap callback support:

	(lib.Stage = function (canvas) {
		createjs.Stage.call(this, canvas);
	}).prototype = p = new createjs.Stage();

	p.setAutoPlay = function (autoPlay) {
		this.tickEnabled = autoPlay;
	}
	p.play = function () { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
	p.stop = function (ms) { if (ms) this.seek(ms); this.tickEnabled = false; }
	p.seek = function (ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
	p.getDuration = function () { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

	p.getTimelinePosition = function () { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

	an.bootcompsLoaded = an.bootcompsLoaded || [];
	if (!an.bootstrapListeners) {
		an.bootstrapListeners = [];
	}

	an.bootstrapCallback = function (fnCallback) {
		an.bootstrapListeners.push(fnCallback);
		if (an.bootcompsLoaded.length > 0) {
			for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
				fnCallback(an.bootcompsLoaded[i]);
			}
		}
	};

	an.compositions = an.compositions || {};
	an.compositions['61563E067C7ED448B80682DC16ADB97A'] = {
		getStage: function () { return exportRoot.getStage(); },
		getLibrary: function () { return lib; },
		getSpriteSheet: function () { return ss; },
		getImages: function () { return img; }
	};

	an.compositionLoaded = function (id) {
		an.bootcompsLoaded.push(id);
		for (var j = 0; j < an.bootstrapListeners.length; j++) {
			an.bootstrapListeners[j](id);
		}
	}

	an.getComposition = function (id) {
		return an.compositions[id];
	}


	// Layer depth API : 

	AdobeAn.Layer = new function () {
		this.getLayerZDepth = function (timeline, layerName) {
			if (layerName === "Camera")
				layerName = "___camera___instance";
			var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
			return eval(script);
		}
		this.setLayerZDepth = function (timeline, layerName, zDepth) {
			const MAX_zDepth = 10000;
			const MIN_zDepth = -5000;
			if (zDepth > MAX_zDepth)
				zDepth = MAX_zDepth;
			else if (zDepth < MIN_zDepth)
				zDepth = MIN_zDepth;
			if (layerName === "Camera")
				layerName = "___camera___instance";
			var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
			eval(script);
		}
		this.removeLayer = function (timeline, layerName) {
			if (layerName === "Camera")
				layerName = "___camera___instance";
			var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
			eval(script);
		}
		this.addNewLayer = function (timeline, layerName, zDepth) {
			if (layerName === "Camera")
				layerName = "___camera___instance";
			zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
			var layer = new createjs.MovieClip();
			layer.name = layerName;
			layer.depth = zDepth;
			layer.layerIndex = 0;
			timeline.addChild(layer);
		}
	}


})(createjs = createjs || {}, AdobeAn = AdobeAn || {});
var createjs, AdobeAn;