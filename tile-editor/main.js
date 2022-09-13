let mouse = {
    x: 1,
    y: 1
};
let rightMouseClicked = false;
let leftMouseClicked = false;
function handleMouseDown(e) {
    //e.button describes the mouse button that was clicked
    // 0 is left, 1 is middle, 2 is right
    e.preventDefault();
    if (e.button === 2) {
        rightMouseClicked = true;
    }
    if (e.button === 0) {
        leftMouseClicked = true;
    }
}
function handleMouseUp(e) {
    e.preventDefault();
    if (e.button === 2) {
        rightMouseClicked = false;
    }
    if (e.button === 0) {
        leftMouseClicked = false;
    }
}

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

document.getElementById('baseTileUpload').addEventListener("click", openBaseTileUpload)
document.getElementById('baseTileUploadInput').addEventListener('change', handleBaseTileUpload, false);
function openBaseTileUpload() {
    document.getElementById('baseTileUploadInput').click();
}

let baseTileImage = new Image();
function handleBaseTileUpload(e) {
    let reader = new FileReader;
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function (e) {
        baseTileImage.src = e.target.result

        // image needs to load for a bit after setting the image url
        baseTileImage.addEventListener('load', () => {
            if (baseTileImage.width !== baseTileImage.height) {
                alert("Please supply a base tile with the same width as height, don't try to be funky it won't work.");
                return;
            }

            // the scale for the rest of the code, to make it generic. The normal size for the base texture is 16x16, and is what most of the code is relative to
            scale = baseTileImage.width / 16;
            BTinit();
            ORinit();
            PTinit();
            // important that this is first
            setUpBTCanvasBT();
            setUpORCanvasBT();
            removeICFromOR(); // Since we're loading straight from base file, we don't know these
            setUpPTCanvasBT()
        })
    }
}


document.getElementById('oRepresentationUpload').addEventListener("click", openORepresentationUpload)
document.getElementById('oRepresentationUploadInput').addEventListener('change', handleORepresentationUpload, false);

function openORepresentationUpload() {
    document.getElementById('oRepresentationUploadInput').click();
}
let oRepresentationImage = new Image();
function handleORepresentationUpload(e) {
    let reader = new FileReader;
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function (e) {
        oRepresentationImage.src = e.target.result

        // image needs to load for a bit after setting the image url
        oRepresentationImage.addEventListener('load', () => {
            if (oRepresentationImage.width !== oRepresentationImage.height) {
                alert("Please supply a base tile with the same width as height, don't try to be funky it won't work.");
                return;
            }

            // the scale for the rest of the code, to make it generic. The normal size for the base texture is 32x32
            scale = oRepresentationImage.width / 32;
            BTinit();
            ORinit();
            PTinit();
            ICinit();
            // important that this is first
            setUpORCanvasOR();
            setUpBTCanvasOR();
            setUpPTCanvasOR();
            setUpICCanvasOR();
        })
    }
}

document.getElementById('packedTileUpload').addEventListener("click", openPackedTileUpload)
document.getElementById('packedTileUploadInput').addEventListener('change', handlePackedTileUpload, false);

function openPackedTileUpload() {
    document.getElementById('packedTileUploadInput').click();
}
let packedTileImage = new Image();
function handlePackedTileUpload(e) {
    let reader = new FileReader;
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function (e) {
        packedTileImage.src = e.target.result

        // image needs to load for a bit after setting the image url
        packedTileImage.addEventListener('load', () => {

            // the scale for the rest of the code, to make it generic. The normal size for the packed texture is 16x24
            scale = packedTileImage.width / 16;
            BTinit();
            ORinit();
            PTinit();
            ICinit();
            // important that this is first
            setUpPTCanvasPT();
            setUpBTCanvasPT();
            setUpICCanvasPT();
            setUpORCanvasPT();
        })
    }
}

document.getElementById('oRepresentationMoveIntoEditor').addEventListener("click", moveORToEditor);
function moveORToEditor() {
    if (!ORDrawOutput) {
        alert("Error: The O Representation was not Initialized");
        return;
    }
    spriteEditorMode = "orepresentation";
    // O Representation size is default 32x32
    spriteEditorCanvas.width = 32 * scale;
    spriteEditorCanvas.height = 32 * scale;

    // keep it up to date
    EditorDrawOutput = ORDrawOutput;
    SPctx.putImageData(ORDrawOutput, 0, 0);
}

document.getElementById('baseTileMoveIntoEditor').addEventListener("click", moveBaseTileToEditor);
function moveBaseTileToEditor() {
    if (!BTDrawOutput) {
        alert("Error: The Base Tile was not Initialized");
        return;
    }
    spriteEditorMode = "basetile";
    // Base tile size is default 16x16
    spriteEditorCanvas.width = 16 * scale;
    spriteEditorCanvas.height = 16 * scale;

    EditorDrawOutput = BTDrawOutput;
    SPctx.putImageData(BTDrawOutput, 0, 0);
}

document.getElementById('packedTileMoveIntoEditor').addEventListener("click", movePackedTileToEditor);
function movePackedTileToEditor() {
    if (!PTDrawOutput) {
        alert("Error: The Packed Tile was not Initialized");
        return;
    }
    spriteEditorMode = "packedtile";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = 16 * scale;
    spriteEditorCanvas.height = 24 * scale;

    EditorDrawOutput = PTDrawOutput;
    SPctx.putImageData(PTDrawOutput, 0, 0);
}
document.getElementById('inCornersMoveIntoEditor').addEventListener("click", moveInCornerToEditor);
function moveInCornerToEditor() {
    if (!ICDrawOutput) {
        alert("Error: The Inner Corners were not Initialized");
        return;
    }
    spriteEditorMode = "incorner";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = 8 * scale;
    spriteEditorCanvas.height = 8 * scale;

    EditorDrawOutput = ICDrawOutput;
    SPctx.putImageData(ICDrawOutput, 0, 0);
}

let scale;
let useBlend = true;

// Boundary definitions for where to fetch the data from the base tile
// The "Base" tile is the (typically) 16x16 region at the bottom of the final variation, not containing the incorners.
const mainTileBoundsBase = [4, 4, 8, 8]
const sideLeftBoundsBase = [0, 4, 4, 8]
const sideTopBoundsBase = [4, 0, 8, 4]
const sideRightBoundsBase = [12, 4, 4, 8]
const sideBottomBoundsBase = [4, 12, 8, 4]

const cornerTlBoundsBase = [0, 0, 4, 4]
const cornerTrBoundsBase = [12, 0, 4, 4]
const cornerBlBoundsBase = [0, 12, 4, 4]
const cornerBrBoundsBase = [12, 12, 4, 4]

// Boundary definitions that fetch from portions of the o representation
// Are used to translate from o representation to other representations
const mainTileBoundsOR = [12, 4, 8, 8];
const sideLeftBoundsOR = [0, 12, 4, 8];
const sideRightBoundsOR = [28, 12, 4, 8];
const sideTopBoundsOR = [12, 0, 8, 4];
const sideBottomBoundsOR = [12, 28, 8, 4];

const cornerTrBoundsOR = [8, 0, 4, 4];
const cornerTlBoundsOR = [20, 0, 4, 4];
const cornerBlBoundsOR = [8, 28, 4, 4];
const cornerBrBoundsOR = [28, 20, 4, 4];
const inCornerBoundsOR = [12, 12, 8, 8];

// yed
const cornerTlBoundsIC = [0, 0, 4, 4];
const cornerTrBoundsIC = [4, 0, 4, 4];
const cornerBlBoundsIC = [0, 4, 4, 4];
const cornerBrBoundsIC = [4, 4, 4, 4];



function setSpriteCanvasMouseCoords(e) {
    let rect = e.target.getBoundingClientRect();
    // mouse coordinates within the sprite editor window, with pixel transformations
    let x = ((e.clientX - rect.left - 10) / e.target.clientWidth) * scale * e.target.width;
    let y = ((e.clientY - rect.top - 10) / e.target.clientHeight) * scale * e.target.height;
    mouse.x = x;
    mouse.y = y;
    if (leftMouseClicked) {
        if (spriteEditorMode == "unassigned") return;
        let col = document.getElementById("colorSelector").value.convertToRGB();
        col[3] = 255;
        setPixelInImageData(Math.floor(mouse.x), Math.floor(mouse.y), col, EditorDrawOutput );
        SPctx.putImageData(EditorDrawOutput, 0, 0);
    }
    if (rightMouseClicked) {
        useBlend = false;
        if (spriteEditorMode == "unassigned") return;
        let col = [0, 0, 0, 0]
        setPixelInImageData(Math.floor(mouse.x), Math.floor(mouse.y), col, EditorDrawOutput );
        SPctx.putImageData(EditorDrawOutput, 0, 0);
    }
}


const spriteEditorCanvas = document.getElementById("spriteEditorSurface");
spriteEditorCanvas.addEventListener("mousemove", setSpriteCanvasMouseCoords);
spriteEditorCanvas.addEventListener("mouseup", () => {
    switch (spriteEditorMode) {
        case "orepresentation":
            ORDrawOutput = EditorDrawOutput;
            ORctx.putImageData(ORDrawOutput, 0, 0);
            setUpBTCanvasOR();
            setUpPTCanvasOR();
            setUpICCanvasOR();
            break;
        case "basetile":

            BTDrawOutput = EditorDrawOutput;
            BTctx.putImageData(BTDrawOutput, 0, 0);
            setUpORCanvasBT();
            drawICToOR();
            setUpPTCanvasBT()
            break;
        case "packedtile":
    console.log("Called")
            PTDrawOutput = EditorDrawOutput;
            PTctx.putImageData(PTDrawOutput, 0, 0);
            setUpBTCanvasPT();
            setUpICCanvasPT();
            setUpORCanvasPT();
            break;
        case "incorner":
            ICDrawOutput = EditorDrawOutput;
            ICctx.putImageData(ICDrawOutput, 0, 0);
            // gotta do some garbage
            drawICToOR();
            setUpBTCanvasOR();
            setUpPTCanvasOR();
            setUpICCanvasOR();
            break;
        default:
            break;
    }
})
spriteEditorCanvas.width = 16;
spriteEditorCanvas.height = 16;
let SPctx = spriteEditorCanvas.getContext('2d');
let EditorDrawOutput;

let spriteEditorMode = "unassigned";


const oRepresentationCanvas = document.getElementById("oRepresentation");
let ORctx;
let ORw, ORh;
let ORDrawOutput;

function ORinit() {
    // allow for generic sizes in case you want to generate different sizes of tile sprites or whatever
    oRepresentationCanvas.width = ORw = 32 * scale;
    oRepresentationCanvas.height = ORh = 32 * scale;

    ORctx = oRepresentationCanvas.getContext("2d");
}
// Called after the base image is uploaded and loaded
// Draws all it can using the base tile provided, leaves incorners empty
function setUpORCanvasBT() {
    ORDrawOutput = ORctx.getImageData(0, 0, ORw, ORh);
    drawORepresentationFromBase();
}
function setUpORCanvasOR() {
    ORctx.drawImage(oRepresentationImage, 0, 0);
    ORDrawOutput = ORctx.getImageData(0, 0, ORw, ORh);
}
function setUpORCanvasPT() {
    // cheating lol
    setUpORCanvasBT();
    drawICToOR();
}
const BaseTileCanvas = document.getElementById("baseTile");
let BTctx;
let BTw, BTh;
let BTDrawOutput;

function BTinit() {
    // allow for generic sizes in case you want to generate different sizes of tile sprites or whatever
    BaseTileCanvas.width = BTw = 16.0 * scale;
    BaseTileCanvas.height = BTh = 16.0 * scale;

    BTctx = BaseTileCanvas.getContext("2d");
    BTDrawOutput = BTctx.getImageData(0, 0, BTw, BTh)
}
function setUpBTCanvasBT() {
    // Used to get the image data array for the inputted base tile
    BTctx.drawImage(baseTileImage, 0, 0);
    BTDrawOutput = BTctx.getImageData(0, 0, BTw, BTh)
}
function setUpBTCanvasOR() {
    copyBoundsTo(mainTileBoundsOR, 4, 4, ORDrawOutput, BTDrawOutput, scale);
    copyBoundsTo(cornerTlBoundsOR, 12, 0, ORDrawOutput, BTDrawOutput, scale);
    copyBoundsTo(cornerTrBoundsOR, 0, 0, ORDrawOutput, BTDrawOutput, scale);
    copyBoundsTo(cornerBlBoundsOR, 0, 12, ORDrawOutput, BTDrawOutput, scale);
    copyBoundsTo(cornerBrBoundsOR, 12, 12, ORDrawOutput, BTDrawOutput, scale);

    copyBoundsTo(sideLeftBoundsOR, 0, 4, ORDrawOutput, BTDrawOutput, scale);
    copyBoundsTo(sideRightBoundsOR, 12, 4, ORDrawOutput, BTDrawOutput, scale);
    copyBoundsTo(sideTopBoundsOR, 4, 0, ORDrawOutput, BTDrawOutput, scale);
    copyBoundsTo(sideBottomBoundsOR, 4, 12, ORDrawOutput, BTDrawOutput, scale);

    BTctx.putImageData(BTDrawOutput, 0, 0)
}
function setUpBTCanvasPT() {
    // too lazy to make a const for the bounds
    copyBoundsTo([0, 8, 16, 16], 0, 0, PTDrawOutput, BTDrawOutput, scale);

    BTctx.putImageData(BTDrawOutput, 0, 0)

}

const packedTileCanvas = document.getElementById("packedTile");
let PTctx;
let PTw, PTh;
let PTDrawOutput;

function PTinit() {
    packedTileCanvas.width = PTw = 16 * scale;
    packedTileCanvas.height = PTh = 24 * scale;

    PTctx = packedTileCanvas.getContext("2d");
    PTDrawOutput = PTctx.getImageData(0, 0, PTw, PTh);
}

// packed tile base initializer
function setUpPTCanvasBT() {
    // Just put it in the bottom section
    PTctx.drawImage(baseTileImage, 0, 8);
    PTDrawOutput = PTctx.getImageData(0, 0, PTw, PTh)
}
function setUpPTCanvasPT() {
    PTctx.drawImage(packedTileImage, 0, 0);
    PTDrawOutput = PTctx.getImageData(0, 0, PTw, PTh)
}

function setUpPTCanvasOR() {

    copyBoundsTo(inCornerBoundsOR, 0, 0, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(mainTileBoundsOR, 4, 12, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(cornerTlBoundsOR, 12, 8, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(cornerTrBoundsOR, 0, 8, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(cornerBlBoundsOR, 0, 20, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(cornerBrBoundsOR, 12, 20, ORDrawOutput, PTDrawOutput, scale);

    copyBoundsTo(sideLeftBoundsOR, 0, 12, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(sideRightBoundsOR, 12, 12, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(sideTopBoundsOR, 4, 8, ORDrawOutput, PTDrawOutput, scale);
    copyBoundsTo(sideBottomBoundsOR, 4, 20, ORDrawOutput, PTDrawOutput, scale);

    PTctx.putImageData(PTDrawOutput, 0, 0);
}

const inCornerCanvas = document.getElementById("inCorners");
let ICctx;
let ICw, ICh;
let ICDrawOutput;

function ICinit() {
    inCornerCanvas.width = ICw = 8 * scale;
    inCornerCanvas.height = ICh = 8 * scale;

    ICctx = inCornerCanvas.getContext("2d");
    ICDrawOutput = ICctx.getImageData(0, 0, ICw, ICh)
}

function setUpICCanvasOR() {
    if (!ICDrawOutput) return;
    copyBoundsTo(inCornerBoundsOR, 0, 0, ORDrawOutput, ICDrawOutput, scale);

    ICctx.putImageData(ICDrawOutput, 0, 0);
}
function setUpICCanvasPT() {
    if (!ICDrawOutput) ICinit();
    // too lazy to define const again
    copyBoundsTo([0, 0, 8, 8], 0, 0, PTDrawOutput, ICDrawOutput, scale);

    ICctx.putImageData(ICDrawOutput, 0, 0);

}

// Draws the tile in this configuration (o):
// . o .
// o . o
// . o .
// The inCorners will not be drawn yet. that's for the next stage.
function drawORTilesBT() {
    useBlend = true;
    copyBoundsTo(mainTileBoundsBase, 12, 4, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(mainTileBoundsBase, 4, 12, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(mainTileBoundsBase, 12, 20, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(mainTileBoundsBase, 20, 12, BTDrawOutput, ORDrawOutput, scale);

    ORctx.putImageData(ORDrawOutput, 0, 0)
}

// Draws the sides for the oRepresentation stage here (x):
//   x
// x o x
// o x o
// x o x
//   x
function drawORSidesBT() {
    useBlend = true;
    // could proabably make this a loop but oh well
    copyBoundsTo(sideLeftBoundsBase, 0, 12, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideLeftBoundsBase, 8, 4, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideLeftBoundsBase, 8, 20, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideLeftBoundsBase, 16, 12, BTDrawOutput, ORDrawOutput, scale);

    copyBoundsTo(sideRightBoundsBase, 12, 12, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideRightBoundsBase, 20, 4, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideRightBoundsBase, 20, 20, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideRightBoundsBase, 28, 12, BTDrawOutput, ORDrawOutput, scale);

    copyBoundsTo(sideTopBoundsBase, 4, 8, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideTopBoundsBase, 12, 0, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideTopBoundsBase, 12, 16, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideTopBoundsBase, 20, 8, BTDrawOutput, ORDrawOutput, scale);

    copyBoundsTo(sideBottomBoundsBase, 4, 20, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideBottomBoundsBase, 12, 12, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideBottomBoundsBase, 12, 12, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideBottomBoundsBase, 20, 20, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(sideBottomBoundsBase, 12, 28, BTDrawOutput, ORDrawOutput, scale);

    ORctx.putImageData(ORDrawOutput, 0, 0)
}

function drawOROuterCornersBT() {
    useBlend = true;
    copyBoundsTo(cornerTlBoundsBase, 8, 0, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(cornerTlBoundsBase, 0, 8, BTDrawOutput, ORDrawOutput, scale);

    copyBoundsTo(cornerTrBoundsBase, 20, 0, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(cornerTrBoundsBase, 28, 8, BTDrawOutput, ORDrawOutput, scale);

    copyBoundsTo(cornerBlBoundsBase, 8, 28, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(cornerBlBoundsBase, 0, 20, BTDrawOutput, ORDrawOutput, scale);

    copyBoundsTo(cornerBrBoundsBase, 28, 20, BTDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(cornerBrBoundsBase, 20, 28, BTDrawOutput, ORDrawOutput, scale);

    ORctx.putImageData(ORDrawOutput, 0, 0)
}

function removeICFromOR() {
    useBlend = false;
    const clearInCornerBounds = [0, 0, 4, 4];

    // clear the center
    clearBounds(mainTileBoundsBase, 12, 12, ORDrawOutput, scale);

    clearBounds(clearInCornerBounds, 8, 8, ORDrawOutput, scale);
    clearBounds(clearInCornerBounds, 8, 20, ORDrawOutput, scale);
    clearBounds(clearInCornerBounds, 20, 8, ORDrawOutput, scale);
    clearBounds(clearInCornerBounds, 20, 20, ORDrawOutput, scale);

    ORctx.putImageData(ORDrawOutput, 0, 0)
}

function drawICToOR() {
    if (!ICDrawOutput) ICinit();
    useBlend = false;
    copyBoundsTo(cornerBrBoundsIC, 8, 8, ICDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(cornerBlBoundsIC, 20, 8, ICDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(cornerTrBoundsIC, 8, 20, ICDrawOutput, ORDrawOutput, scale);
    copyBoundsTo(cornerTlBoundsIC, 20, 20, ICDrawOutput, ORDrawOutput, scale);

    copyBoundsTo([0, 0, 8, 8], 12, 12, ICDrawOutput, ORDrawOutput, scale);

    ORctx.putImageData(ORDrawOutput, 0, 0);
}

function drawORepresentationFromBase() {
    drawORTilesBT();
    drawORSidesBT();
    drawOROuterCornersBT();
}


// srcBounds defines the dimensions of the box we want to copy, and pasteX, pasteY determines where it's pasted in the output
// globalScale is just to make the code more general
// donno why I did this instead of using pasteimagedata
function copyBoundsTo(srcBounds, pasteX, pasteY, inData, outData, globalScale) {
    for (let j = 0; j < srcBounds[3] * globalScale; j++) {
        for (let i = 0; i < srcBounds[2] * globalScale; i++) {
            let srcPixel = getPixelFromImageData((i + srcBounds[0] * globalScale), (j + srcBounds[1] * globalScale), inData);
            setPixelInImageData(pasteX * globalScale + i, pasteY * globalScale + j, srcPixel, outData);
        }
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
    if (useBlend) {
        // normalize
        let srcR = pixelArr[0] / 255;
        let srcG = pixelArr[1] / 255;
        let srcB = pixelArr[2] / 255;
        let srcA = pixelArr[3] / 255;
        let dstR = data.data[index * 4 + 0] / 255;
        let dstG = data.data[index * 4 + 1] / 255;
        let dstB = data.data[index * 4 + 2] / 255;
        let dstA = data.data[index * 4 + 3] / 255;
        // alpha blending!
        // ImageData is stored as 0-255 so we have to un-normalize it
        data.data[index * 4 + 0] = Math.floor(256 * (srcR * srcA + (dstR * (1.0 - srcA))));
        data.data[index * 4 + 1] = Math.floor(256 * (srcG * srcA + (dstG * (1.0 - srcA))));
        data.data[index * 4 + 2] = Math.floor(256 * (srcB * srcA + (dstB * (1.0 - srcA))));
        data.data[index * 4 + 3] = Math.floor(256 * (srcA * srcA + (dstA * (1.0 - srcA))));
    } else {
        data.data[index * 4 + 0] = pixelArr[0];
        data.data[index * 4 + 1] = pixelArr[1];
        data.data[index * 4 + 2] = pixelArr[2];
        data.data[index * 4 + 3] = pixelArr[3];
    }
}
function withinBounds(x, y, bounds) {
    let b_x = bounds[0];
    let b_y = bounds[1];
    let b_w = bounds[2];
    let b_h = bounds[3];

    if ((x < b_x) || (x >= b_x + b_w)) return false;
    if ((y < b_y) || (y >= b_y + b_h)) return false;
    return true;
}

String.prototype.convertToRGB = function(){
    var aRgbHex = this.replaceAll("#","").match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}
