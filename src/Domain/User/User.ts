import UserBossState from "./States/UserBossState";
import UserEmployeeState from "./States/UserEmployeeState";
import UserUnassociatedState from "./States/UserUnassociatedState";
import Email from "./ValueObjects/Email";
import Name from "./ValueObjects/Name";
import Password from "./ValueObjects/PasswordHash";
import UserState from "./ValueObjects/UserState";

export default class User {

    constructor(
       private name: Name,
       private email: Email,
       private passwordHash: Password,
       private state: UserState,
    ) {}

    becomeBoss() {
        this.state.assertBecomeBoss();
        this.state = new UserBossState();
    }

    becomeEmployee() {
        this.state.assertBecomeEmployee();
        this.state = new UserEmployeeState();
    }

    becomeUnassociated() {
        this.state.assertBecomeUnassociated();
        this.state = new UserUnassociatedState();
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

    getState(): string {
        return this.state.toString();
    }
};