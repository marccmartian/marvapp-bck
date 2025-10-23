import { CreateProjectDto } from "../dtos/projects/create-project.dto";
import { UpdateProjectDto } from "../dtos/projects/update-project.dto";
import { ProjectEntity } from "../entities/project.entity";

export interface ProjectDatasource {

    findProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity | null>;

    findProjectById(id: string): Promise<ProjectEntity | null>;

    createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;

    getProjects(): Promise<ProjectEntity[]>;

    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;

    updateIstop(projectEntity: ProjectEntity): Promise<ProjectEntity>;

}