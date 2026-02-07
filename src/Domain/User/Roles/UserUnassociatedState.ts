import Role from "../ValueObjects/Role";
import UserState from "../ValueObjects/UserState";

export default class UserUnassociatedState extends UserState {
    canChangeTo(target: Role): boolean {
        return target !== Role.UNASSOCIATED;
    }

    toRole(): Role {
        return Role.UNASSOCIATED
    }

    toString(): string {
        return "UNASSOCIATED";
    }
    
}