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

const oRepresentationCanvas = document.getElementById("oRepresentation");
let ORctx;
let ORw, ORh;

function ORinit() {
    // allow for generic sizes in case you want to generate different sizes of tile sprites or whatever
    oRepresentationCanvas.width = ORw = 32 * globalScale;
    oRepresentationCanvas.height = ORh = 32 * globalScale;

    ORctx = oRepresentationCanvas.getContext("2d");
}

function setUpORCanvasOR() {
    ORctx.drawImage(oRepresentationImage, 0, 0);
}


function setUpORCanvasIC() {
    translateFromDictionary(ITtoORDictionary, ICctx, ORctx, globalScale);
}

function setUpORCanvasPT() {
    // cheating lol
    setUpORCanvasBT();
    setUpORCanvasIC();
}

function setUpORCanvasBT() {
    translateFromDictionary(BTtoORDictionary, BTctx, ORctx, globalScale);
}
