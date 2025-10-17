import { CustomError, RegisterUserDto, UserDatasource, UserEntity } from "../../domain";
import { prisma } from "../database/prisma/prisma-client";
import { UserMapper } from "../mappers/user.mapper";

export class UserDatasourceImp implements UserDatasource {

    async findByEmail(email: string): Promise<UserEntity | null> {
        try {
            const user = await prisma.user.findUnique({ where: { email } });            
            return user ? UserMapper.fromPrismaToUserEntity(user) : null;
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error searching user database.");
        }

    }
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name, surname, email, password} = registerUserDto;

        try {    
            const user = await prisma.user.create({
                data: {
                    name, 
                    surname, 
                    email, 
                    password
                }
            });
            
            return UserMapper.fromPrismaToUserEntity(user);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error saving user to database.");
        }
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userEntity.id },
                data: {
                    name: userEntity.name,
                    surname: userEntity.surname,
                    role: userEntity.role,
                    isEmailValidated: userEntity.isEmailValidated,
                }
            });

            return UserMapper.fromPrismaToUserEntity(updatedUser);
        } catch (error) {
            throw CustomError.internalServer("Error updating user in database.");
        }
        
    }

    async getAll(): Promise<UserEntity[]> {
        try {
            const users = await prisma.user.findMany();
            return users.map(UserMapper.fromPrismaToUserEntity);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error getting all users");
        }
    }

}