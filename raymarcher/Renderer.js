class Renderer {
    constructor() {

    }
    newFrame() {
        image.getImage(); // have to initialize the internal imagedata variable so it knows what to do with it
        for (let y = 0; y < ch; y += 1 / rayDensity) { // looping through all x's and y's of the canvas
            for (let x = 0; x < cw; x += 1 / rayDensity) {
                let screenCoord = new Vector3((2 * x) / image.imageData.width - 1, (-2 * y) / image.imageData.height + 1); // Code that generates the -1 to +1 coords the camera needs

                let ray = camera.makeRay(screenCoord); // tellin the camera to do it's thing
                let result = ray.intersection();

                if (result) {

                    image.setPixel(Math.floor(x + Math.random() * (1 / rayDensity)), Math.floor(y + Math.random() * (1 / rayDensity)), 0, 0, 0, 255 * result / 21); // result is the amount of steps it took to march into it's intersection
                    // makes a nice ambient occlusion
                }
            }
        }
        image.setImage(); // update the frame with the modified pixel info
    }
}