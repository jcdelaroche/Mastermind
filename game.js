class Game {
    constructor() {
      this.colors = this.whichColors();
      this.code = this.generateCode();
      this.guesses = [];
      this.maxGuesses = 10;
      this.currentGuess = [];
      this.feedback = [];
    }

    whichColors(){
      
    }
  
    generateCode() {
      let randomCode = [];
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * this.colors.length);
        randomCode.push(colors[index]);
      }
      return randomCode;
    }
  
    guess() {
      // TODO: implémenter la soumission d'un essai
    }
  
    evaluateGuess() {
      // TODO: implémenter l'évaluation d'un essai
    }
  
    isGameOver() {
      // TODO: vérifier si le jeu est terminé
    }
}