import { RegisterUserDto } from "../../dtos/users/register-user.dto";
import { UserResponseDto } from "../../dtos/users/response-user.dto";
import { UserRepository } from "../../repositories/user.repository";

interface RegisterUserI {
    execute(dto: RegisterUserDto): Promise<UserResponseDto>
}

export class RegisterUserUseCase implements RegisterUserI {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
        return await this.userRepository.register(registerUserDto);
    }

}