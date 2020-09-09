class ImageManager {
    constructor() {
        this.imageData = [];
    }
    getImage() {
        this.imageData = ctx.getImageData(0, 0, cw, ch);
    }
    setPixel(x, y, r, g, b, a) {
        let pixelIndex = undefined;
        if (x != 0) { // converts x and y coordinates into the pixel number
            pixelIndex = ((y - 1) * this.imageData.width + x % this.imageData.width)
        } else {
            pixelIndex = y * this.imageData.width;
        }
        pixelIndex *= 4; // moves the pixel index to the right spot in the imagedata array
        this.imageData.data[pixelIndex + 0] = r
        this.imageData.data[pixelIndex + 1] = g
        this.imageData.data[pixelIndex + 2] = b
        this.imageData.data[pixelIndex + 3] = a;
    }
    setImage() {
        ctx.putImageData(this.imageData, 0, 0);
    }
    setData() {
        this.imageData.data = data;
    }
    indexToPixel(index) {
        let x = index % this.imageData.width;
        let y = Math.floor(index / this.imageData.height);
        return new Vector3(x, y, 0);
    }
}