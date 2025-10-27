import { CreateUserDTO, FindUserByEmailDTO } from "../DTOs/user.dto";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../repositories/user.repositories";

export default class UserService {
    constructor(private readonly repository: IUserRepository) {}

    public async createNewUser(userDTO: CreateUserDTO): Promise<UserEntity> {
        const user = new UserEntity();

        user.setFieldsWithUserDTO(userDTO);

        return this.repository.Save(user);
    }

    public async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.repository.FindByEmail(email);
    }
};
