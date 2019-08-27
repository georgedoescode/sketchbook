let yseed = 0;
let xseed = 1000;
let pdf;

function setup() {
  createCanvas(1280, 720, SVG);
  background(252);
  noLoop();
  pdf = createPDF();
  pdf.beginRecord();
}

function draw() {
  background(252);
  noiseShape(0, 0, width, height);
}

function mousePressed() {
  pdf.save();
}

function noiseShape(oX, oY, w, h) {
  let yoff = 0;
  const inc = 30;

  push();
  translate(oX, oY);
  for (let x = 0; x <= w; x += inc) {
    let xoff = 0;
    for (let y = 0; y <= h; y += inc) {
      const n = map(noise(xoff, yoff), 0, 1, 0.1, 6);

      wonkyCircle(x, y, inc / 2, n);
      xoff += 0.05;
    }
    yoff += 0.05;
  }
  pop();
}

function wonkyCircle(oX, oY, rad, n) {
  const points = [];
  push();
  translate(oX, oY);
  noFill();
  stroke(10);
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
