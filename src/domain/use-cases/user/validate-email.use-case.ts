import { UserRepository } from "../../repositories/user.repository";

interface ValidateEmailI {
    execute(token: string): Promise<any>
}

export class ValidateEmailUseCase implements ValidateEmailI {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(token: string): Promise<any> {
        return this.userRepository.validateEmail(token);
    }

}