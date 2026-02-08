type SessionItem<T> = {
    data: T;
    createdAt: number;
}

export default class Session<T> {
    private listSession: Map<string, SessionItem<T>>;
    constructor(
        private readonly delayToCleanUp: number
    ) {
        this.listSession = new Map();

        setInterval(() => this.cleanup(), delayToCleanUp);
    }

    save(key: string, data: T): void {
        this.listSession.set(key, {data, createdAt: Date.now()});
    }

    get(key: string): T {
        const value: SessionItem<T> | undefined = this.listSession.get(key);

        if (!value)
            throw new Error(`Missing key ${key} in the session`);

        return value.data;
    }

    remove(key: string): boolean {
        return this.listSession.delete(key);
    }

    private cleanup() {
        const now = Date.now();

        for (let [key, item] of this.listSession) {
            if (now - item.createdAt > this.delayToCleanUp)
            {
                this.remove(key);
            }
        }
    }
}