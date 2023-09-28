var canvas = document.querySelector('canvas'); // search the entire html doc for the canvas element
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var rad = 30;

var mouse = {
    x: undefined,
    y: undefined
}
var maxRad = 60;
var minRad = 2;

var colorArray = [
    '#D0FFFD',
    '#FFFFFF',
    '#0A5190',
    '#3B24AF',
    '#D2F8FF',
];

function eucDist(x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1)*(x2 - x1)) + ((y2 - y1)*(y2 - y1)));
}
function getRandomRad() {
    return Math.random() * 10 + 1;
}

function Circle(x, y, dx, dy, radius) { // create an object to represent a circle
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
        }
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        if(this.radius < maxRad && eucDist(this.x, this.y, mouse.x, mouse.y) < 50) {
            this.radius += 1;
        }
        else if (this.radius > getRandomRad()){
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArray = [];

function animate() {
    requestAnimationFrame(animate); // we will use the animate function and put it as an argument in the requestanimationframe function
    // we are creating a loop to loop through, that function being the animate function
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
// event listeners will facilitate interactivity
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y
});
/*
let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
    if(scrollPos > 0){
        canvas.style.visibility = "hidden";
    }
    else {
        canvas.style.visibility = "visible";
    }
}

document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});*/

function init() {
    circleArray = [];
    for(var i = 0; i < 1000; i++) {
        var rad = getRandomRad();
        var x = Math.random() * (canvas.width - (rad * 2)) + rad;
        var y = Math.random() * (canvas.height - (rad*2)) + rad;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, rad));
    }    
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});
animate();
init();