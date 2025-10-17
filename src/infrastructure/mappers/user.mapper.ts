import { User } from "@prisma/client";
import { UserEntity, UserResponseDto } from "../../domain";

export class UserMapper {

    // origen: modelo BD - destino: entidad
    static fromPrismaToUserEntity(userModel: User): UserEntity {
        return UserEntity.fromObject(userModel);
    }

    // origen: entidad - destino: respuesta dto
    static fromEntityToResponseDto(entity: UserEntity, token: string): UserResponseDto {
        return UserResponseDto.fromEntity(entity, token);
    }
    
}
