class ImageManager {
    constructor() {
        this.imageData = [];
    }
    getImage() {
        this.imageData = ctx.getImageData(0, 0, cw, ch);
    }
    setPixel(x, y, r, g, b, a) {
        let pixelNum = undefined;
        if (x != 0) {
            pixelNum = (y * this.imageData.width + x % this.imageData.width)
        } else {
            pixelNum = y * this.imageData.width;
        }
        pixelNum *= 4;
        this.imageData.data[pixelNum + 0] = r
        this.imageData.data[pixelNum + 1] = g
        this.imageData.data[pixelNum + 2] = b
        this.imageData.data[pixelNum + 3] = a;
    }
    setImage() {
        ctx.putImageData(this.imageData, 0, 0);
    }
}