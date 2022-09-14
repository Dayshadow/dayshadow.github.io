
const connectivityCanvas = document.getElementById("connectivityExample");
connectivityCanvas.width = 256;
connectivityCanvas.height = 256;
let CEctx = connectivityCanvas.getContext("2d");

function updateCNDimensions() {
    connectivityCanvas.width = 256 * globalScale;
    connectivityCanvas.height = 256 * globalScale;
}