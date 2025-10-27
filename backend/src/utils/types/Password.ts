import { hashSync as bcryptHashSync, compareSync as bcryptCompareSync } from "bcrypt";
import { AppError, HttpStatus } from "../APIError";

export class Password {
    private value: string = "";

    private readonly PASSWORD_ALL_CRITERIA: number = 0b11111;
    private readonly DEFAULT_ROUNDS_BCRYPT: number = 10;

    public constructor(password: string) {
        this.isValid(password);
        
        this.value = password;
    }

    public comparePasswordWithHash(password: string): boolean
    {
        return bcryptCompareSync(password, this.value);
    }

    public cryptographValue() {
        this.value = bcryptHashSync(this.value, this.DEFAULT_ROUNDS_BCRYPT);
    }

    public static fromHash(hash: string): Password {
        const instance = Object.create(Password.prototype);
        instance.value = hash;
        return instance;
    }

    private isValid(password: string) {
        let score: number = 0;

        if (password.length > 8) score |= 1 << 0;
        if (/[A-Z]/.test(password)) score |= 1 << 1;
        if (/[a-z]/.test(password)) score |= 1 << 2;
        if (/[0-9]/.test(password)) score |= 1 << 3;
        if (/[\W_]/.test(password)) score |= 1 << 4;

        if (!(score == this.PASSWORD_ALL_CRITERIA)) {
            throw new AppError("senha fraca, deve conter: 1 maiúscola, 1 minúscula, 1 número, 1 caracter especial e no mínimo 8 caracteres", HttpStatus.BAD_REQUEST);
        }
    }

    public toString(): string {
        return this.value;
    }
}