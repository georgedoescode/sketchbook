const cols = 8;
const rows = 8;

let colSize = 0;
let rowSize = 0;

let pdf;

function setup() {
  createCanvas(1000, 1000);
  background(252);
  noLoop();

  colSize = width / cols;
  rowSize = height / rows;

  for (let x = colSize; x < width; x += colSize) {
    for (let y = rowSize; y < height; y += rowSize) {
      const shape = new RandomShape(x, y, rowSize / 4);
      shape.setup();
      shape.draw();
    }
  }
}

function draw() {
  background(253);
  for (let x = colSize; x < width; x += colSize) {
    for (let y = rowSize; y < height; y += rowSize) {
      const shape = new RandomShape(x, y, rowSize / 4);
      shape.setup();
      shape.draw();
    }
  }

  grain(500);
}

class RandomShape {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.coords = [];
    this.numPoints;
    this.piMult;
    this.piInc;
  }

  setup() {
    this.numPoints = random(1, 25);
    this.piMult = PI * round(random(2, 6));
    this.piInc = this.piMult / this.numPoints;
    for (var i = 0; i < this.piMult; i += this.piInc) {
      this.coords.push({
        x: cos(i) * this.radius,
        y: sin(i) * this.radius
      });
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    for (var i = this.numPoints; i > 0; i--) {
      this.point1 = this.coords[round(random(0, this.coords.length - 1))];
      this.point2 = this.coords[round(random(0, this.coords.length - 1))];
      strokeWeight(2);
      stroke(25, 255);
      line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
      fill(random(0, 100), random(0, 255), random(100, 150), 75);
      noStroke();
      bezier(
        this.point1.x,
        this.point1.y,
        0,
        0,
        0,
        0,
        this.point2.x,
        this.point2.y
      );
    }
    pop();
  }
}
