class Grid {
  constructor(x, y, w, h, limit) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.limit = limit;
    this.subrect;
    this.areas = [];
  }

  generate() {
    this.subrect = new SubRect(
      this.x,
      this.y,
      this.w,
      this.h,
      0,
      this.limit,
      this.areas
    );
    return this.areas;
  }
}

class SubRect {
  constructor(x, y, w, h, depth, limit, storageArray) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.areas = [];
    this.depth = depth;
    this.limit = limit;
    this.storageArray = storageArray;

    if (this.depth < this.limit) {
      this.depth++;
      this.subDivide();
    } else {
      const { x, y, w, h } = this;
      this.storageArray.push({ x, y, w, h });
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
    this.rectLeft = new SubRect(
      x,
      y,
      w / 2,
      h,
      this.depth,
      this.limit,
      this.storageArray
    );
    this.rectRight = new SubRect(
      x + w / 2,
      y,
      w / 2,
      h,
      this.depth,
      this.limit,
      this.storageArray
    );
  }

  splitHorizontal(x, y, w, h) {
    this.rectTop = new SubRect(
      x,
      y,
      w,
      h / 2,
      this.depth,
      this.limit,
      this.storageArray
    );
    this.rectBottom = new SubRect(
      x,
      y + h / 2,
      w,
      h / 2,
      this.depth,
      this.limit,
      this.storageArray
    );
  }
}
