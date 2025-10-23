import { CustomError } from "../../errors/custom-errors";

export class UpdateProjectDto {

    constructor(
        public title: string,
        public description: string,
        public keywords: string[],
        public githubUrl: string,
        public prodUrl: string
    ){}

    static create(data: {[key: string]: any}): UpdateProjectDto {
        const {title, description, keywords, githubUrl, prodUrl, status, isTop} = data;

        if(!title || !description || !keywords || !githubUrl || !prodUrl){
            throw CustomError.internalServer("Missing required fields for project DTO update.");            
        }

        return new UpdateProjectDto(title, description, keywords, githubUrl, prodUrl);
    }

}