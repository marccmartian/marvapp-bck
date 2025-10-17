import { UserEntity } from "../../entities/user.entity";

class UserPublicDataDto {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email: string,
        public role: string,
        public isEmailValidated: boolean
    ) {}
}

export class UserResponseDto {
    constructor(
        public user: UserPublicDataDto,
        public token: string
    ){}

    static fromEntity(entity: UserEntity, token:string): UserResponseDto {
        const userData = new UserPublicDataDto(
            entity.id,
            entity.name,
            entity.surname,
            entity.email,
            entity.role,
            entity.isEmailValidated
        );

        return new UserResponseDto(userData, token);
    }
}
