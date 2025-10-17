import { CustomError } from "../errors/custom-errors";

export class ProjectEntity {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public imageUrl: string | null,
        public githubUrl: string,
        public prodUrl: string,
        public status: boolean,
        public isTop: boolean,
        public createdAt: Date,
        public updatedAt: Date,
    ){}

    static fromObject(object: {[key: string]: any}): ProjectEntity {
        const {id, title, description, imageUrl, githubUrl, prodUrl, status, isTop, createdAt, updatedAt} = object;

        if(!id) throw CustomError.badRequest("Missing id");
        if(!title) throw CustomError.badRequest("Missing title");
        if(!description) throw CustomError.badRequest("Missing description");
        if(!githubUrl) throw CustomError.badRequest("Missing githubUrl");
        if(!prodUrl) throw CustomError.badRequest("Missing prodUrl");
        if(!status === undefined) throw CustomError.badRequest("Missing status");
        if(!isTop === undefined) throw CustomError.badRequest("Missing isTop");
        if(!createdAt) throw CustomError.badRequest("Missing createdAt");
        if(!updatedAt) throw CustomError.badRequest("Missing updatedAt");

        return new ProjectEntity(id, title, description, imageUrl, githubUrl, prodUrl, status, isTop, createdAt, updatedAt);
    }

}