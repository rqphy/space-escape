function nextpage() {
  var nbEnter = 0;
  oxo.inputs.listenKey("enter", function() {
    nbEnter++;
    if (nbEnter == 1) {
      oxo.screens.loadScreen("homev2", function() {
        console.log("test");
      });
    }

    if (nbEnter == 2) {
      let timer = 3;
      let h1 = document.getElementById("countdown");
      let countdown;
      countdown = setInterval(function() {
        h1.innerHTML = timer;
        timer--;
        if (timer == -1) {
          clearInterval(countdown);
          oxo.screens.loadScreen("game", game);
        }
      }, 1000);
    }
  });
}

nextpage();

function reloader() {
  oxo.inputs.listenKey("enter", function() {
    window.location.reload();
  });
}

function game() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  //Load Images
  const background = new Image();
  const friendlyShip = new Image();
  const enemyShip = new Image();
  const heal = new Image();
  const laser = new Image();
  const healthbar = new Image();
  const titan = new Image();

  let backgroundSrc = require("../assets/gamebg.png");
  let friendlyShipSrc = require("../assets/spaceship1.png");
  let enemyShipSrc = require("../assets/spaceship2.png");
  let healSrc = require("../assets/heal.png");
  let laserSrc = require("../assets/laser.png");
  let healthbarSrc = require("../assets/healthbar.png");
  let titanSrc = require("../assets/titan.png");

  background.src = backgroundSrc;
  friendlyShip.src = friendlyShipSrc;
  enemyShip.src = enemyShipSrc;
  heal.src = healSrc;
  laser.src = laserSrc;
  healthbar.src = healthbarSrc;
  titan.src = titanSrc;

  //Variables

  let friendlyShipY = 325;
  let enemyShipY = 325;
  let life = 50;
  let domage = 15;

  let heals = [];
  heals[0] = {
    x: canvas.width,
    y: 225
  };
  let distance = 861;
  let speed = 5;

  let lasers = [];
  lasers[0] = {
    x: canvas.width - 130,
    y: enemyShipY + 50
  };
  let firespeed = 10;
  let firerate = 1016;

  let gameover = false;

  let titanX = canvas.width;

  //Move

  function onKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        if (enemyShipY > 25) {
          enemyShipY -= 75;
        }
        break;
      case "ArrowDown":
        if (enemyShipY + enemyShip.height < canvas.height - 25) {
          enemyShipY += 75;
        }
        break;
      case "z":
        if (friendlyShipY > 25) {
          friendlyShipY -= 75;
        }
        break;
      case "s":
        if (friendlyShipY + friendlyShip.height < canvas.height - 25) {
          friendlyShipY += 75;
        }
        break;
      default:
        break;
    }
  }

  //DrawTitan

  function moveTitan() {
    titanX -= 0.5;
  }

  //HitBox

  function win() {
    if (titanX < 30) {
      oxo.screens.loadScreen("end", function() {});
      gameover = true;
      reloader();
    }
  }

  //Spawn

  function spawn(array, x, y) {
    array.push({
      x: x,
      y: y
    });
  }

  //Heals Spawn

  function randomSpawn(max, min) {
    let n;
    while (n % 25 !== 0) {
      n = Math.floor(Math.random() * (max - min) + min);
    }
    return n;
  }

  function healSpawn() {
    for (let i = 0; i < heals.length; i++) {
      context.drawImage(heal, heals[i].x, heals[i].y, 50, 50);
      heals[i].x -= speed;
      if (heals[i].x === distance) {
        spawn(heals, canvas.width, randomSpawn(700, 25));
      }
    }
  }

  //Hitbox Heals

  function hitboxHeals() {
    for (let i = 0; i < heals.length; i++) {
      if (
        heals[i].x <= friendlyShip.width + 30 &&
        ((heals[i].y >= friendlyShipY &&
          heals[i].y <= friendlyShipY + friendlyShip.height) ||
          (heals[i].y + heals[i].height <=
            friendlyShipY + friendlyShip.height &&
            heals[i].y + heals[i].height >= friendlyShipY))
      ) {
        heals.shift(i, 1);
        if (life <= 97) {
          life += 5;
        }
      } else if (heals[i].x <= -45) {
        heals.shift(i, 1);
      }
    }
  }

  //Lasers
  function lasersSpawn() {
    for (let i = 0; i < lasers.length; i++) {
      context.drawImage(laser, lasers[i].x, lasers[i].y, 50, 10);
      lasers[i].x -= firespeed;
      if (lasers[i].x === firerate) {
        spawn(lasers, canvas.width - 130, enemyShipY + 50);
      }
    }
  }

  //Lasers Hitbox

  function hitboxLasers() {
    for (let i = 0; i < lasers.length; i++) {
      if (
        lasers[i].x <= friendlyShip.width + 30 &&
        ((lasers[i].y >= friendlyShipY &&
          lasers[i].y <= friendlyShipY + friendlyShip.height) ||
          (lasers[i].y + lasers[i].height <=
            friendlyShipY + friendlyShip.height &&
            lasers[i].y + lasers[i].height >= friendlyShipY))
      ) {
        lasers.shift(i, 1);
        life -= domage;
      } else if (lasers[i].x <= 0) {
        lasers.shift(i, 1);
      }
    }
  }

  //Healthbar

  function health() {
    if (life <= 0) {
      if (life < 0) {
        life = 0;
      }
      oxo.screens.loadScreen("end2", function() {});
      gameover = true;
      reloader();
    } else if (life > 100) {
      life = 100;
    }
  }

  function firelife() {
    if (life >= 10) {
      setInterval(() => {
        life--;
      }, 1000);
    }
  }

  function lifetot() {
    context.fillStyle = "#FFF";
    context.font = "20px Verdana";
    context.fillText(life + "%", 30, 60);
  }

  //Draw
  function draw() {
    context.drawImage(background, 0, 0);
    context.drawImage(titan, titanX, 300, 300, 300);
    hitboxHeals();
    healSpawn();
    moveTitan();
    context.drawImage(friendlyShip, 30, friendlyShipY, 100, 100);
    window.addEventListener("keydown", onKeyDown);
    hitboxLasers();
    lasersSpawn();
    context.drawImage(enemyShip, canvas.width - 130, enemyShipY, 100, 100);
    context.drawImage(healthbar, 30, 10, life * 2, 30);
    health();
    lifetot();
    win();
    if (gameover == false) {
      requestAnimationFrame(draw);
    }
  }

  draw();
  firelife();
}
