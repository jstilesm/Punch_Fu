import "./styles/index.scss";

// Base set up
const canvas = document.getElementById("samurai");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 1000;

const newFrame = (width, height, frameX, frameY, punchOffset, widthOffset) => {
  return {
    width: width,
    height: height,
    frameX: frameX,
    frameY: frameY,
    punchOffset: punchOffset,
    widthOffset: widthOffset,
  };
};

const spriteFrames = {
  default: newFrame(75, 80, 0, 0, 0, 0),
  upgrade: newFrame(75, 80, 0.5, 0.2, 20, 0),
  saberRight: [
    newFrame(75, 80, 0.4, 1.5, 1, 0),
    newFrame(90, 80, 0.4, 2.5, 50, 15),
    newFrame(90, 80, 0.4, 3.5, 50, 6),
  ],
  saberLeft: [
    newFrame(75, 80, 0.5, 6.65, 15, 0),
    newFrame(75, 80, 0.3, 5.63, 40, 60),
    newFrame(75, 80, 0.3, 4.62, 65, 60),
  ],
  punchRight: [
    newFrame(75, 80, 0, 1, 0, 0),
    newFrame(75, 80, 1.15, 1, 50, 0),
    newFrame(75, 80, 2.17, 1, 50, 0),
  ],
  punchLeft: [
    newFrame(75, 80, 5.03, 1, 25, -4),
    newFrame(75, 80, 4.0, 1.02, 0, 5),
    newFrame(75, 80, 3.04, 1, 25, 0),
  ],
};

const samurai = {
  x: 650,
  y: 640,
  width: spriteFrames.default.width,
  height: spriteFrames.default.height,
  frameX: spriteFrames.default.frameX,
  frameY: spriteFrames.default.frameY,
  speed: 9,
  health: 0,
  moving: false,
  currentAction: null,
  animationFrames: [],
  punchOffset: spriteFrames.default.punchOffset,
  widthOffset: spriteFrames.default.widthOffset,
};

window.updatesamurai = (
  width,
  height,
  frameX,
  frameY,
  punchOffset,
  widthOffset
) => {
  samurai.width = width;
  samurai.height = height;
  samurai.frameX = frameX;
  samurai.frameY = frameY;
  samurai.punchOffset = punchOffset;
  samurai.widthOffset = widthOffset;
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
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
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
const upgradeSound = new sound("../src/sound/upgrade.mp3");
const swordmissSound = new sound("../src/sound/sword_miss.mp3");
const swordhitSound = new sound("../src/sound/sword_hit.mp3");
const unupgradeSound = new sound("../src/sound/unupgrade.mp3");

// DrawSprite function that allows multiple parts of an image to render

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// Arrow constructing from both sides

let arrows = [];

function addArrow(direction) {
  let rand = Math.floor(Math.random() * Math.floor(10)) + 1;
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
  let heightValue = Math.floor(Math.random() * 3);
  let arrowHeight;
  if (heightValue === 0) {
    arrowHeight = 275;
  } else if (heightValue === 1) {
    arrowHeight = 250;
  } else if (heightValue === 2) {
    arrowHeight = 300;
  }
  const arrow = {
    sprite: arrowSprite,
    x: 0,
    y: canvas.height - arrowHeight,
    width: 286,
    height: 58,
    speed: 10,
    status: "regular",
  };
  if (direction === "left") {
    arrow.x = 0;
  } else {
    arrow.x = canvas.width - 50;

    arrow.speed = arrow.speed * -1;
  }
  arrows.push(arrow);
  if (arrows[0].x < canvas.width || arrows[0].x > 0) {
    first = true;
  }
}
function specialArrow(direction) {
  let rand = Math.floor(Math.random() * Math.floor(10)) + 1;
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
    status: "gold",
  };
  if (direction === "left") {
    arrow.x = 0;
  } else {
    arrow.x = canvas.width - 50;

    arrow.speed = arrow.speed * -1;
  }
  arrows.push(arrow);
}

let score = 0;

const health = {
  sprite: healthSprite,
  x: canvas.width / 2 - 60,
  y: canvas.height / 2 + 50,
  width: 600,
  height: 110,
  frameX: 0,
  frameY: 0,
};

function currentHp() {
  drawSprite(
    health.sprite,
    0,
    samurai.health * 110,
    health.width,
    health.height,
    health.x,
    health.y,
    health.height,
    0.05 * health.width
  );
}
// 4   3   2   1
// 109 220 330 440
// Shooting arrows

function addArrowsRight() {
  // 1000
  let shotspeed = 3000 + Math.floor(Math.random() * 5000);
  // let shotspeed2 = shotspeed + 2000;

  setInterval(() => {
    addArrow("right");
  }, shotspeed);
}
function addArrowsLeft() {
  // 1000
  let shotspeed = 3000 + Math.floor(Math.random() * 5000);

  setInterval(() => {
    addArrow("left");
  }, shotspeed);
}

// add special arrow to the game
function addspecialArrow() {
  let specialspeed = 20000 + Math.floor(Math.random() * 5000);
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
// let musicOn = false;
let musicOnstring = localStorage.getItem("music");
let musicOn = musicOnstring == "true";
// console.log(musicOn);
// let soundEffects = false;
let soundEffectstring = localStorage.getItem("soundEffects");
let soundEffects = soundEffectstring == "true";
// console.log(soundEffects);
let game = "ongoing";

let upgrade = false;
let upgradeTimer = 500;
let first = false;

function animate() {
  if (musicOn == true) {
    soundTrack.play();
    ctx.drawImage(unmuted, 0, 0, canvas.width, canvas.height);
  }
  if (keys[80]) {
    soundTrack.stop();
    musicOn = false;
    localStorage.setItem("music", musicOn + "");
    // console.log(localStorage);
  } else if (keys[79]) {
    musicOn = true;
    localStorage.setItem("music", musicOn + "");
  }
  if (keys[73]) {
    soundEffects = false;
    localStorage.setItem("soundEffects", soundEffects + "");
  }

  if (keys[85]) {
    soundEffects = true;
    localStorage.setItem("soundEffects", soundEffects + "");
  }
  marker += 1;
  if (upgrade === true) {
    upgradeTimer -= 1;
    if (upgradeTimer === 0) {
      upgrade = false;
      if (soundEffects) {
        unupgradeSound.play();
      }
      upgradeTimer = 500;
    }
  }

  if (marker === 20) {
    let number = Math.floor(Math.random() * Math.floor(2)) + 1;
    if (number == 2) {
      addArrowsRight();
    } else {
      addArrowsLeft();
    }
  }
  if (marker % 500 === 0) {
    let number = Math.floor(Math.random() * Math.floor(2)) + 1;
    if (number == 2) {
      addArrowsRight();
    } else {
      addArrowsLeft();
    }
  }

  if (marker === 1) {
    addspecialArrow();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeText(score, 10, 50);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (musicOn == true) {
    ctx.font = "Bold 30px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("Music", canvas.width / 8 - 120, canvas.height / 8 - 80);
    ctx.drawImage(unmuted, 0, 50, canvas.width / 10, canvas.height / 8);
  } else {
    ctx.font = "Bold 30px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("Music", canvas.width / 8 - 120, canvas.height / 8 - 80);
    ctx.drawImage(muted, 0, 50, canvas.width / 10, canvas.height / 8);
  }
  if (soundEffects == true) {
    ctx.font = "Bold 30px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("Sound FX", 1475, 50);
    ctx.drawImage(unmuted, 1400, 50, canvas.width / 10, canvas.height / 8);
  } else {
    ctx.font = "Bold 30px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("Sound FX", 1475, 50);
    ctx.drawImage(muted, 1400, 50, canvas.width / 10, canvas.height / 8);
  }
  ctx.font = "Bold 50px Verdana";
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  // ctx.fillText("Score", canvas.width/2, canvas.height/2 - 500);
  if (upgradeTimer != 500) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "orange";
    ctx.strokeText("POWER UP", canvas.width / 2, canvas.height / 2);
    ctx.fillText("POWER UP", canvas.width / 2, canvas.height / 2);

    ctx.strokeText(
      Math.floor(upgradeTimer / 100),
      canvas.width / 2,
      canvas.height / 2 + 50
    );
    ctx.fillText(
      Math.floor(upgradeTimer / 100),
      canvas.width / 2,
      canvas.height / 2 + 50
    );
  }

  ctx.fillStyle = "white";

  ctx.strokeText("Score", canvas.width / 2, 120);
  ctx.fillText("Score", canvas.width / 2, 120);
  ctx.strokeText(score, canvas.width / 2, 180);
  ctx.fillText(score, canvas.width / 2, 180);

  if (marker < 500) {
    if (first === true) {
      ctx.strokeText("GO", canvas.width / 2, canvas.height / 2 - 100);
      ctx.fillText("GO", canvas.width / 2, canvas.height / 2 - 100);
      setTimeout(() => {
        first = -1;
      }, 1000);
    } else if (first === false) {
      ctx.strokeText("READY?", canvas.width / 2, canvas.height / 2 - 100);
      ctx.fillText("READY?", canvas.width / 2, canvas.height / 2 - 100);
    }
  }

  // Add event listener to canvas element

  // ctx.fillText("HP", canvas.width/2 + 5, canvas.height/2 + 150);
  currentHp();
  let form;
  if (upgrade === true) {
    form = samuraiSwordSprite;
  } else {
    form = samuraiSprite;
  }
  drawSprite(
    form,
    samurai.width * samurai.frameX,
    samurai.height * samurai.frameY,
    samurai.width + samurai.widthOffset,
    samurai.height,
    samurai.x + samurai.punchOffset - samurai.widthOffset,
    samurai.y,
    3 * (samurai.width + samurai.widthOffset),
    3 * samurai.height
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
      0.8 * arrow.height,
      0.1 * arrow.width
    );
  }

  if (upgrade === true) {
    saber();
  } else {
    punch();
  }

  for (let i = 0; i < arrows.length; i++) {
    // console.log(arrows[i].x);
    if (
      samurai.x + 70 === arrows[i].x ||
      samurai.x + 95 + samurai.width === arrows[i].x
    ) {
      arrows.shift();
      samurai.health += 1;

      healthAdd = 0;
      if (soundEffects) {
        hurtSound.play();
      }
    } else if (
      upgrade === true &&
      samurai.x - 50 <= arrows[i].x &&
      arrows[i].x <= samurai.x
    ) {
      if (samurai.currentAction === 39 || samurai.currentAction === 37) {
        let arrow = arrows.shift();
        if (arrow.status === "gold") {
          upgradeTimer += 500;
          upgrade = true;

          if (soundEffects) {
            upgradeSound.play();
          }
        }
        if (soundEffects) {
          if (upgrade === true) {
            swordhitSound.play();
          } else {
            hitSound.play();
          }
        }
        score += 1;
        healthAdd += 1;
        if (healthAdd % 5 === 0 && samurai.health > 0) {
          samurai.health -= 1;
        }
      }
    } else if (
      upgrade === true &&
      samurai.x + 255 + samurai.width >= arrows[i].x &&
      arrows[i].x >= samurai.x + samurai.width
    ) {
      if (samurai.currentAction === 39 || samurai.currentAction === 37) {
        let arrow = arrows.shift();
        if (arrow.status === "gold") {
          upgradeTimer += 500;
          upgrade = true;

          if (soundEffects) {
            upgradeSound.play();
          }
        }
        if (soundEffects) {
          if (upgrade === true) {
            swordhitSound.play();
          } else {
            hitSound.play();
          }
        }
        score += 1;
        healthAdd += 1;
        if (healthAdd % 5 === 0 && samurai.health > 0) {
          samurai.health -= 1;
        }
      }
    } else if (samurai.x + 10 <= arrows[i].x && arrows[i].x <= samurai.x) {
      if (samurai.currentAction === 39 || samurai.currentAction === 37) {
        let arrow = arrows.shift();
        if (arrow.status === "gold") {
          upgrade = true;
          if (soundEffects) {
            upgradeSound.play();
          }
        }
        if (soundEffects) {
          if (upgrade === true) {
            swordhitSound.play();
          } else {
            hitSound.play();
          }
        }
        score += 1;
        healthAdd += 1;

        if (healthAdd % 5 === 0 && samurai.health > 0) {
          samurai.health -= 1;
        }
      }
    } else if (
      samurai.x + 155 + samurai.width >= arrows[i].x &&
      arrows[i].x >= samurai.x + samurai.width
    ) {
      if (samurai.currentAction === 39 || samurai.currentAction === 37) {
        let arrow = arrows.shift();
        if (arrow.status === "gold") {
          upgrade = true;
          if (soundEffects) {
            upgradeSound.play();
          }
        }
        if (soundEffects) {
          if (upgrade === true) {
            swordhitSound.play();
          } else {
            hitSound.play();
          }
        }
        score += 1;
        healthAdd += 1;

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
    if (soundEffects) {
      loseSound.play();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameoverImage, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";

    ctx.textAlign = "center";
    ctx.font = "Press Start 2P";
    // ctx.fillText("Score", canvas.width/2, canvas.height/2 - 500);
    ctx.strokeText(
      "Press Reset to Try Again",
      canvas.width / 2,
      canvas.height - 50
    );
    ctx.fillText(
      "Press Reset to Try Again",
      canvas.width / 2,
      canvas.height - 50
    );

    // ctx.fillStyle = "orange";
    // ctx.font = "bold";
    // ctx.fillText("Try Again?", canvas.width / 2, canvas.height / 2);
  }
}

window.addEventListener("keydown", function (e) {
  // debugger
  keys[e.keyCode] = true;
  //console.log(keys);
});

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
});

function punch() {
  if (keys[39] && samurai.currentAction != 39) {
    samurai.currentAction = 39;
    setAnimationFrames(spriteFrames.punchRight);
    if (soundEffects) {
      missSound.play();
    }
  } else if (keys[37] && samurai.currentAction != 37) {
    if (soundEffects) {
      missSound.play();
    }

    samurai.currentAction = 37;
    setAnimationFrames(spriteFrames.punchLeft);
  } else {
    const frame = samurai.animationFrames.pop(0);
    if (frame) {
      samurai.punchOffset = frame.punchOffset;
      samurai.width = frame.width;
      samurai.height = frame.height;
      samurai.frameX = frame.frameX;
      samurai.frameY = frame.frameY;
      samurai.punchOffset = frame.punchOffset;
      samurai.widthOffset = frame.widthOffset;
    } else {
      samurai.punchOffset = spriteFrames.default.punchOffset;
      samurai.width = spriteFrames.default.width;
      samurai.height = spriteFrames.default.height;
      samurai.frameX = spriteFrames.default.frameX;
      samurai.frameY = spriteFrames.default.frameY;
      samurai.punchOffset = spriteFrames.default.punchOffset;
      samurai.widthOffset = spriteFrames.default.widthOffset;
      samurai.currentAction = null;
    }
  }
}

function setAnimationFrames(frames) {
  samurai.animationFrames = [];
  for (let i = 0; i < frames.length; i++) {
    samurai.animationFrames.push(frames[i]);
    samurai.animationFrames.push(frames[i]);
    samurai.animationFrames.push(frames[i]);
  }
}

function saber() {
  if (keys[39] && samurai.currentAction != 39) {
    samurai.currentAction = 39;
    setAnimationFrames(spriteFrames.saberRight);
    if (soundEffects) {
      swordmissSound.play();
    }
  } else if (keys[37] && samurai.currentAction != 37) {
    if (soundEffects) {
      swordmissSound.play();
    }

    samurai.currentAction = 37;
    setAnimationFrames(spriteFrames.saberLeft);
  } else {
    const frame = samurai.animationFrames.pop(0);
    if (frame) {
      samurai.punchOffset = frame.punchOffset;
      samurai.width = frame.width;
      samurai.height = frame.height;
      samurai.frameX = frame.frameX;
      samurai.frameY = frame.frameY;
      samurai.punchOffset = frame.punchOffset;
      samurai.widthOffset = frame.widthOffset;
    } else {
      samurai.punchOffset = spriteFrames.upgrade.punchOffset;
      samurai.width = spriteFrames.upgrade.width;
      samurai.height = spriteFrames.upgrade.height;
      samurai.frameX = spriteFrames.upgrade.frameX;
      samurai.frameY = spriteFrames.upgrade.frameY;
      samurai.punchOffset = spriteFrames.upgrade.punchOffset;
      samurai.widthOffset = spriteFrames.upgrade.widthOffset;
      samurai.currentAction = null;
    }
  }
}

// function crouch() {
//   if (keys[40])
// }

document.querySelector("#game").addEventListener("click", animate);
