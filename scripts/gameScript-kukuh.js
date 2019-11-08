var knight, knightImage, level = 1,
  velocity = 1,
  numBush = 4,
  bush = [],
  bushImage,
  score = 0,
  life = 3,
  gameOver = "",
  zombie = [],
  numZombie = 3,
  canvas,
  heart = [],
  heartImage, heartIndex,
  restart, restartImage;
//restart
restartImage = new Image();
restartImage.src = "restart.png";
restart = sprite({
  context: canvas.getContext("2d"),
  w: 384,
  h: 256,
  img: restartImage,
  numberOfFrame: 1,
  tickPerFrame: 1,
  x: canvas.width / 2 - 200,
  y: canvas.height / 2 - 20
});
//heart
for (i = 0; i < life; i++) {
  spawnHeart();
}
function gameLoop() {
  if (life > 0) {
    for (i = 0; i < heart.length; i++) {
      heart[i].update();
      if (life == 0) {
        heart[0].x = -100;
      }
      if (life == 1) {
        heart[1].x = -100;
      }
      if (life == 2) {
        heart[2].x = -100;
      }
      heart[i].render();
    }
  } else {
    gameOver = "Game Over";
    drawHud();
    restart.render()
    canvas.onclick = function (e) {
      var xAxis = e.clientX;
      var yAxis = e.clientY;
      var d_restart = Math.sqrt(Math.pow((restart.x - xAxis), 2) + Math.pow((restart.y - yAxis), 2));
      if (d_restart < restart.r) {
        ulang()
      }
    }
  }
}
ulang = () => {
  life = 3;
  heart = [];
  zombie = [];
  bush = [];
  knight.x = knight.x = canvas.width + Math.round(Math.random() * canvas.width);
  score = 0;
  level = 1;
  velocity = 1;
  gameOver = "";
  for (i = 0; i < numBush; i++) {
    spawnBush();
  }
  for (i = 0; i < numZombie; i++) {
    spawnZombie();
  }
  for (i = 0; i < life; i++) {
    spawnHeart();
  }
  gameLoop();
}
function spawnHeart() {
  var heartIndex, heartImage;
  heartImage = new Image();
  heartIndex = heart.length;
  heartImage.src = ("heart.png");
  heart[heartIndex] = sprite({
    context: canvas.getContext("2d"),
    w: 50,
    h: 40,
    img: heartImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: 0,
    y: 10
  });
  if (heartIndex == 0) {
    heart[heartIndex].x = 90;
  }
  if (heartIndex == 1) {
    heart[heartIndex].x = 140;
  }
  if (heartIndex == 2) {
    heart[heartIndex].x = 190;
  }
}
