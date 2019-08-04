let gridAreas;

function setup() {
  createCanvas(1000, 1000);
  noLoop();
  pixelDensity(2);

  gridAreas = createGrid({
    x: 0,
    y: 0,
    w: width,
    h: height,
    minWidth: 250,
    minHeight: 250,
    gap: 16,
    limit: 4
  });
}

function draw() {
  background(252);
  strokeWeight(2);
  gridAreas.map(area => {
    const { x, y, w, h } = area;
    const radius = min(w, h) / 2.5;
    rect(x, y, w, h);
    if (w === h) {
      drawDial({
        x: x + w / 2,
        y: y + h / 2,
        radius
      });
    }
  });
  grain(4000);
  save();
}
