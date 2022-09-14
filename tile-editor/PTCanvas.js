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

const packedTileCanvas = document.getElementById("packedTile");
let PTctx;
let PTw, PTh;

function PTinit() {
    packedTileCanvas.width = PTw = 16 * globalScale;
    packedTileCanvas.height = PTh = 24 * globalScale;

    PTctx = packedTileCanvas.getContext("2d");
}

// packed tile base initializer
function setUpPTCanvasBT() {
    // Just put it in the bottom section
    PTctx.drawImage(baseTileImage, 0, 8 * globalScale);
}
function setUpPTCanvasPT() {
    PTctx.drawImage(packedTileImage, 0, 0);
}


function setUpPTCanvasOR() {
    translateFromDictionary(ORtoPTDictionary, ORctx, PTctx, globalScale);
}