class leftArrow {
  constructor(ctx, coords, color = "red") {
    this.ctx = ctx;
    this.coords = coords;
    this.color = color;
    // this.animationDir = -1;
  }

  drawleftArrow() {
    this.ctx.fillStyle = this.color;

  }
  moveleftArrow(color) {
    this.color = color;
    this.coords = this.coords.map((coord) => (coord += 1 * this.animationDir));
  }

  destroyleftArrow() {
    this.animationDir *= -1;
  }

  speedupleftArrow() {

  }
}

export default leftArrow;
