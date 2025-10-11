import { UserDatasource } from "../../domain/datasources/user.datasource";
import { LoginUserDto } from "../../domain/dtos/users/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";
import { UserResponseDto } from "../../domain/dtos/users/response-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImp implements UserRepository {

    constructor(
        private readonly userDatasource: UserDatasource
    ){}
        
    register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
        return this.userDatasource.register(registerUserDto);
    }

    login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        return this.userDatasource.login(loginUserDto);
    }

    getAll(): Promise<UserEntity[]> {
        return this.userDatasource.getAll();
    }

}