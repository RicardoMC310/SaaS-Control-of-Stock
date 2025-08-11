import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO, UserDto, UserRules } from 'src/DTOs/user.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    private users: UserDto[] = [];

    validateEmail(email: string | undefined): boolean {
        const emailRegex = /^[a-zA-Z\d._%-+]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            throw new BadRequestException('Invalid email format');
        }
        return true;
    }

    validatePassword(password: string | undefined): boolean {
        const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).{8,}$/;
        if (!password  || !passwdRegex.test(password)) {
            throw new BadRequestException('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        }
        return true;
    }

    validateName(name: string | undefined): boolean {
        const nameRegex = /^(?!.*\s\s)(?!.*\.\.)[a-zA-ZÀ-ÿ'.\-\s]+$/;

        if (!name || !nameRegex.test(name)) {
            throw new BadRequestException("Name must contain only letters, spaces, apostrophes, hyphens, and periods, and cannot contain consecutive spaces or periods");
        }
        
        return true;
    }

    getUsers(): UserDto[] {
        return this.users;
    }

    register(user: RegisterUserDTO): void {
        const existingUser = this.users.find(u => u.email === user.email);
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        const newUser: UserDto = {
            id: this.users.length + 1,
            rules: UserRules.CLIENT,
            email: user.email,
            name: user.name,
            password: bcrypt.hashSync(user.password, 14),
            createdAt: new Date()
        };

        this.users.push(newUser);
    }

    login(user: LoginUserDTO): { token: string } {
        const foundUser = this.users.find(u => u.email === user.email);

        if (!foundUser || !bcrypt.compareSync(user.password, foundUser.password)) {
            throw new ConflictException('Invalid email or password');
        }

        const payload = {
            email: foundUser.email,
            sub: foundUser.id,
            rules: foundUser.rules,
            name: foundUser.name,
            createdAt: foundUser.createdAt
        };
        return {
            "token": this.jwtService.sign(payload),
        };
    }
}
