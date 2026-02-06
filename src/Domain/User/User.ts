import Email from "./ValueObjects/Email";
import Name from "./ValueObjects/Name";
import Password from "./ValueObjects/PasswordHash";
import {UserState} from "./ValueObjects/UserState";

export default class User {

    constructor(
       private readonly name: Name,
       private readonly email: Email,
       private readonly passwordHash: Password,
       private readonly state: UserState,
    ) {}

    getName(): string {
        return this.name.toString();
    }

    getEmail(): string {
        return this.email.toString();
    }

    getPasswordHash(): string {
        return this.passwordHash.toString();
    }

    getState(): string {
        return this.state;
    }
};