const areas = [];

function setup() {
  createCanvas(500, 500);
  background(250);
  noLoop();
}

function draw() {
  background(250);
  let r = new SubRect(0, 0, width, height, 0);

  areas.forEach((area, index) => {
    const { x, y, w, h } = area;
    rect(x, y, w, h);
    textAlign(CENTER);
    text(index, x + w / 2, y + h / 2);
  });

  console.log(areas);
}

// take a rect
// split horizontally or vertically
// store the resulting two rects
// remove the parent rect
// repeat

class SubRect {
  constructor(x, y, w, h, depth) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.areas = [];
    this.depth = depth;
    this.limit = 4;
    this.minRectWidth = 0;
    this.minRectHeight = 0;

    if (this.depth < this.limit) {
      this.depth++;
      this.subDivide();
    } else {
      const { x, y, w, h } = this;
      areas.push({ x, y, w, h });
    }
  }

  subDivide() {
    const { x, y, w, h } = this;

    if (random() > 0.5) {
      this.splitVert(x, y, w, h);
    } else {
      this.splitHorizontal(x, y, w, h);
    }
  }

  splitVert(x, y, w, h) {
    this.rectLeft = new SubRect(x, y, w / 2, h, this.depth);
    this.rectRight = new SubRect(x + w / 2, y, w / 2, h, this.depth);
  }

  splitHorizontal(x, y, w, h) {
    this.rectTop = new SubRect(x, y, w, h / 2, this.depth);
    this.rectBottom = new SubRect(x, y + h / 2, w, h / 2, this.depth);
  }
}
