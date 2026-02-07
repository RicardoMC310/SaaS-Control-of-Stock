import UserAdminState from "./Roles/UserAdminState";
import UserBossState from "./Roles/UserBossState";
import UserEmployeeState from "./Roles/UserEmployeeState";
import UserUnassociatedState from "./Roles/UserUnassociatedState";
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
            case Role.ADMIN:
                return new UserAdminState();
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