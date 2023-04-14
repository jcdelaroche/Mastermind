class Game {
  constructor(type) {
    this.type = type;
    this.colors = this.whichColors();
    this.codeLength = document.querySelector('input[name="radios"]:checked').value;
    if (this.type === "solo") {
      this.code = this.generateCode();
    } else {
      this.code = [];
    }
    this.maxGuesses = document.querySelector('.range [type="range"]').value;
    this.currentGuess = 0;
  }

  whichColors() {
    // Sélection de tous les éléments <input> créés du formulaire de choix des couleurs
    const checkboxes = document.querySelectorAll(
      "input[type='checkbox'][name='checkbox']"
    );

    // Création d'un tableau pour stocker les valeurs des cases cochées
    const checkedValues = [];

    // Boucle pour parcourir toutes les cases à cocher et ajouter les valeurs des cases cochées au tableau
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        checkedValues.push(checkbox.value);
      }
    });

    // Affichage des valeurs des cases cochées dans la console
    console.log(checkedValues);
    return checkedValues;
  }

  generateCode() {
    let randomCode = [];
    for (let i = 0; i < this.codeLength; i++) {
      let index = Math.floor(Math.random() * this.colors.length);
      randomCode.push(this.colors[index]);
    }
    console.log(randomCode);
    return randomCode;
  }

  guess() {
    let proposition = [];
    // Récupérer les codes et les convertir en tableau
    for (let i = 0; i < this.codeLength; i++) {
      let codeElement = document.getElementById(`code${i + 1}`);
      proposition.push(getColor(codeElement));   
    };

    if (proposition[this.codeLength - 1] === "") {
      if (document.getElementById("NEI")) {
        $("#NEI").remove();
      }
      document.getElementById("container").appendChild(this.alertNEI());
      $("#NEI").fadeOut(4000);
    } else {

      for (let i = 0; i < this.codeLength; i++) {
        let code = document.getElementById(`code${i + 1}`);
        code.classList.remove(`pion-${getColor(code)}`);
      }

      // Vérifier la proposition et afficher le résultat
      let resultat = this.evaluateGuess(proposition);
      this.currentGuess++;

      for (let i = 1; i <= this.codeLength; i++) {
        let tryTmp = document.querySelector(
          `#prop${this.currentGuess} .pion:nth-of-type(${i})`
        );
        tryTmp.classList.add(`pion-${proposition[i - 1]}`);
      }


      this.isGameOver(resultat);
    }
  }

  evaluateGuess(proposition) {
    let bien_places = 0;
    let mal_places = 0;
    let code_count = {};
    let proposition_count = {};
  
    // Vérifier les codes bien placés
    for (let i = 0; i < this.codeLength; i++) {
      if (proposition[i] === this.code[i]) {
        bien_places++;
      }
      // Compter le nombre d'occurrences de chaque couleur dans le code secret et la proposition
      code_count[this.code[i]] = (code_count[this.code[i]] || 0) + 1;
      proposition_count[proposition[i]] = (proposition_count[proposition[i]] || 0) + 1;
    }
  
    // Vérifier les codes mal placés
    for (let couleur in proposition_count) {
      if (
        code_count[couleur] !== undefined &&
        code_count[couleur] > 0
      ) {
        mal_places += Math.min(code_count[couleur], proposition_count[couleur]);
      }
    }
  
    // Retourner le résultat
    return [bien_places, mal_places - bien_places];
  }

  isGameOver(resultat) {
    if (resultat[0] == this.codeLength) {
      this.endGame();
    } else {
      let textResult = document.getElementById(
        `resultat${this.currentGuess}`
      );
      textResult.textContent = `Bien placés : ${resultat[0]}, mal placés : ${resultat[1]}`;
      if (this.currentGuess == this.maxGuesses) {
        this.gameOver();
      }
    }
  }

  endGame(){
    alert(`Félicitations ! Vous avez trouvé le code secret en ${this.currentGuess} essais.`);
    this.reset();
  }
  
  gameOver(){
    alert(`Oups, vous avez perdu, le code secret était : ${this.code}.`);
    this.reset();
  }
  
  reset(){
    for (let i = 1; i <= this.maxGuesses; i++) {
      for (let j = 1; j <= this.codeLength; j++) {
        let tryTmp = document.querySelector(
          `#prop${i} .pion:nth-of-type(${j})`
        );
        tryTmp.classList.remove(`pion-${getColor(tryTmp)}`);
      }
      document.getElementById(`resultat${i}`).textContent = "";
    }
    if (this.type === "solo") {
      this.code = this.generateCode();
    } else {
      this.code = [];
    }
    this.currentGuess = 0;
  }

  alertNEI() {
    const div = document.createElement("div");
    div.setAttribute("id", "NEI");
    div.setAttribute("class", "alert alert-danger fixed-top");
    div.setAttribute("role", "alert");
    div.innerHTML = `Veuillez créer un code à ${this.codeLength} couleurs.`;
    return div;
  }

  createBoard() {
    createPions(this.colors, this);
    createTries(this.maxGuesses, this.codeLength);
    createCurrentGuess(this.codeLength, this);
  }
  
  get codeLength() {
    return this._codeLength;
  }

  set codeLength(codeLength) {
    this._codeLength = codeLength;
  }

}

function getColor(element) {
  let colorPion = "";
  colorsToCreate.forEach((e) => {
    if (element.classList.contains(`pion-${e}`)) {
      colorPion = e;
    }
  });
  return colorPion;
}

document.getElementById("solo").addEventListener("click", () => {
  const type = "solo";
});

document.getElementById("multi").addEventListener("click", () => {
  const type = "multi";
});