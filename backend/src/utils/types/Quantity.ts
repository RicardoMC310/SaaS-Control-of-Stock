import { AppError, HttpStatus } from "../APIError";

export class Quantity {
    private value: number = 0;

    constructor(value: number) {
        this.isValid(value);

        this.value = value;
    }

    private isValid(value: number) {
        if(value < 0){
            throw new AppError("quantity não pode ser menor que 0", HttpStatus.BAD_REQUEST);
        }
    }

    public toString(): string {
        return this.value.toString();
    }
}