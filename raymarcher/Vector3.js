class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addVector(v2) { // Add another Vector3
        return new Vector3(this.x + v2.x, this.y + v2.y, this.z + v2.z);
    }
    subtractVector(v2) { // Subtract another Vector3
        return new Vector3(this.x - v2.x, this.y - v2.y, this.z - v2.z);
    }
    absolute() { // absolute value of all components
        return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }
    min(val) {
        return Vector3(Math.min(this.x, val), Math.min(this.y, val), Math.min(this.z, val));
    }
    max(val) {
        return Vector3(Math.max(this.x, val), Math.max(this.y, val), Math.max(this.z, val));
    }
    multiplyBy(mult) { // Multiply by some constant
        return new Vector3(this.x * mult, this.y * mult, this.z * mult);
    }
    normalize() { // Returns a new scaled vector of length 1
        if (this.x == 0 && this.y == 0) return this;
        let angle = Math.atan2(this.y, this.x);
        return new Vector3(Math.cos(angle), Math.sin(angle));
    }
    toAngle() { // Converts the vector to an angle in radians
        return Math.atan2(this.y, this.x);
    }
}