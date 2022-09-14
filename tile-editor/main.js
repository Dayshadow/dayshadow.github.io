const BTtoORDictionary = {
    srcDst: [
        { src: [4, 4, 8, 8], dst: [12, 4] },
        { src: [4, 4, 8, 8], dst: [4, 12] },
        { src: [4, 4, 8, 8], dst: [12, 20] },
        { src: [4, 4, 8, 8], dst: [20, 12] },

        { src: [0, 4, 4, 8], dst: [0, 12] },
        { src: [0, 4, 4, 8], dst: [8, 4] },
        { src: [0, 4, 4, 8], dst: [8, 20] },
        { src: [0, 4, 4, 8], dst: [16, 12] },

        { src: [12, 4, 4, 8], dst: [12, 12] },
        { src: [12, 4, 4, 8], dst: [20, 4] },
        { src: [12, 4, 4, 8], dst: [20, 20] },
        { src: [12, 4, 4, 8], dst: [28, 12] },

        { src: [4, 0, 8, 4], dst: [4, 8] },
        { src: [4, 0, 8, 4], dst: [12, 0] },
        { src: [4, 0, 8, 4], dst: [12, 16] },
        { src: [4, 0, 8, 4], dst: [20, 8] },

        { src: [4, 12, 8, 4], dst: [4, 20] },
        { src: [4, 12, 8, 4], dst: [12, 12] },
        { src: [4, 12, 8, 4], dst: [20, 20] },
        { src: [4, 12, 8, 4], dst: [12, 28] },

        { src: [0, 0, 4, 4], dst: [8, 0] },
        { src: [0, 0, 4, 4], dst: [0, 8] },

        { src: [12, 0, 4, 4], dst: [20, 0] },
        { src: [12, 0, 4, 4], dst: [28, 8] },

        { src: [0, 12, 4, 4], dst: [8, 28] },
        { src: [0, 12, 4, 4], dst: [0, 20] },

        { src: [12, 12, 4, 4], dst: [28, 20] },
        { src: [12, 12, 4, 4], dst: [20, 28] }
    ]
}

const ITtoORDictionary = {
    srcDst: [
        { src: [4, 4, 4, 4], dst: [8, 8] },
        { src: [0, 4, 4, 4], dst: [20, 8] },
        { src: [4, 0, 4, 4], dst: [8, 20] },
        { src: [0, 0, 4, 4], dst: [20, 20] },
        { src: [0, 0, 8, 8], dst: [12, 12] }
    ]
}

const ORtoBTDictionary = {
    srcDst: [
        { src: [12, 4, 8, 8], dst: [4, 4] },

        { src: [20, 0, 4, 4], dst: [12, 0] },
        { src: [8, 0, 4, 4], dst: [0, 0] },
        { src: [8, 28, 4, 4], dst: [0, 12] },
        { src: [28, 20, 4, 4], dst: [12, 12] },

        { src: [0, 12, 4, 8], dst: [0, 4] },
        { src: [28, 12, 4, 8], dst: [12, 4] },
        { src: [12, 0, 8, 4], dst: [4, 0] },
        { src: [12, 28, 8, 4], dst: [4, 12] },

    ]
}

const ORtoPTDictionary = {
    srcDst: [
        { src: [12, 12, 8, 8], dst: [0, 0] },

        { src: [12, 4, 8, 8], dst: [4, 12] },

        { src: [20, 0, 4, 4], dst: [12, 8] },
        { src: [8, 0, 4, 4], dst: [0, 8] },
        { src: [8, 28, 4, 4], dst: [0, 20] },
        { src: [28, 20, 4, 4], dst: [12, 20] },

        { src: [0, 12, 4, 8], dst: [0, 12] },
        { src: [28, 12, 4, 8], dst: [12, 12] },
        { src: [12, 0, 8, 4], dst: [4, 8] },
        { src: [12, 28, 8, 4], dst: [4, 20] }
    ]
}
const PTtoICDictionary = {
    srcDst: [
        { src: [0, 0, 8, 8], dst: [0, 0] }
    ]
}

const ORtoICDictionary = {
    srcDst: [
        { src: [12, 12, 8, 8], dst: [0, 0] }
    ]
}

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

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

document.getElementById('baseTileUpload').addEventListener("click", openBaseTileUpload)
document.getElementById('baseTileUploadInput').addEventListener('change', handleBaseTileUpload, false);
function openBaseTileUpload() {
    document.getElementById('baseTileUploadInput').click();
}

let baseTileImage = new Image();
function handleBaseTileUpload(e) {
    if (document.getElementById('baseTileUploadInput').value == "") return;
    let reader = new FileReader;
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function (e) {
        // Reset the image variable
        baseTileImage = new Image();

        // image needs to load for a bit after setting the image url
        baseTileImage.addEventListener('load', onLoadBTImage);
        baseTileImage.src = e.target.result
        // allow the change function to work if user selects the same image again
        document.getElementById('baseTileUploadInput').value = "";
    }
}

const onLoadBTImage = () => {
    if (baseTileImage.width !== baseTileImage.height) {
        alert("Please supply a base tile with the same width as height, don't try to be funky it won't work.");
        return;
    }
    if (baseTileImage.width % 8 != 0) {
        alert("Dimensions of base tile must be a multiple of 8, so the result is inaccurate.");
    }
    // the scale for the rest of the code, to make it generic. The normal size for the base texture is 16x16, and is what most of the code is relative to
    scale = baseTileImage.width / 16;
    BTinit();
    ORinit();
    PTinit();
    // important that this is first
    setUpBTCanvasBT();
    setUpORCanvasBT();
    setUpPTCanvasBT();

    moveBaseTileToEditor();
}

document.getElementById('oRepresentationUpload').addEventListener("click", openORepresentationUpload)
document.getElementById('oRepresentationUploadInput').addEventListener('change', handleORepresentationUpload, false);

function openORepresentationUpload() {
    document.getElementById('oRepresentationUploadInput').click();
}
let oRepresentationImage = new Image();
function handleORepresentationUpload(e) {
    if (document.getElementById('oRepresentationUploadInput').value == "") return;
    let reader = new FileReader;
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function (e) {
        // Reset the image variable
        oRepresentationImage = new Image();

        // image needs to load for a bit after setting the image url
        oRepresentationImage.addEventListener('load', onLoadORImage)
        oRepresentationImage.src = e.target.result
        // allow the change function to work if user selects the same image again
        document.getElementById('oRepresentationUploadInput').value = "";
    }
}

const onLoadORImage = () => {
    if (oRepresentationImage.width !== oRepresentationImage.height) {
        alert("Please supply an image with the same width as height, don't try to be funky it won't work.");
        return;
    }
    if (oRepresentationImage.width % 16 != 0) {
        alert("Dimensions of O Representation should be a multiple of 16, or else result will be inaccurate.");
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

    moveORToEditor();
};
document.getElementById('packedTileUpload').addEventListener("click", openPackedTileUpload)
document.getElementById('packedTileUploadInput').addEventListener('change', handlePackedTileUpload, false);

function openPackedTileUpload() {
    document.getElementById('packedTileUploadInput').click();
}
let packedTileImage = new Image();

function handlePackedTileUpload(e) {
    if (document.getElementById('packedTileUploadInput').value == "") return;
    let reader = new FileReader;
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function (e) {
        // Reset the image variable
        packedTileImage = new Image();

        // image needs to load for a bit after setting the image url
        packedTileImage.addEventListener('load', onLoadPTImage);
        packedTileImage.src = e.target.result
        // allow the change function to work if user selects the same image again
        document.getElementById('packedTileUploadInput').value = "";
    }
}

const onLoadPTImage = () => {
    if ((packedTileImage.width * packedTileImage.height) % (16 * 24) != 0) {
        alert("Image does not have the correct aspect ratio, and is not a multiple of 16x24. Results inaccurate.");
    }
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

    movePackedTileToEditor();
};

document.getElementById('oRepresentationMoveIntoEditor').addEventListener("click", moveORToEditor);
function moveORToEditor() {
    if (!ORctx) {
        alert("Error: The O Representation was not Initialized");
        return;
    }
    spriteEditorMode = "orepresentation";
    // O Representation size is default 32x32
    spriteEditorCanvas.width = 32 * scale;
    spriteEditorCanvas.height = 32 * scale;

    // keep it up to date
    EditorDrawOutput = ORctx.getImageData(0, 0, ORw, ORh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}

document.getElementById('baseTileMoveIntoEditor').addEventListener("click", moveBaseTileToEditor);
function moveBaseTileToEditor() {
    if (!BTctx) {
        alert("Error: The Base Tile was not Initialized");
        return;
    }
    spriteEditorMode = "basetile";
    // Base tile size is default 16x16
    spriteEditorCanvas.width = 16 * scale;
    spriteEditorCanvas.height = 16 * scale;

    EditorDrawOutput = BTctx.getImageData(0, 0, BTw, BTh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}

document.getElementById('packedTileMoveIntoEditor').addEventListener("click", movePackedTileToEditor);
function movePackedTileToEditor() {
    if (!PTctx) {
        alert("Error: The Packed Tile was not Initialized");
        return;
    }
    spriteEditorMode = "packedtile";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = 16 * scale;
    spriteEditorCanvas.height = 24 * scale;

    EditorDrawOutput = PTctx.getImageData(0, 0, PTw, PTh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}
document.getElementById('inCornersMoveIntoEditor').addEventListener("click", moveInCornerToEditor);
function moveInCornerToEditor() {
    if (!ICctx) {
        alert("Error: The Inner Corners were not Initialized");
        return;
    }
    spriteEditorMode = "incorner";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = 8 * scale;
    spriteEditorCanvas.height = 8 * scale;

    EditorDrawOutput = ICctx.getImageData(0, 0, ICw, ICh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}

let scale = 1;

function setSpriteCanvasMouseCoords(e) {
    let rect = e.target.getBoundingClientRect();
    // mouse coordinates within the sprite editor window, with pixel transformations
    let x = ((e.clientX - rect.left - 10) / e.target.clientWidth) * e.target.width;
    let y = ((e.clientY - rect.top - 10) / e.target.clientHeight) * e.target.height;
    mouse.x = x;
    mouse.y = y;

    EditorDrawOutput = SPctx.getImageData(0, 0, spriteEditorCanvas.width, spriteEditorCanvas.height);

    if (leftMouseClicked) {
        if (spriteEditorMode == "unassigned") return;
        let col = document.getElementById("colorSelector").value.convertToRGB();
        col[3] = 255;
        setPixelInImageData(Math.floor(mouse.x), Math.floor(mouse.y), col, EditorDrawOutput);
        SPctx.putImageData(EditorDrawOutput, 0, 0);
    }
    if (rightMouseClicked) {
        if (spriteEditorMode == "unassigned") return;
        let col = [0, 0, 0, 0]
        setPixelInImageData(Math.floor(mouse.x), Math.floor(mouse.y), col, EditorDrawOutput);
        SPctx.putImageData(EditorDrawOutput, 0, 0);
    }
}


const spriteEditorCanvas = document.getElementById("spriteEditorSurface");
spriteEditorCanvas.addEventListener("mousemove", setSpriteCanvasMouseCoords);
spriteEditorCanvas.addEventListener("drag", setSpriteCanvasMouseCoords);
spriteEditorCanvas.addEventListener("mouseup", () => {
    switch (spriteEditorMode) {
        case "orepresentation":
            ORctx.putImageData(EditorDrawOutput, 0, 0);
            setUpBTCanvasOR();
            setUpPTCanvasOR();
            setUpICCanvasOR();
            break;
        case "basetile":
            BTctx.putImageData(EditorDrawOutput, 0, 0);
            setUpORCanvasBT();
            drawICToOR();
            setUpPTCanvasOR();
            break;
        case "packedtile":
            PTctx.putImageData(EditorDrawOutput, 0, 0);
            setUpBTCanvasPT();
            setUpICCanvasPT();
            setUpORCanvasPT();
            break;
        case "incorner":
            ICctx.putImageData(EditorDrawOutput, 0, 0);
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

function ORinit() {
    // allow for generic sizes in case you want to generate different sizes of tile sprites or whatever
    oRepresentationCanvas.width = ORw = 32 * scale;
    oRepresentationCanvas.height = ORh = 32 * scale;

    ORctx = oRepresentationCanvas.getContext("2d");
}

function setUpORCanvasOR() {
    ORctx.drawImage(oRepresentationImage, 0, 0);
}
function setUpORCanvasPT() {
    // cheating lol
    setUpORCanvasBT();;
    drawICToOR();
}
const BaseTileCanvas = document.getElementById("baseTile");
let BTctx;
let BTw, BTh;

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
}

function setUpBTCanvasOR() {
    translateFromDictionary(ORtoBTDictionary, ORctx, BTctx, scale);
}

const PTtoBTDictionary = {
    srcDst: [
        { src: [0, 8, 16, 16], dst: [0, 0] },
    ]
}
function setUpBTCanvasPT() {
    translateFromDictionary(PTtoBTDictionary, PTctx, BTctx, scale);
}

const packedTileCanvas = document.getElementById("packedTile");
let PTctx;
let PTw, PTh;

function PTinit() {
    packedTileCanvas.width = PTw = 16 * scale;
    packedTileCanvas.height = PTh = 24 * scale;

    PTctx = packedTileCanvas.getContext("2d");
}

// packed tile base initializer
function setUpPTCanvasBT() {
    // Just put it in the bottom section
    PTctx.drawImage(baseTileImage, 0, 8 * scale);
}
function setUpPTCanvasPT() {
    PTctx.drawImage(packedTileImage, 0, 0);
}


function setUpPTCanvasOR() {
    translateFromDictionary(ORtoPTDictionary, ORctx, PTctx, scale);
}

const inCornerCanvas = document.getElementById("inCorners");
let ICctx;
let ICw, ICh;

function ICinit() {
    inCornerCanvas.width = ICw = 8 * scale;
    inCornerCanvas.height = ICh = 8 * scale;

    ICctx = inCornerCanvas.getContext("2d");
}

function setUpICCanvasOR() {
    //if (!ICctx) ICinit();
    translateFromDictionary(ORtoICDictionary, ORctx, ICctx, scale);
}

function setUpICCanvasPT() {
    //if (!ICctx) ICinit();
    translateFromDictionary(PTtoICDictionary, PTctx, ICctx, scale);
}

BTinit();
ORinit();
PTinit();
ICinit();
const defaultTemplateImage = document.getElementById("defaultTemplate");
defaultTemplateImage.style.visibility = "hidden";
PTctx.drawImage(defaultTemplateImage, 0, 0);
setUpBTCanvasPT();
setUpICCanvasPT();
setUpORCanvasBT();
setUpORCanvasPT();

spriteEditorMode = "packedtile";
// Base tile size is default 16x16
spriteEditorCanvas.width = 16 * scale;
spriteEditorCanvas.height = 24 * scale;

EditorDrawOutput = PTctx.getImageData(0, 0, PTw, PTh);
SPctx.putImageData(EditorDrawOutput, 0, 0);

function drawICToOR() {
    translateFromDictionary(ITtoORDictionary, ICctx, ORctx, scale);
}

function setUpORCanvasBT() {
    translateFromDictionary(BTtoORDictionary, BTctx, ORctx, scale);
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
