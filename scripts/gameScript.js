var knight,
  knightImage,
  level = 10,
  velocity = 1,
  numBush = 4,
  numTree = 2,
  bush = [],
  tree = [],
  bushImage,
  score = 0,
  life = 3,
  gameOver = "",
  zombie = [],
  numZombie = 3,
  canvas, heart = [],
  heartImage, heartIndex,
  restart, restartImage,
  pause, pauseImage, pause_condition = false;

function sprite(options) {
  var that = {},
    frameIndex = 0,
    tickCount = 0,
    tickPerFrame = options.tickPerFrame || 0,
    numberOfFrame = options.numberOfFrame || 1;
  that.context = options.context;
  that.w = options.w;
  that.h = options.h;
  that.img = options.img;
  that.x = options.x;
  that.y = options.y;
  that.scaleRatio = 1;

  that.getFrameWidth = function () {
    return that.w / numberOfFrame;
  }

  that.update = function () {
    tickCount += 1;
    if (tickCount > tickPerFrame) {
      tickCount = 0;
      if (frameIndex < numberOfFrame - 1) {
        frameIndex += 1;
      } else {
        frameIndex = 0;
      }
    }
  };
  that.render = function () {
    that.context.drawImage(
      that.img,
      frameIndex * that.w / numberOfFrame,
      0,
      that.w / numberOfFrame,
      that.h,
      that.x,
      that.y,
      that.w / numberOfFrame,
      that.h
    );
    // console.clear();
    // console.log(that.x);
  };
  return that;
}

//get canvas
canvas = document.getElementById("cnv");
canvas.width = 1024;
canvas.height = 480;
//knight spite sheet
knightImage = new Image();
//knight sprite
knight = sprite({
  context: canvas.getContext("2d"),
  w: 1740,
  h: 210,
  img: knightImage,
  numberOfFrame: 10,
  tickPerFrame: 5,
  x: canvas.width,
  y: canvas.height - 210
});

// pause
pauseImage = new Image();
pauseImage.src = "pause.png";
pause = sprite({
  context: canvas.getContext("2d"),
  w: 200,
  h: 70,
  img: pauseImage,
  numberOfFrame: 1,
  tickPerFrame: 1,
  x: 410,
  y: 10
});



//restart
restartImage = new Image();
restartImage.src = "images/button/btnRestart.png";
restart = sprite({
  context: canvas.getContext("2d"),
  w: 128,
  h: 64,
  img: restartImage,
  numberOfFrame: 1,
  tickPerFrame: 1,
  x: canvas.width / 2 - 64,
  y: canvas.height / 2
});


// bush
for (i = 0; i < numBush; i++) {
  spawnBush();
}

// tree
for (i = 0; i < numTree; i++) {
  spawnTree();
}

// zombie
for (i = 0; i < numZombie; i++) {
  spawnZombie();
}

// heart
for (i = 0; i < life; i++) {
  spawnHeart();
}

gameLoop();
knightImage.src = "images/character/knight_run.png";

function spawnHeart() {
  var heartIndex, heartImage;
  heartImage = new Image();
  heartIndex = heart.length;
  heartImage.src = "images/heart/heart.png";
  heart[heartIndex] = sprite({
    context: canvas.getContext("2d"),
    w: 32,
    h: 27,
    img: heartImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: 0,
    y: 20
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

function spawnTree() {
  var treeIndex,
    treeImage;
  treeImage = new Image();
  treeIndex = tree.length;
  tree[treeIndex] = sprite({
    context: canvas.getContext("2d"),
    img: treeImage,
    w: 0,
    h: 0,
    x: 0,
    y: 0,
    numberOfFrame: 1,
    tickPerFrame: 1
  });
  tree[treeIndex].x = 0 + Math.random() * (canvas.width - tree[treeIndex].getFrameWidth() * tree[treeIndex].scaleRatio);
  if (treeIndex == 0) {
    tree[treeIndex].w = 282;
    tree[treeIndex].h = 301;
    tree[treeIndex].y = canvas.height - 300;
  }
  if (treeIndex == 1) {
    tree[treeIndex].w = 282;
    tree[treeIndex].h = 301;
    tree[treeIndex].y = canvas.height - 300;
  }
  tree[treeIndex].scaleRatio = Math.random() * 0.5 + 0.5;
  treeImage.src = "images/tree/tree" + treeIndex + ".png";
}

function spawnBush() {
  var bushIndex,
    bushImage;
  bushImage = new Image();
  bushIndex = bush.length;
  bush[bushIndex] = sprite({
    context: canvas.getContext("2d"),
    img: bushImage,
    w: 0,
    h: 0,
    x: 0,
    y: 0,
    numberOfFrame: 1,
    tickPerFrame: 1
  });
  bush[bushIndex].x = 0 + Math.random() * (canvas.width - bush[bushIndex].getFrameWidth() * bush[bushIndex].scaleRatio);
  if (bushIndex == 0) {
    bush[bushIndex].w = 133;
    bush[bushIndex].h = 66;
    bush[bushIndex].y = canvas.height - 62;
  }
  if (bushIndex == 1) {
    bush[bushIndex].w = 73;
    bush[bushIndex].h = 47;
    bush[bushIndex].y = canvas.height - 45;
  }
  if (bushIndex == 2) {
    bush[bushIndex].w = 54;
    bush[bushIndex].h = 55;
    bush[bushIndex].y = canvas.height - 53;
  }
  if (bushIndex == 3) {
    bush[bushIndex].w = 53;
    bush[bushIndex].h = 76;
    bush[bushIndex].y = canvas.height - 74;
  }
  bush[bushIndex].scaleRatio = Math.random() * 0.5 + 0.5;
  bushImage.src = "images/bush/bush" + bushIndex + ".png";
}

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  //hud
  drawHud();

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
    // window.cancelAnimationFrame(gameLoop);
    return gameStoped();
  }

  //tree
  for (i = 0; i < tree.length; i++) {
    tree[i].update();
    tree[i].x += level * velocity / 2;
    tree[i].render();
    if (tree[i].x > canvas.width + 65) {
      tree[i].x = -80 - Math.floor(Math.random() * 3 + 1);
    }
  }

  //bush
  for (i = 0; i < bush.length; i++) {
    bush[i].update();
    bush[i].x += level * velocity / 2;
    bush[i].render();
    if (bush[i].x > canvas.width + 65) {
      bush[i].x = -80 - Math.floor(Math.random() * 3 + 1);
    }
  }

  knight.update();
  knight.x -= level * velocity;
  if (knight.x < -128) {
    knight.x = canvas.width + Math.round(Math.random() * canvas.width);
  }
  knight.render();


  //zombie
  for (i = 0; i < zombie.length; i++) {
    zombie[i].update();
    zombie[i].x -= level * velocity;
    zombie[i].render();
    // console.log(zombie[0].x);
    if (zombie[i].x < -128) {
      zombie[i].x = canvas.width + Math.random() * (canvas.width - zombie[i].getFrameWidth() * zombie[i].scaleRatio);
      life--;
      score++;
    }
    if (score > level * 2) {
      level++;
    }
  }
}

function gameStoped() {
  
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

let body = document.getElementById('kotak');
body.onclick = function (e) {
  let xZombie = []
  let yZombie = []
  let rZombie = []
  var xKnight = knight.x;
  var yKnight = knight.y;
  for (let i = 0; i < zombie.length; i++) {
    xZombie[i] = zombie[i].x;
    yZombie[i] = zombie[i].y;
    rZombie[i] = zombie[i].scaleRatio;
  }
  var index = i;
  var xClient = e.clientX;
  var yClient = e.clientY;
  // console.log(rZombie)
  var d_knight = Math.sqrt(Math.pow((xKnight - xClient), 2) + Math.pow((yKnight - yClient), 2));
  // for (let i = 0; i < zombie.length; i++) {  
  //   var d_zombie = Math.sqrt(Math.pow((xZombie[i] - xClient), 2) + Math.pow((yZombie[i] - yClient), 2));
  //   if (d_zombie < rZombie[i]) {
  //     score += 1;
  //   }
  //   if (d_knight < knight.r) {
  //     --life;
  //   }
  // }
  var d_zombie = Math.sqrt(Math.pow((xZombie[0] - xClient), 2) + Math.pow((yZombie[0] - yClient), 2));
  // console.clear()
  // console.log('x Zombie : '+ xZombie[0])
  // console.log('y Zombie : '+ yZombie[0])
  let tes = (screen.width - 614) / 2;
  console.log('screen width : ' + screen.width);
  console.log(xClient)
  // 1366 - 1024 
  // console.log('x Click : '+ xClient)
  // console.log('y Click : '+ yClient)
  // (screen.width - canvas.width) / 2
  // console.log(screen.width)
  // drawHud()
}

function drawHud() {
  var context = canvas.getContext("2d");
  //score
  context.font = "bold 20px Consolas";
  context.textAlign = "start";
  context.fillStyle = "white";
  context.fillText("Score: " + score, canvas.width - 275, 40);
  //level
  context.font = "bold 20px Consolas";
  context.textAlign = "start";
  context.fillStyle = "white";
  context.fillText("Level: " + level, canvas.width - 125, 40);
  //life
  context.font = "bold 20px Consolas";
  context.textAlign = "start";
  context.fillStyle = "white";
  context.fillText("Life: ", 30, 40);
  //gameover
  context.font = "bold 50px Consolas";
  context.textAlign = "center";
  context.fillStyle = "#193439";
  context.fillText(gameOver, context.canvas.width / 2,
    context.canvas.height / 2 - 32);
}

function spawnZombie() {
  var zombieIndex,
    zombieImage;
  zombieImage = new Image();
  zombieIndex = zombie.length;
  zombie[zombieIndex] = sprite({
    context: canvas.getContext("2d"),
    w: 1740,
    h: 210,
    img: zombieImage,
    numberOfFrame: 10,
    tickPerFrame: 5
  });
  if ((zombieIndex % 2) == 1) {
    zombieImage.src = "images/character/zombie_female_run.png";
  } else {
    zombieImage.src = "images/character/zombie_run.png";
  }
  zombie[zombieIndex].x = canvas.width + Math.random() * (canvas.width - zombie[zombieIndex].getFrameWidth() * zombie[zombieIndex].scaleRatio);
  zombie[zombieIndex].y = canvas.height - 210;
  zombie[zombieIndex].scaleRatio = Math.random() * 0.5 + 0.5;
}