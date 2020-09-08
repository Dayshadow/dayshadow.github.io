c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let renderer = new Renderer()
let box1 = new Box(new Vector3(5, 5, 5))


function mainLoop() {


    requestAnimationFrame(mainLoop);
}