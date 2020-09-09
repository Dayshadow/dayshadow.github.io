class Box {
    constructor(b, loc) {
        this.loc = loc;
        this.b = b;
    }

    dist(p) {
        let q = (p.absolute()).subtractVector(this.b.addVector(this.loc));
        return length(q.max(0)) + Math.min(Math.max(q.x, Math.max(q.y, q.z)), 0.0);
    }
    draw2d() {
        ctx.beginPath()
        ctx.rect(this.loc.x - this.b.x, this.loc.y - this.b.y, 2 * this.b.x, 2 * this.b.y);
        ctx.fillStyle = "grey";
        ctx.strokeStyle = "#000000";
        ctx.fill();
        ctx.stroke();
    }
}