import { LoginUserDto } from "../dtos/users/login-user.dto";
import { RegisterUserDto } from "../dtos/users/register-user.dto";
import { UserResponseDto } from "../dtos/users/response-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {

    abstract register(registerUserDto: RegisterUserDto): Promise<UserResponseDto>;
    abstract login(loginUserDto: LoginUserDto): Promise<UserResponseDto>;   
    abstract getAll(): Promise<UserEntity[]>;
    abstract validateEmail(token: string): Promise<boolean>;

}