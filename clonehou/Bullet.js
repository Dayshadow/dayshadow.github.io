class Bullet {
    constructor(pos, velocity, type) {
        this.pos = pos;
        this.velocity = velocity;
        switch (type) {
            case "small":
                this.hitboxRadius = 6;
                this.image = SMALLBULLET_IMG;
        }
    }
    update() {
        this.pos = this.pos.addVector(this.velocity);
    }
    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.velocity.toAngle());
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        ctx.restore();
    }
    
}