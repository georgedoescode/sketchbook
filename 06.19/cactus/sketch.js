function setup() {
  createCanvas(600, 600);
  background(252);
  pixelDensity(20);
  noLoop();
}

function draw() {
  background(250);
  for (let i = 0; i < 5; i++) {
    drawSpine(width / 2, height, i + 1);
  }
  grain(2000);
  save();
}

function drawSpine(x, maxHeight, order) {
  let xoff = 0.0;
  let xInc = random(0.05, 0.25);
  const rotateVal = random(-0.5, 0.5);
  const plantWidth = random(25, 50);
  const plantHeight = random(maxHeight / 2, maxHeight);
  const numPoints = 50;
  const points = [];
  const colors = [
    color(174, 199, 125),
    color(213, 232, 201),
    color(156, 183, 109)
  ];

  fill(0, random(150, 200), 0);
  fill(colors[floor(random(colors.length))]);
  strokeWeight(3);

  push();

  translate(x, maxHeight);
  rotate(rotateVal);

  beginShape();
  for (let i = 0; i < numPoints; i += 1) {
    const val = map(i, 0, numPoints, PI / 4, TWO_PI - PI / 4) + HALF_PI;
    const n = map(noise(xoff), 0, 1, 0, 1);
    const x = cos(val) * plantWidth * n;
    const y = sin(val) * plantHeight;
    curveVertex(x, y);
    points.push({ x, y });
    xoff += xInc;
    push();
    translate(x, y);
    strokeWeight(random(1, 3));
    line(0, 0, x / random(1.5, 3), random(-5, 0));
    if (random() > 0.5) {
      const bumpSize = random(4, 8);
      fill(0);
      noStroke();
      ellipse(0, 0, bumpSize, bumpSize);
    }
    pop();
  }
  endShape(CLOSE);

  for (let i = 1; i < points.length - 1; i++) {
    const { x, y } = points[i];
    const { x: x1, y: y1 } = points[points.length - i];

    for (let j = 0; j < 1; j++) {
      const pointPosition = random(x, x1);
      strokeWeight(random(1, 3));
      point(pointPosition, y + random(-5, 5));
    }
  }
  pop();
}
