import { CustomError } from "../../errors/custom-errors";

export class CreateProjectDto {

    constructor(
        public title: string,
        public description: string,
        public githubUrl: string,
        public prodUrl: string,
        public userId: string,
    ){}

    static create(data: Partial<CreateProjectDto>): CreateProjectDto {
        const {title, description, githubUrl, prodUrl, userId} = data;
        if(!userId) throw CustomError.badRequest("User Id has not been provided");
        
        return new CreateProjectDto(title!, description!, githubUrl!, prodUrl!, userId!);
    }

}