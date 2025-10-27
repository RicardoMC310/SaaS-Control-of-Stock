import Decimal from "decimal.js";
import { AppError, HttpStatus } from "../APIError";


export class Price {
    private value: InstanceType<typeof Decimal>;

    constructor(initialValue: string | number) {
        this.isValid(initialValue);

        this.value = new Decimal(initialValue);
    }

    private isValid(value: string | number) {
        const numberValue: number = typeof value == "string" ? parseInt(value, 10) : value;

        if (numberValue < 0)
            throw new AppError("preço não pode ser negativo", HttpStatus.BAD_REQUEST);
    }

    private toString(): string {
        return this.value.toString();
    }
};