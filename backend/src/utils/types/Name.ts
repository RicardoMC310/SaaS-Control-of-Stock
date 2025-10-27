export class Name {
    private readonly MINIMUN_NAME_LETTERS: number = 3;

    private value: string = "";

    public constructor(name: string) {
        this.isValid(name);

        this.value = name;
    }

    private isValid(name: string) {
        let isNameValid: boolean = name.trim().length > this.MINIMUN_NAME_LETTERS;

        if (!isNameValid) {
            throw new Error(`nome tem que ser maior que ${this.MINIMUN_NAME_LETTERS} caracteres`);
        }

    }

    public toString(): string {
        return this.value;
    }
}