class Box {
    constructor(b, loc) {
        this.loc = loc;
        this.b = b; // the "radius" of the box in each dimension
    }

    dist(p) {
        let q = p.subtractVector(this.loc).absolute().subtractVector(this.b)
        return length(q.max(0)) + Math.min(Math.max(q.x, Math.max(q.y, q.z)), 0); // box distance function
    }
    generateGLSLArrayObj() {
        return [this.loc.x, this.loc.y, this.b.x, this.b.y, 0, 0, 0, BOX_ID]
    }
}