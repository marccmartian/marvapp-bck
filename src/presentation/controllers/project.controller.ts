import { Request, Response } from "express";
import { CreateProjectDto, handleError } from "../../domain";
import { CreateProjectUseCase } from "../../aplication/use-cases/project/create.use-case";


export class ProjectController {

    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase
    ){}

    createProject = (req: Request, res: Response) => {
        const user = req.body.user;
        const createProjectDto = CreateProjectDto.create({...req.body, userId: user.id});

        this.createProjectUseCase
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