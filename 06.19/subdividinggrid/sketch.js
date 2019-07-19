let grid;
let gridAreas;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // x, y, w, h, limit
  grid = new Grid({
    x: 0,
    y: 0,
    w: width,
    h: height,
    minWidth: 150,
    minHeight: 150,
    gap: 8,
    limit: 4
  });
  gridAreas = grid.generate();
}

function draw() {
  background(250);
  gridAreas.map((area, index) => {
    const { x, y, w, h } = area;
    rect(x, y, w, h);
  });
}
