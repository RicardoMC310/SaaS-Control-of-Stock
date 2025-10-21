import validator from "validator";

class UserEntity {
    public id?: number;
    public name?: string;
    public email?: string;
    public passwordHash?: string;

    private errorValidFields: string[] = [];

    private readonly MINIMUN_NAME_LETTERS: number = 3;
    private readonly PASSWORD_ALL_CRITERIA: number = 0b11111;

    public getErrorValidFields(): string[] {
        return (this.errorValidFields ?? []).filter(f => f != "");
    }

    public isValidFields(): boolean {
        return this.isValidFieldName()
            && this.isValidFieldEmail()
            && this.isValidFieldPasswordHash();
    }

    private isValidFieldName(): boolean {
        let result: boolean = (this.name?.trim()?.length ?? 0) > this.MINIMUN_NAME_LETTERS;
        this.errorValidFields?.push(
            result ? "" 
            : `nome tem que ser maior que ${this.MINIMUN_NAME_LETTERS} caracteres`
        );
        return result;
    }

    private isValidFieldEmail(): boolean {
        let result: boolean = validator.isEmail(this.email ?? "");
        this.errorValidFields?.push(
            result ? ""
            : "email inválido, confira se digitou tudo corretamente"
        );
        return result;
    }

    private isValidFieldPasswordHash(): boolean {

        let score: number = 0;

        if ((this.passwordHash?.length ?? 0) > 8) score |= 1 << 0;
        if (/[A-Z]/.test(this.passwordHash ?? "")) score |= 1 << 1;
        if (/[a-z]/.test(this.passwordHash ?? "")) score |= 1 << 2;
        if (/[0-9]/.test(this.passwordHash ?? "")) score |= 1 << 3;
        if (/[\W_]/.test(this.passwordHash ?? "")) score |= 1 << 4;

        if (!(score == this.PASSWORD_ALL_CRITERIA)) {
            this.errorValidFields?.push("senha fraca, deve conter: 1 maiúscola, 1 minúscula, 1 número, 1 caracter especial e no mínimo 8 caracteres");
            return false;
        }

        return true;
    }
};

export default function createUserEntity(): UserEntity {
    return new UserEntity;
}