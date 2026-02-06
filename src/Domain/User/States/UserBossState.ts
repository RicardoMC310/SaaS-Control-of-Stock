import UserState from "../ValueObjects/UserState";

export default class UserBossState extends UserState {
    assertBecomeBoss(): void {
        throw new Error("User already boss");
    }

    assertBecomeEmployee(): void {
        throw new Error("Only users unassociated can become employees");
    }

    assertBecomeUnassociated(): void {
    }

    toString(): string {
        return "BOSS";
    }

}