let grid;
let gridAreas;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  textAlign(CENTER);

  // x, y, w, h, limit
  grid = new Grid(0, 0, width, height, 4);
  gridAreas = grid.generate();
}

function draw() {
  background(250);

  gridAreas.map(area => {
    const { x, y, w, h } = area;
    noFill();
    rect(x, y, w, h);
    fill(0);
    ellipse(x + w / 2, y + h / 2, 5, 5);
  });
}
