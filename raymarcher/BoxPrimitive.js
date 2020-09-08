class Box {
    constructor(b) {
        this.b = b;
    }

    dist(p) {
        q = (p.absolute()).subtractVector(b);
        return length(q.max(0)) + Math.min(max(q.x,max(q.y,q.z)),0.0);
      }
}