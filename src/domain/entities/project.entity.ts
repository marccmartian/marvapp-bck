import { CustomError } from "../errors/custom-errors";

export class ProjectEntity {

    constructor(
        public readonly id: string,
        public title: string,
        public description: string,
        public keywords: string[],
        public imageUrl: string | null,
        public githubUrl: string,
        public prodUrl: string,
        private status: boolean,
        private isTop: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date,
    ){}

    public get getStatus(): boolean {
        return this.status;
    }

    public get getIsTop(): boolean {
        return this.isTop;
    }

    public toogleStatus(): void {
        this.status = !this.status;
        this.touch();
    }

    public toogleIsTop() {
        this.isTop = !this.isTop;
        this.touch();
    }

    public touch() {
        this.updatedAt = new Date();
    }

    static fromObject(object: {[key: string]: any}): ProjectEntity {
        const {id, title, description, keywords, imageUrl, githubUrl, prodUrl, status, isTop, createdAt, updatedAt} = object;

        if(!id) throw CustomError.internalServer("Project entity mapping error: Missing ID");

        return new ProjectEntity(
            id, title, description, keywords,
            imageUrl, githubUrl, prodUrl,
            status, isTop,
            new Date(createdAt), new Date(updatedAt)
        );
    }

}