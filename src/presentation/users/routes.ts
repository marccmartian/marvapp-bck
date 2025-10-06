import { Router } from "express";
import { UserController } from "./controller";
import { RegisterUserValidator } from "../../config/validators/user/register.validator";
import { validateFields } from "../middlewares/validate-fields.middleware";
import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource.imp";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository.imp";

export class UserRoutes {

    static get routes() : Router {
        const router = Router();
        const userDatasource = new UserDatasourceImp();
        const userRepository = new UserRepositoryImp(userDatasource)
        const userController = new UserController(userRepository);

        router.post('/register', RegisterUserValidator.rules, validateFields, userController.registerUser);
        router.post('/login', userController.loginUser);
        router.get('/', userController.getUsers);

        return router;
    }

}