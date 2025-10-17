import { Request, Response } from "express";
import { CreateProjectDto } from "../../domain/dtos/projects/create-project.dto";
import { CreateProjectUseCase } from "../../aplication/use-cases/project/create.use-case";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { handleError } from "../../domain/errors/handleError";

export class ProjectController {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    createProject = (req: Request, res: Response) => {
        const user = req.body.user;
        const createProjectDto = CreateProjectDto.create({...req.body, userId: user.id});

        new CreateProjectUseCase(this.projectRepository)
            .execute(createProjectDto)
            .then(project => res.json(project))
            .catch(error => handleError(error, res));
    }
    
    getProjects = (req: Request, res: Response) => {
        res.json("get projects");
    }

    updateProject = (req: Request, res: Response) => {
        res.json("update project");
    }

    deleteProject = (req: Request, res: Response) => {
        res.json("delete project");
    }

}