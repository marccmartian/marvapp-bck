import { Request, Response } from "express";
import { CreateProjectUseCase, GetProjectsUseCase, ToogleIsTopUseCase, UpdateProjectUseCase } from "../../aplication";
import { CreateProjectDto, CustomError, handleError, ProjectRepository, UpdateProjectDto } from "../../domain";
import { FileUploadService } from "../../infrastructure";


export class ProjectController {

    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly getProjectsUseCase: GetProjectsUseCase,
        private readonly updateProjectUseCase: UpdateProjectUseCase,
        private readonly toogleIsTopUseCase: ToogleIsTopUseCase,
        private readonly fileUploadService: FileUploadService,
        private readonly projectRepository: ProjectRepository
    ){}

    createProject = async (req: Request, res: Response) => {
        const user = req.body.user;        
        const file = req.file as Express.Multer.File | undefined;
        let imageUrl: string | null = null;

        try {
            if (file && user) imageUrl = await this.fileUploadService.upload(file);

            const createProjectDto = CreateProjectDto.create({...req.body, userId: user.id, imageUrl});
            const project = await this.createProjectUseCase.execute(createProjectDto);
            
            return res.json(project.toJson());
        } catch (error) {
            return handleError(error, res);
        }

    }
    
    getProjects = (req: Request, res: Response) => {
        this.getProjectsUseCase
            .execute()
            .then(responseData => {
                const projectEntities = responseData.map(project => project.toJson());
                res.json(projectEntities);
            })
            .catch(error => handleError(error, res));
    }

    updateProject = async (req: Request, res: Response) => {
        const id = req.params.id || '';
        const file = req.file as Express.Multer.File | undefined;
        let imageUrl: string | null | undefined = undefined;

        try {
            const oldProject = await this.projectRepository.findProjectById(id);
            if (!oldProject) throw CustomError.notFound(`Project with id ${id} not found.`);

            if(file) imageUrl = await this.fileUploadService.upload(file);
            if(oldProject.imageUrl) await this.fileUploadService.deleteFile(oldProject.imageUrl);

            const updateProjectDto = UpdateProjectDto.create({...req.body, id, imageUrl});
            const project = await this.updateProjectUseCase.execute(updateProjectDto);

            res.json(project.toJson());
        } catch (error) {
            return handleError(error, res);
            
        }
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