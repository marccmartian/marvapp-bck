import { EmailServiceImp, GetUsersUseCase, LoginUserUseCase, RegisterUserUseCase, ValidateEmailUseCase } from "./aplication";
import { EmailAdapter, envs } from "./config";
import { ProjectDatasourceImp, ProjectRepositoryImp, UserDatasourceImp, UserRepositoryImp } from "./infrastructure";
import { AppRoutes, ProjectController, ProjectRoutes, Server, UserController, UserRoutes } from "./presentation";

(async () => {
    await main();
})()

async function main() {
    try {
        const emailAdapter = new EmailAdapter(
            envs.MAILER_SERVICE, 
            envs.MAILER_EMAIL, 
            envs.MAILER_SECRET_KEY
        );

        const emailService = new EmailServiceImp(emailAdapter);
        const userDatasource = new UserDatasourceImp();
        const userRepository = new UserRepositoryImp(userDatasource);

        const registeUserUseCase = new RegisterUserUseCase(userRepository, emailService);
        const loginUserUseCase = new LoginUserUseCase(userRepository);
        const getUsersUseCase = new GetUsersUseCase(userRepository);
        const validateEmailUseCase = new ValidateEmailUseCase(userRepository);
        const userController = new UserController(
            registeUserUseCase, loginUserUseCase, 
            getUsersUseCase, validateEmailUseCase
        );

        const userRoutes = UserRoutes.getRoutes(userController);

        const projectRepository = new ProjectRepositoryImp(new ProjectDatasourceImp());
        const projectController = new ProjectController(projectRepository);
        const projectRoutes = ProjectRoutes.getRoutes(projectController);

        const server = new Server({
            port: envs.PORT,
            routes: AppRoutes.getRoutes(userRoutes, projectRoutes)
        });

        server.start();
        
    } catch (error) {
        console.error("Critical error during application startup:", error);
        process.exit(1);
    }
}
