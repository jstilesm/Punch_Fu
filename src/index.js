import "./styles/index.scss";


const canvas = document.getElementById('samurai');
const ctx = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 1000;

const keys = [];

const samurai = {
    x: 0,
    y: 0,
    width: 80,
    height: 80,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const samuraiSprite = new Image();
samuraiSprite.src = "src/images/Samurai.png";


const background = new Image();
background.src = "src/images/trees.png";

const arrow = new Image();
arrow.src = "src/images/arrow.png";



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
let position = 0;

function animate() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  // ctx.drawImage(arrow, position, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  position++;
  drawSprite(samuraiSprite, 0, 0, samurai.width, samurai.height,650, 710, 3*samurai.height, 2*samurai.width);
  requestAnimationFrame(animate);

}

window.addEventListener("keydown", function(e) {

});

window.addEventListener("keyup", function(e) {
  
});

document.querySelector("#game").addEventListener("click", animate);

