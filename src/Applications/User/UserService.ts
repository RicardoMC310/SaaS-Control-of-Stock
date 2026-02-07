import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import CreateUserDTO from "./UserCreateDTO";
import Name from "@/Domain/User/ValueObjects/Name";
import Email from "@/Domain/User/ValueObjects/Email";
import Password from "@/Domain/User/ValueObjects/PasswordHash";
import UserMapper from "@/Infrastructure/Mappers/UserMapper";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import Role from "@/Domain/User/ValueObjects/Role";
import UserFactoryState from "@/Domain/User/UserFactoryRole";
import UserChangeRoleDTO from "./UserChangeRoleDTO";

export default class UserService {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async save(userCreateDTO: CreateUserDTO): Promise<UserResponseDTO> {
        const user = new User(
            Name.create(userCreateDTO.name),
            Email.create(userCreateDTO.email),
            Password.create(userCreateDTO.password),
            UserFactoryState.fromRole(Role.UNASSOCIATED)
        );

        const userSaved = await this.repository.save(user);

        return UserMapper.domainToDTO(userSaved);
    }

    async findAll(): Promise<UserResponseDTO[]> {
        const users = await this.repository.findAll();
        const usersDTO: UserResponseDTO[] = [];

        users.map(user => {
            usersDTO.push(UserMapper.domainToDTO(user));
        })

        return usersDTO;
    }

    async changeRole(userChangeRoleDTO: UserChangeRoleDTO): Promise<UserResponseDTO> {
        const user = await this.repository.findByEmail(userChangeRoleDTO.email);

        if (!this.existsRole(userChangeRoleDTO.role))
            throw new Error(`Missing role ${userChangeRoleDTO.role}`);

        user.changeRole(userChangeRoleDTO.role as Role);

        const userUpdated = await this.repository.updated(user);

        return UserMapper.domainToDTO(userUpdated);
    }

    private existsRole(role: string): boolean {
        return Object.values(Role).includes(role as Role);
    }
}