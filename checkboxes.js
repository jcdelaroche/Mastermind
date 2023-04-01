// Sélection de l'élément <ul> dans lequel on va ajouter les éléments <li>
const ul = document.querySelector("ul");

// Boucle pour créer les éléments <li>, <input>, et <label> pour chaque couleur
for (let i = 0; i < colorsToCreate.length; i++) {
  // Création de l'élément <li>
  const li = document.createElement("li");
  
  // Création de l'élément <input>
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "checkbox";
  input.id = "checkbox-" + i;
  input.value = colorsToCreate[i];
  
  // Création de l'élément <label>
  const label = document.createElement("label");
  label.htmlFor = "checkbox-" + i;
  
  // Création de l'élément <div> pour le pion de couleur
  const div = document.createElement("div");
  div.className = "pion pion-" + colorsToCreate[i];
  
  // Ajout de l'élément <div> à l'élément <label>
  label.appendChild(div);
  
  // Ajout de l'élément <input> et <label> à l'élément <li>
  li.appendChild(input);
  li.appendChild(label);
  
  // Ajout de l'élément <li> à l'élément <ul>
  ul.appendChild(li);
}