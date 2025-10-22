import { CreateProjectDto, CustomError, ProjectEntity, ProjectRepository } from "../../../domain";


interface CreateProjectI {
    execute(dto: CreateProjectDto): Promise<ProjectEntity>;
}

export class CreateProjectUseCase implements CreateProjectI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(dto: CreateProjectDto): Promise<ProjectEntity> {
        const existingProject = await this.projectRepository.findProject(dto);
        if(existingProject) throw CustomError.badRequest(this.errorMessage(existingProject, dto));

        return await this.projectRepository.createProject(dto);
    }

    private errorMessage = (existingProject: ProjectEntity, dto: CreateProjectDto): string => {
        let errorMessage = 'The project already exists. ';
        
        if (existingProject.title === dto.title) {
            errorMessage += 'The title is already in use. ';
        }
        if (existingProject.githubUrl === dto.githubUrl) {
            errorMessage += 'The GitHub URL is already registered. ';
        }
        if (existingProject.prodUrl === dto.prodUrl) {
            errorMessage += 'The production URL is already registered.';
        }
        return errorMessage;
    }

}