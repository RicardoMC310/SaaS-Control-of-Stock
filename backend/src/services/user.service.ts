import { UserDTO } from "../DTOs/user.dto";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../repositories/user.repositories";

class UserService {
    constructor(private readonly repository: IUserRepository) {}

    public async createNewUser(userDTO: UserDTO): Promise<UserEntity> {
        const user = new UserEntity();

        user.setFieldsWithUserDTO(userDTO);

        return this.repository.Save(user);;
    }
};

export function createUserService(repository: IUserRepository): UserService {
    return new UserService(repository);
}