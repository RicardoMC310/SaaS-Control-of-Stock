import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {

    validate(cpf: any): boolean {
        if (typeof cpf !== "string") return false;

        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;

        const digits = cpf.split("").map(d => parseInt(d));
        if (digits.some(d => Number.isNaN(d))) return false;

        // Primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i);
        let firstCheck = 11 - (sum % 11);
        if (firstCheck >= 10) firstCheck = 0;

        // Segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) sum += digits[i] * (11 - i);
        let secondCheck = 11 - (sum % 11);
        if (secondCheck >= 10) secondCheck = 0;

        return firstCheck === digits[9] && secondCheck === digits[10];
    }


    defaultMessage(): string {
        return 'CPF inválido';
    }
}

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfConstraint
        });
    }
}