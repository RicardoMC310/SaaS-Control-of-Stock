import Role from "../ValueObjects/Role";
import UserState from "../ValueObjects/UserState";

export default class UserBossState extends UserState {
    canChangeTo(target: Role): boolean {
        return target === Role.UNASSOCIATED;
    }

    toRole(): Role {
        return Role.BOSS
    }

    toString(): string {
        return "BOSS";
    }
    
}