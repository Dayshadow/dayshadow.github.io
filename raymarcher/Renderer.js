class Renderer {
    constructor() {

    }
    newFrame() {
        image.getImage(); // have to initialize the internal imagedata variable so it knows what to do with it
        let rayData = [];
        for (let y = 0; y < ch; y++) { // looping through all x's and y's of the canvas
            for (let x = 0; x < cw; x++) {
                let screenCoord = new Vector3((2 * x) / image.imageData.width - 1, (-2 * y) / image.imageData.height + 1); // Code that generates the -1 to +1 coords the camera needs
                let ray = camera.makeRay(screenCoord); // tellin the camera to do it's thing
                rayData.push(ray.loc.x, ray.loc.y, ray.loc.z, ray.v.x, ray.v.y, ray.v.z);
            }
        }
        //let computeData = world.computeData.concat([]);
        //computeData = computeData.concat(rayData);
        let result = bulkCompute(rayData);
        let filteredResult = [];
        for (let i = 0; i < result.length; i += 6) {
            filteredResult.push(result[i]);
        }

        for (let i = 0; i < filteredResult.length; i++) {
            let pos = image.indexToPixel(i);
            if (filteredResult[i] != -1) {
                image.setPixel(pos.x, pos.y, 0, 0, 0, 200);
                console.log(pos.x, pos.y)
            }
        }
        image.setImage(); // update the frame with the modified pixel info
    }
}


// if (result) {
//     image.setPixel(x, y, 0, 0, 0, 255 * result / 21); // result is the amount of steps it took to march into it's intersection
//     // makes a nice ambient occlusion
// }