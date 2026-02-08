import AuthSessionDTO from "@/Applications/Auth/AuthSessionDTO";
import IAuthSession from "@/Applications/Auth/IAuthSession";
import Session from "@/Infrastructure/Session/Session";
import { v7 as uuid } from "uuid";

export default class AuthSessionImpl implements IAuthSession {
    private session: Session<AuthSessionDTO>;

    constructor() {
        this.session = new Session(60 * 60 * 1000);
    }

    save(authSessionDTO: AuthSessionDTO): string {
        const key = uuid();

        this.session.save(key, authSessionDTO);

        return key;
    }

    get(key: string): AuthSessionDTO {
        return this.session.get(key);
    }

    delete(key: string): boolean {
        return this.session.remove(key);
    }

}