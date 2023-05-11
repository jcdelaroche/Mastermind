export class ColorCombination {

    constructor(colors) {
        this.colors = colors;
    }

    getCode(){
        return this.colors;
    }

    explode() {
        return this.colors.map((color) => color.color);
    }

    try (colors) {
        let acc = this.explode();
        const result = colors.explode().map((color, index) => {
            if(this.explode()[index] === color) {
                acc.splice(acc.indexOf(color), 1);
                return "correct";
            };
            return "incorrect";
        }).map((e, index) => (e === "incorrect" && acc.includes(colors.explode()[index])) ? "missed" : e);
        return { result: (!result.includes('missed') && !result.includes('incorrect')) ? true : false, details: result };
    }

    complete() {
        const result = (this.colors).map((color) => color.color ? true : false);
        return result.includes(false) ? false : true;
    }
    
}