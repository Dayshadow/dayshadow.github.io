const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let resDiv = 2.0; // Changes the denominator of the res
let rayDensity = 0.7;
c.width = cw = window.innerWidth / resDiv;
c.height = ch = window.innerHeight / resDiv;


const world = new World(); // A whole neeew woooorllld

const box1 = new Box(new Vector3(70, 30, 90), new Vector3(30, -140, 0));
const sphere1 = new Sphere(Math.random() * 50 + 10, new Vector3(64, 2, 52)) //creating the objects
const sphere2 = new Sphere(Math.random() * 50 + 10, new Vector3(77, 23, 38)) // will probably find a better way later
const sphere3 = new Sphere(Math.random() * 50 + 10, new Vector3(34, 78, 47))
const sphere4 = new Sphere(Math.random() * 50 + 10, new Vector3(10, 86, 84))


world.addObject(sphere1); // adding them to the world class to contain them
world.addObject(sphere2); //might do some more stuff with the world class later
world.addObject(sphere3); // maybe it can contain particles also
world.addObject(sphere4);
world.addObject(box1);

const renderer = new Renderer() // class that handles the drawing

let f = 0
let camera = new Camera(new Vector3(-300, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 1), 40, cw / ch) // camera setup
let image = new ImageManager(); // class that manages the canvas data and pixel-by-pixel modification



function mainLoop() {
    f += Math.PI / (180);

    camera.forward = new Vector3(0, 0, 0); // keeping camera pointing at zero
    camera.origin = new Vector3(0, Math.cos(f) * 300, Math.sin(f) * 300) // some movement just cuz I wanted to see it in action
    // kinda messed up cuz the upguide makes the camera occasionally flip
    camera.recalculateFacing(); // for updating the camera's position after the previous changes to it's orientation variables

    ctx.clearRect(0, 0, cw, ch);
    renderer.newFrame()

    requestAnimationFrame(mainLoop);
}
mainLoop();