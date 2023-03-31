let solo = document.getElementById("solo");
let multi = document.getElementById("multi");
let soloDiv = document.getElementById("game");
let room = document.getElementById("room");
let buttons = document.getElementById("buttons");
let returnButton = document.getElementById("returnButton");
let returnDiv = document.getElementById("returnDiv");
let title = document.getElementById("title");
let gameContainer = document.getElementById("gameContainer");
let settings = document.getElementById("settings");
let createGame = document.getElementById("createGame");

solo.addEventListener("click", () => {
  soloDiv.style.display = "block";
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
  soloDiv.style.display = "none";
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

var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = rangeSlider.value / rangeSlider.max;
  rangeBullet.style.left = bulletPosition * 578 + "px";
}
