export default interface ISessionStorage<T> {
    save(value: T): string;
    get(key: string): T;
    delete(key: string): void;
    update(key: string, value: T): void;
}