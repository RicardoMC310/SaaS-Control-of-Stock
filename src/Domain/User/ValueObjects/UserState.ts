import Role from "./Role";

abstract class UserState {
    abstract canChangeTo(target: Role): boolean;
    abstract toRole(): Role;

    abstract toString(): string;
}

export default UserState;