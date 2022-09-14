CanvasRenderingContext2D.prototype.srcToDst = function (x, y, w, h, x2, y2, src, globalScale) {
    return this.putImageData(src.getImageData(x * globalScale, y * globalScale, w * globalScale, h * globalScale), x2 * globalScale, y2 * globalScale);
}
function translateFromDictionary(dictionary, srcCtx, dstCtx, globalScale) {
    let data = dictionary.srcDst;
    for (let e of data) {
        let img = srcCtx.getImageData(e.src[0] * globalScale, e.src[1] * globalScale, e.src[2] * globalScale, e.src[3] * globalScale);
        dstCtx.putImageData(img, e.dst[0] * globalScale, e.dst[1] * globalScale);
    }
}

function clearBounds(srcBounds, clearX, clearY, outData, globalScale) {
    for (let j = 0; j < srcBounds[3] * globalScale; j++) {
        for (let i = 0; i < srcBounds[2] * globalScale; i++) {
            // Empty
            let srcPixel = [0, 0, 0, 0];
            setPixelInImageData(clearX * globalScale + i, clearY * globalScale + j, srcPixel, outData);
        }
    }
}
function getPixelFromImageData(x, y, data) {
    let index = (data.width) * y + (x) % (data.width);
    return [
        data.data[index * 4],
        data.data[index * 4 + 1],
        data.data[index * 4 + 2],
        data.data[index * 4 + 3]
    ];
}
function setPixelInImageData(x, y, pixelArr, data) {
    let index = (data.width) * y + (x) % (data.width);
    data.data[index * 4 + 0] = pixelArr[0];
    data.data[index * 4 + 1] = pixelArr[1];
    data.data[index * 4 + 2] = pixelArr[2];
    data.data[index * 4 + 3] = pixelArr[3];
}
String.prototype.convertToRGB = function () {
    var aRgbHex = this.replaceAll("#", "").match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// too lazy to write plus signs
Array.prototype.relative2D = function (x, y, i, j) {
    if (i + y < 0) return false;
    if (i + y >= this.length) return false;
    if (j + x < 0) return false;
    if (j + x >= this[0].length) return false;
    return this[i + y][j + x];
};
