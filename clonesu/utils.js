function rangeMap(input, inputStart, inputEnd, outputStart, outputEnd) {
    let slope = (outputEnd - outputStart) / (inputEnd - inputStart)
    return outputStart + slope * (input - inputStart)
}
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};
function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let mouse = {
    x: 1,
    y: 1
};
let rightMouseClicked = false;
let leftMouseClicked = false;
let keys = [];
function handleMouseDown(e) {
    //e.button describes the mouse button that was clicked
    // 0 is left, 1 is middle, 2 is right
    e.preventDefault();
    if (e.button === 2) {
        rightMouseClicked = true;
    }
    if (e.button === 0) {
        leftMouseClicked = true;
    }
}
function handleMouseUp(e) {
    e.preventDefault();
    if (e.button === 2) {
        rightMouseClicked = false;
    }
    if (e.button === 0) {
        leftMouseClicked = false;
    }
}
const mouseMove = (event) => {
    mouse.x = event.x
    mouse.y = event.y
};

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousemove', mouseMove)
document.addEventListener('drag', mouseMove);
window.addEventListener('keypress', (e) => {
    if (!(keys.includes(e.key))) {
        keys.push(String.fromCharCode(e.keyCode));
        keys.map((x) => { return x.toLowerCase() })
    }
});
window.addEventListener('keyup', function (e) {
    keys = keys.filter((x) => { return (x != e.key) });
});
