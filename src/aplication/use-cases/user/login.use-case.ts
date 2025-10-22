import { BcryptAdapter, JwtAdapter } from "../../../infrastructure";
import { CustomError, LoginUserDto, UserRepository, UserResponseDto } from "../../../domain";

interface LoginUserI {
    execute(dto: LoginUserDto): Promise<UserResponseDto>;
}

type CompareFunction = (password: string, hashed: string) => boolean;
type TokenGeneratorFunction = (payload: Object, duration?: string) => Promise<string | null>;


export class LoginUserUseCase implements LoginUserI {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
        private readonly tokenGenerator: TokenGeneratorFunction = JwtAdapter.generateToken
    ){}


    async execute(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        const userExist = await this.userRepository.findByEmail(loginUserDto.email);
        if(!userExist) throw CustomError.badRequest("User email not exsits");

        const isMatching = this.comparePassword(loginUserDto.password, userExist.password);
        if(!isMatching) throw CustomError.badRequest("Invalid email or password");

        const token = await this.tokenGenerator({ id: userExist.id, email: userExist.email });
        if(!token) throw CustomError.internalServer('Error generating authentication token.');

        return UserResponseDto.fromEntity(userExist, token);
    }

}