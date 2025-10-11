import { LoginUserDto } from "../../dtos/users/login-user.dto";
import { UserResponseDto } from "../../dtos/users/response-user.dto";
import { UserRepository } from "../../repositories/user.repository";

interface LoginUserI {
    execute(dto: LoginUserDto): Promise<UserResponseDto>;
}

export class LoginUserUseCase implements LoginUserI {

    constructor(
        private readonly userRepository: UserRepository
    ){}


    async execute(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        return await this.userRepository.login(loginUserDto);
    }

}