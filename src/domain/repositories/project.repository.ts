import { CreateProjectDto } from "../dtos/projects/create-project.dto";
import { ProjectEntity } from "../entities/project.entity";

export interface ProjectRepository {

    findProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity | null>;    

    createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;

}