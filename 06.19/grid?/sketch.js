const rectangles = [];
const cols = 6;
const rows = 6;
const gapSize = 4;
const gap = gapSize / 2;
let colSize = 0;
let rowSize = 0;

function setup() {
  createCanvas(500, 500);
  background(0);
  noLoop();

  colSize = (width - gap) / cols - gap;
  rowSize = (height - gap) / rows - gap;

  console.log(colSize, rowSize);
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      push();
      translate(gap + i * colSize + gap * i, gap + j * rowSize + gap * j);
      rect(0, 0, colSize, colSize);
      pop();
    }
  }
  createRect();
}

function createRect() {
  const rect = {
    cols: round(random(6)),
    rows: round(random(6))
  };
  console.log(rect);
}
