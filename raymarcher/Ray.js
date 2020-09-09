class Ray {
    constructor(v, loc) { // v is a normalized vector and loc is the starting location for the ray
        this.v = v.normalize();
        this.loc = loc;
        this.stepSize = 2;
        this.minStep = 1; // Anytime the step size gets below 1 it registers as a collision
        this.maxStep = 1000; // If the step size is ever over 1000 it registers as a miss
        this.debug = 0;

    }
    testIntersection() {
        let lowestDist = Infinity;
        while (this.stepSize > this.minStep) {
            for (let obj of world.objs) {
                let dist = obj.dist(this.v.addVector(this.loc))
                if (dist < lowestDist) {
                    lowestDist = dist;
                }
            }
            this.stepSize = lowestDist;
            this.v = this.v.march(this.stepSize);
            this.debug++;
            console.log(this.v)
            if(this.debug > 20) {
                break;
            }
        }
        ctx.fillRect(this.v.addVector(this.loc).x, this.v.addVector(this.loc).y, 10, 10)
    }
}