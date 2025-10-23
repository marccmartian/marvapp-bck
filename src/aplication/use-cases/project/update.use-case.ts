import { CustomError, ProjectEntity, ProjectRepository, UpdateProjectDto } from "../../../domain";

interface UpdateProjectI {
    execute(id: string, updatedProject: UpdateProjectDto): Promise<ProjectEntity>;
}

export class UpdateProjectUseCase implements UpdateProjectI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(id: string, updatedProject: UpdateProjectDto): Promise<ProjectEntity> {
        const project = await this.projectRepository.findProjectById(id);
        if(!project) throw CustomError.notFound("Project not found during id validation.");

        return this.projectRepository.updateProject(project.id, updatedProject);
    }

}