const variationCanvas = document.getElementById("variationCanvas");
const Vctx = variationCanvas.getContext("2d");
const variationCanvasOverlay = document.getElementById("variationCanvasOverlay");
const VOctx = variationCanvasOverlay.getContext("2d");

variationCanvas.width = variationCanvasOverlay.width = Vw = 16 * 6;
variationCanvas.height = variationCanvasOverlay.height = Vh = 24;

let variationCount = 1;
let currentVariation = 0;
drawSelectedVariation();

function drawSelectedVariation() {
    VOctx.clearRect(0, 0, Vw, Vh);
    VOctx.fillStyle = "white";
    VOctx.fillRect((currentVariation % 6) * 16 * globalScale, Math.floor(currentVariation / 6) * 24 * globalScale, 16 * globalScale, 24 * globalScale);
}
function resizeVariations() {
    const tmp = Vctx.getImageData(0, 0, Vw, Vh);
    variationCanvas.width = variationCanvasOverlay.width = Vw = 16 * 6 * globalScale;
    variationCanvas.height = variationCanvasOverlay.height = Vh = (24 * globalScale) * (Math.floor(variationCount / 6) + 1);
    Vctx.putImageData(tmp, 0, 0);
}

function nextVariation() {
    if (currentVariation + 1 == variationCount) {
        addVariation(false)
    };
    currentVariation++
    document.getElementById('vartext').innerHTML = "Current variation in editor: " + currentVariation;

    drawSelectedVariation();

    spriteEditorMode = "packedtile";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = SEw = 16 * globalScale;
    spriteEditorCanvas.height = SEh = 24 * globalScale;
    updateDimensions()

    PTctx.putImageData(getCurrentVariation(), 0, 0);

    EditorDrawOutput = PTctx.getImageData(0, 0, PTw, PTh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);

    setUpBTCanvasPT();
    setUpICCanvasPT();
    setUpORCanvasPT();
}
function previousVariation() {
    if (currentVariation != 0) {
        currentVariation--
        document.getElementById('vartext').innerHTML = "Current variation in editor: " + currentVariation;
    };

    drawSelectedVariation();

    spriteEditorMode = "packedtile";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = SEw = 16 * globalScale;
    spriteEditorCanvas.height = SEh = 24 * globalScale;
    updateDimensions()

    PTctx.putImageData(getCurrentVariation(), 0, 0);

    EditorDrawOutput = PTctx.getImageData(0, 0, PTw, PTh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);

    setUpBTCanvasPT();
    setUpICCanvasPT();
    setUpORCanvasPT();
}
function setVariation() {
    Vctx.srcToDst(0, 0, PTw, PTh, (currentVariation % 6) * 16, Math.floor(currentVariation / 6) * 24, PTctx, globalScale);

}
function addVariation(shouldCopyData = true) {
    resizeVariations();
    variationCount++;
}

function removeVariation() {
    if (variationCount == 1) return;
    variationCount--;
    Vctx.clearRect((currentVariation % 6) * 16 * globalScale, Math.floor(currentVariation / 6) * 24 * globalScale, 16 * globalScale, 24 * globalScale);
    for (let i = currentVariation + 1; i < variationCount + 1; i++) {
        Vctx.putImageData(getVariation(i), ((i - 1) % 6) * 16 * globalScale, Math.floor((i - 1) / 6) * 24 * globalScale)
        Vctx.clearRect((i % 6) * 16 * globalScale, Math.floor(i / 6) * 24 * globalScale, 16 * globalScale, 24 * globalScale);
    }
    // just a little shuffle we gotta do
    if (variationCount !== 0) {
        variationCount--;
        resizeVariations();
        variationCount++;
    }
    if (currentVariation == variationCount && currentVariation != 0) currentVariation--;
    document.getElementById('vartext').innerHTML = "Current variation in editor: " + currentVariation;

    drawSelectedVariation();

    spriteEditorMode = "packedtile";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = SEw = 16 * globalScale;
    spriteEditorCanvas.height = SEh = 24 * globalScale;
    updateDimensions()


    PTctx.putImageData(getCurrentVariation(), 0, 0);

    EditorDrawOutput = PTctx.getImageData(0, 0, PTw, PTh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);

    setUpBTCanvasPT();
    setUpICCanvasPT();
    setUpORCanvasPT();
    
    drawTiles();
}

function getVariation(i) {
    return Vctx.getImageData((i % 6) * 16 * globalScale, Math.floor(i / 6) * 24 * globalScale, 16 * globalScale, 24 * globalScale);
}
function getCurrentVariation() {
    return Vctx.getImageData((currentVariation % 6) * 16 * globalScale, Math.floor(currentVariation / 6) * 24 * globalScale, 16 * globalScale, 24 * globalScale);
}
function getRandomVariation() {
    let randNum = Math.floor((variationCount) * Math.random());
    return Vctx.getImageData((randNum % 6) * 16 * globalScale, Math.floor(randNum / 6) * 24 * globalScale, 16 * globalScale, 24 * globalScale);
}