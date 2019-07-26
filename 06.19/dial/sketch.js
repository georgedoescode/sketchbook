let font;
let texture;

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  translate(width / 2, height / 2);
}
