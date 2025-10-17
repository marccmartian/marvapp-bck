import { BcryptAdapter, JwtAdapter } from "../../../config";
import { CustomError, RegisterUserDto, UserRepository, UserResponseDto } from "../../../domain";
import { EmailService } from "../../services/email.service";

interface RegisterUserI {
    execute(dto: RegisterUserDto): Promise<UserResponseDto>
}

type HasherFunction = (password: string) => string;
type TokenGeneratorFunction = (payload: Object, duration?: string) => Promise<string | null>;

export class RegisterUserUseCase implements RegisterUserI {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService,
        private readonly hasher: HasherFunction = BcryptAdapter.hash,
        private readonly tokenGenerator: TokenGeneratorFunction = JwtAdapter.generateToken
    ){}

    async execute(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
        const userExist = await this.userRepository.findByEmail(registerUserDto.email);
        if(userExist) throw CustomError.badRequest('User email already exists.');

        const hashedPassword = this.hasher(registerUserDto.password);
        const persitDto = RegisterUserDto.create({...registerUserDto, password: hashedPassword});
        const userEntity = await this.userRepository.register(persitDto);

        const token = await this.tokenGenerator({ id: userEntity.id, email: userEntity.email });
        if(!token) throw CustomError.internalServer('Error generating authentication token.');

        await this.emailService.sendEmailValidationLink(userEntity.email, token);

        return UserResponseDto.fromEntity(userEntity, token);
    }

}