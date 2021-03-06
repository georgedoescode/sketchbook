const cols = 21;
const rows = 21;

let colSize = 0;
let rowSize = 0;

const gridAreas = [];

let maxDist;
let minDist;

function setup() {
  createCanvas(1000, 1000);
  background(252);
  noLoop();

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
}

function draw() {
  const colors = [
    color("#F9423A"),
    color("#FD6800"),
    color("#F4DA40"),
    color("#6BC049"),
    color("#5B87D8"),
    color("#965EC7")
  ];
  const c = colors[floor(random(colors.length))];

  background(252);
  gridAreas.forEach(area => {
    const { xPos: x, yPos: y, w, h, dist } = area;
    const rad = min(w, h) / 4;
    const c = colors[floor(random(colors.length))];
    strokeWeight(3);
    fill(c);
    stroke(c);
    const n = map(dist, minDist, maxDist, 0.01, 4);
    const s = map(dist, minDist, maxDist, -2, 2);

    wonkyCircle(x + w / 2, y + h / 2, rad * s, n);
  });

  grain(3000);

  save();
}

function wonkyCircle(oX, oY, rad, n) {
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
    curveVertex(x, y);
  }
  endShape(CLOSE);
  pop();
}
