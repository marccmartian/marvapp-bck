import { CustomError } from "../../errors/custom-errors";

export class CreateProjectDto {

    constructor(
        public title: string,
        public description: string,
        public keywords: string[],
        public githubUrl: string,
        public prodUrl: string,
        public imageUrl: string | null,
        public userId: string,
    ){}

    static create(data: Partial<CreateProjectDto>): CreateProjectDto {
        let {title, description, keywords, githubUrl, prodUrl, imageUrl, userId} = data;
        
        if(!title || ! description || !keywords || !githubUrl || !prodUrl || !userId) {
            throw CustomError.internalServer("Missing required fields for project DTO creation.");
        }

        if(imageUrl === undefined) imageUrl = null;
        
        return new CreateProjectDto(title, description, keywords, githubUrl, prodUrl, imageUrl, userId);
    }

}