import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";

export class UserController {
    constructor(){}

    registerUser = (req: Request, res: Response) => {
        const registerUserDto = RegisterUserDto.create(req.body);
        console.log(registerUserDto);        
        res.json(registerUserDto);
    }

    loginUser = (req:Request, res: Response) => {
        res.json('Login user')
    }

    getUsers = (req: Request, res: Response) => {
        res.json('Get users')
    }
}