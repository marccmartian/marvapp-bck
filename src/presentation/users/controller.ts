import { Request, Response } from "express";
import { handleError, LoginUserDto, RegisterUserDto } from "../../domain";
import { GetUsersUseCase, LoginUserUseCase, RegisterUserUseCase, ValidateEmailUseCase } from "../../aplication";

export class UserController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly getUsersUseCase: GetUsersUseCase,
        private readonly validateEmailUseCase: ValidateEmailUseCase
    ){}

    registerUser = (req: Request, res: Response) => {
        const registerUserDto = RegisterUserDto.create(req.body);        

        this.registerUserUseCase
            .execute(registerUserDto)
            .then(user => res.json(user))
            .catch(error => handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const loginUserDto = LoginUserDto.create(req.body);

        this.loginUserUseCase
            .execute(loginUserDto)
            .then(user => res.json(user))
            .catch(err => handleError(err, res));
    }

    getUsers = (req: Request, res: Response) => {
        this.getUsersUseCase
            .execute()
            .then(users => res.json(users))
            .catch(error => handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) => {
        const token = req.params.token;     
        this.validateEmailUseCase
            .execute(token!)
            .then(() => res.json('Email was validated properly'))
            .catch(error => handleError(error, res));
    }
}