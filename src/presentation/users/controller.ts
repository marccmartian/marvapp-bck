import { Request, Response } from "express";

export class UserController {
    constructor(){}

    registerUser = (req: Request, res: Response) => {
        res.json("register user")
    }

    loginUser = (req:Request, res: Response) => {
        res.json('Login user')
    }

    getUsers = (req: Request, res: Response) => {
        res.json('Get users')
    }
}