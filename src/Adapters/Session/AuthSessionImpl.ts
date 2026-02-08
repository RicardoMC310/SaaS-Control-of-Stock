import AuthSessionDTO from "@/Applications/Auth/AuthSessionDTO";
import IAuthSession from "@/Applications/Auth/IAuthSession";
import env from "@/Infrastructure/Config/env";
import Session from "@/Infrastructure/Session/Session";
import { v7 as uuid } from "uuid";

export default class AuthSessionImpl implements IAuthSession {
    private session: Session<AuthSessionDTO>;

    constructor() {
        this.session = new Session(this.parseDuration(env.SESSION_DURATION));
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

    private parseDuration(input: string): number {
        const regex: RegExp = /(\d+)\s*(h|m|s)/gi;

        let total: number = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(input)) !== null) {
            const value = parseInt(match[1]);
            const unit = match[2].toLowerCase();

            switch (unit) {
                case "h":
                    total += value * 60 * 60 * 1000;
                    break;
                case "m":
                    total += value * 60 * 1000;
                    break;
                case "s":
                    total += value * 1000;
                    break;
            }
        }

        if (total === 0) {
            throw new Error(`Invalid duration string: "${input}"`);
        }

        return total;
    }

}