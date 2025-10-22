import { JwtAdapter } from "../../../infrastructure";
import { CustomError, UserRepository } from "../../../domain";

interface ValidateEmailI {
    execute(token: string): Promise<boolean>
}

type ValidateTokenFunction = (token: string) => Promise<object | null>;

export class ValidateEmailUseCase implements ValidateEmailI {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly validateToken: ValidateTokenFunction = JwtAdapter.validateToken
    ){}

    async execute(token: string): Promise<boolean> {
        const payload = await this.validateToken(token);
        if(!payload) throw CustomError.unauthorized("Invalid or expired token.");

        const { email } = payload as {email: string};
        if(!email) throw CustomError.internalServer("Token payload missing email.");

        const userEntity = await this.userRepository.findByEmail(email);
        if(!userEntity) throw CustomError.notFound("User not found during email validation.");

        try {
            userEntity.validateEmail();
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Validation failed due to unknown error.");
        }

        await this.userRepository.update(userEntity);

        return true;
    }

}