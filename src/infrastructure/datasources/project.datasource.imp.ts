import { CreateProjectDto, CustomError, ProjectDatasource, ProjectEntity, UpdateProjectDto } from "../../domain";
import { prisma } from "../database/prisma/prisma-client";
import { ProjectMapper } from "../mappers/project.mapper";

export class ProjectDatasourceImp implements ProjectDatasource {

    async findProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity | null> {
        try {
            const project = await prisma.project.findFirst({
                where: {
                    OR: [
                        { title: createProjectDto.title  },
                        { githubUrl: createProjectDto.githubUrl },
                        { prodUrl: createProjectDto.prodUrl },
                    ]
                }
            });
            return project ? ProjectMapper.fromPrismaToProjectEntity(project) : null;
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error searching project database.");
        }
    }

    async findProjectById(id: string): Promise<ProjectEntity | null>{
        try {
            const project = await prisma.project.findUnique({ where: {id}});
            return project ? ProjectMapper.fromPrismaToProjectEntity(project) : null;
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error finding id project from database.");
        }
    }

    async findConflictingProyect(dto: UpdateProjectDto): Promise<ProjectEntity | null> {
        try {
            const conditions: any[] = [];

            if(dto.title) conditions.push({ title: dto.title });
            if(dto.githubUrl) conditions.push({ githubUrl: dto.githubUrl });
            if(dto.prodUrl) conditions.push({ prodUrl: dto.prodUrl });

            const project = await prisma.project.findFirst({
                where: {
                    NOT: { id: dto.id },
                    OR: conditions
                }
            });
            
            return project ? ProjectMapper.fromPrismaToProjectEntity(project) : null;
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error finding conflicting project from database.");
        }
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        try {
            const {title, description, keywords, githubUrl, prodUrl, imageUrl, userId} = createProjectDto;

            const project = await prisma.project.create({
                data: { title, description, keywords, githubUrl, prodUrl, imageUrl, userId }
            });

            return ProjectMapper.fromPrismaToProjectEntity(project);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error creating project to database.");
        }
    }

    async getProjects(): Promise<ProjectEntity[]> {
        try {
            const projects = await prisma.project.findMany({ where: { status: true }});
            return projects.map(ProjectMapper.fromPrismaToProjectEntity);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error getting all projects from databse.");
        }
    }

    async updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {         
        try {
            const updatedProject = await prisma.project.update({
                where: { id: updateProjectDto.id },
                data: updateProjectDto.toUpdatePayload()
            });
            return ProjectMapper.fromPrismaToProjectEntity(updatedProject);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error updating project from database.");
        }
    }

    async updateIstop(projectEntity: ProjectEntity): Promise<ProjectEntity>{
        try {
            const project = await prisma.project.update({
                where: { id: projectEntity.id },
                data: { isTop: projectEntity.isTop }
            });
            return ProjectMapper.fromPrismaToProjectEntity(project);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error updating is Top project from database.");
        }
    }


}