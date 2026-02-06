import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import CreateUserDTO from "./UserCreateDTO";
import Name from "@/Domain/User/ValueObjects/Name";
import Email from "@/Domain/User/ValueObjects/Email";
import Password from "@/Domain/User/ValueObjects/PasswordHash";
import UserMapper from "@/Infrastructure/Mappers/UserMapper";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import UserUnassociatedState from "@/Domain/User/States/UserUnassociatedState";

export default class UserService {
    constructor(
        private readonly repository: IUserRepository
    ) {}

    async save(userCreateDTO: CreateUserDTO): Promise<UserResponseDTO> {
        const user = new User(
            Name.create(userCreateDTO.name),
            Email.create(userCreateDTO.email),
            Password.create(userCreateDTO.password),
            new UserUnassociatedState()
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

    async makeUserBoss(email: string): Promise<UserResponseDTO> {
        const user = await this.repository.findByEmail(email);

        user.becomeBoss();

        const userUpdated = await this.repository.updated(user);

        return UserMapper.domainToDTO(userUpdated);
    }

    async makeUserEmployee(email: string): Promise<UserResponseDTO> {
        const user = await this.repository.findByEmail(email);

        user.becomeEmployee();

        const userUpdated = await this.repository.updated(user);

        return UserMapper.domainToDTO(userUpdated);
    }

    async makeUserUnassociated(email: string): Promise<UserResponseDTO> {
        const user = await this.repository.findByEmail(email);

        user.becomeUnassociated();

        const userUpdated = await this.repository.updated(user);

        return UserMapper.domainToDTO(userUpdated);
    }
}