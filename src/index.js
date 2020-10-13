import "./styles/index.scss";


const canvas = document.getElementById('samurai');
const ctx = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 1000;

const keys = [];

const samurai = {
    x: 650,
    y: 720,
    width: 75,
    height: 80,
    frameX: 0,
    frameY: 0,
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
  // position++;
  drawSprite(
      samuraiSprite, 
      samurai.width * samurai.frameX, 
      samurai.height * samurai.frameY, 
      samurai.width, 
      samurai.height,
      samurai.x, 
      samurai.y, 
      3*samurai.height, 
      2*samurai.width
    );
    
  punchRight();
  punchLeft();
  requestAnimationFrame(animate);

}

window.addEventListener("keydown", function(e) {
  keys[e.key] = true;
  console.log(keys);
});

window.addEventListener("keyup", function(e) {
  delete keys[e.key];
});


// key: frameX, frame Y
// baseright: 0, 0
// baseleft: 6, 1

// punchright1: 0, 1
// punchright2: 1.15, 1
// punchright3: 2.17, 1 

// punchleft1: 5, 1
// punchleft2: 4, 1
// punchleft3: 3.05, 1 


function punchRight(){
  if (keys[38]) {
      samurai.frameX = 1.15;
      samurai.frameY = 1;
  }
}
function punchLeft(){
  if (keys[38]) {
      samurai.frameX = 4;
      samurai.frameY = 1;
  }
}

document.querySelector("#game").addEventListener("click", animate);

