import { GetProjectsOptions } from "../dtos/scroll-paginate.response.dto";
import { CreateProjectDto } from "../dtos/projects/create-project.dto";
import { UpdateProjectDto } from "../dtos/projects/update-project.dto";
import { ProjectEntity } from "../entities/project.entity";

export interface ProjectRepository {

    findProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity | null>;

    findProjectById(id: string): Promise<ProjectEntity | null>;

    findConflictingProyect(dto: UpdateProjectDto): Promise<ProjectEntity | null>;

    createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;

    getProjects(options: GetProjectsOptions): Promise<ProjectEntity[]>;

    updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;

    updateIstop(projectEntity: ProjectEntity): Promise<ProjectEntity>;

}