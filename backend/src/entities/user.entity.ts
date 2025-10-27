import { Email } from "../utils/types/Email";
import { Name } from "../utils/types/Name";
import { Password } from "../utils/types/Password";
import { CreateUserDTO } from "../DTOs/user.dto";

export class UserEntity {
    private id: number = 0;
    private name?: Name;
    private email?: Email;
    private passwordHash?: Password;
    private createdAt?: Date;

    public setFieldsWithCreateUserDTO(userDTO: CreateUserDTO) {
        this.name = new Name(userDTO.name);
        this.email = new Email(userDTO.email);
        this.passwordHash = new Password(userDTO.password);

        this.passwordHash.cryptographValue();
    }

    public getPasswordField(): Password {
        return Password.fromHash(String(this.passwordHash));
    }

    public getAllValueFields(): {id: number, name: string, email: string, passwordHash: string, createdAt: Date} {
        return {
            id: this.id,
            name: String(this.name),
            email: String(this.email),
            passwordHash: String(this.passwordHash),
            createdAt: this.createdAt ?? new Date()
        }
    }

};