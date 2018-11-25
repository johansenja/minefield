function Hero() {
  this.x = 100;
  this.y = 400;
  this.edge = 25

  this.gravity = 0.75;
  this.velocity = 0;
  this.upthrust = -15;

  this.show = () => {
    this.dead ? fill('red') : fill('black');
    rect(this.x, this.y, this.edge, this.edge);
  };

  this.up = () => {
    this.velocity += this.upthrust;
  };

  this.update = () => {
    this.velocity += this.gravity;
    this.y += this.velocity * 0.4;

    if (this.y >= height) {
      this.y = height;
      this.dies();
    } else if (this.y < 0) {
      this.y = 0;
      this.dies();
    }
  };

  this.dies = () => {
    this.dead = true;
    gameOver();
    noLoop();
  };
};

export { Hero }

