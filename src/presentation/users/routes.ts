import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {

    static get routes() : Router {
        const router = Router();
        const userController = new UserController()

        router.post('/login', userController.loginUser);
        router.post('/register', userController.registerUser);
        router.get('/', userController.getUsers);

        return router;
    }

}