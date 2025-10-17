import { prisma } from "../database/prisma/prisma-client";
import { ProjectDatasource } from "../../domain/datasources/project.datasource";
import { CreateProjectDto } from "../../domain/dtos/projects/create-project.dto";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { CustomError } from "../../domain/errors/custom-errors";

export class ProjectDatasourceImp implements ProjectDatasource {

    async createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        const {title, description, githubUrl, prodUrl, userId} = createProjectDto;

        try {
            const existsProject = await prisma.project.findUnique({where: {title}});
            if(existsProject) throw CustomError.badRequest("This project name already exists");

            const project = await prisma.project.create({
                data: {
                    title,
                    description,
                    githubUrl,
                    prodUrl,
                    userId
                }
            });

            return ProjectEntity.fromObject(project);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

}