import Role from "../ValueObjects/Role";
import UserState from "../ValueObjects/UserState";

export default class UserEmployeeState extends UserState {
    canChangeTo(target: Role): boolean {
        return target === Role.UNASSOCIATED;
    }

    toRole(): Role {
        return Role.EMPLOYEE
    }

    toString(): string {
        return "EMPLOYEE";
    }
    
}