class rightArrow {
  constructor(ctx, coords, color = "red") {
    this.ctx = ctx;
    this.coords = coords;
    this.color = color;
    // this.animationDir = -1;
  }

  drawlrightArrow() {
    this.ctx.fillStyle = this.color;

  }
  moverightArrow(color) {
    
    // this.coords = this.coords.map((coord) => (coord += 1 * this.animationDir));
  }

  destroyrightArrow() {

  }

  speeduprightArrow() {

  }
}

export default leftArrow;
