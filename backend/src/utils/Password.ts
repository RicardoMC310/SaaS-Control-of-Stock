import { hashSync as bcryptHashSync, compareSync as bcryptCompareSync } from "bcrypt";

export class Password {
    private value: string = "";

    private readonly PASSWORD_ALL_CRITERIA: number = 0b11111;
    private readonly DEFAULT_ROUNDS_BCRYPT: number = 10;

    public constructor(password: string) {
        this.isValid(password);
        
        this.value = password;
        this.cryptographValue();
    }

    public comparePasswordWithHash(password: Password): boolean
    {
        return bcryptCompareSync(String(password), this.value);
    }

    private isValid(password: string) {
        let score: number = 0;

        if (password.length > 8) score |= 1 << 0;
        if (/[A-Z]/.test(password)) score |= 1 << 1;
        if (/[a-z]/.test(password)) score |= 1 << 2;
        if (/[0-9]/.test(password)) score |= 1 << 3;
        if (/[\W_]/.test(password)) score |= 1 << 4;

        if (!(score == this.PASSWORD_ALL_CRITERIA)) {
            throw new Error("senha fraca, deve conter: 1 maiúscola, 1 minúscula, 1 número, 1 caracter especial e no mínimo 8 caracteres");
        }
    }

    private cryptographValue() {
        this.value = bcryptHashSync(this.value, this.DEFAULT_ROUNDS_BCRYPT);
    }

    public toString(): string {
        return this.value;
    }
}