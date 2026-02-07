import UserBossState from "./States/UserBossState";
import UserEmployeeState from "./States/UserEmployeeState";
import UserUnassociatedState from "./States/UserUnassociatedState";
import Role from "./ValueObjects/Role";
import UserState from "./ValueObjects/UserState";

export default class UserFactoryState {
    static fromRole(role: Role): UserState {
        switch (role) {
            case Role.UNASSOCIATED:
                return new UserUnassociatedState();
            case Role.BOSS:
                return new UserBossState();
            case Role.EMPLOYEE:
                return new UserEmployeeState();
            default:
                throw new Error("Invalid role");
        }
    }

    static fromString(role: string): UserState {
        if (!Object.values(Role).includes(role as Role)) {
            throw new Error(`Missing role ${role}`);
        }

        return UserFactoryState.fromRole(role as Role);
    }
}