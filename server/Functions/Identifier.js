

module.exports = function Identifier() {

    const first = ["chat", "chien", "oiseau", "souris", "lapin", "tigre", "lion", "ours", "renard", "coyote", "loup", "zèbre", "gazelle", "girafe", "éléphant", "hippopotame", "crocodile", "alligator", "serpent", "lézard", "iguane", "grenouille", "tortue", "phoque", "pingouin", "ours polaire", "requin", "baleine", "dauphin", "orque", "puma", "panthère", "jaguar", "léopard", "hyène", "rhinocéros", "hippocampe", "méduse", "étoile de mer", "mouette", "corbeau", "hibou", "perroquet", "pigeon", "poule", "coq", "canard", "oie", "cygne"]
    const second = ["amour", "haine", "joie", "tristesse", "colère", "peur", "courage", "détermination", "espoir", "désespoir", "trahison", "loyauté", "envie", "jalousie", "pitié", "compassion", "amitié", "amour-propre", "humilité", "fierté", "confiance", "méfiance", "curiosité", "indifférence", "nostalgie", "réjouissance", "satisfaction", "déception", "dégoût", "surprise", "choquée", "impatience", "sérénité", "calme", "anxiété", "panique", "doute", "certitude", "crainte", "terreur", "nostalgie", "regret", "désir", "passion", "sensualité", "romance", "intimité", "volupté", "plaisir", "douleur"]
    const third = ["arbre", "plante", "fleur", "forêt", "prairie", "jardin", "parc", "rivière", "lac", "océan", "mer", "montagne", "colline", "vallée", "grotte", "cascade", "rocher", "île", "nuage", "soleil", "lune", "étoile", "tempête", "vent", "orage", "neige", "glace", "brouillard", "brume", "pluie", "feu", "herbe", "terre", "sable", "sel", "roche", "minéral", "insecte", "oiseau", "poisson", "mammifère", "prédateur", "proie", "aigle", "corbeau", "renard", "loup", "ours", "cerf", "bison", "lynx"]

    const firstIndex = Math.floor(Math.random() * first.length)
    const secondIndex = Math.floor(Math.random() * second.length)
    const thirdIndex = Math.floor(Math.random() * third.length)

    return `${first[firstIndex]}-${second[secondIndex]}-${third[thirdIndex]}`

}