import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { CreateProjectValidator } from "../middlewares/validators/project/create.validator";
import { validateFields } from "../middlewares/validate-fields.middleware";
import { validateJwt } from "../middlewares/auth.middleware";

export class ProjectRoutes {

    static getRoutes(controller: ProjectController): Router {
        const router = Router();        

        router.post('/create', CreateProjectValidator.rules, validateFields, validateJwt, controller.createProject);
        router.get('/', controller.getProjects);
        router.put('/:id', controller.updateProject);
        router.delete('/:id', controller.deleteProject);

        return router;
    }

}