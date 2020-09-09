class Ray {
    constructor(v, loc) { // v is a normalized vector and loc is the starting location for the ray
        this.v = v.normalize();
        this.loc = loc;
        this.stepSize = 5;
        this.minStep = 3; // Anytime the step size gets below 1 it registers as a collision
        this.maxStep = 1000; // If the step size is ever over 1000 it registers as a miss
        this.circleRendering = false;
    }
    testIntersection() {
        let lowestDist = Infinity;
        let count = 0
        while (this.stepSize > this.minStep) {
            if (this.stepSize > this.maxStep) return false;

            for (let obj of world.objs) {
                let dist = obj.dist(this.v.addVector(this.loc))
                if (dist < lowestDist) {
                    lowestDist = dist;
                }
            }
            count++
            this.stepSize = lowestDist;
            lowestDist = Infinity;
            if (this.circleRendering) {
                ctx.beginPath();
                ctx.arc(this.v.x + this.loc.x, this.v.y + this.loc.y, Math.abs(this.stepSize), 0, Math.PI * 2);
                ctx.stroke(); // just for drawing the circles
            }
            this.v = this.v.march(this.stepSize);
        }
        return count
    }
}