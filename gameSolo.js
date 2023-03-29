// Définir les couleurs possibles
const colors = ["rouge", "bleu", "vert", "jaune", "orange", "violet"];


// Générer un code aléatoire
function generateCode(){
    let randomCode = [];
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * colors.length);
        randomCode.push(colors[index]);
    }
    return randomCode;
}

let code_secret = generateCode();
let index_proposition = 0;


// Fonction pour vérifier une proposition
function verifier() {
    // Récupérer les codes et les convertir en tableau
    let code1 = document.getElementById("code1");
    let code2 = document.getElementById("code2");
    let code3 = document.getElementById("code3");
    let code4 = document.getElementById("code4");
    let proposition = [getColor(code1), getColor(code2), getColor(code3), getColor(code4)];

    code1.classList.remove(`pion-${getColor(code1)}`);
    code2.classList.remove(`pion-${getColor(code2)}`);
    code3.classList.remove(`pion-${getColor(code3)}`);
    code4.classList.remove(`pion-${getColor(code4)}`);

    console.log(proposition);

    // Vérifier la proposition et afficher le résultat
    let resultat = verifierProposition(proposition);
    index_proposition++;

    for (let i = 1; i < 5; i++) {
        let tryTmp = document.querySelector(`#prop${index_proposition} .pion:nth-of-type(${i})`);
        console.log(`#prop${index_proposition} .pion:nth-of-type(${i})`);
        tryTmp.classList.add(`pion-${proposition[i-1]}`);
    }

    if (resultat[0] === 4) {
        alert("Félicitations ! Vous avez trouvé le code secret.");
        for (let i = 1; i < (maxGuesses + 1); i++) {
            for (let j = 1; j < 5; j++) {
                let tryTmp = document.querySelector(`#prop${i} .pion:nth-of-type(${j})`);
                tryTmp.classList.remove(`pion-${getColor(tryTmp)}`);
            }
            document.getElementById(`resultat${i}`).textContent = undefined;
        }
        code_secret = generateCode();
        index_proposition = 0;
        console.log(code_secret);
        for (let i = 0; i < maxGuesses; i++) {
            $(`#resultat${i}`).textContent = "";
        };
    } else{
        let textResult = document.getElementById(`resultat${index_proposition}`);
        textResult.textContent = `Bien placés : ${resultat[0]}, mal placés : ${resultat[1]}`;
        console.log(textResult.textContent);
    }
}

// Fonction pour vérifier une proposition
function verifierProposition(proposition) {
    let bien_places = 0;
    let mal_places = 0;

    // Vérifier les codes bien placés
    for (let i = 0; i < 4; i++) {
        if (proposition[i] === code_secret[i]) {
            bien_places++;
        }
    }

    // Vérifier les codes mal placés
    for (let i = 0; i < 4; i++) {
        if (proposition[i] !== code_secret[i] && code_secret.includes(proposition[i])) {
            mal_places++;
        }
    }

    // Retourner le résultat
    return [bien_places, mal_places];
}

function selectionnerPion(pion) {
    let tab_code = [].slice.call(document.getElementsByClassName("code"));
    let indexCode = 0;
    tab_code.forEach(e => {
        colors.forEach(color => {
            if (e.classList.contains(`pion-${color}`)) {
                indexCode++;
            }
        });
    });
    if (indexCode < 4) {
        tab_code[indexCode].classList.add(`pion-${pion}`);
    }
}

function getColor(element){
    let colorPion = "";
    colors.forEach(e => {
        if(element.classList.contains(`pion-${e}`)){
            colorPion = e;
        };
    });
    return colorPion;
}

console.log(code_secret);