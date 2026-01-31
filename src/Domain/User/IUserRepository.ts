import User from "@Domain/User/User";

export default interface IUserRepository {
    findAll(): User[];
};