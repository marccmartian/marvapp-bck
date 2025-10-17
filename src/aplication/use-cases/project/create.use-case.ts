import { CreateProjectDto } from "../../../domain/dtos/projects/create-project.dto";
import { ProjectEntity } from "../../../domain/entities/project.entity";
import { ProjectRepository } from "../../../domain/repositories/project.repository";

interface CreateProjectI {
    execute(dto: CreateProjectDto): Promise<ProjectEntity>;
}

export class CreateProjectUseCase implements CreateProjectI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(dto: CreateProjectDto): Promise<ProjectEntity> {
        return await this.projectRepository.createProject(dto);
    }

}