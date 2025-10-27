import validator from "validator";

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
            throw new Error("email inválido, confira se digitou tudo corretamente");
        }
        
    }

    public toString(): string {
        return this.value;
    }
}