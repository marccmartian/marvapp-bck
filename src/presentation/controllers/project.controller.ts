import { Request, Response } from "express";
import { CreateProjectUseCase, GetProjectsUseCase, ToogleIsTopUseCase, UpdateProjectUseCase } from "../../aplication";
import { CreateProjectDto, handleError, UpdateProjectDto } from "../../domain";


export class ProjectController {

    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly getProjectsUseCase: GetProjectsUseCase,
        private readonly updateProjectUseCase: UpdateProjectUseCase,
        private readonly toogleIsTopUseCase: ToogleIsTopUseCase,
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
        this.getProjectsUseCase
            .execute()
            .then(projects => res.json(projects))
            .catch(error => handleError(error, res));
    }

    updateProject = (req: Request, res: Response) => {
        const id = req.params.id || '';
        const updateProjectDto = UpdateProjectDto.create(req.body);
        
        this.updateProjectUseCase
            .execute(id, updateProjectDto)
            .then(updatedProject => res.json(updatedProject))
            .catch(error => handleError(error, res));
    }

    toogleIsTop = (req: Request, res: Response) => {
        const id = req.params.id || '';

        this.toogleIsTopUseCase
            .execute(id)
            .then(() => res.json("Is top project toggle properly"))
            .catch(err => handleError(err, res));
    }

    deleteProject = (req: Request, res: Response) => {
        res.json("delete project");
    }

}