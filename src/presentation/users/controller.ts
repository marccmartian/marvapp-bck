import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";
import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterUserUseCase } from "../../domain/use-cases/user/register.use-case";
import { handleError } from "../../domain/errors/handleError";
import { GetUsersUseCase } from "../../domain/use-cases/user/get-all.use-case";
import { LoginUserUseCase } from "../../domain/use-cases/user/login.use-case";
import { LoginUserDto } from "../../domain/dtos/users/login-user.dto";
import { ValidateEmailUseCase } from "../../domain/use-cases/user/validate-email.use-case";

export class UserController {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    registerUser = (req: Request, res: Response) => {
        const registerUserDto = RegisterUserDto.create(req.body);

        new RegisterUserUseCase(this.userRepository)
            .execute(registerUserDto)
            .then(user => res.json(user))
            .catch(error => handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const loginUserDto = LoginUserDto.create(req.body);

        new LoginUserUseCase(this.userRepository)
            .execute(loginUserDto)
            .then(user => res.json(user))
            .catch(err => handleError(err, res));
    }

    getUsers = (req: Request, res: Response) => {
        new GetUsersUseCase(this.userRepository)
            .execute()
            .then(users => res.json(users))
            .catch(error => handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) => {
        const token = req.params.token;     
        new ValidateEmailUseCase(this.userRepository)
            .execute(token!)
            .then(() => res.json('Email was validated properly'))
            .catch(error => handleError(error, res));
    }
}