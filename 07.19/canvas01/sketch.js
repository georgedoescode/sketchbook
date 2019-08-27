function setup() {
  createCanvas(2000, 2000);
  noLoop();
  // pixelDensity(2);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(255);
  canvasTexture(
    100,
    100,
    width - 200,
    height - 200,
    3500,
    0.015,
    color(0, random(75, 255))
  );

  // grain(5000);
}

function mousePressed() {
  save();
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

class CanvasTexture {
  constructor(x, y, w, h, density, roughness, stroke, strokeWeight) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    console.log(this.w);
    this.density = density;
    this.stroke = stroke;
    this.roughness = roughness;
    this.strokeWeight = floor(random(strokeWeight, strokeWeight + 1));
  }

  paint() {
    push();
    translate(this.x, this.y);
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    let xoff = 0;
    let yoff = 0;
    for (let i = 0; i < this.density; i++) {
      const xpos = random(this.w);
      const offset = noise(yoff) * 40;
      wonkyLine(xpos, -offset, xpos, this.h + offset, this.roughness);
      yoff += 0.05;
    }
    for (let i = 0; i < this.density; i++) {
      const ypos = random(this.h);
      const offset = noise(xoff) * 40;
      wonkyLine(-offset, ypos, this.w + offset, ypos, this.roughness);
      xoff += 0.05;
    }
    pop();
  }
}

function canvasTexture(
  x,
  y,
  w,
  h,
  density,
  roughness = 0.01,
  stroke = color(0, 1),
  strokeWeight = 1
) {
  const canvas = new CanvasTexture(
    x,
    y,
    w,
    h,
    density,
    roughness,
    stroke,
    strokeWeight
  );
  canvas.paint();
}
