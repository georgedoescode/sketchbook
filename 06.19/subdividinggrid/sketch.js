let gridAreas;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  gridAreas = createGrid({
    x: 0,
    y: 0,
    w: width,
    h: height,
    minWidth: 150,
    minHeight: 150,
    gap: 8,
    limit: 4
  });

  console.log(gridAreas);
}

function draw() {
  background(250);
  gridAreas.map(area => {
    const { x, y, w, h } = area;
    rect(x, y, w, h);
  });
}
