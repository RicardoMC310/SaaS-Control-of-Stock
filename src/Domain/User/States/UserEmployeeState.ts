import UserState from "../ValueObjects/UserState";

export default class UserEmployeeState extends UserState {
    assertBecomeBoss(): void {
        throw new Error("Only users unassociated can become boss");
    }

    assertBecomeEmployee(): void {
        throw new Error("User already employee");
    }

    assertBecomeUnassociated(): void {
    }

    toString(): string {
        return "EMPLOYEE";
    }

}