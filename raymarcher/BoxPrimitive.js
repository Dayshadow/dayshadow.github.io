class Box {
    constructor(b) {
        this.b = b;
    }

    dist(p) {
        let q = (p.absolute()).subtractVector(this.b);
        return length(q.max(0)) + Math.min(Math.max(q.x,Math.max(q.y,q.z)),0.0);
      }
}