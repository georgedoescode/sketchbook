class Grid {
  constructor(args) {
    const { x, y, w, h, minWidth, minHeight, gap, limit } = args;
    this.gap = gap / 2;
    this.x = x + this.gap;
    this.y = y + this.gap;
    this.w = w - this.gap * 2;
    this.h = h - this.gap * 2;
    this.minWidth = minWidth;
    this.minHeight = minHeight;
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
      this.minWidth,
      this.minHeight,
      0,
      this.limit,
      this.gap,
      null,
      this.areas
    );
    return this.areas;
  }
}

class SubRect {
  constructor(
    x,
    y,
    w,
    h,
    minWidth,
    minHeight,
    depth,
    limit,
    gap,
    lastDivision,
    storageArray
  ) {
    this.gap = gap;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.minWidth = minWidth;
    this.minHeight = minHeight;
    this.areas = [];
    this.depth = depth;
    this.limit = limit;
    this.lastDivision = lastDivision;
    this.storageArray = storageArray;

    if (this.depth < this.limit) {
      this.depth++;
      this.subDivide();
    } else {
      // only push last division to prevent overlaps
      let { x, y, w, h, gap } = this;
      x = x + gap;
      y = y + gap;
      w = w - gap * 2;
      h = h - gap * 2;
      this.storageArray.push({ x, y, w, h });
    }
  }

  subDivide() {
    let { x, y, w, h, lastDivision } = this;

    // reduce chance of repeating a split loads of times
    let verticalChance = 0.5;
    if (lastDivision === `vertical`) verticalChance = 0.75;
    if (lastDivision === `horizontal`) verticalChance = 0.25;

    if (random() > verticalChance) {
      if (w < this.minWidth) {
        this.splitHorizontal(x, y, w, h);
        return;
      }
      this.splitVertical(x, y, w, h);
    } else {
      if (h < this.minHeight) {
        this.splitVertical(x, y, w, h);
        return;
      }
      this.splitHorizontal(x, y, w, h);
    }
  }

  splitVertical(x, y, w, h) {
    const division = `vertical`;
    this.rectLeft = new SubRect(
      x,
      y,
      w / 2,
      h,
      this.minWidth,
      this.minHeight,
      this.depth,
      this.limit,
      this.gap,
      division,
      this.storageArray
    );

    this.rectRight = new SubRect(
      x + w / 2,
      y,
      w / 2,
      h,
      this.minWidth,
      this.minHeight,
      this.depth,
      this.limit,
      this.gap,
      division,
      this.storageArray
    );
  }

  splitHorizontal(x, y, w, h) {
    const division = `horizontal`;
    this.rectTop = new SubRect(
      x,
      y,
      w,
      h / 2,
      this.minWidth,
      this.minHeight,
      this.depth,
      this.limit,
      this.gap,
      division,
      this.storageArray
    );

    this.rectBottom = new SubRect(
      x,
      y + h / 2,
      w,
      h / 2,
      this.minWidth,
      this.minHeight,
      this.depth,
      this.limit,
      this.gap,
      division,
      this.storageArray
    );
  }
}
