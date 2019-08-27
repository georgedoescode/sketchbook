function setup() {
  createCanvas(500, 500);
  background(252);
}

function draw() {
  background(252);
  strokeWeight(2);
  bezier(
    width / 2,
    height,
    width * 1.5,
    height,
    width / 2,
    height,
    width / 2,
    height - 200
  );
}
