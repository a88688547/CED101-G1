
//遊戲
var canvas,
    stage,
    exportRoot,
    anim_container,
    dom_overlay_container,
    fnStartAnimation;
function init() {
    canvas = document.getElementById("canvas");
    anim_container = document.getElementById("animation_container");
    dom_overlay_container = document.getElementById("dom_overlay_container");
    var comp = AdobeAn.getComposition("61563E067C7ED448B80682DC16ADB97A");
    var lib = comp.getLibrary();
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", function (evt) {
        handleFileLoad(evt, comp);
    });
    loader.addEventListener("complete", function (evt) {
        handleComplete(evt, comp);
    });
    var lib = comp.getLibrary();
    loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
    var images = comp.getImages();
    if (evt && evt.item.type == "image") {
        images[evt.item.id] = evt.result;
    }
}
function handleComplete(evt, comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp.getLibrary();
    var ss = comp.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({
            images: [queue.getResult(ssMetadata[i].name)],
            frames: ssMetadata[i].frames,
        });
    }
    exportRoot = new lib.pearl_HTML5Canvas();
    stage = new lib.Stage(canvas);

    //遊戲修改
    let direction = 1;
    let eatPearl = 0;
    let isKeydown = false;
    let isStart = false;
    let atk = 10;

    const characters = [
        {
            name: "peaCup",
            hp: 100,
            speed: 10,
        },
        {
            name: "peaCap",
            hp: 90,
            speed: 11,
        },
        {
            name: "peaMug",
            hp: 110,
            speed: 8,
        },
        {
            name: "redCup",
            hp: 70,
            speed: 13,
        },
        {
            name: "redCap",
            hp: 80,
            speed: 12,
        },
        {
            name: "redMug",
            hp: 75,
            speed: 11,
        },
        {
            name: "tanCup",
            hp: 150,
            speed: 5,
        },
        {
            name: "tanCap",
            hp: 130,
            speed: 6,
        },
        {
            name: "tanMug",
            hp: 10,
            speed: 15,
        },
    ];

    let character = sessionStorage.getItem("char");
    let activeCharacter = characters.find((item) => item.name === character);

    let char = new lib[activeCharacter.name]();
    // let knightGO = new lib.peaCap();
    char.x = 480;
    char.y = 460;
    exportRoot.addChild(char);
    // document.querySelector(".hpbar").style.width = `${activeCharacter.hp}%`;
    document.querySelector(".hpbar").style.width = `${activeCharacter.hp}%`;
    let timePearl = setInterval(() => {
        if (!isStart) return;
        let pearl = new lib.pearlGO();
        pearl.x = Math.floor(Math.random() * (885 + 1) + 35);
        pearl.y = -50;
        exportRoot.addChildAt(pearl, 1);

        createjs.Tween.get(pearl)
            .to({ y: 520 }, 2500)
            .call(function () {
                // console.log(activeCharacter.hp);
                // console.log("沒接到珍珠");
                exportRoot.removeChild(pearl);
                activeCharacter.hp -= atk;
                document.querySelector(
                    ".hpbar"
                ).style.width = `${activeCharacter.hp}%`;
            })
            .addEventListener("change", () => {
                let pearlHit = ndgmr.checkRectCollision(pearl, char);
                if (pearlHit) {
                    createjs.Tween.removeTweens(pearl);
                    exportRoot.removeChild(pearl);
                    eatPearl++;
                    document.querySelector("#score").innerHTML = eatPearl;
                }
            });
    }, 1000);

    // 遊戲開始
    document.querySelector(".playBtn").addEventListener("click", function () {
        document.querySelector(".playBtn").style.display = "none";
        window.addEventListener("keydown", keydownHandler);
        window.addEventListener("keyup", keyupHandler);
        isStart = true;
    });
    // 遊戲重製
    document
        .querySelector(".gameover")
        .addEventListener("click", function () {
            window.location.reload();
        });

    // 左右操作
    function keydownHandler(e) {
        if (isKeydown) return;
        if (e.keyCode === 37 || e.keyCode === 39) {
            isKeydown = true;
            direction = e.keyCode === 39 ? 1 : -1;
            char.gotoAndPlay("run");
        }
    }
    function keyupHandler(e) {
        isKeydown = false;
        char.gotoAndPlay("stop");
    }

    createjs.Ticker.addEventListener("tick", tickHandler);
    function tickHandler() {
        if (activeCharacter.hp <= 0) {
            clearInterval(timePearl);
            document.querySelector(".gameover").style.display = "block";
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            createjs.Ticker.removeEventListener("tick", tickHandler);
            exportRoot.removeChild(char);
        }
        if (!isKeydown) return;
        char.x += activeCharacter.speed * direction;
        char.scaleX = direction;
    }

    // 修改結束

    //Registers the "tick" event listener.
    fnStartAnimation = function () {
        stage.addChild(exportRoot);
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);
        stage.addEventListener("tick", handleTick);
        function getProjectionMatrix(container, totalDepth) {
            var focalLength = 528.25;
            var projectionCenter = {
                x: lib.properties.width / 2,
                y: lib.properties.height / 2,
            };
            var scale = (totalDepth + focalLength) / focalLength;
            var scaleMat = new createjs.Matrix2D();
            scaleMat.a = 1 / scale;
            scaleMat.d = 1 / scale;
            var projMat = new createjs.Matrix2D();
            projMat.tx = -projectionCenter.x;
            projMat.ty = -projectionCenter.y;
            projMat = projMat.prependMatrix(scaleMat);
            projMat.tx += projectionCenter.x;
            projMat.ty += projectionCenter.y;
            return projMat;
        }
        function handleTick(event) {
            var cameraInstance = exportRoot.___camera___instance;
            if (
                cameraInstance !== undefined &&
                cameraInstance.pinToObject !== undefined
            ) {
                cameraInstance.x =
                    cameraInstance.pinToObject.x +
                    cameraInstance.pinToObject.pinOffsetX;
                cameraInstance.y =
                    cameraInstance.pinToObject.y +
                    cameraInstance.pinToObject.pinOffsetY;
                if (
                    cameraInstance.pinToObject.parent !== undefined &&
                    cameraInstance.pinToObject.parent.depth !== undefined
                )
                    cameraInstance.depth =
                        cameraInstance.pinToObject.parent.depth +
                        cameraInstance.pinToObject.pinOffsetZ;
            }
            applyLayerZDepth(exportRoot);
        }
        function applyLayerZDepth(parent) {
            var cameraInstance = parent.___camera___instance;
            var focalLength = 528.25;
            var projectionCenter = { x: 0, y: 0 };
            if (parent === exportRoot) {
                var stageCenter = {
                    x: lib.properties.width / 2,
                    y: lib.properties.height / 2,
                };
                projectionCenter.x = stageCenter.x;
                projectionCenter.y = stageCenter.y;
            }
            for (child in parent.children) {
                var layerObj = parent.children[child];
                if (layerObj == cameraInstance) continue;
                applyLayerZDepth(layerObj, cameraInstance);
                if (layerObj.layerDepth === undefined) continue;
                if (layerObj.currentFrame != layerObj.parent.currentFrame) {
                    layerObj.gotoAndPlay(layerObj.parent.currentFrame);
                }
                var matToApply = new createjs.Matrix2D();
                var cameraMat = new createjs.Matrix2D();
                var totalDepth = layerObj.layerDepth
                    ? layerObj.layerDepth
                    : 0;
                var cameraDepth = 0;
                if (cameraInstance && !layerObj.isAttachedToCamera) {
                    var mat = cameraInstance.getMatrix();
                    mat.tx -= projectionCenter.x;
                    mat.ty -= projectionCenter.y;
                    cameraMat = mat.invert();
                    cameraMat.prependTransform(
                        projectionCenter.x,
                        projectionCenter.y,
                        1,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0
                    );
                    cameraMat.appendTransform(
                        -projectionCenter.x,
                        -projectionCenter.y,
                        1,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0
                    );
                    if (cameraInstance.depth)
                        cameraDepth = cameraInstance.depth;
                }
                if (layerObj.depth) {
                    totalDepth = layerObj.depth;
                }
                //Offset by camera depth
                totalDepth -= cameraDepth;
                if (totalDepth < -focalLength) {
                    matToApply.a = 0;
                    matToApply.d = 0;
                } else {
                    if (layerObj.layerDepth) {
                        var sizeLockedMat = getProjectionMatrix(
                            parent,
                            layerObj.layerDepth
                        );
                        if (sizeLockedMat) {
                            sizeLockedMat.invert();
                            matToApply.prependMatrix(sizeLockedMat);
                        }
                    }
                    matToApply.prependMatrix(cameraMat);
                    var projMat = getProjectionMatrix(parent, totalDepth);
                    if (projMat) {
                        matToApply.prependMatrix(projMat);
                    }
                }
                layerObj.transformMatrix = matToApply;
            }
        }
    };
    //Code to support hidpi screens and responsive scaling.
    function makeResponsive(isResp, respDim, isScale, scaleType) {
        var lastW,
            lastH,
            lastS = 1;
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        function resizeCanvas() {
            var w = lib.properties.width,
                h = lib.properties.height;
            var iw = window.innerWidth,
                ih = window.innerHeight;
            var pRatio = window.devicePixelRatio || 1,
                xRatio = iw / w,
                yRatio = ih / h,
                sRatio = 1;
            if (isResp) {
                if (
                    (respDim == "width" && lastW == iw) ||
                    (respDim == "height" && lastH == ih)
                ) {
                    sRatio = lastS;
                } else if (!isScale) {
                    if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 1) {
                    sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            canvas.width = w * pRatio * sRatio;
            canvas.height = h * pRatio * sRatio;
            canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =
                w * sRatio + "px";
            canvas.style.height = anim_container.style.height = dom_overlay_container.style.height =
                h * sRatio + "px";
            stage.scaleX = pRatio * sRatio;
            stage.scaleY = pRatio * sRatio;
            lastW = iw;
            lastH = ih;
            lastS = sRatio;
            stage.tickOnUpdate = false;
            stage.update();
            stage.tickOnUpdate = true;
        }
    }
    makeResponsive(false, "both", false, 1);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}