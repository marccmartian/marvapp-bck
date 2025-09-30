import { Router } from "express";
import { UserController } from "./controller";
import { RegisterUserValidator } from "../../config/validators/user/register.validator";
import { validateFields } from "../middlewares/validate-fields.middleware";

export class UserRoutes {

    static get routes() : Router {
        const router = Router();
        const userController = new UserController()

        router.post('/register', RegisterUserValidator.rules, validateFields, userController.registerUser);
        router.post('/login', userController.loginUser);
        router.get('/', userController.getUsers);

        return router;
    }

}