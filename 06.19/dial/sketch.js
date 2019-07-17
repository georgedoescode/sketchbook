let font;
let texture;

function preload() {
  font = loadFont("fonts/B612Mono-Regular.ttf");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  background(252);
  noLoop();
}

function draw() {
  background(252);

  // textFont(font);

  // draw the dial!
  drawDial({
    x: width / 2,
    y: height / 2,
    radius: 200
  });
}
