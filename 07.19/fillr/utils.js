function grain(num) {
  push();
  noStroke();
  // draw the bulk of the grain
  for (let i = 0; i < num; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 2);
    const h = random(1, 2);
    fill(random(200, 255), 100);
    rect(x, y, w, h);
  }
  // draw some dark grains
  for (let i = 0; i < num / 50; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 3);
    const h = random(1, 3);
    fill(250, random(240, 255));
    rect(x, y, w, h);
  }
  pop();
}
