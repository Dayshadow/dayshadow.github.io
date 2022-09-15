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
Array.prototype.setIndex2D = function (val, x, y) {
    if (y < 0) return;
    if (y >= this.length) return;
    if (x < 0) return;
    if (x >= this[0].length) return;
    this[y][x] = val;
}
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

function averageArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum / arr.length;
}

function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}