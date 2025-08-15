import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
    validate(cnpj: any): boolean {
        if (typeof cnpj !== 'string') return false;

        // Remove tudo que não é número
        const onlyNumbers = cnpj.replace(/\D/g, '');
        if (onlyNumbers.length !== 14) return false;

        // Elimina CNPJs repetidos (como 11111111111111)
        if (/^(\d)\1+$/.test(onlyNumbers)) return false;

        const digits = onlyNumbers.split('').map(d => parseInt(d, 10));
        if (digits.some(d => Number.isNaN(d))) return false;

        const calcDigit = (cnpjPartial: number[]) => {
            const length = cnpjPartial.length;
            const weights = length === 12
                ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
                : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

            let sum = 0;
            for (let i = 0; i < weights.length; i++) {
                sum += cnpjPartial[i] * weights[i];
            }
            const remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        };

        const firstCheck = calcDigit(digits.slice(0, 12));
        const secondCheck = calcDigit(digits.slice(0, 12).concat(firstCheck));

        return firstCheck === digits[12] && secondCheck === digits[13];
    }

    defaultMessage(args: ValidationArguments): string {
        return 'CNPJ inválido';
    }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCnpjConstraint,
        });
    };
}

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