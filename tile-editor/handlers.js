function handleKeyUp(e) {
    keys = keys.filter((x) => { return (x != e.key) });
}
function handleKeyPress(e) {
    if (!(keys.includes(e.key))) {
        keys.push(e.key);
        keys.map((x) => { return x.toLowerCase() })
    }
}
function handleMouseDown(e) {
    //e.button describes the mouse button that was clicked
    // 0 is left, 1 is middle, 2 is right
    if (e.button === 2) {
        rightMouseClicked = true;
    }
    if (e.button === 0) {
        leftMouseClicked = true;
    }
}
function handleMouseUp(e) {
    if (e.button === 2) {
        rightMouseClicked = false;
    }
    if (e.button === 0) {
        leftMouseClicked = false;
    }
}
function handleBTUpload(e) {
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
    globalScale = baseTileImage.width / 16;
    initCanvases();
    // important that this is first
    setUpBTCanvasBT();
    setUpORCanvasBT();
    setUpPTCanvasBT();

    setVariation();
    drawTiles();
    moveBTToEditor();
}

function handleORUpload(e) {
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
    globalScale = oRepresentationImage.width / 32;
    initCanvases();
    // important that this is first
    setUpORCanvasOR();
    setUpBTCanvasOR();
    setUpPTCanvasOR();
    setUpICCanvasOR();

    setVariation();
    moveORToEditor();
    drawTiles();
};

function handlePTUpload(e) {
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
    globalScale = packedTileImage.width / 16;
    Vctx.drawImage(packedTileImage, 0, 0)

    initCanvases()
    // important that this is first
    setUpPTCanvasPT();
    setUpBTCanvasPT();
    setUpICCanvasPT();
    setUpORCanvasPT();

    setVariation();
    movePackedTileToEditor();
    drawTiles();
};



function handlePTRowsUpload(e) {
    if (document.getElementById('packedTileRowsUploadInput').value == "") return;
    let reader = new FileReader;
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function (e) {
        // Reset the image variable
        packedTileImage = new Image();

        // image needs to load for a bit after setting the image url
        packedTileImage.addEventListener('load', onLoadPTRowsImage);
        packedTileImage.src = e.target.result
        // allow the change function to work if user selects the same image again
        document.getElementById('packedTileRowsUploadInput').value = "";
    }
}

const onLoadPTRowsImage = () => {
    // if ((packedTileImage.width * packedTileImage.height) % (16 * 24) != 0) {
    //     alert("Image does not have the correct aspect ratio, and is not a multiple of 16x24. Results inaccurate.");
    // }
    // the scale for the rest of the code, to make it generic. The normal size for the packed texture is 16x24
    globalScale = packedTileImage.width / (16 * 6);
    let variationColumns = 6;
    let variationRows = Math.floor(packedTileImage.height / (24 * globalScale));
    variationCount = variationColumns * variationRows - 1;
    resizeVariations();
    Vctx.drawImage(packedTileImage, 0, 0)

    initCanvases()
    // important that this is first
    setUpPTCanvasPT();
    setUpBTCanvasPT();
    setUpICCanvasPT();
    setUpORCanvasPT();

    setVariation();
    movePackedTileToEditor();
    drawTiles();
};