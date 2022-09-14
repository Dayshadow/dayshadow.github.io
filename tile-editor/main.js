window.addEventListener('keypress', handleKeyPress);
window.addEventListener('keyup', handleKeyUp);

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

// Link the fancy button to the hidden, real input
document.getElementById('baseTileUpload').addEventListener("click", () => document.getElementById('baseTileUploadInput').click());
document.getElementById('baseTileUploadInput').addEventListener('change', handleBTUpload, false);


// Link the fancy button to the hidden, real input
document.getElementById('oRepresentationUpload').addEventListener("click", () => document.getElementById('oRepresentationUploadInput').click())
document.getElementById('oRepresentationUploadInput').addEventListener('change', handleORUpload, false);

// Link the fancy button to the hidden, real input
document.getElementById('packedTileUpload').addEventListener("click", () => document.getElementById('packedTileUploadInput').click())
document.getElementById('packedTileUploadInput').addEventListener('change', handlePTUpload, false);

document.getElementById('baseTileMoveIntoEditor').addEventListener("click", moveBTToEditor);

document.getElementById('packedTileMoveIntoEditor').addEventListener("click", movePackedTileToEditor);


const defaultTemplateImage = document.getElementById("defaultTemplate");
defaultTemplateImage.style.visibility = "hidden";

function loadTemplate() {
    globalScale = 1;
    initCanvases();

    PTctx.drawImage(defaultTemplateImage, 0, 0);
    setUpBTCanvasPT();
    setUpICCanvasPT();
    setUpORCanvasBT();
    setUpORCanvasPT();
    movePackedTileToEditor();

    drawExample();
}

initCanvases();

function initCanvases() {
    BTinit();
    ORinit();
    PTinit();
    ICinit();
    updateDimensions();
}
let tiles = [];

let arrWidth = 64;
let arrHeight = 64;

for (let i = 0; i < arrHeight; i++) {
    tiles.push([]);
    for (let j = 0; j < arrWidth; j++) {
        if (i == 0 || i == arrHeight - 1 || j == 0 || j == arrWidth - 1) {
            tiles[i].push(false);
            continue;
        }
        tiles[i].push(false);
        //tiles[i].push(!Math.round(Math.random()));
    }
}

let tmpC = document.createElement('canvas');
tmpC.width = PTw;
tmpC.height = PTh;
let tmpCtx = tmpC.getContext('2d');

function drawExample() {
    tmpC.width = PTw;
    tmpC.height = PTh;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[0].length; j++) {
            let top = false, bottom = false, left = false, right = false, tl = false, tr = false, bl = false, br = false;
            tmpCtx.putImageData(getRandomVariation(), 0, 0)
            if (tiles.relative2D(0, -1, i, j)) top = true;
            if (tiles.relative2D(0, 1, i, j)) bottom = true;
            if (tiles.relative2D(-1, 0, i, j)) left = true;
            if (tiles.relative2D(1, 0, i, j)) right = true;

            if (tiles.relative2D(-1, -1, i, j)) tl = true;
            if (tiles.relative2D(1, 1, i, j)) br = true;
            if (tiles.relative2D(1, -1, i, j)) tr = true;
            if (tiles.relative2D(-1, 1, i, j)) bl = true;

            let x = j * 8;
            let y = i * 8;
            if (tiles[i][j]) {
                CEctx.srcToDst(4, 12, 8, 8, x + 4, y + 4, tmpCtx, globalScale);
            } else {
                // no need to run for empty tiles
                continue;
            }
            if (!(top || tr || right)) CEctx.srcToDst(12, 8, 4, 4, x + 12, y, tmpCtx, globalScale);
            if (!right) CEctx.srcToDst(12, 12, 4, 8, x + 12, y + 4, tmpCtx, globalScale);
            if (!(right || br || bottom)) CEctx.srcToDst(12, 20, 4, 4, x + 12, y + 12, tmpCtx, globalScale);
            if (!bottom) CEctx.srcToDst(4, 20, 8, 4, x + 4, y + 12, tmpCtx, globalScale);
            if (!(bottom || bl || left)) CEctx.srcToDst(0, 20, 4, 4, x, y + 12, tmpCtx, globalScale);
            if (!left) CEctx.srcToDst(0, 12, 4, 8, x, y + 4, tmpCtx, globalScale);
            if (!(left || tl || top)) CEctx.srcToDst(0, 8, 4, 4, x, y, tmpCtx, globalScale);
            if (!top) CEctx.srcToDst(4, 8, 8, 4, x + 4, y, tmpCtx, globalScale);
        }
    }
    // separate pass for incorners or else they get drawn over
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[0].length; j++) {
            let top = false, bottom = false, left = false, right = false, tl = false, tr = false, bl = false, br = false;
            if (tiles.relative2D(0, -1, i, j)) top = true;
            if (tiles.relative2D(0, 1, i, j)) bottom = true;
            if (tiles.relative2D(-1, 0, i, j)) left = true;
            if (tiles.relative2D(1, 0, i, j)) right = true;

            if (tiles.relative2D(-1, -1, i, j)) tl = true;
            if (tiles.relative2D(1, 1, i, j)) br = true;
            if (tiles.relative2D(1, -1, i, j)) tr = true;
            if (tiles.relative2D(-1, 1, i, j)) bl = true;

            let x = j * 8;
            let y = i * 8;
            if (top && right && !tr) CEctx.srcToDst(0, 4, 4, 4, x + 12, y, tmpCtx, globalScale);
            if (right && bottom && !br) CEctx.srcToDst(0, 0, 4, 4, x + 12, y + 12, tmpCtx, globalScale);
            if (bottom && left && !bl) CEctx.srcToDst(4, 0, 4, 4, x, y + 12, tmpCtx, globalScale);
            if (left && top && !tl) CEctx.srcToDst(4, 4, 4, 4, x, y, tmpCtx, globalScale);
        }
    }
}
