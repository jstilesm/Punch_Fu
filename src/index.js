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
    speed: 9,
    moving: false,
    currentAction: null,
    animationFrames: [],
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

const arrows = [];

function addArrow(direction) {
  const arrowSprite = new Image();
  if (direction === "right") {
    arrowSprite.src = "src/images/arrow2.png";
  } else {
    arrowSprite.src = "src/images/arrow.png";
  }
  

  const arrow = {
    sprite: arrowSprite,
    x: 0,
    y: canvas.height - 250,
    width: 286,
    height: 58,
    speed: 1,
  };
  if (direction === "left") {
  
    arrow.x = 0;
 
  } else {
    arrow.x = canvas.width - 50;
    
    arrow.speed = arrow.speed *  -1;
  }
  arrows.push(arrow);
}
addArrow('right');
addArrow('left');

 
// ctx.lineWidth = "3";
// ctx.strokeStyle = "red";
// ctx.rect(5, 5, 140 , 200);
// ctx.stroke();


function animate() {
  ctx.clearRect(0,0, canvas.width, canvas.height);

  
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
    for (let i = 0; i < arrows.length; i++) {
      const arrow = arrows[i];
      arrow.x += arrow.speed;
      console.log(arrow.x);
      drawSprite(
      arrow.sprite, 
      0, 
      0,
      arrow.width, 
      arrow.height,
      arrow.x, 
      arrow.y, 
      .8* arrow.height, 
      .1*arrow.width

      );
    }
    
  // console.log(keys);
  
  punch();
  requestAnimationFrame(animate);

}

window.addEventListener("keydown", function(e) {
  // debugger
  keys[e.keyCode] = true;
  // console.log(keys);
});

window.addEventListener("keyup", function(e) {
  delete keys[e.keyCode];
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

// array of x, y coordinates


function punch(){
  if (keys[39] && samurai.currentAction != 39) {
      samurai.currentAction = 39;
      samurai.animationFrames = [[0,1],[0,1],[0,1],[1.15, 1],[1.15, 1],[1.15, 1],[2.17, 1],[2.17, 1],[2.17, 1]];
      
      // if (samurai.frameX === 0 && samurai.frameY === 1) {
      //   samurai.frameX = 1.15;
      //   samurai.frameY = 1;
      // } else {
      // samurai.frameX = 0;
      // samurai.frameY = 1;
      // }
      
      
      
  }
  else if (keys[37] && samurai.currentAction != 37) {
      samurai.currentAction = 37;
      samurai.animationFrames = [[5,1],[5,1],[5,1],[4,1],[4,1],[4, 1],[3.05, 1],[3.05, 1],[3.05, 1]];
  } else {
    const frame = samurai.animationFrames.pop(0);
    if (frame) {
      // console.log(frame);
      samurai.frameX = frame[0];
      samurai.frameY = frame[1];
    } else {
      samurai.frameX = 0;
      samurai.frameY = 0;
      samurai.currentAction = null;
    }
  }
}


// function crouch() {
//   if (keys[40])
// }

document.querySelector("#game").addEventListener("click", animate);

