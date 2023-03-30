// Définir les couleurs possibles
const colors = ["rouge", "bleu", "vert", "jaune", "orange", "violet"];
let code_secret = generateCode();
let index_proposition = 0;

// Générer un code aléatoire
function generateCode() {
  let randomCode = [];
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * colors.length);
    randomCode.push(colors[index]);
  }
  return randomCode;
}

// Fonction pour vérifier une proposition
function verifier() {
  // Récupérer les codes et les convertir en tableau
  let code1 = document.getElementById("code1");
  let code2 = document.getElementById("code2");
  let code3 = document.getElementById("code3");
  let code4 = document.getElementById("code4");
  if (getColor(code4) === "") {
    if (document.getElementById("NEI")) {
      $("#NEI").remove();
    }
    document.getElementById("container").appendChild(alertNEI());
    $("#NEI").fadeOut(4000);
  } else {
    let proposition = [
      getColor(code1),
      getColor(code2),
      getColor(code3),
      getColor(code4),
    ];

    code1.classList.remove(`pion-${getColor(code1)}`);
    code2.classList.remove(`pion-${getColor(code2)}`);
    code3.classList.remove(`pion-${getColor(code3)}`);
    code4.classList.remove(`pion-${getColor(code4)}`);

    // Vérifier la proposition et afficher le résultat
    let resultat = verifierProposition(proposition);
    index_proposition++;

    for (let i = 1; i < 5; i++) {
      let tryTmp = document.querySelector(
        `#prop${index_proposition} .pion:nth-of-type(${i})`
      );
      tryTmp.classList.add(`pion-${proposition[i - 1]}`);
    }

    if (resultat[0] === 4) {
      alert("Félicitations ! Vous avez trouvé le code secret.");
      for (let i = 1; i < maxGuesses + 1; i++) {
        for (let j = 1; j < 5; j++) {
          let tryTmp = document.querySelector(
            `#prop${i} .pion:nth-of-type(${j})`
          );
          tryTmp.classList.remove(`pion-${getColor(tryTmp)}`);
        }
        document.getElementById(`resultat${i}`).textContent = undefined;
      }
      code_secret = generateCode();
      index_proposition = 0;
      console.log(code_secret);
      for (let i = 0; i < maxGuesses; i++) {
        $(`#resultat${i}`).textContent = "";
      }
    } else {
      let textResult = document.getElementById(`resultat${index_proposition}`);
      textResult.textContent = `Bien placés : ${resultat[0]}, mal placés : ${resultat[1]}`;
    }
  }
}

// Fonction pour vérifier une proposition
function verifierProposition(proposition) {
    let bien_places = 0;
    let mal_places = 0;
    let code_secret_count = {};
    let proposition_count = {};
  
    // Vérifier les codes bien placés
    for (let i = 0; i < 4; i++) {
      if (proposition[i] === code_secret[i]) {
        bien_places++;
      }
      // Compter le nombre d'occurrences de chaque couleur dans le code secret et la proposition
      code_secret_count[code_secret[i]] = (code_secret_count[code_secret[i]] || 0) + 1;
      proposition_count[proposition[i]] = (proposition_count[proposition[i]] || 0) + 1;
    }
  
    // Vérifier les codes mal placés
    for (let couleur in proposition_count) {
      if (
        code_secret_count[couleur] !== undefined &&
        code_secret_count[couleur] > 0
      ) {
        mal_places += Math.min(code_secret_count[couleur], proposition_count[couleur]);
      }
    }
  
    // Retourner le résultat
    return [bien_places, mal_places - bien_places];
}

function selectionnerPion(pion) {
  let tab_code = [].slice.call(document.getElementsByClassName("code"));
  let indexCode = 0;
  tab_code.forEach((e) => {
    colors.forEach((color) => {
      if (e.classList.contains(`pion-${color}`)) {
        indexCode++;
      }
    });
  });
  if (indexCode < 4) {
    tab_code[indexCode].classList.add(`pion-${pion}`);
  }
}

function getColor(element) {
  let colorPion = "";
  colors.forEach((e) => {
    if (element.classList.contains(`pion-${e}`)) {
      colorPion = e;
    }
  });
  return colorPion;
}

function effacer() {
  code1.classList.remove(`pion-${getColor(code1)}`);
  code2.classList.remove(`pion-${getColor(code2)}`);
  code3.classList.remove(`pion-${getColor(code3)}`);
  code4.classList.remove(`pion-${getColor(code4)}`);
}

function alertNEI() {
  const div = document.createElement("div");
  div.setAttribute("id", "NEI");
  div.setAttribute("class", "alert alert-danger fixed-top");
  div.setAttribute("role", "alert");
  div.innerHTML = "Veuillez créer un code à 4 couleurs";
  return div;
}

console.log(code_secret);
