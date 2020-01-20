const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
c.width = 1080;
c.height = 810

let h = 810;
let w = 1080;
let gw = 810; // Game surface height
let gh = 810; // Game surface width

// Keydown handling ------------------------
let keys = [];
window.addEventListener('keydown', (e) => {
    if (!(keys.includes(e.keyCode))) {
        keys.push(e.keyCode);
    }
});
window.addEventListener('keyup', function (e) {
    keys = keys.filter((x) => { return (x !== e.keyCode) });
});
// ------------------------------------------

let qt;
let bullets = [];
let theta;
let r;

const p = new Player(new Vector(20, 20));

let f = 0;
function gameLoop() {
    qt = new QuadTree(0, 0, w, h, 3, true);
    f++;
    ctx.fillStyle = "#555555";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#BBBBBB";
    ctx.fillRect(h, 0, h, h);

    p.draw();
    p.move();

    if (f % 2 == 0) {
        theta = ((f * Math.PI * 2) / 64) // + f / 60;
        r = Math.sin(theta * 8) + 2;
    bullets.push(
        new Bullet(
            new Vector((gw / 2) + 4, (gh / 2) + 4), // Position
            new Vector(Math.cos(theta), Math.sin(theta)).multiplyBy(r), // Velocity
             "small" // Type
             )
        );
    }
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].draw();
        bullets[i].update();
        if (!pointCollidingRect(bullets[i].pos, 0, 0, gw, gh)) {
            bullets.splice(i, 1);
        } else {
            qt.insert(bullets[i]);
        }
    }
    //qt.draw();

    requestAnimationFrame(gameLoop);
}
gameLoop();
