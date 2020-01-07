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

//Draw
function draw() {
  context.drawImage(background, 0, 0);
  context.drawImage(friendlyShip, 30, friendlyShipY, 100, 100);
  window.addEventListener("keydown", onKeyDown);
  context.drawImage(enemyShip, canvas.width - 130, enemyShipY, 100, 100);
  requestAnimationFrame(draw);
}

draw();
