export class Recipe {
    constructor({ id, title, ingredients = [], instructions = '' }) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    summary() {
        return `${this.title} : ${this.ingredients.length} ingrédient(s)`;
    }
}