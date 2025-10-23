import { UpdateProjectDto } from "../../domain";
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
    
    findProjectById(id: string): Promise<ProjectEntity | null> {
        return this.projectDatasource.findProjectById(id);
    }
    
    createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        return this.projectDatasource.createProject(createProjectDto);
    }
    
    getProjects(): Promise<ProjectEntity[]> {
        return this.projectDatasource.getProjects();
    }

    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>{
        return this.projectDatasource.updateProject(id, updateProjectDto);
    }

    updateIstop(projectEntity: ProjectEntity): Promise<ProjectEntity>{
        return this.projectDatasource.updateIstop(projectEntity);
    }

}