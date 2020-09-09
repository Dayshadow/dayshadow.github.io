class Box {
    constructor(b, loc) {
        this.loc = loc;
        this.b = b; // the "radius" of the box in each dimension
    }

    dist(p) {
        let q = p.subtractVector(this.loc).absolute().subtractVector(this.b)
        return length(q.max(0)) + Math.min(Math.max(q.x, Math.max(q.y, q.z)), 0); // box distance function
    }
}