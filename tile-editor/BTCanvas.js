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

const PTtoBTDictionary = {
    srcDst: [
        { src: [0, 8, 16, 16], dst: [0, 0] },
    ]
}

const BaseTileCanvas = document.getElementById("baseTile");
let BTctx;
let BTw, BTh;

function BTinit() {
    // allow for generic sizes in case you want to generate different sizes of tile sprites or whatever
    BaseTileCanvas.width = BTw = 16.0 * globalScale;
    BaseTileCanvas.height = BTh = 16.0 * globalScale;

    BTctx = BaseTileCanvas.getContext("2d");
    BTDrawOutput = BTctx.getImageData(0, 0, BTw, BTh)
}
function setUpBTCanvasBT() {
    // Used to get the image data array for the inputted base tile
    BTctx.drawImage(baseTileImage, 0, 0);
}

function setUpBTCanvasOR() {
    translateFromDictionary(ORtoBTDictionary, ORctx, BTctx, globalScale);
}


function setUpBTCanvasPT() {
    translateFromDictionary(PTtoBTDictionary, PTctx, BTctx, globalScale);
}