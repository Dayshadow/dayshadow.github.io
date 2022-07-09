class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    addVector(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y);
    }
    subtractVector(v2) {
        return new Vector(this.x - v2.x, this.y - v2.y);
    }
    multiplyBy(mult) {
        return new Vector(this.x * mult, this.y * mult);
    }
    normalize() {
        if (this.x == 0 && this.y == 0) return this;
        let angle = Math.atan2(this.y, this.x);
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    mag() {
        return Math.sqrt((this.x ** 2) + (this.y ** 2));
    }
    dot(v2) {
        return this.x * v2.x + this.y * v2.y;
    }
    angleBetween(v2) {
        return (Math.acos(this.dot(v2)/(this.mag() * v2.mag())));
    }
    rotate(angle) {
        return new Vector(Math.cos(angle) * this.x - Math.sin(angle) * this.y, Math.sin(angle) * this.x + Math.cos(angle) * this.y)
    }
    toAngle() {
        return Math.atan2(this.y, this.x);
    }
    getBisector(vec2) {
        return this.normalize().addVector(vec2.normalize()).normalize()
    }
}