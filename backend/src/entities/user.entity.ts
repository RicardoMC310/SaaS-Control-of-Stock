import { Email } from "../utils/Email";
import { Name } from "../utils/Name";
import { Password } from "../utils/Password";
import { UserDTO } from "../DTOs/user.dto";

export class UserEntity {
    private id: number = 0;
    private name?: Name;
    private email?: Email;
    private passwordHash?: Password;

    public setFieldsWithUserDTO(userDTO: UserDTO) {
        this.name = new Name(userDTO.name);
        this.email = new Email(userDTO.email);
        this.passwordHash = new Password(userDTO.password);
    }

    public getAllFields(): {id: number, name: string, email: string, passwordHash: string} {
        return {
            id: this.id,
            name: String(this.name),
            email: String(this.email),
            passwordHash: String(this.passwordHash)
        }
    }

};