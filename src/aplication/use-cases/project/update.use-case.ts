import { CustomError, ProjectEntity, ProjectRepository, UpdateProjectDto } from "../../../domain";

interface UpdateProjectI {
    execute(dto: UpdateProjectDto): Promise<ProjectEntity>;
}

export class UpdateProjectUseCase implements UpdateProjectI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(dto: UpdateProjectDto): Promise<ProjectEntity> {
        const project = await this.projectRepository.findProjectById(dto.id);
        if(!project) throw CustomError.notFound(`Project with ID ${dto.id} not found`);

        const existingProject = await this.projectRepository.findConflictingProyect(dto);
        
        if (existingProject) {
            throw CustomError.badRequest(this.errorMessage(existingProject, dto));
        }

        return this.projectRepository.updateProject(dto);
    }

    private errorMessage = (existingProject: ProjectEntity, dto: UpdateProjectDto): string => {
        let message = 'The update failed because one or more fields are already in use: ';
        
        if (dto.title && existingProject.title === dto.title && existingProject.id !== dto.id) {
            message += 'Title is already taken. ';
        }
        if (dto.githubUrl && existingProject.githubUrl === dto.githubUrl && existingProject.id !== dto.id) {
            message += 'GitHub URL is already registered. ';
        }
        if (dto.prodUrl && existingProject.prodUrl === dto.prodUrl && existingProject.id !== dto.id) {
            message += 'Production URL is already registered.';
        }
        
        return message.trim();
    }

}