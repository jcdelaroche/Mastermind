let solo = document.getElementById("solo");
let multi = document.getElementById("multi");
let game = document.getElementById("game");
let room = document.getElementById("room");
let buttons = document.getElementById("buttons");
let returnButton = document.getElementById("returnButton");
let returnDiv = document.getElementById("returnDiv");
let title = document.getElementById("title");
let gameContainer = document.getElementById("gameContainer");
let settings = document.getElementById("settings");
let createGame = document.getElementById("createGame");
let startGame = document.getElementById("startGame");

solo.addEventListener("click", () => {
  settings.style.display = "block";
  returnDiv.style.display = "block";
  buttons.style.display = "none";
  title.style.display = "none";
  gameContainer.style.display = "block";
});
multi.addEventListener("click", () => {
  room.style.display = "block";
  returnDiv.style.display = "block";
  buttons.style.display = "none";
  title.style.display = "none";
  gameContainer.style.display = "block";
});
returnButton.addEventListener("click", () => {
  game.style.display = "none";
  room.style.display = "none";
  returnDiv.style.display = "none";
  buttons.style.display = "flex";
  title.style.display = "block";
  gameContainer.style.display = "none";
  settings.style.display = "none";
});
createGame.addEventListener("click", () => {
  room.style.display = "none";
  settings.style.display = "block";
});
startGame.addEventListener("click", () => {
  settings.style.display = "none";
  game.style.display = "block";
  const currentGame = new Game("solo");
  currentGame.createBoard(currentGame);
});