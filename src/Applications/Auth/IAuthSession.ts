import AuthSessionDTO from "./AuthSessionDTO";

export default interface IAuthSession {
    save(authSessionDTO: AuthSessionDTO): string;
    get(key: string): AuthSessionDTO;
    delete(key: string): boolean;
};