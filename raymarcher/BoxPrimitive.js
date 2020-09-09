class Box {
    constructor(b, loc) {
        this.loc = loc;
        this.b = b;
    }

    dist(p) {
        let q = p.subtractVector(this.loc).absolute().subtractVector(this.b)
        return length(q.max(0)) + Math.min(Math.max(q.x, Math.max(q.y,q.z)),0);

        //vec3 q = abs(p) - b;
    /*
    return length( max(q,0) ) +
    min(max(q.x,max(q.y,q.z)),0.0);

         */
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