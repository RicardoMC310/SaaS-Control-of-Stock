import validator from "validator";

export default class Email {

    private constructor(
        private readonly email: string
    ) {}

    toString(): string {
        return this.email;
    }

    static create(email: string): Email {
        email = email.trim();

        this.validate(email);
        return new Email(email);
    }

    private static validate(email: string) {
        if (!validator.isEmail(email)) {
            throw new Error("Email invalid!");
        }
    }
    
}