import { ProjectEntity, ProjectRepository } from "../../../domain";

interface GetProjectsI {
    execute(): Promise<ProjectEntity[]>;
}

export class GetProjectsUseCase implements GetProjectsI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    execute(): Promise<ProjectEntity[]> {
        return this.projectRepository.getProjects();
    }

}