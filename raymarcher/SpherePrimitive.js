class Sphere {
    constructor(r, loc) {
        this.r = r;
        this.loc = loc;
    }

    dist(p) {
        return length(p.subtractVector(this.loc)) - this.r;
    }
    draw2d() {
        ctx.beginPath()
        ctx.arc(this.loc.x, this.loc.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "grey";
        ctx.strokeStyle = "#000000";
        ctx.fill();
        ctx.stroke();
    }
}