class Camera {
    constructor(origin, target, upguide, fov, aspectRatio) {
        this.fov = fov;
        this.target = target;
        this.origin = origin;
        this.upguide = upguide;

        this.forward = this.target.subtractVector(this.origin).normalize(); // generating a 0-1 vector facing what we want the camera to look at
        this.right = this.forward.cross(upguide).normalize(); //putting the right direction perpendicular to the forward and up directions
        this.up = this.right.cross(this.forward); // putting the up true up vector perpendicular to right and forward

        this.h = Math.tan(this.fov); // triginometry to extrapolate the correct screen height from the fov
        this.w = this.h * aspectRatio // basic math to translate width to height

    }
    makeRay(point) { // some magical camera logic to translate world space to pixel space
        let direction = this.forward.addVector(this.right.multiply(point.x * this.w)).addVector(this.up.multiply(point.y * this.h));
        return new Ray(direction.normalize(), this.origin);
    }
    recalculateFacing() {
        this.forward = this.target.subtractVector(this.origin).normalize();
        this.right = this.forward.cross(this.upguide).normalize();
        this.up = this.right.cross(this.forward);
    }
}