import { AppError, HttpStatus } from "../APIUtils";

export class Code {
    private value: string = "";

    constructor(value: string) {
        this.isValid(value);

        this.value = value;
    }

    private isValid(value: string) {
        if (!value || (parseInt(value, 10) < 0)) 
            throw new AppError("code não pode ser vazio nem valores negativos", HttpStatus.BAD_REQUEST);
    }

    public toString(): string {
        return this.value;
    }
}