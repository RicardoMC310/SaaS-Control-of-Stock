import { hashSync as bcriptHashSync, compareSync as bcriptCompareSync } from "bcrypt";

export default class Password {
    private static readonly BITMASK_HASH_CORRECT: number = 0b11111;
    private static readonly LENGTH_VALIDATION_HASH_CORRECT: number = 5;

    private static readonly STRINGS_ERRORS_HASH: string[] = [
        "The password must contain at least 8 characters",
        "The password must contain at least one number",
        "The password must contain at least one lowercase letter.",
        "The password must contain at least one uppercase letter.",
        "The password must contain at least one special character."
    ];

    private static readonly BITMASK_HASH_LENGTH: number = 0;
    private static readonly BITMASK_HASH_NUMBER: number = 1;
    private static readonly BITMASK_HASH_LOWERCASE: number = 2;
    private static readonly BITMASK_HASH_UPPERCASE: number = 3;
    private static readonly BITMASK_HASH_SPECIAL: number = 4;
    
    private constructor(
        private readonly hash: string
    ) { }

    toString(): string {
        return this.hash;
    }

    compareHash(password: string): boolean {
        return bcriptCompareSync(password, this.hash);
    }

    static createWithAExists(hash: string) {
        hash = hash.trim();

        return new Password(hash);
    }

    static create(hash: string): Password {
        hash = hash.trim();

        this.validate(hash);

        hash = bcriptHashSync(hash, 14);

        return new Password(hash);
    }

    private static validate(hash: string) {
        let state: number = 0;

        if (hash.length >= 8) state |= (1 << this.BITMASK_HASH_LENGTH);
        if (/[\d]+/.test(hash)) state |= (1 << this.BITMASK_HASH_NUMBER);
        if (/[a-z]+/.test(hash)) state |= (1 << this.BITMASK_HASH_LOWERCASE);
        if (/[A-Z]+/.test(hash)) state |= (1 << this.BITMASK_HASH_UPPERCASE);
        if (/[^a-zA-Z0-9]+/.test(hash)) state |= (1 << this.BITMASK_HASH_SPECIAL);

        if (state !== this.BITMASK_HASH_CORRECT) {
            throw new Error(this.getErrorByBitMask(state));
        }
    }

    private static getErrorByBitMask(state: number): string {
        let errors: string[] = [];

        for (let i = 0; i < this.LENGTH_VALIDATION_HASH_CORRECT; i++) {
            const flag = 1 << i;

            if (!this.hasFlag(state, flag)) {
                errors.push(this.STRINGS_ERRORS_HASH[i]);
            }
        }


        return errors.join(";");
    }

    private static hasFlag(state: number, flag: number): boolean {
        return (state & flag) == flag;
    }
}