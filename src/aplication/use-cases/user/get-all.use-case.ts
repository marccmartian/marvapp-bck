import { UserEntity, UserRepository } from "../../../domain";

interface GetUsersI {
    execute(): Promise<UserEntity[]>;
}

export class GetUsersUseCase implements GetUsersI {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(): Promise<UserEntity[]> {
        return this.userRepository.getAll();
    }

}