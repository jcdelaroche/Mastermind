function createCurrentGuess(nbCodes, currentGame) {
    // Récupérer l'élément parent où les codes seront ajoutés
    const parent = document.getElementById('guesser');
  
    // Créer un élément div pour chaque code et l'ajouter au parent
    for (let i = 1; i <= nbCodes; i++) {
      const code = document.createElement('div');
      code.className = 'pion code';
      code.id = 'code' + i;
      parent.appendChild(code);
    }
  
    // Créer les boutons Effacer et Vérifier et les ajouter au parent
    const btnEffacer = document.createElement('button');
    btnEffacer.type = 'button';
    btnEffacer.className = 'btn btn-danger';
    btnEffacer.style.marginRight = '10px';
    btnEffacer.textContent = 'Effacer';
    btnEffacer.addEventListener(
      "click",
      function () {
        effacer(currentGame);
      },
      false
    );

    const btnVerifier = document.createElement('button');
    btnVerifier.type = 'button';
    btnVerifier.className = 'btn btn-success';
    btnVerifier.textContent = 'Vérifier';
    btnVerifier.addEventListener(
      "click",
      function () {
        verifier(currentGame);
      },
      false
    );

    parent.appendChild(btnEffacer);
    parent.appendChild(btnVerifier);
}

function effacer(currentGame) {
  console.log(currentGame);
  for (let i = 0; i < currentGame.codeLength; i++) {
    let code = document.getElementById(`code${i + 1}`);
    code.classList.remove(`pion-${getColor(code)}`);
  }
}

function verifier(currentGame){
  currentGame.guess();
}