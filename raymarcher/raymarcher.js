const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;


let renderer = new Renderer2d()

//let box1 = new Box(new Vector3(20, 20, 0), new Vector3(400, 500, 0));
let sphere1 = new Sphere(Math.random() * 100 + 30, new Vector3(Math.random() * cw/2 + cw/4, Math.random() * ch/2 + ch/4, 0))
let sphere2 = new Sphere(Math.random() * 100 + 30, new Vector3(Math.random() * cw/2 + cw/4, Math.random() * ch/2 + ch/4, 0))
let sphere3 = new Sphere(Math.random() * 100 + 30, new Vector3(Math.random() * cw/2 + cw/4, Math.random() * ch/2 + ch/4, 0))
let sphere4 = new Sphere(Math.random() * 100 + 30, new Vector3(Math.random() * cw/2 + cw/4, Math.random() * ch/2 + ch/4, 0))

let world = new World();

//world.addObject(box1);
world.addObject(sphere1);
world.addObject(sphere2);
world.addObject(sphere3);
world.addObject(sphere4);
let f = 0
function mainLoop() {
    f += Math.PI / 360;
    ctx.clearRect(0, 0, cw, ch);
    renderer.newFrame();
    let ray = new Ray(new Vector3(Math.cos(f),Math.sin(f),0), new Vector3(mouse.x, mouse.y, 0))
    ray.testIntersection();
    requestAnimationFrame(mainLoop);
}
mainLoop();