import { ProjectDatasource } from "../../domain/datasources/project.datasource";
import { CreateProjectDto } from "../../domain/dtos/projects/create-project.dto";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";

export class ProjectRepositoryImp implements ProjectRepository {

    constructor(
        private readonly projectDatasource: ProjectDatasource
    ){}

    findProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity | null> {
        return this.projectDatasource.findProject(createProjectDto);
    }

    createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        return this.projectDatasource.createProject(createProjectDto);
    }

}