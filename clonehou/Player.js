class Player {
    constructor(pos) {
        this.pos = pos;
        this.hitboxRadius = 5;
        this.speed = 7;
    }

    move() {
        let moveVector = new Vector(0, 0)
        if (keys.includes(38)) {
            moveVector.y -= 1;
        }
        if (keys.includes(40)) {
            moveVector.y += 1;
        }
        if (keys.includes(37)) {
            moveVector.x -= 1;
        }
        if (keys.includes(39)) {
            moveVector.x += 1;
        }

        this.pos = this.pos.addVector(moveVector.normalize().multiplyBy(this.speed));
        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.x > gw) this.pos.x = gw;
        if (this.pos.y < 0) this.pos.y = 0;
        if (this.pos.y > gh) this.pos.y = gh;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.hitboxRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#33ffff";
        ctx.fill();
    }

    checkCollisions() {

    }
}