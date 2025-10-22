import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { RegisterUserValidator } from "../middlewares/validators/user/register.validator";
import { validateFields } from "../middlewares/validate-fields.middleware";
import { validateJwt } from "../middlewares/auth.middleware";
import { LoginUserValidator } from "../middlewares/validators/user/login.validator";

export class UserRoutes {

    static getRoutes(controller: UserController) : Router {
        const router = Router();        

        router.post('/register', RegisterUserValidator.rules, validateFields, controller.registerUser);
        router.post('/login', LoginUserValidator.rules, validateFields, controller.loginUser);
        router.get('/', validateJwt, controller.getUsers);
        router.get('/validate-email/:token', controller.validateEmail);

        return router;
    }

}