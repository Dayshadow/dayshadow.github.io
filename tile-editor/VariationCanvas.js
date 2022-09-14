const variationCanvas = document.getElementById("variationCanvas");
const Vctx = variationCanvas.getContext("2d");

variationCanvas.width = Vw = 16 * 6;
variationCanvas.height = Vh = 24;

let variationCount = 0;

function resizeVariations() {
    const tmp = Vctx.getImageData(0, 0, Vw, Vh);
    variationCanvas.width = Vw = 16 * 6 * globalScale;
    variationCanvas.height = Vh = (24 * globalScale) * (Math.floor(variationCount / 6) + 1);
    Vctx.putImageData(tmp, 0, 0);
}
function addVariation() {
    resizeVariations();
    Vctx.srcToDst(0, 0, PTw, PTh, (variationCount % 6) * 16, Math.floor(variationCount / 6) * 24, PTctx, globalScale);
    variationCount++;
}
function removeVariation() {
    if (variationCount == 0) return;
    variationCount--;
    let tmp = Vctx.getImageData(0, 0, Vw, Vh);
    clearBounds([0, 0, 16, 24], (variationCount % 6) * 16, Math.floor(variationCount / 6) * 24, tmp, globalScale);
    Vctx.putImageData(tmp, 0, 0);
    // just a little shuffle we gotta do
    if (variationCount !== 0) {
        variationCount--;
        resizeVariations();
        variationCount++;
    }
}

function getRandomVariation() {
    let randNum = Math.floor((variationCount) * Math.random());
    return Vctx.getImageData((randNum % 6) * 16 * globalScale, Math.floor(randNum / 6) * 24 * globalScale, 16 * globalScale, 24 * globalScale);
}