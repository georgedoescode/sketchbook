function setup() {
  createCanvas(500, 500);
  background(252);
  noLoop();
}

function draw() {
  drawHill(0, 0, 1, 1);
}

function drawHill(oX, oY, dir, order = 2) {
  let xoff = 0;
  const noiseMult = 10;
  const firstPoint = createVector();
  const lastPoint = createVector();
  const hillHeight = height / order;
  const points = [];

  strokeWeight(2);
  // noFill();

  for (let i = 0; i < hillHeight; i++) {
    const noiseVal = map(noise(xoff), 0, 1, -noiseMult, noiseMult);
    const bumpVal = sin(map(i, 0, hillHeight, 0, PI)) * 50;
    const x = i + (noiseVal + bumpVal);
    const y = i - (noiseVal + bumpVal);
    points.push({
      x: oX + (x - noiseMult),
      y: oY + (y + noiseMult)
    });

    xoff += 0.0125;
  }

  firstPoint.x = points[0].x;
  firstPoint.y = points[0].y;

  lastPoint.x = points[points.length - 1].x;
  lastPoint.y = points[points.length - 1].y;

  beginShape();
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    vertex(x, y);
  }
  vertex(firstPoint.x, lastPoint.y);
  vertex(firstPoint.x, firstPoint.y);
  endShape();
}
