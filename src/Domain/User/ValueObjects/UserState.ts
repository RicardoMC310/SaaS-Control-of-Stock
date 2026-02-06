
abstract class UserState {
    abstract assertBecomeBoss(): void;
    abstract assertBecomeEmployee(): void;
    abstract assertBecomeUnassociated(): void;

    abstract toString(): string;
}

export default UserState;