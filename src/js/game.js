const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Load Images
const background = new Image();
const friendlyShip = new Image();
const enemyShip = new Image();
const heal = new Image();
const laser = new Image();

background.src = "../assets/background.png";
friendlyShip.src = "../assets/spaceship1.png";
enemyShip.src = "../assets/spaceship2.png";
heal.src = "../assets/heal.png";
laser.src = "../assets/laser.png";

//Variables

let friendlyShipY = 325;
let enemyShipY = 325;
let speed = 5;
let distance = 861;
let life = 25;

let heals = [];
heals[0] = {
  x: canvas.width,
  y: 225
};
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

//HealSpawn
function randomSpawn(max, min) {
  let n;
  while (n % 25 !== 0) {
    n = Math.floor(Math.random() * (max - min) + min);
  }
  return n;
}

function toto() {
  heals.push({
    x: canvas.width,
    //y: Math.floor(Math.random() * 700 + 25)
    y: randomSpawn(700, 25)
  });
}
function healSpawn() {
  for (let i = 0; i < heals.length; i++) {
    context.drawImage(heal, heals[i].x, heals[i].y, 50, 50);
    heals[i].x -= speed;
    if (heals[i].x === distance) {
      toto();
    }
  }
}

//Hitbox

function hitbox() {
  for (let i = 0; i < heals.length; i++) {
    if (
      heals[i].x <= friendlyShip.width + 30 &&
      ((heals[i].y >= friendlyShipY &&
        heals[i].y <= friendlyShipY + friendlyShip.height) ||
        (heals[i].y + heals[i].height <= friendlyShipY + friendlyShip.height &&
          heals[i].y + heals[i].height >= friendlyShipY))
    ) {
      console.log("TOUCHED");
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

//Draw
function draw() {
  context.drawImage(background, 0, 0);
  hitbox();
  healSpawn();
  context.drawImage(friendlyShip, 30, friendlyShipY, 100, 100);
  window.addEventListener("keydown", onKeyDown);
  context.drawImage(enemyShip, canvas.width - 130, enemyShipY, 100, 100);

  requestAnimationFrame(draw);
}

draw();
