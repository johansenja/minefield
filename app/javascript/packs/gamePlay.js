var font,
  fontsize = 18;
let obstacles = [];
let score = 0;
const bestScores = [0];

const preload = () => {
  font = loadFont('<%= font_path "PressStart2P-Regular.ttf" %>');
}

const resetSketch = () => {
  score = 0
  obstacles = [];
  hero = new Hero();
  obstacles.push(new Obstacle());
  loop();
};

const setup = () => {
  createCanvas(800,800);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  resetSketch();
  const button = createButton('Restart');
  button.mousePressed(resetSketch);
}

const draw = () => {
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

const keyPressed = () => {
  if (key == ' ') {
    hero.up();
  }
}

const touchStarted = () => {
  hero.up();
}

const gameOver = () => {
  fill(0);
  textAlign(CENTER);
  text(`Game Over! Score: ${score}. Submit Score?`, width / 2 , height / 2)
}

const updateScore = (x) => {
  document.getElementById("score").value = score;
  fill(0);
  textAlign(RIGHT);
  text(`Score: ${score}`, x, 50);
}

const updateBestScore = (x) => {
  const best = bestScores.reduce((a, b) => {
    return Math.max(a, b);
  });
  fill(0);
  textAlign(RIGHT);
  text(`Best: ${best}`, x, 90);
};

export { preload, setup, draw }
