const gridAreas = [];

let maxDist;
let minDist;

let cols;
let rows;

function setup() {
  createCanvas(1000, 1000);
  background(10);
  // frameRate(2);
  noLoop();
  pixelDensity(2);

  cols = floor(random(3, 15));
  rows = cols;
}

function draw() {
  background(252);

  cols = floor(random(3, 5));
  rows = cols;

  const gridAreas = [];

  colSize = width / cols;
  rowSize = height / rows;

  const p1 = createVector(width / 2, height / 2);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const xPos = x * colSize;
      const yPos = y * rowSize;
      const w = colSize;
      const h = rowSize;

      const p2 = createVector(xPos + w / 2, yPos + h / 2);

      gridAreas.push({ xPos, yPos, w, h, dist: p1.dist(p2) });
    }
  }

  maxDist = max(gridAreas.map(area => area.dist));
  minDist = min(gridAreas.map(area => area.dist));
  const maxInc = random(4);
  const minInc = random(0.01);

  gridAreas.forEach(area => {
    const { xPos: x, yPos: y, w, h, dist } = area;
    const rad = min(w, h) / 4;
    strokeWeight(2);
    fill(10);
    stroke(252);
    const n = map(dist, minDist, maxDist, minInc, maxInc);
    const s = map(dist, minDist, maxDist, -2, 2);

    if (random() > 0.9) {
      push();
      stroke(10);
      strokeWeight(random(2, 4));
      wonkyLine(p1.x, p1.y, x + w / 2, y + h / 2, 0.01);
      pop();
    }

    stroke(252);
    strokeWeight(2);

    wonkyCircle(x + w / 2, y + h / 2, rad * s, n);
  });

  grain(4000);

  save(`frame${frameCount}.jpg`);
}

function wonkyCircle(oX, oY, rad, n) {
  const points = [];
  push();
  translate(oX, oY);
  beginShape();
  const xMult = 1;
  const yMult = 1;
  for (let i = 0; i < TWO_PI; i += n) {
    const xoff = map(cos(i), -1, 1, 0, 0.1);
    const yoff = map(sin(i), -1, 1, 0, 0.1);
    const radius = map(noise(xoff, yoff), 0, 1, rad / 2, rad);
    const x = radius * cos(i) * xMult;
    const y = radius * sin(i) * yMult;
    vertex(x, y);
    points.push({ x, y });
  }
  endShape(CLOSE);

  for (let i = 0; i < floor(random(150)); i++) {
    const p1 = points[floor(random(points.length))];
    const p2 = points[floor(random(points.length))];

    const { x, y } = p1;
    const { x: x1, y: y1 } = p2;

    wonkyLine(x, y, x1, y1, 0.0125);

    push();
    translate(x, y);
    stroke(10);
    if (random() > 0.95) {
      wonkyLine(0, 0, x / 2, y / 2);
    }

    pop();
  }
  pop();
}

class WonkyLine {
  constructor(x, y, x1, y1, roughness) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.roughness = roughness;
  }

  draw() {
    const d = dist(this.x, this.y, this.x1, this.y1);
    let xoff = random(1000);
    push();
    translate(this.x, this.y);
    rotate(atan2(this.y1 - this.y, this.x1 - this.x));
    noFill();
    beginShape();
    for (let x = 0; x < d; x += 1) {
      const n = map(noise(xoff), 0, 1, -5, 5);
      vertex(x, n);
      xoff += this.roughness;
    }
    endShape();
    pop();
  }
}

function wonkyLine(x, y, x1, y1, roughness = 0.01) {
  const line = new WonkyLine(x, y, x1, y1, roughness);
  line.draw();
}
