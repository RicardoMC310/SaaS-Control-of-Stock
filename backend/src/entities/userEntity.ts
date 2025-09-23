import bcrypt from "bcrypt";
import validator from "validator";

export interface UserSaveInput {
    name: string;
    email: string;
    password: string;
}

export class UserEntity {
    ID!: number;
    Name!: string;
    Email!: string;
    PasswordHash!: string;

    private isValid() {
        if (this.Name.length < 3) {
            throw new Error("name precisa ter acima de 3 caracteres");
        }

        if (!validator.isEmail(this.Email)) {
            throw new Error("email passado é inválido");
        }
    }

    async setData(user: UserSaveInput) {
        this.Name = user.name;
        this.Email = user.email;
        this.PasswordHash = await bcrypt.hash(user.password, 14);

        this.isValid();
    }

    getToJson(): {name: string, email: string} {
        return {
            name: this.Name,
            email: this.Email
        }
    }
};