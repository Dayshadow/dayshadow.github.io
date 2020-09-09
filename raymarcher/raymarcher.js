const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;


let renderer = new Renderer2d()

let box1 = new Box(new Vector3(20, 20, 0), new Vector3(400, 500, 0));
let sphere1 = new Sphere(20, new Vector3(500, 200, 0))

let world = new World();

world.addObject(box1);
world.addObject(sphere1);

function mainLoop() {
    ctx.clearRect(0, 0, cw, ch);
    renderer.newFrame();
    let ray = new Ray(new Vector3(-1,0,0), new Vector3(mouse.x, mouse.y, 0))
    ray.testIntersection();
    requestAnimationFrame(mainLoop);
}
mainLoop();