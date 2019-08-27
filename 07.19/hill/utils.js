function grain(num) {
  push();
  noStroke();
  // draw the bulk of the grain
  for (let i = 0; i < num; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 2);
    const h = random(1, 2);
    fill(10);
    ellipse(x, y, w, h);
  }
  // draw some dark grains
  pop();
}
