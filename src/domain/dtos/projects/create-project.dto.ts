import { CustomError } from "../../errors/custom-errors";

export class CreateProjectDto {

    constructor(
        public title: string,
        public description: string,
        public keywords: string[],
        public githubUrl: string,
        public prodUrl: string,
        public userId: string,
    ){}

    static create(data: Partial<CreateProjectDto>): CreateProjectDto {
        const {title, description, keywords, githubUrl, prodUrl, userId} = data;
        
        if(!title || ! description || !keywords || !githubUrl || !prodUrl || !userId) {
            throw CustomError.internalServer("Missing required fields for porject DTO creation.");
        }
        
        return new CreateProjectDto(title, description, keywords, githubUrl, prodUrl, userId);
    }

}