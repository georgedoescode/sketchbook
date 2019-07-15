function setup() {
  createCanvas(500, 500);
  background(252);
  noLoop();
}

function draw() {
  background(252);
  // draw the dial!
  drawDial({
    x: width / 2,
    y: height / 2,
    radius: 100
  });
}
