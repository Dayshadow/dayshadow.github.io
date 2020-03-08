class Particle {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.age = 0;
        this.image = image;
    }
    update() {
        this.age++;
    }
    draw() {
        ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
    }
}