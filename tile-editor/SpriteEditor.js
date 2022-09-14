
const spriteEditorCanvas = document.getElementById("spriteEditorSurface");
let spriteEditorMode = "unassigned";
let SPctx = spriteEditorCanvas.getContext('2d');
let EditorDrawOutput;

const spriteOverlayCanvas = document.getElementById("spriteOverlaySurface");
const SOctx = spriteOverlayCanvas.getContext('2d');

function updateDimensions() {
    spriteOverlayCanvas.width = spriteEditorCanvas.width;
    spriteOverlayCanvas.height = spriteEditorCanvas.height;
    updateCNDimensions();
}

updateDimensions();

function handlePackedOverlay() {
    overlayToggle = !overlayToggle;
    if (overlayToggle) {
        if (spriteEditorMode == "packedtile") {
            SOctx.drawImage(defaultTemplateImage, 0, 0);
        } else {
            alert("Only works in packed tile mode right now, sry");
        }
    } else {
        SOctx.clearRect(0, 0, spriteEditorCanvas.width, spriteEditorCanvas.height);
    }
}

spriteEditorMode = "packedtile";
// Base tile size is default 16x16
spriteEditorCanvas.width = SEw = 16 * globalScale;
spriteEditorCanvas.height = SEh = 24 * globalScale;
updateDimensions()

EditorDrawOutput = SPctx.getImageData(0, 0, SEw, SEh);

spriteEditorCanvas.addEventListener("mousemove", setSpriteCanvasMouseCoords);
window.addEventListener("mousedown", setSpriteCanvasMouseCoords);

function setSpriteCanvasMouseCoords(e) {
    let rect = e.target.getBoundingClientRect();
    // mouse coordinates within the sprite editor window, with pixel transformations
    let x = ((e.clientX - rect.left - 10) / e.target.clientWidth) * e.target.width;
    let y = ((e.clientY - rect.top - 10) / e.target.clientHeight) * e.target.height;
    mouse.x = x;
    mouse.y = y;

    handleEditorDraw(e);
}

function handleEditorDraw(e) {
    EditorDrawOutput = SPctx.getImageData(0, 0, spriteEditorCanvas.width, spriteEditorCanvas.height);

    if (leftMouseClicked) {
        if (e.ctrlKey) {
            let tmpcol = getPixelFromImageData(Math.floor(mouse.x), Math.floor(mouse.y), EditorDrawOutput);
            document.getElementById("colorSelector").value = rgbToHex(tmpcol[0], tmpcol[1], tmpcol[2]);
            return;
        }

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
            setUpORCanvasIC();
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
            setUpORCanvasIC();
            setUpBTCanvasOR();
            setUpPTCanvasOR();
            setUpICCanvasOR();
            break;
        default:
            break;
    }
    setVariation();
    drawTiles();
})

function movePackedTileToEditor() {
    overlayToggle = false;
    if (!PTctx) {
        alert("Error: The Packed Tile was not Initialized");
        return;
    }
    spriteEditorMode = "packedtile";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = SEw = 16 * globalScale;
    spriteEditorCanvas.height = SEh = 24 * globalScale;
    updateDimensions()
    drawTiles();

    EditorDrawOutput = PTctx.getImageData(0, 0, PTw, PTh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}

document.getElementById('inCornersMoveIntoEditor').addEventListener("click", moveInCornerToEditor);
function moveInCornerToEditor() {
    overlayToggle = false;
    if (!ICctx) {
        alert("Error: The Inner Corners were not Initialized");
        return;
    }
    spriteEditorMode = "incorner";
    // Packed tile size is default 16x24
    spriteEditorCanvas.width = SEw = 8 * globalScale;
    spriteEditorCanvas.height = SEh = 8 * globalScale;
    updateDimensions()
    drawTiles();

    EditorDrawOutput = ICctx.getImageData(0, 0, ICw, ICh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}

document.getElementById('oRepresentationMoveIntoEditor').addEventListener("click", moveORToEditor);
function moveORToEditor() {
    overlayToggle = false;
    if (!ORctx) {
        alert("Error: The O Representation was not Initialized");
        return;
    }
    spriteEditorMode = "orepresentation";
    // O Representation size is default 32x32
    spriteEditorCanvas.width = SEw = 32 * globalScale;
    spriteEditorCanvas.height = SEh = 32 * globalScale;
    updateDimensions()
    drawTiles();
    
    // keep it up to date
    EditorDrawOutput = ORctx.getImageData(0, 0, ORw, ORh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}

function moveBTToEditor() {
    overlayToggle = false;
    if (!BTctx) {
        alert("Error: The Base Tile was not Initialized");
        return;
    }
    spriteEditorMode = "basetile";
    // Base tile size is default 16x16
    spriteEditorCanvas.width = 16 * globalScale;
    spriteEditorCanvas.height = 16 * globalScale;
    updateDimensions()
    drawTiles();

    EditorDrawOutput = BTctx.getImageData(0, 0, BTw, BTh);
    SPctx.putImageData(EditorDrawOutput, 0, 0);
}
