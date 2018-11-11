import 'bootstrap';

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

var font,
  fontsize = 24;
let obstacles = [];
let score = 0;
const bestScores = [0];


function preload() {
  // font = loadFont('src/PressStart2P-Regular.ttf');
}

function resetSketch() {
  score = 0
  obstacles = [];
  hero = new Hero();
  obstacles.push(new Obstacle());
  loop();
};

function setup() {
  createCanvas(800,800);
  textFont('Press Start 2P');
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  resetSketch();
  const button = createButton('Restart');
  button.mousePressed(resetSketch);
}

function draw() {
  background('azure');
  updateScore( width - 50 );
  updateBestScore( width - 50 );

  for (var i = obstacles.length-1; i >= 0; i--) {
    if (obstacles[i].hits(hero)) {
      bestScores.push(score)
      hero.dies();
    }

    obstacles[i].show();
    obstacles[i].update();


    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score ++;
    }
  }

  hero.update();
  hero.show();

  if (frameCount % 5 === 0) {
    obstacles.push(new Obstacle());
  }
}

function keyPressed() {
  if (key == ' ') {
    hero.up();
  }
}

const gameOver = () => {
  fill(0);
  textAlign(CENTER);
  text(`Game Over! Score: ${score}`, width / 2 , height / 2)
}

function updateScore(x) {
  document.getElementById("score").value = score;
  fill(0);
  textAlign(RIGHT);
  text(`Score: ${score}`, x, 50);
}

const updateBestScore = (x) => {
  const best = bestScores.reduce(function(a, b) {
    return Math.max(a, b);
  });
  fill(0);
  textAlign(RIGHT);
  text(`Best: ${best}`, x, 90);
};

