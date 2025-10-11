import { User } from "@prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserResponseDto } from "../../domain/dtos/users/response-user.dto";

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
