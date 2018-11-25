function Obstacle() {

  const colors = ['#DBC2CF', '#9FA2B2', '#3C7A89', '#2E4756', '#16262E'];


  this.x = width + 100;
  this.y = Math.floor(Math.random() * 775) + 25;
  this.edge = Math.floor(Math.random() * 50) + 5;
  this.color = colors[Math.floor(Math.random() * 4)];
  this.xVelocity = Math.floor(Math.random() * 10) + 1;

  this.show = () => {
    fill(this.color);
    rect(this.x, this.y, this.edge, this.edge);
  };

  this.update = () => {
    this.x -= this.xVelocity;
  };

  this.hits = (hero) => {
    const heroLeftSide = hero.x
    const heroRightSide = hero.x + hero.edge
    const heroTop = hero.y
    const heroBottom = hero.y + hero.edge

    const obstacleLeftSide = this.x
    const obstacleRightSide = this.x + this.edge
    const obstacleTop = this.y
    const obstacleBottom = this.y + this.edge

    if (heroRightSide < obstacleRightSide && heroRightSide > obstacleLeftSide) {
      if (heroTop > obstacleBottom && heroTop < obstacleTop) {
        return true
      }

      if (heroBottom > obstacleTop && heroBottom < obstacleBottom) {
        return true
      }
    }

    if (heroLeftSide > obstacleLeftSide && heroLeftSide < obstacleRightSide) {
      if (heroTop > obstacleBottom && heroTop < obstacleTop) {
        return true
      }

      if (heroBottom > obstacleTop && heroBottom < obstacleBottom) {
        return true
      }
    }
  }

  this.offscreen = () => {
    if (this.x < 0) {
      return true;
    } else {
      return false;
    }
  }
}

export { Obstacle }

