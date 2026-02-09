import ISessionStorage from "@/Applications/Session/ISessionStorage";
import env from "@/Infrastructure/Config/env";
import { v7 as uuid } from "uuid";

type SessionEntry<T> = {
    value: T;
    createdAt: number;
}

export default class AuthMapSessionStorage<T> implements ISessionStorage<T> {

    private storage: Map<string, SessionEntry<T>> = new Map();
    private sessionDuration: number;

    constructor() {
        this.sessionDuration = this.parseTime(env.SESSION_DURATION);

        setInterval(() => this.cleanup(), this.sessionDuration);
    }

    save(value: T): string {
        const key = uuid();
        this.storage.set(key, {value, createdAt: Date.now()});
        return key;
    }

    get(key: string): T {
        const value = this.storage.get(key);

        if (!value)
            throw new Error("Missing session key");

        return value.value;
    }

    delete(key: string): void {
        const canDeleted = this.storage.delete(key);

        if (!canDeleted)
            throw new Error("Missing session key");
    }

    update(key: string, value: T): void {
        this.delete(key);
        this.storage.set(key, {value, createdAt: Date.now()});
    }

    private parseTime(input: string): number {
        const regex: RegExp = /(?<value>\d+)\s*(?<unit>ms|h|m|s)/g;

        let match: RegExpExecArray | null;

        let totalMS: number = 0;
        while((match = regex.exec(input)) !== null) {

            const value: number = Number(match.groups?.value);
            const unit: string = match.groups?.unit || "ms";

            switch(unit) {
                case "ms":
                    totalMS += value;
                    break;
                case "s":
                    totalMS += value * 1000;
                    break;
                case "m":
                    totalMS += value * 60 * 1000;
                    break;
                case "h":
                    totalMS += value * 60 * 60 * 1000;
                    break;
            }
        }

        return totalMS;
    }

    private cleanup() {
        const now = Date.now();

        for (const [key, entry] of this.storage) {
            if (now - entry.createdAt > this.sessionDuration) {
                this.delete(key);
            }
        }
    }

}