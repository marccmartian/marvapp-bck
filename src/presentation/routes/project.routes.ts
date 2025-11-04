import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { CreateProjectValidator } from "../middlewares/validators/project/create.validator";
import { validateFields } from "../middlewares/validate-fields.middleware";
import { validateJwt } from "../middlewares/auth.middleware";
import { UpdateProjectValidator } from "../middlewares/validators/project/update.validator";
import { uploadMiddleware } from "../middlewares/upload.middleware";

export class ProjectRoutes {

    static getRoutes(controller: ProjectController): Router {
        const router = Router();        

        router.post('/create', uploadMiddleware.single('imageFile'), validateJwt, CreateProjectValidator.rules, validateFields, controller.createProject);
        router.get('/', controller.getProjects);
        router.patch('/:id', uploadMiddleware.single('imageFile'), validateJwt, UpdateProjectValidator.rules, validateFields, controller.updateProject);
        router.patch('/toogle-istop/:id', validateJwt, controller.toogleIsTop);
        router.delete('/:id', controller.deleteProject);

        return router;
    }

}