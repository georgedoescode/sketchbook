function grain(num) {
  push();
  noStroke();
  // draw the bulk of the grain
  for (let i = 0; i < num; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 2);
    const h = random(1, 2);
    fill(random(150, 255), 50);
    ellipse(x, y, w, w);
  }
  // draw some dark grains
  for (let i = 0; i < num / 50; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 2);
    const h = random(1, 2);
    fill(0);
    ellipse(x, y, w, w);
  }
  pop();
}
