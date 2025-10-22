import validator from "validator";
import { Email } from "../utils/Email";
import { Name } from "../utils/Name";
import { Password } from "../utils/Password";

class UserEntity {
    private id: number = 0;
    private name?: Name;
    private email?: Email;
    private passwordHash?: Password;

    public setNameEmailPasswordFields(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = new Name(name);
        this.email = new Email(email);
        this.passwordHash = new Password(password);
    }

    public getAllFields(): {id: number, name: string, email: string, password: string} {
        return {
            id: this.id,
            name: String(this.name),
            email: String(this.email),
            password: String(this.passwordHash)
        }
    }

};

export default function createUserEntity(): UserEntity {
    return new UserEntity;
}