import { ColorCombination } from "./ColorCombination";

export class Games {

    constructor({codeLength, colorEnabled, maxGuesses, playerCount}){

        this.codeLength = codeLength;
        this.colorEnabled = colorEnabled;
        this.maxGuesses = maxGuesses;
        this.playerCount = playerCount;

        this.guesses = [...Array(this.maxGuesses)].map((x, index) => {
            return {
                colors: this.generateEmptyCode(),
                details: null
            };
        })

    }


    addGuess(combinaison, result) {
        let filled = false;
        this.guesses = (this.guesses).map((guess) => {
            if((guess.colors.getCode()[0].color === null) && !filled) {
                filled = true;
                return {
                    colors: combinaison,
                    details: result
                };
            }
            return guess;
        })
    }

    getGuesses() {
        return this.guesses;
    }

    getAttemptsLength() {
        return this.guesses.filter((guess) => {
            return guess.colors.getCode()[0].color !== null;
        }).length;
    }

    getGuessesRemaining() {
        return this.maxGuesses - this.guesses.filter((guess) => {
            return guess.colors.getCode()[0].color !== null;
        }).length;
    }

    win(){

    }

    loose(){
        
    }

    reset(){
        this.guesses = [...Array(this.maxGuesses)].map((x, index) => {
            return {
                colors: this.generateEmptyCode(),
                details: null
            };
        });
        this.winningCode = this.generateCode();
    }

    setWinningCode(winningCode){
        this.winningCode = winningCode;
    }

    getWinningCode(){
        return this.winningCode;
    }

    forceCode(colors){
        colors = colors.map((color, index) => {
            return {"index": index, "color": color}
        });
        return new ColorCombination(colors)
    }

    generateEmptyCode(){
        return new ColorCombination([...Array(this.codeLength)].map((x, index) => {
            return {"index": index, "color": null}
        }
    ));
    }

    generateCode(){
        return new ColorCombination([...Array(this.codeLength)].map((x, index) => {
                return {"index": index, "color": this.colorEnabled[Math.floor(Math.random() * this.colorEnabled.length)]}
            }
        ));
    }

} 