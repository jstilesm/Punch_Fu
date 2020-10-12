import "./styles/index.scss";
import canvas from "./scripts/canvas";
import leftArrow from "./scripts/leftarrow";
import rightArrow from "./scripts/rightarrow";
import figure from "./scripts/figure";
import leftbox from "./scripts/leftarrow";
import rightbox from "./scripts/rightarrow";

const currentStateObj = {
  current: null,
  currentEventListeners: [],
};

document.querySelector("#game").addEventListener("click", startGame);



function startGame() {
  clearGame();
  const cvs = new canvas();
  cvs.createCanvas();
  currentStateObj.current = "GAME";
}


function clearGame() {
  if(currentStateObj.current === "GAME")
    document.body.removeChild(document.querySelector("game"));
}

