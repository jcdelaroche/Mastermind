// Création de chaque élément div correspondant à un pion
function createPions(colors, currentGame) {
  // Récupérer l'élément parent où les pions seront ajoutés
  const parent = document.getElementById('pionsToGuess');

  // Créer un élément div pour chaque couleur et l'ajouter au parent
  for (let i = 0; i < colors.length; i++) {
    const pion = document.createElement('div');
    pion.className = 'pion pion-' + colors[i];
    (function (color) {
      pion.addEventListener(
        "click",
        function () {
          selectionnerPion(colors[color], currentGame);
        },
        false
      );
    })(i);
    parent.appendChild(pion);
  }
}


function selectionnerPion(pion, currentGame) {
  let tab_code = [].slice.call(document.getElementsByClassName("code"));
  let indexCode = 0;
  tab_code.forEach((e) => {
    colorsToCreate.forEach((colorsToCreate) => {
      if (e.classList.contains(`pion-${colorsToCreate}`)) {
        indexCode++;
      }
    });
  });
  if (indexCode < currentGame.codeLength) {
    tab_code[indexCode].classList.add(`pion-${pion}`);
  }
}