class Camera {
    constructor(origin, target, upguide, fov, aspectRatio) {
        this.fov = fov;
        this.target = target;
        this.origin = origin;
        this.upguide = upguide;

        this.forward = this.target.subtractVector(this.origin).normalize();
        this.right = this.forward.cross(upguide).normalize();
        this.up = this.right.cross(this.forward);

        this.h = Math.tan(this.fov);
        this.w = this.h * aspectRatio

    }
    makeRay(point) {
        let direction = this.forward.addVector(this.right.multiply(point.x * this.w)).addVector(this.up.multiply(point.y * this.h));
        return new Ray(direction.normalize(), this.origin);
    }
    recalculateFacing() {
        this.forward = this.target.subtractVector(this.origin).normalize();
        this.right = this.forward.cross(this.upguide).normalize();
        this.up = this.right.cross(this.forward);
    }
}