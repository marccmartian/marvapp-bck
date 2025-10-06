import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserController {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    registerUser = (req: Request, res: Response) => {
        const registerUserDto = RegisterUserDto.create(req.body);
        this.userRepository.register(registerUserDto)
        .then(user => res.json(user));
    }

    loginUser = (req:Request, res: Response) => {
        res.json('Login user')
    }

    getUsers = (req: Request, res: Response) => {
        res.json('Get users')
    }
}