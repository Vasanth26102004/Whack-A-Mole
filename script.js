const board = document.getElementById("board");
let score = document.getElementById("score");
let scoreValue = 0;
let currMoleTile;
let currPlantTile;
let GameOver = false;

let moleTime = 1500;
let plantTime = 2100;
let running = false;
let moleInterval;
let plantInterval;

window.onload = function () {
  setGame();
  score.textContent = "SCORE: " + scoreValue.toString();
};

function Start() {
  if (!running) {
    running = true;
    moleInterval = setInterval(setMole, moleTime); // Start mole interval
    plantInterval = setInterval(setPlant, plantTime); // Start plant interval

    if (currMoleTile && currMoleTile.querySelector("#mole")) {
      currMoleTile.querySelector("#mole").style.animationPlayState = "running";
    }
    if (currPlantTile && currPlantTile.querySelector("#plant")) {
      currPlantTile.querySelector("#plant").style.animationPlayState =
        "running";
    }

    console.log("Game started");
  }
}

function Pause() {
  running = false;
  clearInterval(moleInterval);
  clearInterval(plantInterval);

  if (currMoleTile && currMoleTile.querySelector("#mole")) {
    currMoleTile.querySelector("#mole").style.animationPlayState = "paused";
  }
  if (currPlantTile && currPlantTile.querySelector("#plant")) {
    currPlantTile.querySelector("#plant").style.animationPlayState = "paused";
  }

  console.log("Game paused");
}

function setGame() {
  board.innerHTML = ""; // Clear the board before creating tiles
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    board.appendChild(tile);
  }
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (GameOver || !running) return;

  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.id = "mole";
  mole.src = "./monty-mole.png";

  let num = getRandomTile();
  while (currPlantTile && currPlantTile.id == num) {
    num = getRandomTile();
  }

  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);

  mole.style.animation = `popup 1.5s ease-in-out`;
  mole.style.animationPlayState = "running";

  mole.addEventListener("click", () => {
    if (!GameOver && running) {
    }
  });
}

function setPlant() {
  if (GameOver || !running) return;

  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }

  let plant = document.createElement("img");
  plant.id = "plant";
  plant.src = "./piranha-plant.png";

  let num = getRandomTile();
  while (currMoleTile && currMoleTile.id == num) {
    num = getRandomTile();
  }

  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);

  plant.style.animation = `popup ${(plantTime / 1000).toFixed(1)}s ease-in-out`;
  plant.style.animationPlayState = "running";
}

function selectTile() {
  if (GameOver || !running) return;

  if (this == currMoleTile) {
    mole.style.animation = "popin 1s ease-out";
    scoreValue += 10;
    score.textContent = "SCORE: " + scoreValue.toString();
  } else if (this == currPlantTile) {
    score.textContent = "GAME OVER: " + scoreValue.toString();
    GameOver = true;
    running = false;
    clearInterval(moleInterval);
    clearInterval(plantInterval);

    if (document.getElementById("mole")) {
      document.getElementById("mole").style.animation = "none";
    }
    if (document.getElementById("plant")) {
      document.getElementById("plant").style.animation = "none";
    }
  }
}
