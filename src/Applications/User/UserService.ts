import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import UserCreateDTO from "./DTOs/UserCreateDTO";
import Name from "@/Domain/User/ValueObjects/Name";
import Email from "@/Domain/User/ValueObjects/Email";
import Password from "@/Domain/User/ValueObjects/PasswordHash";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import Role from "@/Domain/User/ValueObjects/Role";
import UserFactoryState from "@/Domain/User/UserFactoryRole";
import UserChangeRoleDTO from "./DTOs/UserChangeRoleDTO";
import UserFindByEmailDTO from "./DTOs/UserFindByEmailDTO";
import IUserMapper from "./IUserMapper";
import ISessionStorage from "../Session/ISessionStorage";
import AuthSession from "../Auth/AuthSession";

export default class UserService {
    constructor(
        private readonly repository: IUserRepository,
        private readonly userMapper: IUserMapper,
        private readonly authSessionStorage: ISessionStorage<AuthSession>
    ) { }

    async save(userCreateDTO: UserCreateDTO): Promise<UserResponseDTO> {
        const user = new User(
            Name.create(userCreateDTO.name),
            Email.create(userCreateDTO.email),
            Password.create(userCreateDTO.password),
            UserFactoryState.fromRole(Role.UNASSOCIATED)
        );

        const userSaved = await this.repository.save(user);

        return this.userMapper.domainToDTO(userSaved);
    }

    async findAll(): Promise<UserResponseDTO[]> {
        const users = await this.repository.findAll();
        const usersDTO: UserResponseDTO[] = [];

        users.map(user => {
            usersDTO.push(this.userMapper.domainToDTO(user));
        })

        return usersDTO;
    }

    async changeRole(sessionID: string, userChangeRoleDTO: UserChangeRoleDTO): Promise<UserResponseDTO> {
        const user = await this.repository.findByEmail(userChangeRoleDTO.email);

        if (!this.existsRole(userChangeRoleDTO.role))
            throw new Error(`Missing role ${userChangeRoleDTO.role}`);

        user.changeRole(userChangeRoleDTO.role as Role);

        const userUpdated = await this.repository.updated(user);

        const authSession: AuthSession = {
            user: {
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole()
            }
        }

        this.authSessionStorage.update(sessionID, authSession);

        return this.userMapper.domainToDTO(userUpdated);
    }

    async findByEmail(userFindByEmailDTO: UserFindByEmailDTO): Promise<UserResponseDTO> {
        Email.validate(userFindByEmailDTO.email);

        const user = await this.repository.findByEmail(userFindByEmailDTO.email);

        return this.userMapper.domainToDTO(user);
    }

    private existsRole(role: string): boolean {
        return Object.values(Role).includes(role as Role);
    }
}