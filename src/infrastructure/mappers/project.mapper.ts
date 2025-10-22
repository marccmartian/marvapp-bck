import { Project } from "@prisma/client";
import { ProjectEntity } from "../../domain";

export class ProjectMapper  {

    static fromPrismaToProjectEntity(project: Project) {
        return ProjectEntity.fromObject(project);
    }

}