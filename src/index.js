import "./styles/index.scss";

// Base set up
const canvas = document.getElementById('samurai');
const ctx = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 1000;

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



const keys = [];



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

const samuraiSwordSprite = new Image();
samuraiSwordSprite.src = "src/images/Samurai_sword.png";

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

const goldArrowRight = new Image();
goldArrowRight.src = "src/images/gold_arrow_right.png";
const goldArrowLeft = new Image();
goldArrowLeft.src = "src/images/gold_arrow_left.png";



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
  let rand = (Math.floor(Math.random() * Math.floor(10)) + 1);
  const arrowSprite = new Image();
  if (direction === "right") {
    if (rand == 1) {
      // arrowSprite.src = "src/images/gold_arrow_left.png";
      arrowSprite.src = "src/images/arrow2.png";
    } else {
      arrowSprite.src = "src/images/arrow2.png";
    }
  } else {
    if (rand == 1) {
      // arrowSprite.src = "src/images/gold_arrow_right.png";
      arrowSprite.src = "src/images/arrow.png";
    } else {
      arrowSprite.src = "src/images/arrow.png";
    }
  }

  const arrow = {
    sprite: arrowSprite,
    x: 0,
    y: canvas.height - 250,
    width: 286,
    height: 58,
    speed: 10,
    status: "regular"
  };
  if (direction === "left") {
  
    arrow.x = 0;
 
  } else {
    arrow.x = canvas.width - 50;
    
    arrow.speed = arrow.speed *  -1;
  }
  arrows.push(arrow);
}
function specialArrow(direction) {
  let rand = (Math.floor(Math.random() * Math.floor(10)) + 1);
  const arrowSprite = new Image();
  if (direction === "right") {
    if (rand == 1) {
      // arrowSprite.src = "src/images/gold_arrow_left.png";
      arrowSprite.src = "src/images/gold_arrow_left.png";
    } else {
      arrowSprite.src = "src/images/gold_arrow_left.png";
    }
  } else {
    if (rand == 1) {
      // arrowSprite.src = "src/images/gold_arrow_right.png";
      arrowSprite.src = "src/images/gold_arrow_right.png";
    } else {
      arrowSprite.src = "src/images/gold_arrow_right.png";
    }
  }

  const arrow = {
    sprite: arrowSprite,
    x: 0,
    y: canvas.height - 250,
    width: 286,
    height: 58,
    speed: 10,
    status: "gold"
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

let golden = 0;

function addArrowsRight() {
  // 1000
  let shotspeed = 3000 + Math.floor(Math.random()* 5000);
  // let shotspeed2 = shotspeed + 2000; 

    setInterval(() => {
      addArrow('right'); 
      } ,shotspeed);
}
function addArrowsLeft() {
  // 1000
  let shotspeed = 3000 + Math.floor(Math.random()* 5000);
    
    setInterval(() => {
      addArrow('left'); 
      } ,shotspeed);
}

// add special arrow to the game
function addspecialArrow() {
  let specialspeed = 20000 + Math.floor(Math.random()* 5000);
  let random = Math.floor(Math.random() * 1);
  if (random === 1) {
    setInterval(() => {
    specialArrow("left");
     }, specialspeed);
  } else {
    setInterval(() => {
    specialArrow("right");
     }, specialspeed);
  }
  
}


// Main animate function that runs the game

// frame counter and after a certain ammount of frames
let marker = 0;
let healthAdd = 0;
let musicOn = false;
let soundEffects = false;
let game = "ongoing";
let left = false;
let upgrade = false;
let upgradeTimer = 500;

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
  if (upgrade === true) {
    upgradeTimer -= 1;
    if (upgradeTimer === 0) {
      upgrade = false;
      upgradeTimer = 500;
    }
  }
  
  if (marker === 20) {
    let number = (Math.floor(Math.random() * Math.floor(2)) + 1);
    // console.log(number);
    if (number == 2) {
      addArrowsRight();
    } else {
      addArrowsLeft();
    }
  }
  if (marker % 500 === 0) {
    let number = (Math.floor(Math.random() * Math.floor(2)) + 1);
    //console.log(number);
    if (number == 2) {
      addArrowsRight();
    } else {
      addArrowsLeft();
    }
  }
  
  if (marker === 1) {
    addspecialArrow();
  }

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
  if (upgradeTimer != 500) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = "orange";
    ctx.strokeText("UPGRADE", canvas.width/2, canvas.height/2 - 300);
    ctx.fillText("UPGRADE", canvas.width/2, canvas.height/2 - 300);

    ctx.strokeText(Math.floor(upgradeTimer / 100), canvas.width/2, canvas.height/2 - 200);
    ctx.fillText(Math.floor(upgradeTimer / 100), canvas.width/2, canvas.height/2 - 200);
  }
  
  ctx.fillStyle = "white";
  ctx.strokeText(score, canvas.width/2, canvas.height/2 - 50);
  ctx.fillText(score, canvas.width/2, canvas.height/2 - 50);

  // Add event listener to canvas element 
 


  // ctx.fillText("HP", canvas.width/2 + 5, canvas.height/2 + 150);  
  currentHp();
  if (upgrade === true) {
      drawSprite(
      samuraiSwordSprite, 
      samurai.width * samurai.frameX - 5, 
      samurai.height * samurai.frameY + 25, 
      samurai.width, 
      samurai.height,
      samurai.x + samurai.punchOffset, 
      samurai.y, 
      3*samurai.height, 
      2*samurai.width
      );
  } else {
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
  }
  
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
    
  

  if (upgrade === true) {
    saber();
  } else {
    punch();
  }
  
  
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

        let arrow = arrows.shift();
        if (arrow.status === "gold") {
          upgrade = true;
        }
        if (soundEffects) {
          hitSound.play();
        }
        score += 1;
        healthAdd += 1;
        // console.log(healthAdd)
        // console.log(samurai.health)
        // console.log(samurai.health)
        if (healthAdd % 5 === 0 && samurai.health > 0) {
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
    soundTrack.stop();
    // debugger
    
    loseSound.play();
  
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameoverImage, 0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'black';
    ctx.fillStyle = "black";
    
    ctx.textAlign = "center";
    ctx.font = "Press Start 2P";
  // ctx.fillText("Score", canvas.width/2, canvas.height/2 - 500);
    ctx.strokeText("Press Reset to Try Again", canvas.width/2, canvas.height - 50);
    ctx.fillText("Press Reset to Try Again", canvas.width/2, canvas.height - 50);
    
    // ctx.fillStyle = "orange";
    // ctx.font = "bold";
    // ctx.fillText("Try Again?", canvas.width / 2, canvas.height / 2);

    
  }
  

}


window.addEventListener("keydown", function(e) {
  // debugger
  keys[e.keyCode] = true;
  //console.log(keys);
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
let right1 = [0,1,0];
let right2 = [1.15, 1, 50];
let right3 = [2.17, 1, 50];

let left1 = [5,1,0];
let left2 = [3.98,1,0];
let left3 = [3.05,1,0];





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
if (upgrade === true) {
  samurai.width = 85;
} else {
  samurai.width = 75;
}
// 
 let saberright1 = [0, 1.4,0];
 let saberright2 = [2, 1.4, 50];
 let saberright3 = [2.17, 1.4, 50];


 let saberleft1 = [5,1.4,0];
 let saberleft2 = [3.98,1.4,0];
 let saberleft3 = [3.05,1.4,0];


function saber(){
  
  if (keys[39] && samurai.currentAction != 39) {
      samurai.currentAction = 39;
      samurai.animationFrames = [saberright1,saberright1,saberright1,saberright2,saberright2,saberright2,saberright3,saberright3,saberright3];
      if (soundEffects) {
        missSound.play();

      }
    
      
  }
  else if (keys[37] && samurai.currentAction != 37) {
      if (soundEffects) {
        missSound.play();

      }
    
      samurai.currentAction = 37;
      samurai.animationFrames = [saberleft1, saberleft1, saberleft1, saberleft2, saberleft2, saberleft2, saberleft3,saberleft3, saberleft3];
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


