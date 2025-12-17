import { CustomError, ProjectEntity, ProjectRepository } from "../../../domain";

interface GetProjectI {
    execute(id: string): Promise<ProjectEntity>;
}

export class GetProjectUseCase implements GetProjectI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(id: string): Promise<ProjectEntity> {
        const project = await this.projectRepository.findProjectById(id);
        if(!project) throw CustomError.notFound(`Project with ID ${id} not found`);
        return project;
    }

}