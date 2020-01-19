class Bullet {
    constructor(pos, velocity, type) {
        this.pos = pos;
        this.velocity = velocity;
        switch (type) {
            case "small":
                this.hitboxRadius = 6;
                this.image = "smallBullet.png";
        }
    }
    update() {
        this.pos = this.pos.addVector(this.velocity);
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.hitboxRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
    }
    
}