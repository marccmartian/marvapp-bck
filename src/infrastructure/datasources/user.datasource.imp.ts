import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/postgres/prisma-client";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { LoginUserDto } from "../../domain/dtos/users/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";
import { UserResponseDto } from "../../domain/dtos/users/response-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-errors";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class UserDatasourceImp implements UserDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ){}    
    
    async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
        const {name, surname, email, password} = registerUserDto;

        try {
            const existsUser = await prisma.user.findUnique({where: { email }});
            if(existsUser) throw CustomError.badRequest("User email already exists");
    
            const user = await prisma.user.create({
                data: {
                    name,
                    surname,
                    email,
                    password: this.hashPassword(password)
                }
            });
                  
            const userEntity = UserMapper.fromPrismaToUserEntity(user);            
            const token = await this.signToken({id: userEntity.id}, '2h');
            if(!token) throw CustomError.internalServer();

            return UserMapper.fromEntityToResponseDto(userEntity, token);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        const {email, password} = loginUserDto;

        try {
            const user = await prisma.user.findUnique({where: {email}});
            if(!user) throw CustomError.badRequest('Invalid email or password');
            const userEntity = UserMapper.fromPrismaToUserEntity(user);
    
            const isMatching = this.comparePassword(password, user.password);
            if(!isMatching) throw CustomError.badRequest("Invalid email or password");

            const token = await this.signToken({id: userEntity.id}, '2h');
            if(!token) throw CustomError.internalServer();
    
            return UserMapper.fromEntityToResponseDto(userEntity, token);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async getAll(): Promise<UserEntity[]> {
        try {
            const users = await prisma.user.findMany();
            return users.map(UserMapper.fromPrismaToUserEntity);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

}