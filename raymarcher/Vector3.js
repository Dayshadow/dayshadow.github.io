class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /*
    * @param {Object} v2 A second vector3 to add
    */
    addVector(v2) {
        return new Vector3(this.x + v2.x, this.y + v2.y, this.z + v2.z);
    }
    multiplyBy(mult) {
        return new Vector3(this.x * mult, this.y * mult, this.z * mult);
    }
    normalize() {
        if (this.x == 0 && this.y == 0) return this;
        let angle = Math.atan2(this.y, this.x);
        return new Vector3(Math.cos(angle), Math.sin(angle));
    }
    toAngle() {
        return Math.atan2(this.y, this.x);
    }
}