const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let resDiv = 4.0; // Changes the denominator of the res
c.width = cw = window.innerWidth / resDiv;
c.height = ch = window.innerHeight / resDiv;


let renderer = new Renderer2d()

let box1 = new Box(new Vector3(70, 30, 90), new Vector3(30, -140, 0));

let world = new World();
let sphere1 = new Sphere(Math.random() * 50 + 10, new Vector3(64, 2, 52))
let sphere2 = new Sphere(Math.random() * 50 + 10, new Vector3(77,23,38))
let sphere3 = new Sphere(Math.random() * 50 + 10, new Vector3(34,78,47))
let sphere4 = new Sphere(Math.random() * 50 + 10, new Vector3(10,86,84))


world.addObject(sphere1);
world.addObject(sphere2);
world.addObject(sphere3);
world.addObject(sphere4);
world.addObject(box1);

let f = 0
let camera = new Camera(new Vector3(-300, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 1), 40, 16 / 9)
let image = new ImageManager();

function mainLoop() {
    f += Math.PI / (180);
    ctx.clearRect(0, 0, cw, ch);
    let rays = [];

    image.getImage()
    for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
            let screenCoord = new Vector3((2 * x) / image.imageData.width - 1, (-2 * y) / image.imageData.height + 1);
            let ray = camera.makeRay(screenCoord);
            let result = ray.testIntersection();
            if (result) {
                image.setPixel(x, y, 0, 0, 0, 255 * result/20);
            }
        }
    }
    image.setImage();
    camera.forward = new Vector3(0,0,0);
    camera.origin = new Vector3(0, Math.cos(f)*300, Math.sin(f)*300)
    camera.recalculateFacing();
    // box1 = new Box(new Vector3(200, 30*f, 0), new Vector3(400, 500, 0));
    // world.objs[2] = box1;
    //renderer.newFrame()
    requestAnimationFrame(mainLoop);
}
mainLoop();