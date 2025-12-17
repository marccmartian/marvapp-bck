import { GetProjectsOptions, NextCursor, ProjectJson, ProjectRepository, ScrollPaginateResponseDto } from "../../../domain";

interface GetProjectsI {
    execute(limit: number, lastSerialId?: number, isTop?: boolean): Promise<ScrollPaginateResponseDto<ProjectJson>>;
}

export class GetProjectsUseCase implements GetProjectsI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(limit: number = 9, lastSerialId?: number, isTop?: boolean): Promise<ScrollPaginateResponseDto<ProjectJson>> {
        if(limit <= 0 ) limit = 9;        

        const options: GetProjectsOptions = {
            limit: limit + 1,
            lastSerialId,
            isTop
        }

        const projects = await this.projectRepository.getProjects(options);
        
        const hasNextPage = projects.length > limit;
        const projectsToReturn = hasNextPage ? projects.slice(0, limit) : projects;
        const fomatedProjects = projectsToReturn.map(p => p.toJson());

        let nextCursor: NextCursor | null = null;
        if(hasNextPage){
            const lastProject = projectsToReturn[ projectsToReturn.length - 1 ]!;
            nextCursor = {                
                lastSerialId: lastProject.serialId
            }
        }

        const response: ScrollPaginateResponseDto<ProjectJson> = {
            data: fomatedProjects,
            pagination: {
                limit,
                nextCursor,
                hasNextPage
            }
        }

        return response;
    }

}