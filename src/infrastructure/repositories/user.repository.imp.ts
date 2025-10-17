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

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userDatasource.findByEmail(email);
    }
        
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return await this.userDatasource.register(registerUserDto);
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        return await this.userDatasource.update(userEntity);
    }
    
    async getAll(): Promise<UserEntity[]> {
        return await this.userDatasource.getAll();
    }

}