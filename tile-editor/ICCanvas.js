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


const inCornerCanvas = document.getElementById("inCorners");
let ICctx;
let ICw, ICh;

function ICinit() {
    inCornerCanvas.width = ICw = 8 * globalScale;
    inCornerCanvas.height = ICh = 8 * globalScale;

    ICctx = inCornerCanvas.getContext("2d");
}

function setUpICCanvasOR() {
    translateFromDictionary(ORtoICDictionary, ORctx, ICctx, globalScale);
}

function setUpICCanvasPT() {
    translateFromDictionary(PTtoICDictionary, PTctx, ICctx, globalScale);
}