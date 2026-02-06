enum UserState {
    UNASSOCIATED = "UNASSOCIATED",
    BOSS = "BOSS",
    EMPLOYEE = "EMPLOYEE"
}

const createState = (state: string): UserState => {
    if(!Object.values(UserState).includes(state as UserState)) {
        throw new Error(`State ${state} missing`);
    }

    return state as UserState;
}

export {UserState, createState};