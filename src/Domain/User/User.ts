import UserFactoryState from "./UserFactoryRole";
import Email from "./ValueObjects/Email";
import Name from "./ValueObjects/Name";
import Password from "./ValueObjects/PasswordHash";
import Role from "./ValueObjects/Role";
import UserState from "./ValueObjects/UserState";

export default class User {

    constructor(
        private name: Name,
        private email: Email,
        private passwordHash: Password,
        private role: UserState,
    ) { }

    comparePasswordHash(password: string): boolean {
        return this.passwordHash.compareHash(password);
    }

    changeRole(target: Role): void {
        if (!this.role.canChangeTo(target)) {
            throw new Error(`Cannot change from ${this.role.toRole()} to ${target as string}`);
        }

        this.role = UserFactoryState.fromRole(target);
    }

    getName(): string {
        return this.name.toString();
    }

    getEmail(): string {
        return this.email.toString();
    }

    getPasswordHash(): string {
        return this.passwordHash.toString();
    }

    getRole(): string {
        return this.role.toString();
    }
};