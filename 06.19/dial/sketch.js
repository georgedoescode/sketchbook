let cols;
let rows;

let colSize;
let rowSize;

let font;

function preload() {
  font = loadFont("fonts/B612Mono-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(252);
  noLoop();

  cols = 5;
  rows = 5;

  colSize = width / cols;
  rowSize = height / rows;
}

function draw() {
  background(252);
  textFont(font);

  for (let x = 0; x < width; x += colSize) {
    for (let y = 0; y < height; y += rowSize) {
      // draw the dial!
      rect(x, y, colSize, rowSize);
      drawDial({
        x: x + colSize / 2,
        y: y + rowSize / 2,
        radius: min(colSize, rowSize) / 3
      });
    }
  }
}
