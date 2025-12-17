import { Request, response, Response } from "express";
import { CreateProjectUseCase, GetProjectsUseCase, GetProjectUseCase, ToogleIsTopUseCase, UpdateProjectUseCase } from "../../aplication";
import { CreateProjectDto, CustomError, handleError, ProjectRepository, UpdateProjectDto } from "../../domain";
import { FileUploadService } from "../../infrastructure";


export class ProjectController {

    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly getProjectsUseCase: GetProjectsUseCase,
        private readonly getProjectUseCase: GetProjectUseCase,
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
        const validated = req.validatedData;
        const limit = validated.limit || 9;
        const isTopFilter = validated.isTop;
        const lastSerialId = validated.lastSerialId; 

        this.getProjectsUseCase
            .execute(limit, lastSerialId, isTopFilter)
            .then(response => res.json(response))
            .catch(error => handleError(error, res));
    }

    getProject = (req: Request, res: Response) => {
        const id = req.params.id || "";     

        this.getProjectUseCase
            .execute(id)
            .then(response => res.json(response.toJson()))
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