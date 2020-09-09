class World {
    constructor() {
        this.objs = [];
        this.computeData = [];
    }
    addObject(obj) {
        this.objs.push(obj); // not that complicated I know
        this.computeData.push(...obj.generateGLSLArrayObj())
    }
}