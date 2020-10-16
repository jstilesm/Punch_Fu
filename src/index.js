import "./styles/index.scss";


// Base set up
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
    health: 0,
    moving: false,
    currentAction: null,
    animationFrames: [],
    punchOffset: 0
};

// Setting up images

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  };
  this.stop = function(){
    this.sound.pause();
  };
}


const samuraiSprite = new Image();
samuraiSprite.src = "src/images/Samurai.png";

const background = new Image();
background.src = "src/images/trees.png";

const arrow = new Image();
arrow.src = "src/images/arrow.png";

const healthSprite = new Image();
healthSprite.src = "src/images/health.png";

const gameoverImage = new Image();
gameoverImage.src = "src/images/gameover.png";

const muted = new Image();
muted.src = "src/images/muted.png";

const unmuted = new Image();
unmuted.src = "src/images/unmuted.png";



const soundTrack = new sound("../src/sound/game.mp3");
const hitSound = new sound("../src/sound/hit.mp3");
const arrowSound = new sound("../src/sound/miss.mp3");
const hurtSound = new sound("../src/sound/hurt.mp3");
const loseSound = new sound("../src/sound/lose.mp3");
const missSound = new sound("../src/sound/air.mp3");





// DrawSprite function that allows multiple parts of an image to render

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}


// Arrow constructing from both sides

let arrows = [];

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
    speed: 10,
  };
  if (direction === "left") {
  
    arrow.x = 0;
 
  } else {
    arrow.x = canvas.width - 50;
    
    arrow.speed = arrow.speed *  -1;
  }
  arrows.push(arrow);
}



let score = 0;


const health = {
    sprite: healthSprite,
    x: canvas.width /2 - 50,
    y: canvas.height / 2 + 150,
    width: 600,
    height: 110,
    frameX: 0,
    frameY: 0,
  };

  function currentHp() {
      drawSprite (
        health.sprite, 
        0, 
        samurai.health * 110,
        health.width, 
        health.height,
        health.x, 
        health.y,
        health.height, 
        0.05*health.width
    );

  }
  // 4   3   2   1
  // 109 220 330 440
// Shooting arrows 



function addArrows() {
  // 1000
  let shotspeed = 1000 + Math.floor(Math.random()* 1000);
  let shotspeed2 = shotspeed + 2000; 

    setInterval(() => {

      addArrow('left');
      } ,shotspeed);

    setInterval(() => {
      addArrow('right'); 
      } ,shotspeed2);
}
// addArrows();

// Main animate function that runs the game

// frame counter and after a certain ammount of frames
let marker = 0;
let healthAdd = 0;
let musicOn = true;
let soundEffects = true;
let game = "ongoing";


function animate() {
  if (musicOn) {
    soundTrack.play();
    ctx.drawImage(unmuted, 0, 0, canvas.width, canvas.height);
  }
  if (keys[80]) {
    soundTrack.stop();
    musicOn = false;
  } else if (keys[79]) {
    musicOn = true;
  }
  if (keys[73]) {
    soundEffects = false;
  }

  if (keys[85]) {
    soundEffects = true;
  }
  marker += 1;
  //500
  if (marker % 500 === 0) {
    addArrows();
  }
  // console.log(arrows[0].speed);
  // if (score >= marker) {
    
  //   arrow.speed += 5;
  //   marker += 5;
  // }
 
  
  

  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  ctx.strokeText(score, 10, 50);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (musicOn) {
    ctx.font = "Bold 30px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText("Music", canvas.width/8 - 120, canvas.height/8 - 80);
    ctx.drawImage(unmuted, 0, 50, canvas.width/10, canvas.height /8);
  } else {
    ctx.font = "Bold 30px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText("Music", canvas.width/8 - 120, canvas.height/8 - 80);
    ctx.drawImage(muted, 0, 50, canvas.width/10, canvas.height /8);
  }
  if (soundEffects) {
    ctx.font = "Bold 30px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText("Sound FX", 1475, 50);
    ctx.drawImage(unmuted, 1400, 50, canvas.width/10, canvas.height /8);
  } else {
    ctx.font = "Bold 30px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText("Sound FX", 1475, 50);
    ctx.drawImage(muted, 1400, 50, canvas.width/10, canvas.height /8);
  }
  ctx.font = "Bold 100px Roboto";
  ctx.strokeStyle = 'black';
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  // ctx.fillText("Score", canvas.width/2, canvas.height/2 - 500);
  ctx.strokeText(score, canvas.width/2, canvas.height/2 - 50);
  ctx.fillText(score, canvas.width/2, canvas.height/2 - 50);

  // Add event listener to canvas element 
 


  // ctx.fillText("HP", canvas.width/2 + 5, canvas.height/2 + 150);  
  currentHp();
  drawSprite (
      samuraiSprite, 
      samurai.width * samurai.frameX, 
      samurai.height * samurai.frameY, 
      samurai.width, 
      samurai.height,
      samurai.x + samurai.punchOffset, 
      samurai.y, 
      3*samurai.height, 
      2*samurai.width
    );
    for (let i = 0; i < arrows.length; i++) {
      const arrow = arrows[i];
      arrow.x += arrow.speed;
      drawSprite(
      arrow.sprite, 
      0, 
      0,
      arrow.width, 
      arrow.height,
      arrow.x, 
      arrow.y, 
      0.8* arrow.height, 
      0.1*arrow.width

      );
    }
    
  

  
  punch();
  
  for (let i = 0; i < arrows.length; i++) {
    // console.log(arrows[i].x);
    if (samurai.x + 70 === arrows[i].x || (samurai.x + 95 + samurai.width === arrows[i].x)) {
  
        arrows.shift();
        samurai.health += 1;
        healthAdd = 0;
        if (soundEffects) {
          hurtSound.play();
        }
      }
    else if (samurai.x + 10 === arrows[i].x || (samurai.x + 155 + samurai.width === arrows[i].x)) {
      
      if (samurai.currentAction === 39 || samurai.currentAction === 37) {

        arrows.shift();
        if (soundEffects) {
          hitSound.play();
        }
        score += 1;
        healthAdd += 1;
        if (healthAdd % 10 === 0 && samurai.heath < 5) {
          samurai.health -= 1;
        } 
      }
    } else {
      if (soundEffects) {
        arrowSound.play();
      }
    }
  }
  
  

  // console.log(score);
  if (samurai.health >= 5) {
    game = "done";

  }
  if (game === "ongoing") {
    requestAnimationFrame(animate);
  } else {
    // soundTrack.stop();
    // debugger
    
    loseSound.play();
  
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameoverImage, 0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "orange";
    // ctx.font = "bold";
    // ctx.fillText("Try Again?", canvas.width / 2, canvas.height / 2);

    
  }
  

}


window.addEventListener("keydown", function(e) {
  // debugger
  keys[e.keyCode] = true;
  console.log(keys);
});

window.addEventListener("keyup", function(e) {
  delete keys[e.keyCode];
});




// Sprite frames for the samurai

// key: frameX, frame Y
// baseright: 0, 0
// baseleft: 6, 1

// punchright1: 0, 1
// punchright2: 1.15, 1
// punchright3: 2.17, 1 

// punchleft1: 5, 1
// punchleft2: 4, 1
// punchleft3: 3.05, 1 



// punching animation function
const right1 = [0,1,0];
const right2 = [1.15, 1, 50];
const right3 = [2.17, 1, 50];

const left1 = [5,1,0];
const left2 = [3.98,1,0];
const left3 = [3.05,1,0];


function punch(){
  
  if (keys[39] && samurai.currentAction != 39) {
      samurai.currentAction = 39;
      samurai.animationFrames = [right1,right1,right1,right2,right2,right2,right3,right3,right3];
      if (soundEffects) {
        missSound.play();

      }
    
      
      
      
      
  }
  else if (keys[37] && samurai.currentAction != 37) {
      if (soundEffects) {
        missSound.play();

      }
    
      samurai.currentAction = 37;
      samurai.animationFrames = [left1, left1, left1, left2, left2, left2, left3,left3, left3];
  } else {
    const frame = samurai.animationFrames.pop(0);
    if (frame) {
      samurai.punchOffset = frame[2];
      // console.log(frame);
      samurai.frameX = frame[0];
      samurai.frameY = frame[1];
    } else {
      samurai.frameX = 0;
      samurai.frameY = 0;
      samurai.punchOffset = 0;
      samurai.currentAction = null;
      
    }
  }
  
}


// function crouch() {
//   if (keys[40])
// }

document.querySelector("#game").addEventListener("click", animate);


