import { RegisterUserDto } from "../dtos/users/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export interface UserRepository {

    findByEmail(email: string): Promise<UserEntity | null>;

    register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

    update(userEntity: UserEntity): Promise<UserEntity>;

    getAll(): Promise<UserEntity[]>;
    
}