
const connectivityCanvas = document.getElementById("connectivityExample");
connectivityCanvas.width = 256;
connectivityCanvas.height = 256;
let CEctx = connectivityCanvas.getContext("2d");

function updateCNDimensions() {
    connectivityCanvas.width = 256 * globalScale;
    connectivityCanvas.height = 256 * globalScale;
}


connectivityCanvas.addEventListener("mousemove", setCNCanvasMouseCoords);
connectivityCanvas.addEventListener("mousedown", setCNCanvasMouseCoords);

let CNMousePosChanged = true;
let CNStoredPos = {x: 0, y: 0};

function setCNCanvasMouseCoords(e) {
    let rect = e.target.getBoundingClientRect();
    // mouse coordinates within the sprite editor window, with pixel transformations
    let x = ((e.clientX - rect.left - 10) / e.target.clientWidth) * e.target.width;
    let y = ((e.clientY - rect.top - 10) / e.target.clientHeight) * e.target.height;
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
    }
    if (rightMouseClicked) {
        tiles.setIndex2D(false, CNStoredPos.x, CNStoredPos.y)
    }
    drawExample();
}