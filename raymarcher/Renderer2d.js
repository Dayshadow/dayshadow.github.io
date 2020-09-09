class Renderer2d {
    constructor(z) {
        this.z = z;
    }
    newFrame() {
        for (let i = 0; i < world.objs.length; i++) {
            world.objs[i].draw2d();
        }
    }
    drawVector(v, loc) {
        ctx.beginPath();
        ctx.moveTo(loc.x, loc.y);
        ctx.lineTo(v.x + loc.x, v.y + loc.y);
    }
}