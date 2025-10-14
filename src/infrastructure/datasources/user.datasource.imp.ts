import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { EmailAdapter } from "../../config/email.adapter";
import { envs } from "../../config/envs.adapter";
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
        private readonly emailAdapter: EmailAdapter,
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
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
            const token = await this.signToken({ id: userEntity.id, email: userEntity.email }, '2h');
            if(!token) throw CustomError.internalServer();

            await this.sendEmailValidationLink(email, token);
            return UserMapper.fromEntityToResponseDto(userEntity, token);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    private sendEmailValidationLink = async (email: string, token: string): Promise<boolean> => {
        const link = `${envs.WEBSERVICE_URL}/user/validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Please, click on the following link to validate your email.</p>
            <p>Here is your email 👉🏼 <a href="${link}">${email}</a></p>
        `;

        const isSent = this.emailAdapter.sendEmail({
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        });
        if(!isSent) throw CustomError.internalServer('Error sending email');
        return true;
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

    async validateEmail(token: string): Promise<boolean> {
        const payload = await JwtAdapter.validateToken(token);
        if(!payload) throw CustomError.unauthorized("Invalid token");

        const {email} = payload as {email:string}
        if(!email) throw CustomError.internalServer("Email no token");

        const user = await prisma.user.findUnique({where: {email, status: true}});
        if(user) throw CustomError.badRequest("Your email has already been confirmed")

        const updateUser = await prisma.user.update({
            where: {email},
            data: {status: true}
        });
        if(!updateUser) throw CustomError.internalServer("Email not exist");
              
        return true;
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