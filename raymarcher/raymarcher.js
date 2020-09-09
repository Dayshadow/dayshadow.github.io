const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let resDiv = 4; // Changes the denominator of the res
c.width = cw = window.innerWidth / resDiv;
c.height = ch = window.innerHeight / resDiv;


let renderer = new Renderer2d()

let box1 = new Box(new Vector3(200, 30, 100), new Vector3(400, 500, 0));
let sphere

let world = new World();
let sphere1 = new Sphere(Math.random() * 100 + 30, new Vector3(Math.random() * cw / resDiv + cw / 4, Math.random() * ch / resDiv + ch / 4, 0))
let sphere2 = new Sphere(Math.random() * 100 + 30, new Vector3(Math.random() * cw / resDiv + cw / 4, Math.random() * ch / resDiv + ch / 4, 0))


world.addObject(sphere1);
world.addObject(sphere2);
world.addObject(box1);

let f = 0
let camera = new Camera(new Vector3(-300, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 1), 40, 16/9)
let image = new ImageManager();

function mainLoop() {
    f += Math.PI / (180);
    ctx.clearRect(0, 0, cw, ch);
    let rays = [];

    image.getImage()
    for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
            let screenCoord = new Vector3((2*x) / image.imageData.width - 1, (-2 * y) / image.imageData.height + 1);
            let ray = camera.makeRay(screenCoord);
            if (ray.testIntersection()) {
                image.setPixel(x, y, 0, 0, 0, 255);
            }
        }
    }
    image.setImage();
    camera.upguide = new Vector3(Math.sin(f * 2),Math.sin(f), Math.cos(f));
    camera.recalculateFacing();
    // box1 = new Box(new Vector3(200, 30*f, 0), new Vector3(400, 500, 0));
    // world.objs[2] = box1;
    //renderer.newFrame()
    requestAnimationFrame(mainLoop);
}
mainLoop();