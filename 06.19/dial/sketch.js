let font;
let texture;

function setup() {
  createCanvas(1000, 1000);
  background(252);
  noLoop();
}

function draw() {
  background(252);

  // draw the dial!
  drawDial({
    x: width / 2,
    y: height / 2,
    radius: min(width, height) / 4
  });
}
