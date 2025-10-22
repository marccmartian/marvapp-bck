import { CreateProjectDto, CustomError, ProjectDatasource, ProjectEntity } from "../../domain";
import { prisma } from "../database/prisma/prisma-client";
import { ProjectMapper } from "../mappers/project.mapper";

export class ProjectDatasourceImp implements ProjectDatasource {

    async findProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity | null> {
        try {
            const project = await prisma.project.findFirst({
                where: {
                    OR: [
                        { title: createProjectDto.title },
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

    async createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        const {title, description, keywords, githubUrl, prodUrl, userId} = createProjectDto;

        try {
            const project = await prisma.project.create({
                data: {
                    title,
                    description,
                    keywords,
                    githubUrl,
                    prodUrl,
                    userId
                }
            });

            return ProjectMapper.fromPrismaToProjectEntity(project);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer("Error creating project to database.");
        }
    }

}