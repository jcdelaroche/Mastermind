// Création de chaque élément div correspondant à un pion
for (i = 0; i < colorsToCreate.length; i++) {
  if (i < 6) {
    let pion = document.createElement("div");
    pion.classList.add("pion", "pion-" + colorsToCreate[i]);
    (function (color) {
      console.log(color);
      pion.addEventListener(
        "click",
        function () {
          selectionnerPion(colorsToCreate[color]);
        },
        false
      );
    })(i);
    document.getElementById("pionsToGuess").appendChild(pion);
  }
}