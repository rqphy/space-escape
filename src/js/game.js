const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Load Images
const background = new Image();
const friendlyShip = new Image();
const enemyShip = new Image();
const heal = new Image();
const laser = new Image();
const healthbar = new Image();

background.src = "../assets/background.png";
friendlyShip.src = "../assets/spaceship1.png";
enemyShip.src = "../assets/spaceship2.png";
heal.src = "../assets/heal.png";
laser.src = "../assets/laser.png";
healthbar.src = "../assets/healthbar.png";

//Variables

let friendlyShipY = 325;
let enemyShipY = 325;
let life = 50;

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
let firespeed = 5;
let firerate = 836;

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
        (heals[i].y + heals[i].height <= friendlyShipY + friendlyShip.height &&
          heals[i].y + heals[i].height >= friendlyShipY))
    ) {
      console.log("HEALED");
      heals.shift(i, 1);
      if (life <= 97) {
        life += 3;
      }
    } else if (heals[i].x <= -45) {
      heals.shift(i, 1);
      console.log(heals.length);
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
      console.log("TOUCHED");
      lasers.shift(i, 1);
      life -= 33;
    } else if (lasers[i].x <= -45) {
      lasers.shift(i, 1);
      console.log(lasers.length);
    }
  }
}

//Healthbar

function health() {
  if (life <= 0) {
    alert("lose");
    life = 50;
  } else if (life > 100) {
    life = 100;
  }
}

//Draw
function draw() {
  context.drawImage(background, 0, 0);
  hitboxHeals();
  healSpawn();

  context.drawImage(friendlyShip, 30, friendlyShipY, 100, 100);
  window.addEventListener("keydown", onKeyDown);
  hitboxLasers();
  lasersSpawn();
  context.drawImage(enemyShip, canvas.width - 130, enemyShipY, 100, 100);
  context.drawImage(healthbar, 30, 10, life * 2, 30);
  health();
  requestAnimationFrame(draw);
}

draw();
