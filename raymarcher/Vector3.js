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
    add(val) {
        return new Vector3(this.x + val, this.y + val, this.z + val);
    }
    subtract(val) {
        return new Vector3(this.x - val, this.y - val, this.z - val);
    }
    absolute() { // absolute value of all components
        return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }
    min(val) {
        return new Vector3(Math.min(this.x, val), Math.min(this.y, val), Math.min(this.z, val));
    }
    max(val) {
        return new Vector3(Math.max(this.x, val), Math.max(this.y, val), Math.max(this.z, val));
    }
    multiply(mult) { // Multiply by some constant
        return new Vector3(this.x * mult, this.y * mult, this.z * mult);
    }
    normalize() { // Returns a new scaled vector of length 1
        let len = length(this);
        return new Vector3(this.x / len, this.y / len, this.z / len);
    }
    march(val) { // Increases the length in the vector's current direction by a fixed amount
        let len = length(this);
        let nm = new Vector3(this.x / len, this.y / len, this.z / len); // I put the normalize code here so It doesn't have to calculate length twice
        return nm.multiply(len + val)
    }
    toAngle() { // Converts the vector to an angle in radians
        return Math.atan2(this.y, this.x);
    }
    cross(v2) {
        return new Vector3(this.y * v2.z - this.z * v2.y, this.z * v2.x - this.x * v2.z, this.x * v2.y - this.y * v2.x);
    }
}