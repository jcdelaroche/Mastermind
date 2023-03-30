const maxGuesses = 10;
let tries = document.getElementById("tries");

// Boucle pour créer plusieurs éléments similaires
for (let i = 1; i <= maxGuesses; i++) {
// Création d'un nouveau div pour chaque élément
const newDiv = document.createElement("div");
newDiv.id = "prop" + i; // définition de l'ID du div
newDiv.classList.add("row"); // ajout de la classe "row"

// Création de la première colonne
const col1 = document.createElement("div");
col1.classList.add("col-md-6"); // ajout de la classe "col-md-6"

// Ajout des 4 éléments "pion"
for (let j = 1; j <= 4; j++) {
    const pion = document.createElement("div");
    pion.classList.add("pion");
    pion.id = "try" + (j + 4 * (i - 1));
    col1.appendChild(pion); // ajout du pion à la colonne
}

// Création de la deuxième colonne
const col2 = document.createElement("div");
col2.classList.add("col-md-6"); // ajout de la classe "col-md-6"

// Ajout de l'élément "p" pour le résultat
const resultat = document.createElement("p");
resultat.id = "resultat" + i;
col2.appendChild(resultat); // ajout du résultat à la colonne

// Ajout des deux colonnes au div parent
newDiv.appendChild(col1);
newDiv.appendChild(col2);

// Ajout du nouveau div à l'élément parent
tries.appendChild(newDiv);
}