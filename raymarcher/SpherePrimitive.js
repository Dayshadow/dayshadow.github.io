class Sphere {
    constructor(r, loc) {
        this.r = r;
        this.loc = loc;
    }

    dist(p) {
        return length(p.subtractVector(this.loc)) - this.r; // simple sphere distance function
    }
}