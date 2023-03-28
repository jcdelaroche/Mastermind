class Game {
    constructor() {
      this.code = this.generateCode();
      this.guesses = [];
      this.maxGuesses = 10;
      this.currentGuess = [];
      this.feedback = [];
    }
  
    generateCode() {
      // TODO: implémenter la génération du code à deviner
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
        
    playSolo() {
        while (!this.isGameOver()) {
          const guess = this.generateGuess();
          this.guesses.push(guess);
          this.currentGuess = guess;
          this.evaluateGuess();
        }
        
        this.showGameOverMessage();
    }
}