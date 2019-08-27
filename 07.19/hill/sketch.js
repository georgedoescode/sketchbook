function setup() {
  createCanvas(1920, 1080);
  background(252);
  // frameRate(3);
  noLoop();
  // pixelDensity(4);
}

function draw() {
  background(252);
  const skyLineWidth = random(10, 250);
  for (let x = 0; x < width; x += skyLineWidth) {
    strokeWeight(random(2, 4));
    if (random() > 0.5) {
      wonkyLine(x, 0, x, height);
    } else {
    }
  }
  grain(500);
  const numHillsBack = floor(random(1, 15));
  for (let i = 0; i < numHillsBack; i++) {
    drawHill(width + 40, 0, -1, i, numHillsBack);
  }
  const numHills = floor(random(3, 15));
  for (let i = 0; i < numHills; i++) {
    drawHill(0, 0, 1, i, numHills);
  }
  // save("./hills/" + frameCount + ".png");
}

function mousePressed() {
  save();
}

function drawHill(oX, oY, dir, order, num) {
  let xoff = 0;
  const noiseMult = random(2, 15);
  const bumpMult = random(-150, 150);
  const firstPoint = createVector();
  const lastPoint = createVector();
  let hillHeight = max(width, height);
  const points = [];
  const isDark = random() > 0.5;

  if (isDark) {
    fill(10);
    stroke(252);
  } else {
    stroke(10);
    fill(252);
  }

  strokeWeight(1);

  const colors = [color("#EB6FBD")];

  const diff = 0.5;

  const mappedOrder = map(order, 0, num, 1, 2);
  const xM = mappedOrder;

  strokeWeight(random(1, 4));
  // hillHeight /= xM;

  if (dir === 1) {
    for (let i = 0; i < hillHeight; i++) {
      const noiseVal = map(noise(xoff), 0, 1, -noiseMult, noiseMult);
      const bumpVal = sin(map(i, 0, hillHeight, 0, PI)) * bumpMult;

      const x = i / xM / diff + (noiseVal + bumpVal);
      const y = i - (noiseVal + bumpVal);

      points.push({
        x: oX + (x - noiseMult),
        y: oY + (y + noiseMult)
      });

      xoff += 0.01;
    }

    firstPoint.x = points[0].x;
    firstPoint.y = points[0].y;

    lastPoint.x = points[points.length - 1].x;
    lastPoint.y = points[points.length - 1].y;
  } else {
    for (let i = 0; i < hillHeight; i++) {
      const noiseVal = map(noise(xoff), 0, 1, -noiseMult, noiseMult);
      const bumpVal = sin(map(i, 0, hillHeight, 0, PI)) * bumpMult;

      let x = i / xM / diff + (noiseVal + bumpVal);
      const y = i - (noiseVal + bumpVal);

      x *= -1;

      points.push({
        x: oX + (x - noiseMult),
        y: oY + (y + noiseMult)
      });

      xoff += 0.01;
    }

    firstPoint.x = points[0].x;
    firstPoint.y = points[0].y;

    lastPoint.x = points[points.length - 1].x;
    lastPoint.y = points[points.length - 1].y;
  }

  push();
  beginShape();
  // translate(0, height - hillHeight);
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    vertex(x, y);
  }
  vertex(firstPoint.x, lastPoint.y);
  vertex(firstPoint.x, firstPoint.y);
  endShape();
  if (random() > 0.75) return;
  const drawLines = random() > 0.9;
  const pointInc = floor(random(5, 10));
  if (!drawLines) {
    for (let i = 0; i < points.length; i += pointInc) {
      const { x, y } = points[i];
      for (let j = y + 4; j <= height; j += pointInc) {
        noStroke();
        if (isDark) {
          fill(252);
        } else {
          fill(10);
        }
        ellipse(x, j, random(2, 3), random(2, 3));
      }
    }
  } else {
    const lineInc = floor(random(10, 100));
    for (let i = 0; i < points.length; i += lineInc) {
      const { x, y } = points[i];
      strokeWeight(random(1, 2));
      wonkyLine(x, y, x, height);
    }
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
