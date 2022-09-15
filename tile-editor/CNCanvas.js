
const CNCanvas = document.getElementById("connectivityExample");

CNCanvas.width = 256;
CNCanvas.height = 256;
let CNctx = CNCanvas.getContext("2d");

function updateCNDimensions() {
    CNCanvas.width = 256 * globalScale;
    CNCanvas.height = 256 * globalScale;

}


CNCanvas.addEventListener("mousemove", setCNCanvasMouseCoords);
CNCanvas.addEventListener("mousedown", setCNCanvasMouseCoords);

let CNMousePosChanged = true;
let CNStoredPos = { x: 0, y: 0 };

function setCNCanvasMouseCoords(e) {
    let rect = e.target.getBoundingClientRect();
    // mouse coordinates within the sprite editor window, with pixel transformations
    let x = ((e.clientX - rect.left - 20) / e.target.clientWidth) * e.target.width;
    let y = ((e.clientY - rect.top - 20) / e.target.clientHeight) * e.target.height;
    mouse.x = x;
    mouse.y = y;

    handleTileDraw(e);
}

function handleTileDraw(e) {
    // Check if cursor has moved at least one tile
    if (CNStoredPos.x == Math.floor(mouse.x / (8 * globalScale)) && CNStoredPos.y == Math.floor(mouse.y / (8 * globalScale))) return;
    CNStoredPos.x = Math.floor(mouse.x / (8 * globalScale));
    CNStoredPos.y = Math.floor(mouse.y / (8 * globalScale));
    if (leftMouseClicked) {
        tiles.setIndex2D(true, CNStoredPos.x, CNStoredPos.y)
        drawTiles();
        return;
    }
    if (rightMouseClicked) {
        tiles.setIndex2D(false, CNStoredPos.x, CNStoredPos.y)
        drawTiles();
    }
}