import validator from "validator";
import { AppError, HttpStatus } from "../APIUtils";

export class Email {
    private value: string = "";

    public constructor(email: string) {
        this.isValid(email);

        this.value = email;
    }

    private isValid(email: string) {
        let isEmailValid: boolean = validator.isEmail(email);

        if (!isEmailValid)
        {
            throw new AppError("email inválido! verifique se digitou corretamente", HttpStatus.BAD_REQUEST);
        }
        
    }

    public toString(): string {
        return this.value;
    }
}