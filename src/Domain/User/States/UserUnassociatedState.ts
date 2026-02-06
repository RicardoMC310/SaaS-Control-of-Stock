import UserState from "../ValueObjects/UserState";

export default class UserUnassociatedState extends UserState {
    assertBecomeBoss(): void {
    }

    assertBecomeEmployee(): void {
    }

    assertBecomeUnassociated(): void {
        throw new Error("User already unassociated");
    }

    toString(): string {
        return "UNASSOCIATED";
    }

}