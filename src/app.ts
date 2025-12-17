import { CreateProjectUseCase, EmailServiceImp, GetProjectsUseCase, GetProjectUseCase, GetUsersUseCase, LoginUserUseCase, RegisterUserUseCase, ToogleIsTopUseCase, UpdateProjectUseCase, ValidateEmailUseCase } from "./aplication";
import { CloudinaryAdapter, EmailAdapter, envs, FileUploadService, ProjectRepositoryImp, UserRepositoryImp } from "./infrastructure";
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

        const cloudinaryAdapter = new CloudinaryAdapter(
            envs.CLOUD_NAME,
            envs.API_KEY,
            envs.API_SECRET,
            envs.FOLDER_NAME
        );

        // User module
        const emailService = new EmailServiceImp(emailAdapter);
        const userRepository = new UserRepositoryImp();
        const registeUserUseCase = new RegisterUserUseCase(userRepository, emailService);
        const loginUserUseCase = new LoginUserUseCase(userRepository);
        const getUsersUseCase = new GetUsersUseCase(userRepository);
        const validateEmailUseCase = new ValidateEmailUseCase(userRepository);
        const userController = new UserController(
            registeUserUseCase, loginUserUseCase, 
            getUsersUseCase, validateEmailUseCase
        );

        const userRoutes = UserRoutes.getRoutes(userController);

        // Project Module
        const fileUploadService = new FileUploadService(cloudinaryAdapter);
        const projectRepository = new ProjectRepositoryImp();
        const createProjectUseCase = new CreateProjectUseCase(projectRepository);
        const getProjectsUseCase = new GetProjectsUseCase(projectRepository);
        const getProjectUseCase = new GetProjectUseCase(projectRepository);
        const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
        const toogleIsTopUseCase = new ToogleIsTopUseCase(projectRepository);
        const projectController = new ProjectController(
            createProjectUseCase, getProjectsUseCase, getProjectUseCase,
            updateProjectUseCase, toogleIsTopUseCase,
            fileUploadService, projectRepository
        );

        const projectRoutes = ProjectRoutes.getRoutes(projectController);

        // Server
        const server = new Server({
            port: envs.PORT,
            routes: AppRoutes.getRoutes(userRoutes, projectRoutes),
            frontedUrl: envs.FRONTEND_URL
        });

        server.start();
        
    } catch (error) {
        console.error("Critical error during application startup:", error);
        process.exit(1);
    }
}
