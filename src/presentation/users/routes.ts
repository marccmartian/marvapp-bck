import { Router } from "express";
import { UserController } from "./controller";
import { RegisterUserValidator } from "../../config/validators/user/register.validator";
import { validateFields } from "../middlewares/validate-fields.middleware";
import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource.imp";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository.imp";
import { validateJwt } from "../middlewares/auth.middleware";
import { LoginUserValidator } from "../../config/validators/user/login.validator";

export class UserRoutes {

    static get routes() : Router {
        const router = Router();
        const userDatasource = new UserDatasourceImp();
        const userRepository = new UserRepositoryImp(userDatasource)
        const userController = new UserController(userRepository);

        router.post('/register', RegisterUserValidator.rules, validateFields, userController.registerUser);
        router.post('/login', LoginUserValidator.rules, validateFields, userController.loginUser);
        router.get('/', validateJwt, userController.getUsers);

        return router;
    }

}