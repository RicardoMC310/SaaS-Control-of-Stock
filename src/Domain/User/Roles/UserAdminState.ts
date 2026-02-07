import Role from "../ValueObjects/Role";
import UserState from "../ValueObjects/UserState";

export default class UserAdminState extends UserState {

    canChangeTo(target: Role): boolean {
        return target === Role.UNASSOCIATED
    }

    toRole(): Role {
        return Role.ADMIN;
    }

    toString(): string {
        return "ADMIN";
    }

}